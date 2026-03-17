import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { scaleIn } from "@/hooks/use-scroll-animation";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-20 text-center bg-gradient-to-br from-[hsl(160,100%,45%)] via-[hsl(185,100%,45%)] to-[hsl(210,100%,50%)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={scaleIn}
        >
          {/* Animated background blobs */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"
            animate={{ scale: [1, 1.3, 1], y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
              className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-6 sm:mb-8"
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
              <Button size="xl" className="bg-white text-[hsl(210,100%,40%)] hover:bg-white/90 shadow-lg font-bold">
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
