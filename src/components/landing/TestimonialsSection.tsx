import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Dono da Auto Silva",
    text: "Depois que começamos a usar o CarPost, nossos anúncios ficaram muito mais profissionais e os leads aumentaram em 40%.",
  },
  {
    name: "Ana Rodrigues",
    role: "Gerente da Premium Veículos",
    text: "A automação de anúncios economiza pelo menos 3 horas por dia da minha equipe. O investimento se paga rapidamente.",
  },
  {
    name: "Roberto Mendes",
    role: "Proprietário da RM Motors",
    text: "O catálogo online que o CarPost gera é incrível. Nossos clientes adoram e conseguimos fechar vendas mais rápido.",
  },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-secondary/50" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground text-lg">
            Lojas de todo o Brasil já estão vendendo mais com o CarPost.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-card rounded-2xl p-8 border border-border shadow-card ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <div className="font-bold text-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
