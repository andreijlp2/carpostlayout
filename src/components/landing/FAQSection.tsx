import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircleQuestion, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "O CarPost funciona para qualquer tipo de loja de veículos?",
    a: "Sim! O CarPost foi desenvolvido para lojas de todos os portes — desde revendas pequenas com poucos veículos até grandes concessionárias multimarcas. A plataforma se adapta às necessidades do seu negócio.",
    tag: "Geral",
  },
  {
    q: "Preciso ter conhecimento técnico para usar a plataforma?",
    a: "Não. A interface do CarPost é intuitiva e fácil de usar. Qualquer membro da sua equipe consegue operar sem treinamento técnico. Além disso, oferecemos tutoriais e suporte para ajudar.",
    tag: "Uso",
  },
  {
    q: "Como funciona a geração de anúncios com IA?",
    a: "A inteligência artificial analisa os dados e fotos do veículo e gera automaticamente descrições profissionais, legendas para redes sociais e textos otimizados para conversão. Você pode editar e personalizar antes de publicar.",
    tag: "IA",
  },
  {
    q: "Quais redes sociais e marketplaces são compatíveis?",
    a: "O CarPost integra com Facebook, Instagram, OLX e outros portais automotivos. A publicação é automática e você pode gerenciar tudo em um único painel centralizado.",
    tag: "Integração",
  },
  {
    q: "Existe um período de teste gratuito?",
    a: "Sim! Oferecemos 7 dias gratuitos para você testar todas as funcionalidades da plataforma sem compromisso. Não é necessário cartão de crédito para começar.",
    tag: "Planos",
  },
  {
    q: "Posso cancelar minha assinatura a qualquer momento?",
    a: "Claro. Não há contratos de fidelidade. Você pode cancelar sua assinatura a qualquer momento diretamente pela plataforma, sem burocracia ou taxas adicionais.",
    tag: "Planos",
  },
];

const tagColors: Record<string, string> = {
  Geral:      "bg-violet-500/10 text-violet-500 border-violet-500/20",
  Uso:        "bg-blue-500/10 text-blue-500 border-blue-500/20",
  IA:         "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Integração: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Planos:     "bg-pink-500/10 text-pink-500 border-pink-500/20",
};

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 xl:gap-16 items-start">

          {/* Coluna esquerda — Accordions */}
          <div>
            {/* Header */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-foreground mb-4 leading-tight">
                Dúvidas{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
                  Frequentes
                </span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Tudo o que você precisa saber sobre o CarPost.
              </p>
            </motion.div>

            {/* Itens */}
            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openIdx === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                  >
                    <div
                      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                        isOpen
                          ? "border-primary/30 bg-card shadow-lg shadow-primary/5"
                          : "border-border bg-card hover:border-primary/20 hover:shadow-md"
                      }`}
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                    >
                      {/* Linha de acento esquerda quando aberto */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-violet-500 rounded-l-2xl transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} />

                      {/* Cabeçalho */}
                      <div className="flex items-center gap-4 px-6 py-5 pl-7">
                        {/* Número */}
                        <span className={`flex-shrink-0 text-sm font-black font-mono w-7 transition-colors duration-300 ${isOpen ? "text-primary" : "text-muted-foreground/30"}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Pergunta */}
                        <span className={`flex-1 text-sm sm:text-base font-semibold font-heading leading-snug transition-colors duration-300 ${isOpen ? "text-primary" : "text-foreground"}`}>
                          {faq.q}
                        </span>

                        {/* Tag */}
                        <span className={`hidden sm:inline-flex flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagColors[faq.tag]}`}>
                          {faq.tag}
                        </span>

                        {/* Ícone */}
                        <motion.div
                          animate={{ rotate: isOpen ? 0 : 0 }}
                          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
                        >
                          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </motion.div>
                      </div>

                      {/* Resposta */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="px-6 pb-5 pl-[4.5rem] text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Coluna direita — CTA card */}
          <motion.div
            className="lg:sticky lg:top-28"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card p-8">
              {/* Gradiente de fundo */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5 pointer-events-none" />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center mb-6 shadow-lg">
                  <MessageCircleQuestion className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-extrabold font-heading text-foreground mb-3">
                  Ainda tem alguma dúvida?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Nossa equipe está pronta para te ajudar. Entre em contato e responderemos rapidamente.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { value: "< 2h", label: "Tempo de resposta" },
                    { value: "98%", label: "Satisfação" },
                  ].map((s) => (
                    <div key={s.label} className="bg-muted/50 rounded-xl p-3 text-center">
                      <div className="text-lg font-black text-foreground font-heading">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>

                <motion.a
                  href="mailto:suporte@carpost.com.br"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary to-violet-600 text-white text-sm font-bold shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300"
                >
                  Falar com Suporte
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                {/* Disponibilidade */}
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Disponível seg–sex, 8h às 18h
                </div>
              </div>
            </div>

            {/* Badge de segurança */}
            <div className="mt-4 flex items-center gap-3 p-4 rounded-2xl border border-border bg-card">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="text-xs font-bold text-foreground">7 dias de teste grátis</p>
                <p className="text-xs text-muted-foreground">Sem cartão de crédito</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
