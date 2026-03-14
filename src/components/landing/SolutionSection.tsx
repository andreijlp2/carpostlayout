import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Zap, Check } from "lucide-react";

const points = [
  "Cadastro rápido de veículos",
  "Anúncios automáticos com IA",
  "Publicação em múltiplos canais",
  "Gestão centralizada de leads",
  "Catálogo online profissional",
  "Relatórios de desempenho",
];

const SolutionSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={isVisible ? "animate-fade-in-left" : "opacity-0"} style={{ animationDelay: "0.1s" }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground mb-6">
              <Zap className="h-4 w-4" />
              Solução completa
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-6">
              Uma plataforma completa para vender mais veículos
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              O CarPost centraliza tudo o que sua loja precisa: do cadastro do veículo até a geração de leads, tudo em um único painel.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {points.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={isVisible ? "animate-fade-in-right" : "opacity-0"} style={{ animationDelay: "0.2s" }}>
            <div className="relative bg-accent rounded-3xl p-8 lg:p-12">
              <div className="space-y-6">
                {[
                  { label: "Veículos anunciados", value: "2.847", change: "+12%" },
                  { label: "Leads este mês", value: "534", change: "+28%" },
                  { label: "Taxa de conversão", value: "8.2%", change: "+3%" },
                ].map((stat, i) => (
                  <div key={i} className="bg-card rounded-xl p-5 shadow-card border border-border">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                        <div className="text-2xl font-bold text-foreground mt-1">{stat.value}</div>
                      </div>
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
