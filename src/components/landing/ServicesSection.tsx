import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Wand2, Eye, Share2, Car, Sparkles, BarChart3 } from "lucide-react";

const services = [
  { icon: Wand2, title: "Gerador de Anúncios", desc: "Crie anúncios profissionais automaticamente para cada veículo do seu estoque com poucos cliques." },
  { icon: Eye, title: "Leitor Inteligente de Imagens", desc: "A IA analisa as fotos do veículo e identifica características automaticamente para seus anúncios." },
  { icon: Share2, title: "Publicação Automática", desc: "Publique em Facebook, Instagram, OLX e outros portais automaticamente com um único clique." },
  { icon: Car, title: "Gestão de Estoque", desc: "Organize todos os veículos da loja em um painel visual com filtros, busca e controle completo." },
  { icon: Sparkles, title: "Legendas Virais com IA", desc: "Gere legendas otimizadas para redes sociais que aumentam o engajamento e atraem mais clientes." },
  { icon: BarChart3, title: "Automação de Marketing", desc: "Automatize campanhas, agendamento de posts e relatórios de desempenho em tempo real." },
];

const ServicesSection = () => {
  return (
    <section id="funcionalidades" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
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
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -10 }}
              className="group bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-card-hover transition-all duration-500 cursor-default text-center"
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500"
              >
                <s.icon className="h-9 w-9 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </motion.div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
