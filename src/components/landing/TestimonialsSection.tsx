import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Dono da Auto Silva",
    company: "Auto Silva",
    text: "Depois que começamos a usar o CarPost, nossos anúncios ficaram muito mais profissionais e os leads aumentaram em 40%. A plataforma transformou nossa presença digital.",
    avatar: "CS",
    gradient: "from-violet-500 to-indigo-600",
    stars: 5,
    highlight: "+40% leads",
  },
  {
    name: "Ana Rodrigues",
    role: "Gerente da Premium Veículos",
    company: "Premium Veículos",
    text: "A automação de anúncios economiza pelo menos 3 horas por dia da minha equipe. O investimento se paga rapidamente e os resultados são visíveis desde o primeiro mês.",
    avatar: "AR",
    gradient: "from-emerald-500 to-teal-500",
    stars: 5,
    highlight: "3h/dia economizadas",
  },
  {
    name: "Roberto Mendes",
    role: "Proprietário da RM Motors",
    company: "RM Motors",
    text: "O catálogo online que o CarPost gera é incrível. Nossos clientes adoram e conseguimos fechar vendas mais rápido do que nunca. Recomendo para todas as lojas.",
    avatar: "RM",
    gradient: "from-blue-500 to-cyan-500",
    stars: 5,
    highlight: "Vendas mais rápidas",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.96 }),
  };

  return (
    <section id="depoimentos" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-muted/40 via-transparent to-muted/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-foreground mb-4 leading-tight">
            O que nossos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
              clientes dizem
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Lojas de todo o Brasil já estão vendendo mais com o CarPost.
          </p>
        </motion.div>

        {/* Depoimento principal */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Glow de fundo do card */}
            <div className={`absolute -inset-4 bg-gradient-to-r ${t.gradient} opacity-10 rounded-3xl blur-2xl transition-all duration-700`} />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Linha de acento superior colorida */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${t.gradient}`} />

                <div className="grid md:grid-cols-[1fr_220px] gap-0">
                  {/* Texto */}
                  <div className="p-8 sm:p-10">
                    {/* Aspas grandes decorativas */}
                    <div className={`text-8xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-br ${t.gradient} opacity-15 mb-2 font-heading select-none`}>
                      "
                    </div>

                    <p className="text-foreground text-base sm:text-lg leading-relaxed mb-8 -mt-6">
                      {t.text}
                    </p>

                    {/* Estrelas */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(t.stars)].map((_, si) => (
                        <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground font-medium">5.0</span>
                    </div>

                    {/* Autor */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-black text-sm font-heading shadow-lg`}>
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-bold font-heading text-foreground text-sm">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </div>

                  {/* Painel lateral de destaque */}
                  <div className={`hidden md:flex flex-col items-center justify-center bg-gradient-to-br ${t.gradient} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)"
                    }} />
                    <div className="relative text-center">
                      <div className="text-4xl font-black font-heading mb-2 drop-shadow-lg">
                        {t.highlight.split(" ")[0]}
                      </div>
                      <div className="text-sm text-white/80 leading-tight">
                        {t.highlight.split(" ").slice(1).join(" ")}
                      </div>
                      <div className="mt-6 w-10 h-0.5 bg-white/30 mx-auto" />
                      <div className="mt-4 text-xs text-white/60 font-medium">{t.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navegação */}
          <div className="flex items-center justify-between mt-8">
            {/* Avatares miniatura */}
            <div className="flex items-center gap-3">
              {testimonials.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${
                    i === current
                      ? "border-primary/30 bg-primary/5 shadow-sm"
                      : "border-transparent hover:border-border hover:bg-muted/50"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold text-[10px]`}>
                    {item.avatar}
                  </div>
                  <span className={`hidden sm:block text-xs font-medium transition-colors ${i === current ? "text-foreground" : "text-muted-foreground"}`}>
                    {item.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Botões prev/next */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl border border-border bg-card flex items-center justify-center hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </motion.button>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl border border-border bg-card flex items-center justify-center hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 shadow-sm"
              >
                <ChevronRight className="w-4 h-4 text-foreground" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
