import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/use-scroll-animation";

const CTASection = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-hero overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-10 right-[10%] w-24 h-24 border-[3px] border-white/[0.06] rounded-full"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-[8%] w-14 h-14 bg-white/[0.03] rounded-lg rotate-45"
        animate={{ rotate: [45, 180, 45] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-[25%] w-3 h-3 bg-accent/30 rounded-full"
        animate={{ scale: [1, 2, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-[20%] text-white/[0.05] text-6xl font-thin"
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        +
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="section-subtitle text-accent">Comece agora</span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-5">
            Pronto para vender mais carros?
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10">
            Comece hoje mesmo a usar o CarPost e transforme a forma como sua loja anuncia veículos. Sem taxa de adesão.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button size="xl" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 font-bold rounded-full text-base px-10">
                Criar conta gratuita
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button size="xl" className="border-2 border-white/25 bg-transparent text-white hover:bg-white/10 font-semibold rounded-full text-base px-10">
                Falar com vendas
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Wave shape */}
      <div className="wave-shape">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="hsl(222, 47%, 8%)">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,130.16,248.75,125.67,285,113.22,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default CTASection;
