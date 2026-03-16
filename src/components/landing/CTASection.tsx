import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { scaleIn } from "@/hooks/use-scroll-animation";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-20 text-center bg-gradient-hero"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={scaleIn}
        >
          {/* Decorative shapes */}
          <motion.div
            className="absolute top-10 right-10 w-20 h-20 border-4 border-white/10 rounded-full"
            animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-12 h-12 bg-white/5 rounded-lg rotate-45"
            animate={{ rotate: [45, 135, 45] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 right-[20%] w-3 h-3 bg-white/20 rounded-full"
            animate={{ scale: [1, 2, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10">
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Pronto para vender mais carros?
            </motion.h2>
            <motion.p
              className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Comece hoje mesmo a usar o CarPost e transforme a forma como sua loja anuncia veículos.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button size="xl" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg font-bold rounded-full">
                Criar conta gratuita
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
