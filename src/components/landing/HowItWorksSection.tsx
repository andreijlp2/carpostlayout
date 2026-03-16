import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { ClipboardList, Wand2, Share2, TrendingUp } from "lucide-react";

const steps = [
  { icon: ClipboardList, step: "01", title: "Cadastre os veículos", desc: "Cadastre os veículos da sua loja de forma rápida e organizada." },
  { icon: Wand2, step: "02", title: "Anúncios automáticos", desc: "O sistema gera anúncios e descrições automaticamente com IA." },
  { icon: Share2, step: "03", title: "Publique em todos os canais", desc: "Publique em redes sociais e marketplaces com um clique." },
  { icon: TrendingUp, step: "04", title: "Receba leads e venda", desc: "Receba leads qualificados e venda mais carros todos os dias." },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="relative py-20 lg:py-28 bg-gradient-hero overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-12 right-[8%] w-20 h-20 border-[3px] border-white/[0.07] rounded-full"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-16 left-[5%] w-10 h-10 bg-white/[0.04] rounded-lg rotate-45"
        animate={{ rotate: [45, 180, 45] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[40%] left-[15%] text-white/[0.06] text-5xl font-thin"
        animate={{ opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        +
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="section-subtitle text-accent">Passo a passo</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">Como funciona</h2>
          <p className="text-white/60 text-base sm:text-lg">Em 4 passos simples, sua loja começa a vender mais.</p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {steps.map((s, i) => (
            <motion.div key={i} variants={fadeInUp} custom={i} className="relative text-center group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-[40px] left-[60%] w-[80%] h-[2px]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                >
                  <div className="w-full h-full bg-white/10" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/60" />
                </motion.div>
              )}
              
              <motion.div
                className="relative z-10 w-20 h-20 rounded-full bg-white/[0.08] border-2 border-white/15 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-400"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <s.icon className="h-8 w-8 text-white" />
              </motion.div>
              <span className="text-xs font-bold text-accent uppercase tracking-[0.15em]">Passo {s.step}</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-2">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave shape */}
      <div className="wave-shape">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="hsl(0, 0%, 100%)">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,130.16,248.75,125.67,285,113.22,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HowItWorksSection;
