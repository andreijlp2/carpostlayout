import { motion } from "framer-motion";
import { ClipboardList, Wand2, Share2 } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Cadastre seus Veículos",
    desc: "Adicione o estoque de forma rápida com dados completos e fotos profissionais.",
    gradient: "from-violet-500 to-indigo-600",
    glow: "rgba(139, 92, 246, 0.25)",
    connector: "Próximo passo →",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Gere Anúncios com IA",
    desc: "A IA cria textos, legendas e descrições otimizadas automaticamente para cada veículo.",
    gradient: "from-primary to-blue-500",
    glow: "rgba(99, 102, 241, 0.25)",
    connector: "Próximo passo →",
  },
  {
    icon: Share2,
    step: "03",
    title: "Publique em Todas as Redes",
    desc: "Facebook, Instagram, OLX e portais — tudo publicado automaticamente com um clique.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.25)",
    connector: null,
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-muted/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />

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
            Processo Simples
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-foreground mb-4 leading-tight">
            Como{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
              Funciona?
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Em 3 passos simples, sua loja começa a vender mais todos os dias.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Linha conectora desktop */}
          <div className="hidden lg:block absolute top-16 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-[2px] bg-border z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-blue-500 to-emerald-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                {/* Glow de fundo */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                  style={{ background: s.glow }}
                />

                <div className="relative bg-card border border-border group-hover:border-white/20 rounded-2xl p-8 text-center transition-all duration-400 shadow-sm group-hover:shadow-2xl h-full flex flex-col items-center overflow-hidden">
                  {/* Gradiente topo */}
                  <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

                  {/* Círculo com ícone */}
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-6 shadow-xl z-10`}
                  >
                    {/* Brilho interno */}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <s.icon className="w-9 h-9 text-white" />
                    {/* Número badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center">
                      <span className="text-[9px] font-black text-foreground font-mono">{s.step}</span>
                    </div>
                  </motion.div>

                  {/* Número grande decorativo */}
                  <span className="absolute top-4 right-5 text-6xl font-black text-foreground/[0.03] font-heading leading-none select-none">
                    {s.step}
                  </span>

                  <h3 className="text-lg font-extrabold font-heading text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>

                  {/* Seta de sequência */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden mt-6 flex items-center justify-center gap-1 text-xs font-semibold text-muted-foreground/50">
                      <span>Próximo</span>
                      <svg className="w-4 h-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
