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
                <svg className="w-4 h-4 text-[#25D366] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <a href="https://wa.me/5549991566822" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors">(49) 9 9156-6822</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white/50 transition-colors">Chapecó-SC</span>
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
