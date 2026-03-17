import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "R$79",
    period: "/mês",
    popular: false,
    features: [
      "Até 30 veículos",
      "1 usuário",
      "Catálogo online",
      "Descrição automática com IA",
      "Exportação para Facebook",
    ],
  },
  {
    name: "Pro",
    price: "R$149",
    period: "/mês",
    popular: true,
    features: [
      "Veículos ilimitados",
      "5 usuários",
      "Integração com marketplaces",
      "Geração de anúncios com IA",
      "Painel de leads",
      "Relatórios de desempenho",
    ],
  },
  {
    name: "Elite",
    price: "R$299",
    period: "/mês",
    popular: false,
    features: [
      "Usuários ilimitados",
      "CRM completo de leads",
      "Automação de marketing",
      "Integrações completas",
      "Suporte prioritário",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="planos" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-3 block">
            Planos & Preços
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Escolha o plano ideal para sua loja
          </h2>
          <p className="text-muted-foreground text-lg">
            Planos flexíveis que acompanham o crescimento do seu negócio.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-hero text-primary-foreground border-transparent shadow-hero scale-[1.02] lg:scale-105"
                  : "bg-card border-border shadow-card hover:shadow-card-hover"
              }`}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cta text-cta-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-md"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Mais popular
                </motion.div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-lg font-bold mb-4 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-extrabold ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm">
                    <Check className={`h-4 w-4 flex-shrink-0 ${plan.popular ? "text-cta" : "text-primary"}`} />
                    <span className={plan.popular ? "text-primary-foreground/90" : "text-foreground"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className={`w-full rounded-full font-bold ${
                    plan.popular
                      ? "bg-cta text-cta-foreground hover:opacity-90 shadow-lg"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  Assinar agora
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
