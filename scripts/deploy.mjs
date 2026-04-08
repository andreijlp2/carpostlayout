import ftp from "basic-ftp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { execSync } from "child_process";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const distFolder = join(projectRoot, "dist");
const phpFolder = join(projectRoot, "server-php");

const CONFIG = {
  host: process.env.VITE_FTP_HOST,
  user: process.env.VITE_FTP_USER,
  password: process.env.VITE_FTP_PASSWORD,
  remoteRoot: process.env.VITE_FTP_REMOTE_ROOT || "/",
  port: parseInt(process.env.VITE_FTP_PORT || "21")
};

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log("🚀 Starting deployment process...");

    // 1. Build the project
    console.log("📦 Building React project...");
    execSync("npm run build", { cwd: projectRoot, stdio: "inherit" });
    console.log("✅ Build complete!");

    // 2. Connect to FTP
    console.log(`🔌 Connecting to ${CONFIG.host}...`);
    await client.access({
      host: CONFIG.host,
      user: CONFIG.user,
      password: CONFIG.password,
      port: CONFIG.port,
      secure: false
    });
    console.log("✅ Connected!");

    // [DIAGNÓSTICO] Mapear filesystem (RAIZ)
    console.log("\n🔍 [DIAGNÓSTICO] Mapeando estrutura de pastas...");
    try {
      await client.cd("/");
      console.log("📁 Conteúdo da RAIZ (/):");
      const rootList = await client.list("/");
      console.table(rootList.map(i => ({ name: i.name, type: i.type === 1 ? 'FILE' : 'DIR' })));
    } catch (e) {
      console.log("⚠️ Erro ao listar diretórios: " + e.message);
    }

    // [DIAGNÓSTICO] Restaurar index.html
    console.log("\n🛠️ [DIAGNÓSTICO] Restaurando index.html...");
    try {
      await client.cd(CONFIG.remoteRoot);
      await client.rename("index_diagnostic.html", "index.html");
      console.log("✅ index.html restaurado!");
    } catch (e) {
      console.log("ℹ️ index.html já restaurado ou não encontrado.");
    }

    // 3. Upload Frontend (dist folder)
    console.log(`\n📤 Uploading frontend to ${CONFIG.remoteRoot}...`);
    await client.cd("/"); // Reset para evitar caminhos relativos
    await client.uploadFromDir(distFolder, CONFIG.remoteRoot);
    console.log("✅ Frontend uploaded!");

    // 4. Upload Backend (server-php folder)
    const remoteApiDir = (CONFIG.remoteRoot.endsWith("/") ? CONFIG.remoteRoot : CONFIG.remoteRoot + "/") + "api";
    console.log(`\n📤 Uploading PHP backend to ${remoteApiDir}...`);
    
    await client.cd("/"); // Reset para garantir que remoteApiDir seja absoluto
    
    // Ensure remote api directory exists
    try {
      await client.ensureDir(remoteApiDir);
      console.log(`✅ Diretório ${remoteApiDir} garantido.`);
    } catch (err) {
      console.log("Note: API directory creation message: " + err.message);
    }
    
    // Upload NO DIRETÓRIO ATUAL (que agora é remoteApiDir graças ao ensureDir)
    // Para o basic-ftp, se passarmos "" como segundo argumento, ele sobe no CWD
    await client.uploadFromDir(phpFolder, remoteApiDir);
    console.log("✅ Backend uploaded!");

    console.log("\n🎉 DEPLOYMENT SUCCESSFUL!");

  } catch (err) {
    console.error("\n❌ Deployment failed:");
    console.error(err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
