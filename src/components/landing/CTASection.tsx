import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={`relative rounded-3xl bg-foreground overflow-hidden p-12 lg:p-20 text-center ${
            isVisible ? "animate-scale-in" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-background mb-6">
              Pronto para vender mais carros?
            </h2>
            <p className="text-background/70 text-lg max-w-xl mx-auto mb-8">
              Comece hoje mesmo a usar o CarPost e transforme a forma como sua loja anuncia veículos.
            </p>
            <Button
              variant="hero"
              size="xl"
              className="bg-background text-foreground hover:bg-background/90"
            >
              Criar conta gratuita
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
