import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Carlos Silva", role: "Dono da Auto Silva", text: "Depois que começamos a usar o CarPost, nossos anúncios ficaram muito mais profissionais e os leads aumentaram em 40%." },
  { name: "Ana Rodrigues", role: "Gerente da Premium Veículos", text: "A automação de anúncios economiza pelo menos 3 horas por dia da minha equipe. O investimento se paga rapidamente." },
  { name: "Roberto Mendes", role: "Proprietário da RM Motors", text: "O catálogo online que o CarPost gera é incrível. Nossos clientes adoram e conseguimos fechar vendas mais rápido." },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">O que nossos clientes dizem</h2>
          <p className="text-muted-foreground text-lg">Lojas de todo o Brasil já estão vendendo mais com o CarPost.</p>
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
              whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(0,102,255,0.1)" }}
              className="bg-card rounded-2xl p-8 border border-border shadow-card"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + si * 0.08, type: "spring", stiffness: 500 }}
                  >
                    <Star className="h-4 w-4 fill-primary text-primary" />
                  </motion.div>
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <div className="font-bold text-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
