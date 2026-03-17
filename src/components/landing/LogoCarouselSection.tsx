import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/use-scroll-animation";

import logoAm from "@/assets/logo-am.png";
import logoAutototti from "@/assets/logo-autototti.png";
import logoBeto from "@/assets/logo-beto.png";
import logoDs7 from "@/assets/logo-ds7.png";
import logoFt from "@/assets/logo-ft.png";
import logoPassarin from "@/assets/logo-passarin.png";
import logoStock from "@/assets/logo-stock.png";
import logoTrotz from "@/assets/logo-trotz.png";
import logoVilmar from "@/assets/logo-vilmar.png";

const logos = [
  { src: logoAm, name: "AM Multimarcas" },
  { src: logoAutototti, name: "Auto Totti" },
  { src: logoBeto, name: "Beto Multimarcas" },
  { src: logoDs7, name: "DS7 Cars" },
  { src: logoFt, name: "FT Multimarcas" },
  { src: logoPassarin, name: "Patrick Passarin" },
  { src: logoStock, name: "Stock Car Veículos" },
  { src: logoTrotz, name: "Trotz Veículos" },
  { src: logoVilmar, name: "Vilmar Veículos" },
];

const LogoCarouselSection = () => {
  const doubledLogos = [...logos, ...logos];

  return (
    <section className="py-14 lg:py-20 bg-muted/40">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Confiança de +300 Lojas</span>
          <h3 className="text-lg font-bold font-heading text-foreground mt-2">Nossos Clientes</h3>
        </motion.div>
      </div>

      <div className="relative overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/40 to-transparent z-10 pointer-events-none" />

        <div className="marquee-track w-max items-center">
          {doubledLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center w-36 h-12 px-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
            >
              <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarouselSection;
