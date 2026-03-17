import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/use-scroll-animation";
import { Wand2, Eye, Share2, Car, Sparkles, BarChart3 } from "lucide-react";

const services = [
  { icon: Wand2, title: "Gerador de Anúncios", desc: "Crie anúncios profissionais automaticamente para cada veículo do seu estoque com poucos cliques." },
  { icon: Eye, title: "Leitor Inteligente de Imagens", desc: "A IA analisa as fotos do veículo e identifica características automaticamente para seus anúncios." },
  { icon: Share2, title: "Publicação Automática", desc: "Publique em Facebook, Instagram, OLX e outros portais automaticamente com um único clique." },
  { icon: Car, title: "Gestão de Estoque", desc: "Organize todos os veículos da loja em um painel visual com filtros, busca e controle completo." },
  { icon: Sparkles, title: "Legendas Virais com IA", desc: "Gere legendas otimizadas para redes sociais que aumentam o engajamento e atraem mais clientes." },
  { icon: BarChart3, title: "Automação de Marketing", desc: "Automatize campanhas, agendamento de posts e relatórios de desempenho em tempo real." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const ServicesSection = () => {
  return (
    <section id="funcionalidades" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">O que oferecemos</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-foreground mt-3 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-muted-foreground text-lg">
            Ferramentas poderosas para automatizar e escalar as vendas da sua loja de veículos.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              custom={i}
              whileHover={{
                y: -12,
                boxShadow: "0 25px 50px -8px rgba(100, 60, 240, 0.2)",
                transition: { duration: 0.3 },
              }}
              className="group bg-card rounded-2xl p-8 shadow-card border border-border hover:border-primary/30 transition-colors duration-500 cursor-default text-center"
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-all duration-500"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <s.icon className="h-9 w-9 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </motion.div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
