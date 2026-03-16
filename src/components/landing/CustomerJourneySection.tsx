import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointerClick, UserPlus, Store, Car, Rocket, Gift,
  LayoutTemplate, Puzzle, Facebook, Sparkles, Share2,
  BarChart3, Brain, Trophy, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const journeyCards = [
  { step: 1, icon: MousePointerClick, title: "Comece Agora", text: 'Tudo começa com um clique.\nBasta clicar em "Começar Agora" e iniciar a transformação digital da sua loja de veículos.' },
  { step: 2, icon: UserPlus, title: "Crie sua Conta", text: "Faça um cadastro rápido na plataforma e tenha acesso imediato ao sistema completo.\n\nEm menos de 1 minuto sua conta já está pronta para uso." },
  { step: 3, icon: Store, title: "Cadastre sua Loja", text: "Configure as informações da sua loja:", items: ["Nome da loja", "Logo", "Contatos", "Redes sociais", "Endereço"] },
  { step: 4, icon: Car, title: "Cadastre seus Veículos", text: "Adicione seus veículos de forma simples:", items: ["Fotos", "Informações técnicas", "Valor", "Observações", "Destaques de venda"] },
  { step: 5, icon: Rocket, title: "Sua Loja Já Está Ativa", text: "Assim que os veículos são cadastrados, sua loja digital já está pronta.\n\nAgora basta colocar no ar e começar a vender." },
  { step: 6, icon: Gift, title: "30 Dias Grátis", text: "Teste todas as funcionalidades com 30 dias gratuitos.\n\nSem compromisso. Sem risco." },
  { step: 7, icon: LayoutTemplate, title: "Templates Profissionais", text: "Escolha templates profissionais ou crie seus próprios modelos.", items: ["Anúncios de veículos", "Posts para redes sociais", "Artes de promoção", "Campanhas de vendas"] },
  { step: 8, icon: Puzzle, title: "Integrações Completas", text: "Integre sua loja com diversas ferramentas.\n\nTudo centralizado em um único lugar." },
  { step: 9, icon: Facebook, title: "Conecte com a Meta", text: "Publique automaticamente em Facebook e Instagram.", items: ["Feed", "Stories", "Reels", "Carrossel"] },
  { step: 10, icon: Sparkles, title: "Legendas com IA", text: "A IA gera legendas prontas para vender mais nas redes sociais.", items: ["Fotos do veículo", "Características", "Diferenciais"] },
  { step: 11, icon: Share2, title: "Publique nas Redes", text: "Com apenas 1 clique, publique seus veículos nas redes sociais.\n\nMais alcance, mais vendas." },
  { step: 12, icon: BarChart3, title: "Gestão Completa", text: "Gestão completa da loja:", items: ["Cadastro de veículos", "Controle de estoque", "Contratos", "Organização de vendas", "Marketing digital"] },
  { step: 13, icon: Brain, title: "Análise de IA", text: "Antes de comprar um carro, use a análise inteligente:", items: ["Preço médio", "Liquidez", "Demanda", "Margem de revenda"] },
  { step: 14, icon: Trophy, title: "Resultado Final", text: "Com a plataforma você consegue tudo em um único lugar.", items: ["Organizar sua loja", "Automatizar marketing", "Gerenciar estoque", "Criar anúncios profissionais", "Publicar nas redes sociais", "Decisões inteligentes com IA"] },
];

const TOTAL = journeyCards.length;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const CustomerJourneySection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = useCallback((newIndex: number) => {
    setDirection(newIndex > current ? 1 : -1);
    setCurrent(newIndex);
  }, [current]);

  const prev = () => navigate(current > 0 ? current - 1 : TOTAL - 1);
  const next = () => navigate(current < TOTAL - 1 ? current + 1 : 0);

  const card = journeyCards[current];
  const Icon = card.icon;
  const isResult = card.step === 14;
  const progress = ((current + 1) / TOTAL) * 100;

  return (
    <section id="jornada" className="relative py-20 lg:py-28 overflow-hidden bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-subtitle text-primary">Experiência completa</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Jornada do Cliente
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Conheça cada etapa da experiência dentro da nossa plataforma.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-primary">{current + 1} / {TOTAL}</span>
              <span className="text-xs text-muted-foreground font-semibold">
                {isResult ? "🏆 Resultado" : `Passo ${card.step}`}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Card area */}
          <div
            className="relative overflow-hidden rounded-2xl min-h-[380px] sm:min-h-[320px]"
            onTouchStart={(e) => {
              const startX = e.touches[0].clientX;
              const handleEnd = (ev: TouchEvent) => {
                const diff = startX - ev.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
                document.removeEventListener("touchend", handleEnd);
              };
              document.addEventListener("touchend", handleEnd);
            }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`rounded-2xl border p-6 sm:p-8 md:p-10 shadow-card bg-card ${isResult ? "border-primary/30 shadow-card-hover" : "border-border"}`}
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${isResult ? "bg-gradient-to-br from-primary to-accent text-white" : "bg-primary/10"}`}>
                    <Icon className={`h-7 w-7 ${isResult ? "text-white" : "text-primary"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {!isResult && (
                      <span className="text-xs font-bold text-primary uppercase tracking-[0.15em]">
                        Passo {String(card.step).padStart(2, "0")}
                      </span>
                    )}
                    <h3 className={`font-bold text-foreground mt-1 mb-3 ${isResult ? "text-2xl text-gradient" : "text-xl"}`}>
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base">
                      {card.text}
                    </p>
                    {card.items && (
                      <ul className="mt-4 space-y-2">
                        {card.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-sm text-foreground/75">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" size="icon" onClick={prev} aria-label="Anterior" className="rounded-full h-10 w-10 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="hidden sm:flex gap-1.5">
              {journeyCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/30"}`}
                  aria-label={`Ir para etapa ${i + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} aria-label="Próximo" className="rounded-full h-10 w-10 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerJourneySection;
