import logoIcon from "@/assets/logoicone.png";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[hsl(230,40%,8%)] pt-20 lg:pt-24 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2.5 font-extrabold text-xl text-white mb-5">
              <img src={logoIcon} alt="CarPost" className="h-10 w-auto" />
              CarPost
            </a>
            <p className="text-sm text-white/40 leading-relaxed mb-7">
              A plataforma completa para lojas de veículos venderem mais com automação inteligente.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/45 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Produto</h4>
            <ul className="space-y-3.5">
              {["Funcionalidades", "Planos", "Integrações", "API", "Novidades"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/40 hover:text-accent hover:pl-1 transition-all duration-300 flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-3.5">
              {["Sobre nós", "Blog", "Carreiras", "Contato", "Parcerias"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/40 hover:text-accent hover:pl-1 transition-all duration-300 flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/40">Chapecó, SC - Brasil</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="#" className="text-sm text-white/40 hover:text-accent transition-colors">(49) 99999-9999</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="#" className="text-sm text-white/40 hover:text-accent transition-colors">contato@carpost.com.br</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.07] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} CarPost. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {["Termos de uso", "Privacidade", "Cookies"].map((s) => (
              <a key={s} href="#" className="text-sm text-white/30 hover:text-accent transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
