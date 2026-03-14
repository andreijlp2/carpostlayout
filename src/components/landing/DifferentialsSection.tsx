import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Rocket, MousePointerClick, Plug, Sparkles, Globe } from "lucide-react";

const diffs = [
  { icon: Rocket, title: "Automação de marketing", desc: "Seus anúncios são criados e publicados automaticamente." },
  { icon: MousePointerClick, title: "Interface simples", desc: "Qualquer pessoa da sua equipe consegue usar sem treinamento." },
  { icon: Plug, title: "Integração com marketplaces", desc: "Conecte com OLX, Facebook e outros portais de uma vez." },
  { icon: Sparkles, title: "Gerador de anúncios com IA", desc: "Textos profissionais gerados em segundos pela inteligência artificial." },
  { icon: Globe, title: "Catálogo online automático", desc: "Seu site de veículos é gerado e atualizado automaticamente." },
];

const DifferentialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28 bg-secondary/50" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Por que escolher o CarPost
          </h2>
          <p className="text-muted-foreground text-lg">
            Diferenciais que fazem do CarPost a melhor escolha para sua loja.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {diffs.map((d, i) => (
            <div
              key={i}
              className={`flex gap-4 items-start p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <d.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
