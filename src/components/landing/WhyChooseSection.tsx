import { motion, useAnimationControls } from "framer-motion";
import { Shield, Zap, Globe, BarChart3, Lock, Headphones } from "lucide-react";
import mascotThumbsup from "@/assets/mascot-thumbsup.png";
import { SocialButtons } from "./SocialButtons";

const leftFeatures = [
  {
    icon: Shield,
    title: "Proteção Total",
    desc: "Dados da sua loja protegidos com criptografia de nível bancário.",
    gradient: "from-violet-500 to-indigo-600",
    num: "01",
  },
  {
    icon: Zap,
    title: "Publicação em Tempo Real",
    desc: "Anúncios no ar em segundos — Facebook, Instagram e portais.",
    gradient: "from-amber-500 to-orange-500",
    num: "02",
  },
  {
    icon: Globe,
    title: "Catálogo Online",
    desc: "Vitrine profissional para seus veículos acessível de qualquer lugar.",
    gradient: "from-emerald-500 to-teal-500",
    num: "03",
  },
];

const rightFeatures = [
  {
    icon: BarChart3,
    title: "Relatórios Avançados",
    desc: "Visualize métricas de desempenho e tome decisões com dados reais.",
    gradient: "from-blue-500 to-cyan-500",
    num: "04",
  },
  {
    icon: Lock,
    title: "Segurança Empresarial",
    desc: "Controle de acesso por nível e auditoria completa de tudo.",
    gradient: "from-rose-500 to-pink-600",
    num: "05",
  },
  {
    icon: Headphones,
    title: "Suporte Prioritário",
    desc: "Time especializado pronto para resolver qualquer dúvida rapidamente.",
    gradient: "from-purple-500 to-fuchsia-600",
    num: "06",
  },
];

const FeatureCard = ({ f, direction }: { f: typeof leftFeatures[0]; direction: "left" | "right" }) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "left" ? -40 : 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="group relative flex gap-4 items-start p-5 rounded-2xl border border-border bg-card hover:border-white/20 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-default"
  >
    {/* Glow fundo */}
    <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-400 rounded-2xl`} />

    {/* Ícone */}
    <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-lg`}>
      <f.icon className="w-6 h-6 text-white" />
    </div>

    {/* Texto */}
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-bold text-foreground text-sm leading-tight">{f.title}</h4>
        <span className="text-[10px] font-black text-muted-foreground/30 font-mono flex-shrink-0 ml-2">{f.num}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
    </div>
  </motion.div>
);

const WhyChooseSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Por que nos escolher?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-foreground mb-4 leading-tight">
            Proteja e Escale sua Loja com{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
              Automação Inteligente
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tecnologia de ponta para transformar sua presença digital e multiplicar seus resultados.
          </p>
        </motion.div>

        {/* Grid 3 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          
          {/* Coluna esquerda */}
          <div className="space-y-4">
            {leftFeatures.map((f, i) => (
              <FeatureCard key={i} f={f} direction="left" />
            ))}
          </div>

          {/* Centro — Mascote e Botões */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="relative px-6 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Anel sutil de fundo */}
              <motion.div
                className="absolute w-72 h-72 rounded-full border border-primary/10"
                animate={{ opacity: [0.3, 0.08, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Mascote flutuando suavemente */}
              <motion.div
                className="relative z-10 w-80 h-80 lg:w-96 lg:h-96"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={mascotThumbsup}
                  alt="Mascote CarPost"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />

                {/* Sombra no chão */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-black/10 rounded-full blur-md"
                  animate={{ scaleX: [1, 0.8, 1], opacity: [0.4, 0.15, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>

            {/* Botões redes sociais abaixo do mascote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 lg:mt-10"
            >
              <SocialButtons className="scale-90 lg:scale-100" />
            </motion.div>
          </div>

          {/* Coluna direita */}
          <div className="space-y-4">
            {rightFeatures.map((f, i) => (
              <FeatureCard key={i} f={f} direction="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
