import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/use-scroll-animation";

const logos = [
  { name: "Auto Silva", initials: "AS" },
  { name: "Premium Veículos", initials: "PV" },
  { name: "RM Motors", initials: "RM" },
  { name: "Central Car", initials: "CC" },
  { name: "Drive Plus", initials: "D+" },
  { name: "Nova Auto", initials: "NA" },
  { name: "Star Motors", initials: "SM" },
  { name: "Top Veículos", initials: "TV" },
  { name: "Mega Car", initials: "MC" },
  { name: "Auto Prime", initials: "AP" },
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

        <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
          {doubledLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-6 sm:mx-10 flex items-center justify-center w-36 h-16 rounded-xl border border-border bg-card/80 backdrop-blur-sm grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {logo.initials}
                </div>
                <span className="text-sm font-semibold text-foreground/70">{logo.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarouselSection;
