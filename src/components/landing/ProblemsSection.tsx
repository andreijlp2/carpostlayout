import { Clock, Megaphone, Users, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const problems = [
  {
    icon: Clock,
    title: "Perda de tempo criando anúncios",
    desc: "Criar anúncios manualmente para cada veículo consome horas preciosas que poderiam ser usadas para vender.",
  },
  {
    icon: Megaphone,
    title: "Dificuldade para divulgar veículos",
    desc: "Publicar em vários canais é trabalhoso e muitas lojas acabam ficando limitadas a poucos portais.",
  },
  {
    icon: Users,
    title: "Leads desorganizados",
    desc: "Sem um sistema, contatos se perdem no WhatsApp, e-mail e ligações. Oportunidades escapam todos os dias.",
  },
  {
    icon: Globe,
    title: "Falta de presença digital",
    desc: "Muitas lojas não têm site próprio e dependem apenas de marketplaces para serem encontradas.",
  },
];

const ProblemsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28 bg-secondary/50" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Os maiores desafios das lojas de veículos
          </h2>
          <p className="text-muted-foreground text-lg">
            Se você enfrenta algum desses problemas, o CarPost foi feito para você.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                <p.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
