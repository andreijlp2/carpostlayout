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
    <section id="funcionalidades" className="py-20 lg:py-28 bg-secondary/60">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Funcionalidades</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 mt-3">
            Tudo que sua loja precisa em um só lugar
          </h2>
          <p className="text-muted-foreground text-lg">
            Funcionalidades pensadas para automatizar e escalar suas vendas de veículos.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -10 }}
              className="group bg-card rounded-xl p-8 shadow-card border border-border hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 cursor-default relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <f.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
