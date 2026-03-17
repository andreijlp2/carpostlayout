import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { scaleIn } from "@/hooks/use-scroll-animation";

const CTASection = () => {
  return (
    <section id="contato" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="relative rounded-3xl overflow-hidden p-10 sm:p-16 lg:p-20 text-center bg-hero-gradient"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={scaleIn}
        >
          {/* Decorative */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1], y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full" />
            <div className="absolute bottom-10 right-20 w-12 h-12 border border-white/10 rounded-lg rotate-45" />
          </div>

          <div className="relative z-10">
            <motion.span
              className="text-sm font-semibold text-white/60 uppercase tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Pronto para começar?
            </motion.span>
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-5xl font-extrabold font-heading text-white mt-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Automatize sua Loja e Venda Mais
            </motion.h2>
            <motion.p
              className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Comece hoje mesmo a usar o CarPost e transforme a forma como sua loja anuncia veículos.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button size="xl" className="bg-cta text-cta-foreground hover:bg-cta/90 shadow-lg font-bold rounded-full px-10">
                  Começar Agora
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button size="xl" className="border-2 border-white/30 bg-transparent text-white hover:bg-white/10 font-semibold rounded-full px-10">
                  Fale Conosco
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
