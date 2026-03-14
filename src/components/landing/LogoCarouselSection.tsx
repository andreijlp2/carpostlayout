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
        <motion.p
          className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Lojas que já vendem mais com o CarPost
        </motion.p>
      </div>

      <div className="relative overflow-hidden group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/40 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max items-center">
          {doubledLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-4 sm:mx-6 flex items-center justify-center h-12 px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarouselSection;
