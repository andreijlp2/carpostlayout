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
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Nossos planos</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 mt-3">Escolha o plano ideal</h2>
          <p className="text-muted-foreground text-lg">Planos flexíveis que acompanham o crescimento da sua loja.</p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
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
              className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-hero text-white shadow-hero scale-[1.02] lg:scale-105"
                  : "bg-card border-border shadow-card hover:shadow-card-hover"
              }`}
            >
              {plan.popular && (
                <motion.div
                  className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Mais popular
                </motion.div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className={`text-lg font-bold mb-4 ${plan.popular ? "text-white" : "text-foreground"}`}>{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-4xl font-extrabold ${plan.popular ? "text-white" : "text-foreground"}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <motion.li
                      key={fi}
                      className={`flex items-center gap-3 text-sm ${plan.popular ? "text-white/90" : "text-foreground"}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + fi * 0.08 }}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? "bg-white/20" : "bg-primary/10"}`}>
                        <Check className={`h-3 w-3 ${plan.popular ? "text-white" : "text-primary"}`} />
                      </div>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className={`w-full rounded-full font-bold ${
                      plan.popular
                        ? "bg-white text-primary hover:bg-white/90 shadow-lg"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    Começar agora
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
