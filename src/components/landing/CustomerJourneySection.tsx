import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointerClick, UserPlus, Store, Car, Rocket, Gift,
  LayoutTemplate, Puzzle, Facebook, Sparkles, Share2,
  BarChart3, Brain, Trophy, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const journeyCards = [
  {
    step: 1, icon: MousePointerClick, title: "Comece Agora",
    text: 'Tudo começa com um clique.\nBasta clicar em "Começar Agora" e iniciar a transformação digital da sua loja de veículos.',
  },
  {
    step: 2, icon: UserPlus, title: "Crie sua Conta",
    text: "Faça um cadastro rápido na plataforma e tenha acesso imediato ao sistema completo.\n\nEm menos de 1 minuto sua conta já está pronta para uso.",
  },
  {
    step: 3, icon: Store, title: "Cadastre sua Loja",
    text: "Configure as informações da sua loja:\n\nSua identidade profissional pronta para aparecer no mercado.",
    items: ["Nome da loja", "Logo", "Contatos", "Redes sociais", "Endereço"],
  },
  {
    step: 4, icon: Car, title: "Cadastre seus Veículos",
    text: "Adicione seus veículos de forma simples em Novo Veículo.\n\nVocê poderá incluir:",
    items: ["Fotos", "Informações técnicas", "Valor", "Observações", "Destaques de venda"],
  },
  {
    step: 5, icon: Rocket, title: "Sua Loja Já Está Ativa",
    text: "Assim que os veículos são cadastrados, sua loja digital já está pronta.\n\nAgora basta colocar no ar e começar a vender.",
  },
  {
    step: 6, icon: Gift, title: "30 Dias Grátis",
    text: "Teste todas as funcionalidades da plataforma com 30 dias gratuitos.\n\nSem compromisso.\nSem risco.\nExperimente o sistema completo.",
  },
  {
    step: 7, icon: LayoutTemplate, title: "Crie ou Baixe Templates",
    text: "Escolha entre diversos templates profissionais ou crie seus próprios modelos personalizados.",
    items: ["Anúncios de veículos", "Posts para redes sociais", "Artes de promoção", "Campanhas de vendas"],
  },
  {
    step: 8, icon: Puzzle, title: "Conecte com as Principais Integrações",
    text: "Integre sua loja com diversas ferramentas que facilitam seu dia a dia.\n\nTudo centralizado em um único lugar.",
  },
  {
    step: 9, icon: Facebook, title: "Conecte com a Meta",
    text: "Conecte sua conta diretamente com Facebook e Instagram.\n\nPublique automaticamente sem precisar sair da plataforma.",
    items: ["Feed", "Stories", "Reels", "Carrossel"],
  },
  {
    step: 10, icon: Sparkles, title: "Crie Legendas Automáticas com IA",
    text: "A Inteligência Artificial analisa e gera legendas prontas para vender mais nas redes sociais.",
    items: ["Fotos do veículo", "Características", "Diferenciais"],
  },
  {
    step: 11, icon: Share2, title: "Publique nas Redes Sociais",
    text: "Com apenas 1 clique, publique seus veículos nas redes sociais.\n\nMais alcance\nMais engajamento\nMais vendas",
  },
  {
    step: 12, icon: BarChart3, title: "Gestão Completa da Sua Loja",
    text: "A plataforma não é apenas para anúncios.\n\nVocê terá gestão completa da loja, incluindo:",
    items: ["Cadastro de veículos", "Controle de estoque", "Contratos", "Organização de vendas", "Marketing digital"],
  },
  {
    step: 13, icon: Brain, title: "Análise de IA Antes de Comprar um Veículo",
    text: "Antes de comprar um carro para o estoque, use a análise inteligente de mercado.\n\nA IA avalia:",
    items: ["Preço médio", "Liquidez", "Demanda", "Margem de revenda"],
  },
  {
    step: 14, icon: Trophy, title: "Resultado Final",
    text: "Com a plataforma você consegue tudo em um único lugar.",
    items: [
      "Organizar sua loja", "Automatizar marketing", "Gerenciar estoque",
      "Criar anúncios profissionais", "Publicar automaticamente nas redes sociais",
      "Tomar decisões inteligentes com IA",
    ],
  },
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
    <section id="jornada" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/40 to-primary/15" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/50 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Jornada do Cliente – Plataforma
          </h2>
          <p className="text-muted-foreground text-lg">
            Conheça cada etapa da experiência dentro da nossa plataforma.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-primary">
                {current + 1} / {TOTAL}
              </span>
              <span className="text-xs text-muted-foreground">
                {isResult ? "🏆 Resultado" : `Passo ${card.step}`}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Card area */}
          <div
            className="relative overflow-hidden rounded-2xl min-h-[420px] sm:min-h-[340px]"
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
                className={`rounded-2xl border p-8 sm:p-10 shadow-card bg-card ${isResult ? "ring-2 ring-primary/20" : ""}`}
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Icon */}
                  <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${isResult ? "bg-primary text-primary-foreground" : "bg-accent"}`}>
                    <Icon className={`h-7 w-7 ${isResult ? "" : "text-primary"}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {!isResult && (
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
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
                      <ul className="mt-4 space-y-1.5">
                        {card.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
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
            <Button variant="outline" size="icon" onClick={prev} aria-label="Anterior" className="rounded-full h-10 w-10">
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="hidden sm:flex gap-1.5">
              {journeyCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/30"}`}
                  aria-label={`Ir para etapa ${i + 1}`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={next} aria-label="Próximo" className="rounded-full h-10 w-10">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerJourneySection;
