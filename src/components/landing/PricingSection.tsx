import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Check, ArrowRight, Star } from "lucide-react";

const plans = [
  {
    name: "Starter", price: "R$79", period: "/mês", popular: false,
    features: ["Até 30 veículos", "1 usuário", "Catálogo online", "Descrição automática com IA", "Exportação para Facebook"],
  },
  {
    name: "Pro", price: "R$149", period: "/mês", popular: true,
    features: ["Veículos ilimitados", "5 usuários", "Integração marketplaces", "Geração de anúncios com IA", "Painel de leads", "Relatórios de desempenho"],
  },
  {
    name: "Elite", price: "R$299", period: "/mês", popular: false,
    features: ["Usuários ilimitados", "CRM completo de leads", "Automação de marketing", "Integrações completas", "Suporte prioritário"],
  },
];

const PricingSection = () => {
  return (
    <section id="planos" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Planos & Preços</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-foreground mt-3 mb-4">
            Escolha o Plano Ideal
          </h2>
          <p className="text-muted-foreground text-lg">Planos flexíveis que acompanham o crescimento da sua loja.</p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
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
              whileHover={{ y: -10 }}
              className={`relative rounded-2xl p-8 border transition-all duration-500 ${
                plan.popular
                  ? "bg-hero-gradient text-white border-transparent shadow-hero scale-[1.02] lg:scale-105"
                  : "bg-card border-border shadow-card hover:shadow-card-hover"
              }`}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cta text-cta-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Star className="w-3 h-3 inline mr-1" />
                  Mais Popular
                </motion.div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-lg font-bold font-heading mb-4 ${plan.popular ? "text-white" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-extrabold font-heading ${plan.popular ? "text-white" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, fi) => (
                  <li key={fi} className={`flex items-center gap-3 text-sm ${plan.popular ? "text-white/90" : "text-foreground"}`}>
                    <Check className={`h-4 w-4 flex-shrink-0 ${plan.popular ? "text-white" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className={`w-full rounded-full font-semibold ${
                    plan.popular
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  Assinar Agora
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
