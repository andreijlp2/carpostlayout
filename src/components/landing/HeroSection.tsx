import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clientTrotz from "@/assets/client-trotz.png";
import clientFt from "@/assets/client-ft.png";
import clientTotti from "@/assets/client-totti.png";
import clientDs7 from "@/assets/client-ds7.png";
import clientPremier from "@/assets/client-premier.png";
import clientPassarin from "@/assets/client-passarin.png";

const clientStores = [
  { src: clientTrotz, name: "Trotz Veículos", city: "Xanxerê, SC" },
  { src: clientFt, name: "FT Multimarcas", city: "SC" },
  { src: clientTotti, name: "Auto Totti", city: "Chapecó, SC" },
  { src: clientDs7, name: "DS7 Cars", city: "Chapecó, SC" },
  { src: clientPremier, name: "Premier Motors", city: "Chapecó, SC" },
  { src: clientPassarin, name: "Passarin Multimarcas", city: "Chapecó, SC" },
];

const metrics = [
  { value: "+2.000", label: "veículos anunciados" },
  { value: "+500", label: "leads gerados por mês" },
  { value: "+300", label: "lojas usando a plataforma" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let loaded = 0;
    clientStores.forEach((store) => {
      const img = new Image();
      img.src = store.src;
      img.onload = () => { loaded++; if (loaded === clientStores.length) setImagesLoaded(true); };
      img.onerror = () => { loaded++; if (loaded === clientStores.length) setImagesLoaded(true); };
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % clientStores.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + clientStores.length) % clientStores.length);
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, imagesLoaded]);

  return (
    <section className="relative pt-28 pb-32 sm:pt-36 sm:pb-40 lg:pt-48 lg:pb-52 overflow-hidden bg-gradient-hero">
      {/* Animated decorative shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-[10%] w-20 h-20 border-4 border-white/10 rounded-full"
          animate={{ y: [0, -30, 0], rotate: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 left-[5%] w-10 h-10 bg-white/5 rounded-lg"
          animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-[20%] w-16 h-16 border-4 border-white/5 rounded-lg rotate-45"
          animate={{ y: [0, -20, 0], rotate: [45, 135, 45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] left-[15%] w-3 h-3 bg-white/20 rounded-full"
          animate={{ scale: [1, 2, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-[60%] right-[5%] w-2 h-2 bg-white/30 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white/90 mb-6 border border-white/20"
            >
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Plataforma #1 para lojas de veículos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white mb-4 sm:mb-6"
            >
              Venda mais carros com{" "}
              <span className="text-accent">automação inteligente</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-white/70 max-w-lg mb-6 sm:mb-8 leading-relaxed"
            >
              O CarPost é a plataforma completa para lojas de veículos que querem organizar estoque, criar anúncios automáticos e gerar mais leads todos os dias.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="xl" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg font-bold rounded-full">
                  Começar agora
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="xl" className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold rounded-full">
                  <Play className="mr-1 h-4 w-4" />
                  Testar grátis
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right – Client stores carousel */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-2xl bg-white p-3 sm:p-5 shadow-2xl">
              <div className="rounded-xl overflow-hidden relative group aspect-[16/9]">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.img
                    key={currentSlide}
                    src={clientStores[currentSlide].src}
                    alt={clientStores[currentSlide].name}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1.08 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{
                      opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
                      scale: { duration: 3.5, ease: "easeOut" },
                    }}
                  />
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-bold text-lg">{clientStores[currentSlide].name}</p>
                  <p className="text-white/70 text-sm">{clientStores[currentSlide].city}</p>
                </div>

                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {clientStores.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-6 bg-accent" : "w-2 bg-white/30"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Metrics */}
        <div className="mt-16 sm:mt-24 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {m.value}
              </motion.div>
              <div className="text-sm text-white/60 mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave shape at bottom */}
      <div className="wave-shape">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="hsl(0, 0%, 100%)">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,130.16,248.75,125.67,285,113.22,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
