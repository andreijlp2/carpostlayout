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
    <section className="relative pt-28 pb-36 sm:pt-36 sm:pb-44 lg:pt-48 lg:pb-56 overflow-hidden bg-gradient-hero">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large circle */}
        <motion.div
          className="absolute -top-10 right-[5%] w-28 h-28 sm:w-40 sm:h-40 border-[5px] border-white/[0.07] rounded-full"
          animate={{ y: [0, -40, 0], rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Small square */}
        <motion.div
          className="absolute top-[35%] left-[3%] w-8 h-8 sm:w-12 sm:h-12 bg-white/[0.04] rounded-lg rotate-45"
          animate={{ y: [0, 25, 0], rotate: [45, -45, 45] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Dotted circle right */}
        <motion.div
          className="absolute bottom-[30%] right-[15%] w-20 h-20 border-[3px] border-dashed border-white/[0.06] rounded-full"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        {/* Plus shape */}
        <div className="absolute top-[25%] left-[12%]">
          <motion.div
            className="text-white/10 text-4xl font-thin"
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            +
          </motion.div>
        </div>
        {/* Small dots */}
        <motion.div
          className="absolute top-[55%] right-[8%] w-2.5 h-2.5 bg-accent/40 rounded-full"
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-[20%] right-[40%] w-2 h-2 bg-white/20 rounded-full"
          animate={{ scale: [1, 2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        {/* Triangle shape */}
        <motion.div
          className="absolute bottom-[40%] left-[8%] w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-white/[0.05]"
          animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Social icons */}
            <motion.div
              className="flex gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {["facebook", "twitter", "instagram", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs font-bold uppercase"
                >
                  {social.charAt(0).toUpperCase()}
                </a>
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-5 sm:mb-7"
            >
              Venda mais carros com{" "}
              <span className="relative">
                automação inteligente
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-white/65 max-w-lg mb-8 sm:mb-10 leading-relaxed"
            >
              O CarPost é a plataforma completa para lojas de veículos que querem organizar estoque, criar anúncios automáticos e gerar mais leads todos os dias.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="xl" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 font-bold rounded-full text-base px-8">
                  Começar agora
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="xl" className="border-2 border-white/25 bg-transparent text-white hover:bg-white/10 font-semibold rounded-full text-base px-8">
                  <Play className="mr-1.5 h-4 w-4 fill-current" />
                  Testar grátis
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right – Client stores carousel */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow behind carousel */}
            <div className="absolute -inset-4 bg-white/[0.03] rounded-3xl blur-xl" />
            
            <div className="relative rounded-2xl bg-white p-2.5 sm:p-4 shadow-2xl shadow-black/20">
              <div className="rounded-xl overflow-hidden relative group aspect-[16/9]">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.img
                    key={currentSlide}
                    src={clientStores[currentSlide].src}
                    alt={clientStores[currentSlide].name}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1.06 }}
                    exit={{ opacity: 0, scale: 1.08 }}
                    transition={{
                      opacity: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
                      scale: { duration: 3, ease: "easeOut" },
                    }}
                  />
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
                  <p className="text-white font-bold text-base sm:text-lg">{clientStores[currentSlide].name}</p>
                  <p className="text-white/60 text-sm">{clientStores[currentSlide].city}</p>
                </div>

                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110"
                >
                  <ChevronLeft className="h-4 w-4 text-foreground" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110"
                >
                  <ChevronRight className="h-4 w-4 text-foreground" />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {clientStores.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? "w-7 bg-accent" : "w-2.5 bg-white/25 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </motion.div>
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
