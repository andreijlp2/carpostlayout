import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const metrics = [
  { value: "+2.000", label: "veículos anunciados" },
  { value: "+500", label: "leads gerados por mês" },
  { value: "+300", label: "lojas usando a plataforma" },
];

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Plataforma #1 para lojas de veículos
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground mb-6">
              Venda mais carros com{" "}
              <span className="text-gradient">automação inteligente</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              O CarPost é a plataforma completa para lojas de veículos que querem organizar estoque, criar anúncios automáticos e gerar mais leads todos os dias.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl">
                Começar agora
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
              <Button variant="heroOutline" size="xl">
                <Play className="mr-1 h-4 w-4" />
                Testar grátis
              </Button>
            </div>
          </div>

          {/* Right – Dashboard mockup */}
          <div className="animate-fade-in-right" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-hero border border-border">
                <img
                  src={dashboardMockup}
                  alt="Dashboard do CarPost mostrando gestão de veículos"
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${0.3 + i * 0.1}s`, opacity: 0 }}
            >
              <div className="text-3xl lg:text-4xl font-extrabold text-foreground">{m.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
