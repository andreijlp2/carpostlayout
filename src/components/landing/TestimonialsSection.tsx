import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Carlos Silva", role: "Dono da Auto Silva", text: "Depois que começamos a usar o CarPost, nossos anúncios ficaram muito mais profissionais e os leads aumentaram em 40%." },
  { name: "Ana Rodrigues", role: "Gerente da Premium Veículos", text: "A automação de anúncios economiza pelo menos 3 horas por dia da minha equipe. O investimento se paga rapidamente." },
  { name: "Roberto Mendes", role: "Proprietário da RM Motors", text: "O catálogo online que o CarPost gera é incrível. Nossos clientes adoram e conseguimos fechar vendas mais rápido." },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="relative py-20 lg:py-28 bg-gradient-hero overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-20 left-[8%] w-14 h-14 border-4 border-white/10 rounded-full"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-[8%] w-8 h-8 bg-white/5 rounded-lg rotate-45"
        animate={{ rotate: [45, 135, 45] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Depoimentos</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 mt-3">O que nossos clientes dizem</h2>
          <p className="text-white/70 text-lg">Lojas de todo o Brasil já estão vendendo mais com o CarPost.</p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -6 }}
              className="bg-white rounded-xl p-8 relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/15" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + si * 0.08, type: "spring", stiffness: 500 }}
                  >
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
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

export default TestimonialsSection;
