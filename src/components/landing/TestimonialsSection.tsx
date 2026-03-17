import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/hooks/use-scroll-animation";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Dono da Auto Silva",
    text: "Depois que começamos a usar o CarPost, nossos anúncios ficaram muito mais profissionais e os leads aumentaram em 40%. A automação economiza horas do nosso dia.",
    avatar: "CS",
  },
  {
    name: "Ana Rodrigues",
    role: "Gerente da Premium Veículos",
    text: "A automação de anúncios economiza pelo menos 3 horas por dia da minha equipe. O investimento se paga rapidamente e os resultados são impressionantes.",
    avatar: "AR",
  },
  {
    name: "Roberto Mendes",
    role: "Proprietário da RM Motors",
    text: "O catálogo online que o CarPost gera é incrível. Nossos clientes adoram e conseguimos fechar vendas mais rápido do que nunca.",
    avatar: "RM",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

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
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-3 block">
            Depoimentos
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground text-lg">
            Lojas de todo o Brasil já estão vendendo mais com o CarPost.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-2xl p-8 sm:p-12 border border-border shadow-card text-center relative"
            >
              <Quote className="h-10 w-10 text-primary/20 mx-auto mb-6" />

              <p className="text-foreground text-lg sm:text-xl leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>

              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} className="h-4 w-4 fill-cta text-cta" />
                ))}
              </div>

              <div className="w-14 h-14 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground font-bold text-lg">
                  {testimonials[current].avatar}
                </span>
              </div>
              <div className="font-bold text-foreground">{testimonials[current].name}</div>
              <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-card hover:bg-accent flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-primary" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-card hover:bg-accent flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
