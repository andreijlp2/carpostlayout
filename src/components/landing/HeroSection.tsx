import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, TrendingUp, Zap, ChevronLeft, ChevronRight, Shield, Globe, Wifi } from "lucide-react";
import heroBottomShape from "@/assets/hero-bottom-shape.png";
import { motion, AnimatePresence } from "framer-motion";
import img01 from "@/assets/01.png";
import img02 from "@/assets/02.png";
import img03 from "@/assets/03.png";
import img04 from "@/assets/04.png";
import img05 from "@/assets/05.png";
import macbookScreen from "@/assets/macbook-screen.png";

const carouselImages = [img01, img02, img03, img04, img05];

const stats = [
  { icon: TrendingUp, value: "+300", label: "Lojas Ativas" },
  { icon: Zap,        value: "+50k", label: "Anúncios Gerados" },
  { icon: Star,       value: "4.9★", label: "Avaliação Média" },
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-hero-gradient pt-28 pb-0 sm:pt-36 lg:pt-44 overflow-hidden">

      {/* Grade de pontos sutil */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
        backgroundSize: "36px 36px"
      }} />

      {/* Brilhos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-white/8 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Formas geométricas + cards sociais — só desktop/tablet */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <motion.div
          className="absolute top-24 left-[8%] w-14 h-14 border-2 border-white/15 rounded-2xl"
          animate={{ y: [0, -18, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-36 right-[12%] w-8 h-8 bg-white/10 rounded-full"
          animate={{ y: [0, 14, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[35%] left-[18%] w-6 h-6 bg-white/10 rotate-45"
          animate={{ y: [0, -20, 0], rotate: [45, 90, 45] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/3 right-[6%] w-12 h-12 border border-white/10 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />


      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-32 sm:pb-40 lg:pb-52">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Conteúdo */}
          <div>
            {/* Badge de destaque */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-bold uppercase tracking-widest mb-7"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              🚀 Nova IA de Marketing Automotivo
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] font-extrabold font-heading leading-[1.15] text-white mb-6 drop-shadow-lg"
            >
              Automatize o Marketing da sua{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                  Loja de Veículos
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-300/50 to-orange-400/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-white/75 max-w-lg mb-10 leading-relaxed"
            >
              Uma plataforma completa para criar anúncios, gerar legendas e publicar automaticamente nas redes sociais. Tudo que sua loja precisa para vender mais.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10"
            >
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="xl"
                  className="bg-[#f37020] text-white hover:bg-[#f78f1e] shadow-[0_8px_32px_rgba(243,112,32,0.5)] font-bold rounded-2xl px-8 w-full sm:w-auto uppercase tracking-wide text-sm"
                >
                  Teste por 7 dias Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  size="xl"
                  className="border-2 border-white/25 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/40 font-semibold rounded-2xl px-8 w-full sm:w-auto gap-2"
                >
                  <a href="#demonstracao">
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                      <Play className="h-3 w-3 ml-0.5 fill-white text-white" />
                    </div>
                    Ver Demonstração
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-4 sm:gap-6"
            >
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-black text-white font-heading leading-none">{s.value}</div>
                    <div className="text-[10px] sm:text-xs text-white/50 mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Mockup (Imagem + Carrossel) */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center justify-center w-full max-w-full"
          >
            {/* Anel de glow atrás do mockup */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-violet-400/20 rounded-3xl blur-3xl scale-90" />

            <div
              className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-[70rem] h-auto drop-shadow-[0_40px_100px_rgba(100,60,240,0.45)] mx-auto z-10 group"
            >
              {/* Imagem do Frame do MacBook (Carcaça enviada pelo usuário) */}
              {/* A imagem deve ser salva como src/assets/macbook-screen.png */}
              <img 
                src={macbookScreen} 
                alt="MacBook Frame" 
                className="w-full h-auto block relative z-10 pointer-events-none select-none drop-shadow-[0_25px_40px_rgba(0,0,0,0.7)]"
              />

              {/* Área da Tela (O espaço em branco do navegador onde ficará o carrossel) */}
              {/* Usando % exatas para preencher o branco do frame colado */}
              <div 
                className="absolute z-20 overflow-hidden bg-black flex items-center justify-center"
                style={{
                  top: "13.3%",       // Distância do topo (abaixo da barra de endereço)
                  bottom: "22.2%",    // Distância do fundo (acima do dock de apps)
                  left: "13.2%",      // Margem esquerda
                  right: "13.2%",     // Margem direita
                  borderBottomLeftRadius: "6px",
                  borderBottomRightRadius: "6px"
                }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={currentImage}
                    src={carouselImages[currentImage]}
                    alt={`CarPost Plataforma Screenshot ${currentImage + 1}`}
                    className="absolute inset-0 w-full h-full object-contain object-top bg-[#0f0f13]"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    fetchPriority="high"
                  />
                </AnimatePresence>

                {/* Overlay gradiente inferior apenas para dar contraste aos controles */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              
                {/* Setas de Navegação */}
                <div className="absolute inset-y-0 left-0 w-12 sm:w-16 flex items-center justify-start pl-1 sm:pl-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
                    className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                <div className="absolute inset-y-0 right-0 w-12 sm:w-16 flex items-center justify-end pr-1 sm:pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setCurrentImage((prev) => (prev + 1) % carouselImages.length)}
                    className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Dots (Indicadores do Carrossel) */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {carouselImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImage ? "bg-primary w-5" : "bg-white/50 hover:bg-white/80 w-1.5"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Wave bottom shape */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-10 -mb-px">
        <img src={heroBottomShape} alt="" className="w-full h-auto block" />
      </div>
    </section>
  );
};

export default HeroSection;
