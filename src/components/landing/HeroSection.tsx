import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import dashboardMockup from "@/assets/dashboard-mockup.png";
import heroBg from "@/assets/hero-bg.jpg";

const metrics = [
  { value: "+2.000", label: "veículos anunciados" },
  { value: "+500", label: "leads gerados por mês" },
  { value: "+300", label: "lojas usando a plataforma" },
];

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
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
              className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white mb-6 border border-white/20"
            >
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              Plataforma #1 para lojas de veículos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6"
            >
              Venda mais carros com{" "}
              <span className="text-white/90 drop-shadow-lg">automação inteligente</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-white/80 max-w-lg mb-8 leading-relaxed"
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
                <Button size="xl" className="bg-white text-[hsl(210,100%,40%)] hover:bg-white/90 shadow-lg font-bold">
                  Começar agora
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="xl" className="border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold">
                  <Play className="mr-1 h-4 w-4" />
                  Testar grátis
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right – Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-white/20">
                <img
                  src={dashboardMockup}
                  alt="Dashboard do CarPost mostrando gestão de veículos"
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
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
                className="text-3xl lg:text-4xl font-extrabold text-white"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {m.value}
              </motion.div>
              <div className="text-sm text-white/70 mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
