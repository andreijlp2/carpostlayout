import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Check, ArrowRight, Zap } from "lucide-react";

const plans = [
  {
    name: "START", price: "R$79", period: "/mês", popular: false,
    desc: "Ideal para lojas iniciantes",
    features: ["Até 30 veículos", "1 usuário", "Catálogo online", "Descrição automática com IA", "Exportação para Facebook"],
  },
  {
    name: "PRO", price: "R$149", period: "/mês", popular: true,
    desc: "Para lojas em crescimento",
    features: ["Veículos ilimitados", "5 usuários", "Integração marketplaces", "Geração de anúncios com IA", "Painel de leads", "Relatórios de desempenho"],
  },
  {
    name: "DEALER", price: "R$299", period: "/mês", popular: false,
    desc: "Para grandes concessionárias",
    features: ["Usuários ilimitados", "CRM completo de leads", "Automação de marketing", "Integrações completas", "Suporte prioritário"],
  },
];

const PricingSection = () => {
  return (
    <section id="planos" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <span className="section-subtitle text-primary">Nossos planos</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Escolha o plano ideal
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Planos flexíveis que acompanham o crescimento da sua loja.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                plan.popular
                  ? "bg-gradient-hero shadow-hero lg:scale-105 z-10"
                  : "bg-card border border-border shadow-card hover:shadow-card-hover"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 flex justify-center">
                  <motion.div
                    className="bg-accent text-accent-foreground text-xs font-bold px-5 py-1.5 rounded-b-xl flex items-center gap-1.5"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Zap className="h-3 w-3" />
                    Mais popular
                  </motion.div>
                </div>
              )}

              <div className="p-8 lg:p-9 pt-10">
                <div className="text-center mb-8">
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-4xl sm:text-5xl font-extrabold ${plan.popular ? "text-white" : "text-foreground"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.popular ? "text-white/55" : "text-muted-foreground"}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${plan.popular ? "text-white/50" : "text-muted-foreground"}`}>
                    {plan.desc}
                  </p>
                </div>

                <div className={`h-px w-full mb-7 ${plan.popular ? "bg-white/15" : "bg-border"}`} />

                <ul className="space-y-4 mb-9">
                  {plan.features.map((f, fi) => (
                    <motion.li
                      key={fi}
                      className={`flex items-center gap-3 text-sm ${plan.popular ? "text-white/85" : "text-foreground"}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + fi * 0.06 }}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? "bg-white/15" : "bg-primary/10"}`}>
                        <Check className={`h-3 w-3 ${plan.popular ? "text-white" : "text-primary"}`} />
                      </div>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className={`w-full rounded-full font-bold text-base h-12 ${
                      plan.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    Começar agora
                    <ArrowRight className="ml-1.5 h-4 w-4" />
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
