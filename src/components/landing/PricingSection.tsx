import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "START", price: "R$79", period: "/mês", popular: false,
    features: ["Até 30 veículos", "1 usuário", "Catálogo online", "Descrição automática com IA", "Exportação para Facebook"],
  },
  {
    name: "PRO", price: "R$149", period: "/mês", popular: true,
    features: ["Veículos ilimitados", "5 usuários", "Integração marketplaces", "Geração de anúncios com IA", "Painel de leads", "Relatórios de desempenho"],
  },
  {
    name: "DEALER", price: "R$299", period: "/mês", popular: false,
    features: ["Usuários ilimitados", "CRM completo de leads", "Automação de marketing", "Integrações completas", "Suporte prioritário"],
  },
];

const PricingSection = () => {
  return (
    <section id="planos" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">Escolha o plano ideal</h2>
          <p className="text-muted-foreground text-lg">Planos flexíveis que acompanham o crescimento da sua loja.</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
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
              className={`relative rounded-2xl p-8 border transition-colors duration-300 ${
                plan.popular
                  ? "bg-card border-primary shadow-hero scale-[1.02] lg:scale-105"
                  : "bg-card border-border shadow-card"
              }`}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Mais popular
                </motion.div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, fi) => (
                  <motion.li
                    key={fi}
                    className="flex items-center gap-3 text-sm text-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + fi * 0.08 }}
                  >
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    {f}
                  </motion.li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button variant={plan.popular ? "hero" : "outline"} size="lg" className="w-full">
                  Começar agora
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
