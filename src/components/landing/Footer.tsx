import logoIcon from "@/assets/logoicone.png";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {

  return (
    <footer className="bg-counter-gradient pt-12 sm:pt-16 lg:pt-20 pb-8 relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Brand Info */}
          <motion.div className="col-span-2 lg:col-span-1" variants={fadeInUp}>
            <a href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl text-white mb-4 font-heading">
              <img src={logoIcon} alt="CarPost" className="h-8 sm:h-10 w-auto" />
              CarPost
            </a>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed mb-6">
              A plataforma completa para automatizar o marketing da sua loja de veículos e vender mais todos os dias.
            </p>
          </motion.div>

          {/* Menu estático */}
          <>
            <motion.div variants={fadeInUp}>
              <h4 className="font-bold font-heading text-white mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">Links Úteis</h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { label: "Funcionalidades", url: "/#funcionalidades" },
                  { label: "Como Funciona", url: "/#como-funciona" },
                  { label: "Planos", url: "/#planos" },
                  { label: "Dúvidas", url: "/#faq" },
                ].map(({ label, url }) => (
                  <li key={label}><a href={url} className="text-xs sm:text-sm text-white/50 hover:text-white hover:pl-1 transition-all duration-300">{label}</a></li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h4 className="font-bold font-heading text-white mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 sm:space-y-3">
                {["Termos de Uso", "Privacidade"].map((l) => (
                  <li key={l}><a href="#" className="text-xs sm:text-sm text-white/50 hover:text-white hover:pl-1 transition-all duration-300">{l}</a></li>
                ))}
              </ul>
            </motion.div>
          </>

          {/* Contact (Fixo) */}
          <motion.div className="col-span-2 sm:col-span-1" variants={fadeInUp}>
            <h4 className="font-bold font-heading text-white mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">Contato</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+5500000000" className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors">(00) 0000-0000</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:contato@exemplo.com.br" className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors break-all">contato@exemplo.com.br</a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-white/40">
          <p>© {new Date().getFullYear()} CarPost. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
