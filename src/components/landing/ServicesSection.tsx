import { motion } from "framer-motion";
import { Wand2, Eye, Share2, Car, Sparkles, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Wand2,
    number: "01",
    title: "Gerador de Anúncios",
    desc: "Crie anúncios profissionais automaticamente para cada veículo do seu estoque com poucos cliques.",
    gradient: "from-violet-500 to-indigo-600",
    glow: "rgba(139, 92, 246, 0.3)",
  },
  {
    icon: Eye,
    number: "02",
    title: "Pré Compra com IA",
    desc: "A IA analisa os dados do veículo e identifica características automaticamente para uma compra segura.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.3)",
  },
  {
    icon: Share2,
    number: "03",
    title: "Publicação Automática",
    desc: "Publique no Facebook, Instagram e portais automaticamente com um único clique.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.3)",
  },
  {
    icon: Car,
    number: "04",
    title: "Gestão de Estoque",
    desc: "Organize todos os veículos em um painel visual com filtros, busca e controle completo.",
    gradient: "from-orange-500 to-amber-500",
    glow: "rgba(249, 115, 22, 0.3)",
  },
  {
    icon: Sparkles,
    number: "05",
    title: "Legendas Virais com IA",
    desc: "Gere legendas otimizadas para redes sociais que aumentam o engajamento e atraem mais clientes.",
    gradient: "from-pink-500 to-rose-500",
    glow: "rgba(236, 72, 153, 0.3)",
  },
  {
    icon: BarChart3,
    number: "06",
    title: "Automação de Marketing",
    desc: "Automatize postagens e tenha criativos profissionais em tempo real publicados nas redes sociais.",
    gradient: "from-purple-500 to-fuchsia-600",
    glow: "rgba(168, 85, 247, 0.3)",
  },
];

const ServicesSection = () => {
  return (
    <section id="funcionalidades" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Funcionalidades
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-foreground mt-3 mb-5 leading-tight">
            Tudo que sua loja precisa{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
              em um só lugar
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ferramentas poderosas para automatizar e escalar as vendas da sua loja de veículos.
          </p>
        </motion.div>

        {/* Grid de Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Glow ao hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                style={{ background: s.glow }}
              />

              {/* Card */}
              <div className="relative h-full bg-card border border-border group-hover:border-white/20 rounded-2xl p-7 overflow-hidden transition-all duration-500 shadow-sm group-hover:shadow-2xl">
                {/* Número decorativo de fundo */}
                <span className="absolute -top-4 -right-2 text-[7rem] font-black text-foreground/[0.03] group-hover:text-foreground/[0.05] leading-none select-none transition-all duration-500 font-heading">
                  {s.number}
                </span>

                {/* Linha de acento superior */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Ícone */}
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <s.icon className="w-7 h-7 text-white" />
                  {/* Reflexo */}
                  <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Número pequeno */}
                <span className="text-xs font-bold text-muted-foreground/50 font-mono mb-2 block">
                  {s.number}
                </span>

                {/* Título */}
                <h3 className="text-lg font-bold font-heading text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {s.title}
                </h3>

                {/* Descrição */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
