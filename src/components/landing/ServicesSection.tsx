import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Megaphone, Eye, Share2, Car, Sparkles, Zap } from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Gerador de Anúncios",
    description: "Crie anúncios profissionais automaticamente com inteligência artificial para todos os seus veículos.",
  },
  {
    icon: Eye,
    title: "Leitor de Imagens com IA",
    description: "Nossa IA analisa as fotos dos veículos e extrai informações automaticamente para os anúncios.",
  },
  {
    icon: Share2,
    title: "Publicação Automática",
    description: "Publique seus anúncios em todas as redes sociais com um clique, sem esforço manual.",
  },
  {
    icon: Car,
    title: "Gestão de Estoque",
    description: "Controle completo do seu inventário de veículos com painel intuitivo e organizado.",
  },
  {
    icon: Sparkles,
    title: "Legendas Virais",
    description: "Gere legendas criativas e engajadoras que aumentam o alcance dos seus posts.",
  },
  {
    icon: Zap,
    title: "Automação de Marketing",
    description: "Automatize todo o fluxo de marketing da sua loja e foque no que importa: vender.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-3 block">
            Nossos Serviços
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Tudo que sua loja precisa em um só lugar
          </h2>
          <p className="text-muted-foreground text-lg">
            Ferramentas poderosas para automatizar o marketing e aumentar as vendas da sua loja de veículos.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(100, 60, 255, 0.15)" }}
              className="group bg-card rounded-2xl p-8 border border-border shadow-card transition-all duration-300 hover:border-primary/20"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
