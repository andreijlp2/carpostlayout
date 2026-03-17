import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroBottomShape from "@/assets/hero-bottom-shape.png";
import { motion } from "framer-motion";
import phoneMockup from "@/assets/phone-mockup.png";
import mascot from "@/assets/mascot.png";

const HeroSection = () => {
  return (
    <section className="relative bg-hero-gradient pt-28 pb-0 sm:pt-36 lg:pt-44 overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-[10%] w-20 h-20 border-2 border-white/15 rounded-full"
          animate={{ y: [0, -20, 0], rotate: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-[15%] w-12 h-12 bg-white/8 rounded-lg"
          animate={{ y: [0, 15, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[20%] w-8 h-8 bg-white/8 rounded-full"
          animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-[5%] w-16 h-16 border border-white/10 rounded-lg rotate-45"
          animate={{ rotate: [45, 90, 45], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-32 sm:pb-40 lg:pb-52">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex gap-3">
                {["#", "#", "#", "#"].map((_, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white hover:border-white/40 transition-all duration-300"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      {i === 0 && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />}
                      {i === 1 && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />}
                      {i === 2 && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />}
                      {i === 3 && <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-extrabold font-heading leading-[1.1] text-white mb-6 drop-shadow-lg"
            >
              Automatize o Marketing da sua Loja de Veículos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base lg:text-lg text-white/80 max-w-lg mb-8 leading-relaxed"
            >
              Uma plataforma completa para criar anúncios, gerar legendas e publicar automaticamente nas redes sociais. Tudo que sua loja precisa para vender mais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="xl"
                  className="bg-cta text-cta-foreground hover:brightness-110 shadow-cta font-bold rounded-full px-6 sm:px-8 w-full sm:w-auto"
                >
                  Começar Agora
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="xl"
                  className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 font-semibold rounded-full px-6 sm:px-8 w-full sm:w-auto"
                >
                  <Play className="mr-1 h-4 w-4" />
                  Ver Demonstração
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Phone mockup + mascot */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-end justify-center lg:justify-end gap-0 mt-8 lg:mt-0"
          >
            {/* Mascot */}
            <motion.img
              src={mascot}
              alt="Mascote CarPost"
              className="w-28 sm:w-36 md:w-44 lg:w-52 h-auto drop-shadow-2xl relative z-10 -mr-4 sm:-mr-6"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Phone mockup */}
            <motion.div
              className="relative z-20"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative w-44 sm:w-52 md:w-60 lg:w-72">
                {/* Phone frame */}
                <div className="relative bg-foreground rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-2.5 shadow-[0_25px_80px_-12px_rgba(0,0,0,0.5)]">
                  {/* Notch */}
                  <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-foreground rounded-b-2xl z-30" />
                  {/* Screen */}
                  <div className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-background">
                    <img
                      src={dashboardMockup}
                      alt="Plataforma CarPost"
                      className="w-full h-auto block"
                    />
                    {/* Screen shine */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                      initial={{ x: "-150%" }}
                      animate={{ x: "150%" }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
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
