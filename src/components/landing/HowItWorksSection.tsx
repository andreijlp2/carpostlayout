import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ClipboardList, Wand2, Share2, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Cadastre os veículos",
    desc: "Cadastre os veículos da sua loja de forma rápida e organizada.",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Anúncios automáticos",
    desc: "O sistema gera anúncios e descrições automaticamente com IA.",
  },
  {
    icon: Share2,
    step: "03",
    title: "Publique em todos os canais",
    desc: "Publique em redes sociais e marketplaces com um clique.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Receba leads e venda",
    desc: "Receba leads qualificados e venda mais carros todos os dias.",
  },
];

const HowItWorksSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="como-funciona" className="py-20 lg:py-28" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Como funciona
          </h2>
          <p className="text-muted-foreground text-lg">
            Em 4 passos simples, sua loja começa a vender mais.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`relative text-center ${isVisible ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-border" />
              )}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5">
                <s.icon className="h-8 w-8 text-primary" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Passo {s.step}</span>
              <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
