import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
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

  // Preload all images before starting carousel
  useEffect(() => {
    let loaded = 0;
    clientStores.forEach((store) => {
      const img = new Image();
      img.src = store.src;
      img.onload = () => {
        loaded++;
        if (loaded === clientStores.length) setImagesLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === clientStores.length) setImagesLoaded(true);
      };
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % clientStores.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + clientStores.length) % clientStores.length);
  }, []);

  const resetAutoplay = useCallback(() => {}, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, imagesLoaded]);

  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Hero background image */}
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-white/20 z-0" />

      {/* Animated blobs */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary mb-6 border border-primary/20"
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Plataforma #1 para lojas de veículos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground mb-6"
            >
              Venda mais carros com{" "}
              <span className="text-gradient">automação inteligente</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed"
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
                <Button size="xl" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg font-bold">
                  Começar agora
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="xl" className="border-2 border-foreground/20 bg-white/60 backdrop-blur-sm text-foreground hover:bg-white/80 font-semibold">
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
            <div className="rounded-2xl bg-white px-[30px] py-[50px] shadow-2xl shadow-primary/15 border border-border">
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

                {/* Overlay with store info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-bold text-lg">{clientStores[currentSlide].name}</p>
                  <p className="text-white/70 text-sm">{clientStores[currentSlide].city}</p>
                </div>

                {/* Nav buttons */}
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
                  onClick={() => { setCurrentSlide(i); resetAutoplay(); }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-6 bg-primary" : "w-2 bg-foreground/20"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Metrics */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="text-3xl lg:text-4xl font-extrabold text-foreground"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {m.value}
              </motion.div>
              <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
