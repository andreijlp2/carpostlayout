import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Carlos Silva", role: "Dono da Auto Silva", text: "Depois que começamos a usar o CarPost, nossos anúncios ficaram muito mais profissionais e os leads aumentaram em 40%.", avatar: "CS" },
  { name: "Ana Rodrigues", role: "Gerente da Premium Veículos", text: "A automação de anúncios economiza pelo menos 3 horas por dia da minha equipe. O investimento se paga rapidamente.", avatar: "AR" },
  { name: "Roberto Mendes", role: "Proprietário da RM Motors", text: "O catálogo online que o CarPost gera é incrível. Nossos clientes adoram e conseguimos fechar vendas mais rápido.", avatar: "RM" },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-24 lg:py-32 bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <span className="section-subtitle text-primary">Depoimentos</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Lojas de todo o Brasil já estão vendendo mais com o CarPost.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card rounded-2xl p-8 relative shadow-card border border-border hover:shadow-card-hover transition-all duration-500"
            >
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
                  <Quote className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>

              <div className="pt-5">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, si) => (
                    <motion.div
                      key={si}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + si * 0.06, type: "spring", stiffness: 500 }}
                    >
                      <Star className="h-4 w-4 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-foreground/80 mb-7 leading-relaxed text-sm italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
