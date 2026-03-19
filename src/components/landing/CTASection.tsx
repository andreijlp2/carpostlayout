import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section id="contato" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="relative rounded-3xl overflow-hidden p-10 sm:p-16 lg:p-20 text-center bg-hero-gradient"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]"
              animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"
              animate={{ scale: [1, 1.4, 1], y: [0, -30, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-10 left-10 w-20 h-20 border border-white/15 rounded-full"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-10 right-20 w-12 h-12 border border-white/15 rounded-lg"
              animate={{ rotate: [45, 135, 45] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10">
            <motion.span
              className="text-sm font-semibold text-white/70 uppercase tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Pronto para começar?
            </motion.span>
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-5xl font-extrabold font-heading text-white mt-4 mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Automatize sua Loja e Venda Mais
            </motion.h2>
            <motion.p
              className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              Comece hoje mesmo a usar o CarPost e transforme a forma como sua loja anuncia veículos.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.07, y: -3 }} whileTap={{ scale: 0.97 }}>
                <Button size="xl" className="bg-[#8fc9ba] text-white hover:bg-[#149284] shadow-cta font-bold rounded-full px-10">
                  TESTE POR 7 DIAS
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.07, y: -3 }} whileTap={{ scale: 0.97 }}>
                <Button size="xl" className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 font-semibold rounded-full px-10">
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
