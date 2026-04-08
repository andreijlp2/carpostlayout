import ftp from "basic-ftp";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const CONFIG = {
  host: process.env.VITE_FTP_HOST,
  user: process.env.VITE_FTP_USER,
  password: process.env.VITE_FTP_PASSWORD,
  port: parseInt(process.env.VITE_FTP_PORT || "21")
};

async function testConnection() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log(`🔌 Attempting to connect to ${CONFIG.host}...`);
    await client.access({
      host: CONFIG.host,
      user: CONFIG.user,
      password: CONFIG.password,
      port: CONFIG.port,
      secure: false
    });
    console.log("✅ Connection established successfully!");
    
    console.log("📂 Listing remote root directory content:");
    const list = await client.list();
    console.table(list.map(f => ({ name: f.name, type: f.type, size: f.size })));

    console.log("\n🎉 FTP TEST SUCCESSFUL!");

  } catch (err) {
    console.error("\n❌ FTP Connection failed:");
    console.error(err.message);
  } finally {
    client.close();
  }
}

testConnection();
