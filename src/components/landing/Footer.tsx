import logoIcon from "@/assets/logoicone.png";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[hsl(225,40%,8%)] pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="#" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <img src={logoIcon} alt="CarPost" className="h-10 w-auto" />
              CarPost
            </a>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              A plataforma completa para lojas de veículos venderem mais com automação inteligente.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Links Rápidos</h4>
            <ul className="space-y-2.5">
              {["Home", "Funcionalidades", "Como Funciona", "Planos", "Depoimentos"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Suporte</h4>
            <ul className="space-y-2.5">
              {["Central de Ajuda", "Documentação", "API", "Status", "Contato"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-2.5">
              {["Termos de Uso", "Política de Privacidade", "Cookies", "LGPD"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} CarPost. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
