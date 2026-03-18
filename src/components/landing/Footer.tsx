import logoIcon from "@/assets/logoicone.png";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-counter-gradient pt-12 sm:pt-16 lg:pt-20 pb-8">

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Brand */}
          <motion.div className="col-span-2 lg:col-span-1" variants={fadeInUp}>
            <a href="#" className="flex items-center gap-2 font-bold text-lg sm:text-xl text-white mb-4 font-heading">
              <img src={logoIcon} alt="CarPost" className="h-8 sm:h-10 w-auto" />
              CarPost
            </a>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed mb-6">
              A plataforma completa para lojas de veículos que querem automatizar marketing e vender mais todos os dias.
            </p>
            <div className="flex gap-3">
              {[
                { label: "FB", hoverClass: "hover:bg-[#1877F2] hover:border-[#1877F2]" },
                { label: "IG", hoverClass: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#dc2743] hover:border-transparent" },
                { label: "YT", hoverClass: "hover:bg-[#FF0000] hover:border-[#FF0000]" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 text-xs font-bold ${s.hoverClass}`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-bold font-heading text-white mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">Serviços</h4>
            <ul className="space-y-2 sm:space-y-3">
              {["Gerador de Anúncios", "Automação de Marketing", "Catálogo Online", "Gestão de Estoque", "Publicação Automática"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-xs sm:text-sm text-white/50 hover:text-white hover:pl-1 transition-all duration-300">{l}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-bold font-heading text-white mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">Links Úteis</h4>
            <ul className="space-y-2 sm:space-y-3">
              {["Sobre Nós", "Planos", "Depoimentos", "Política de Privacidade", "Termos de Uso"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-xs sm:text-sm text-white/50 hover:text-white hover:pl-1 transition-all duration-300">{l}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="col-span-2 sm:col-span-1" variants={fadeInUp}>
            <h4 className="font-bold font-heading text-white mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">Contato</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+5549999999999" className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors">(49) 99999-9999</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:contato@carpost.com.br" className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors break-all">contato@carpost.com.br</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white/50">Chapecó, SC - Brasil</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-white/40">
            © {new Date().getFullYear()} CarPost. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
