import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Car, Sparkles, LayoutDashboard, Share2, BarChart3, Globe } from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Cadastro inteligente de veículos",
    desc: "Cadastre veículos manualmente ou pela placa e o sistema importa automaticamente os dados.",
  },
  {
    icon: Sparkles,
    title: "Descrição automática com IA",
    desc: "Crie descrições profissionais e textos de venda automaticamente com inteligência artificial.",
  },
  {
    icon: LayoutDashboard,
    title: "Gestão de estoque",
    desc: "Organize todos os veículos da loja em um painel simples e visual, com filtros e busca.",
  },
  {
    icon: Share2,
    title: "Publicação em marketplaces",
    desc: "Publique veículos automaticamente em Facebook, OLX e outros portais com um clique.",
  },
  {
    icon: BarChart3,
    title: "Dashboard de desempenho",
    desc: "Acompanhe visualizações, contatos e vendas em tempo real com gráficos intuitivos.",
  },
  {
    icon: Globe,
    title: "Catálogo online",
    desc: "Tenha um site da sua loja com todos os veículos disponíveis, pronto para compartilhar.",
  },
];

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="funcionalidades" className="py-20 lg:py-28 bg-secondary/50" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Tudo que sua loja precisa em um só lugar
          </h2>
          <p className="text-muted-foreground text-lg">
            Funcionalidades pensadas para automatizar e escalar suas vendas de veículos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:-translate-y-1 ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                <f.icon className="h-7 w-7 text-accent-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
