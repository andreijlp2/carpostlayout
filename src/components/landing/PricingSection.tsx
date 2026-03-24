import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Star, Shield } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: { monthly: "R$79", yearly: "R$63" },
    period: "/mês",
    description: "Perfeito para quem está começando e quer automatizar os primeiros anúncios.",
    icon: Zap,
    popular: false,
    color: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
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
    price: { monthly: "R$149", yearly: "R$119" },
    period: "/mês",
    description: "O plano mais completo para lojas que querem escalar e dominar o mercado.",
    icon: Star,
    popular: true,
    color: "from-primary to-violet-600",
    shadow: "shadow-primary/30",
    features: [
      "Veículos ilimitados",
      "5 usuários",
      "Integração marketplaces",
      "Geração de anúncios com IA",
      "Painel de leads",
      "Relatórios de desempenho",
    ],
  },
  {
    name: "Elite",
    price: { monthly: "R$299", yearly: "R$239" },
    period: "/mês",
    description: "Para redes de concessionárias e grandes grupos que precisam de total controle.",
    icon: Shield,
    popular: false,
    color: "from-violet-500 to-fuchsia-600",
    shadow: "shadow-violet-500/20",
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
  const [yearly, setYearly] = useState(false);

  return (
    <section id="planos" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-transparent to-muted/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/5 rounded-full blur-[130px] -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Planos & Preços
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-foreground mb-4 leading-tight">
            Escolha o plano{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
              ideal para você
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Planos flexíveis que acompanham o crescimento da sua loja.
          </p>
        </motion.div>

        {/* Toggle Mensal / Anual */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className={`text-sm font-semibold ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>Mensal</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${yearly ? "bg-primary" : "bg-muted-foreground/30"}`}
          >
            <motion.div
              animate={{ x: yearly ? 28 : 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
            />
          </button>
          <span className={`text-sm font-semibold ${yearly ? "text-foreground" : "text-muted-foreground"}`}>
            Anual
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-bold">-20%</span>
          </span>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const price = yearly ? plan.price.yearly : plan.price.monthly;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative group"
              >
                {/* Popular glow */}
                {plan.popular && (
                  <div className={`absolute -inset-px bg-gradient-to-r ${plan.color} rounded-2xl opacity-70 blur-sm -z-10`} />
                )}

                <div className={`relative h-full rounded-2xl overflow-hidden border transition-all duration-300 ${
                  plan.popular
                    ? "border-primary/50 bg-card shadow-2xl shadow-primary/20"
                    : "border-border bg-card hover:border-primary/20 hover:shadow-xl"
                }`}>

                  {/* Badge popular */}
                  {plan.popular && (
                    <div className="absolute top-0 right-6 px-3 py-1 bg-gradient-to-r from-primary to-violet-600 text-white text-[10px] font-black uppercase tracking-widest rounded-b-xl shadow-lg">
                      ⭐ Mais Popular
                    </div>
                  )}

                  {/* Linha de acento no topo */}
                  <div className={`h-1 w-full bg-gradient-to-r ${plan.color}`} />

                  <div className="p-7">
                    {/* Ícone + Nome */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg ${plan.shadow}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold font-heading text-foreground">{plan.name}</h3>
                        <p className="text-xs text-muted-foreground">{plan.description.slice(0, 32)}…</p>
                      </div>
                    </div>

                    {/* Preço */}
                    <div className="mb-2">
                      <div className="flex items-baseline gap-1">
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-4xl font-black font-heading text-foreground"
                        >
                          {price}
                        </motion.span>
                        <span className="text-sm text-muted-foreground">{plan.period}</span>
                      </div>
                      {yearly && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          <span className="line-through">{plan.price.monthly}</span>
                          <span className="ml-1.5 text-emerald-500 font-semibold">economize 20%</span>
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">{plan.description}</p>

                    {/* Separator */}
                    <div className="h-px bg-border mb-5" />

                    {/* Features */}
                    <ul className="space-y-3 mb-7">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-3 text-sm text-foreground/80">
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl hover:opacity-90`
                          : "border border-border bg-muted/50 hover:bg-primary/5 hover:border-primary/30 text-foreground"
                      }`}
                    >
                      {plan.popular ? "Começar Agora" : "Assinar Plano"}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rodapé de confiança */}
        <motion.div
          className="text-center mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[
            { icon: "🔒", text: "Sem cartão de crédito" },
            { icon: "✅", text: "7 dias grátis" },
            { icon: "❌", text: "Cancele quando quiser" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
