import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Car, Sparkles, LayoutDashboard, Share2, BarChart3, Globe } from "lucide-react";

const features = [
  { icon: Car, title: "Cadastro inteligente de veículos", desc: "Cadastre veículos manualmente ou pela placa e o sistema importa automaticamente os dados." },
  { icon: Sparkles, title: "Descrição automática com IA", desc: "Crie descrições profissionais e textos de venda automaticamente com inteligência artificial." },
  { icon: LayoutDashboard, title: "Gestão de estoque", desc: "Organize todos os veículos da loja em um painel simples e visual, com filtros e busca." },
  { icon: Share2, title: "Publicação em marketplaces", desc: "Publique veículos automaticamente em Facebook, OLX e outros portais com um clique." },
  { icon: BarChart3, title: "Dashboard de desempenho", desc: "Acompanhe visualizações, contatos e vendas em tempo real com gráficos intuitivos." },
  { icon: Globe, title: "Catálogo online", desc: "Tenha um site da sua loja com todos os veículos disponíveis, pronto para compartilhar." },
];

const FeaturesSection = () => {
  return (
    <section id="funcionalidades" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <span className="section-subtitle text-primary">Funcionalidades</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Tudo que sua loja precisa em um só lugar
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Funcionalidades pensadas para automatizar e escalar suas vendas de veículos.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group bg-card rounded-2xl p-8 lg:p-9 shadow-card border border-border hover:shadow-card-hover hover:border-primary/20 transition-all duration-500 cursor-default relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:shadow-glow transition-all duration-500">
                <f.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
