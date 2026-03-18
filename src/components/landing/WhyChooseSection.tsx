import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/hooks/use-scroll-animation";
import { Shield, Zap, Globe, BarChart, Lock, HeadphonesIcon } from "lucide-react";
import mascotThumbsup from "@/assets/mascot-thumbsup.png";

const leftFeatures = [
  { icon: Shield, text: "Proteção total dos seus dados" },
  { icon: Zap, text: "Publicação em tempo real" },
  { icon: Globe, text: "Catálogo online profissional" },
];

const rightFeatures = [
  { icon: BarChart, text: "Relatórios de desempenho" },
  { icon: Lock, text: "Segurança de nível empresarial" },
  { icon: HeadphonesIcon, text: "Suporte prioritário" },
];

const WhyChooseSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Por que nos escolher?</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-foreground mt-3 mb-4">
            Proteja e Escale sua Loja com Automação Inteligente
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Tecnologia de ponta para transformar sua presença digital e multiplicar seus resultados.
          </p>
        </motion.div>

        {/* Mobile/Tablet: stacked grid. Desktop: 3-col with center icon */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
          {/* Left features */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInLeft}
          >
            {leftFeatures.map((f, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 lg:flex-row-reverse lg:text-right"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold font-heading text-foreground mb-1 text-sm sm:text-base">{f.text}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Solução robusta para sua loja crescer com segurança.</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Center image - hidden on mobile, visible md+ */}
          <motion.div
            className="hidden md:flex justify-center order-first md:order-none lg:order-none mb-8 md:mb-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
              <div className="absolute inset-0 bg-primary/10 rounded-full" />
              <div className="absolute inset-4 bg-primary/5 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-hero-gradient rounded-full flex items-center justify-center shadow-hero"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Check className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right features */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInRight}
          >
            {rightFeatures.map((f, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold font-heading text-foreground mb-1 text-sm sm:text-base">{f.text}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Ferramentas avançadas para gestão completa.</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
