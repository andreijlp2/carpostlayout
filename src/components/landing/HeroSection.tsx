import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, TrendingUp, Zap } from "lucide-react";
import heroBottomShape from "@/assets/hero-bottom-shape.png";
import { motion } from "framer-motion";
import heroMockup from "@/assets/hero-mockup.png";

const stats = [
  { icon: TrendingUp, value: "+300", label: "Lojas Ativas" },
  { icon: Zap,        value: "+50k", label: "Anúncios Gerados" },
  { icon: Star,       value: "4.9★", label: "Avaliação Média" },
];

const HeroSection = () => {
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

        {/* Mini cards de posts sociais — simulando publicações em tempo real */}

        {[
          {
            platform: "facebook",
            color: "#1877F2",
            label: "Facebook",
            car: "Hyundai HB20 2023",
            price: "R$ 72.900",
            likes: "128",
            comments: "34",
            carGradient: "from-blue-900 to-slate-700",
            pos: "top-[14%] left-[2%]",
            delay: 0,
            rotate: "-rotate-3",
            scale: "scale-90",
          },
          {
            platform: "instagram",
            color: "#E1306C",
            label: "Instagram",
            car: "Toyota Corolla XEi",
            price: "R$ 148.000",
            likes: "342",
            comments: "57",
            carGradient: "from-rose-900 to-pink-800",
            pos: "top-[8%] right-[2%]",
            delay: 1.8,
            rotate: "rotate-2",
            scale: "scale-95",
          },
          {
            platform: "whatsapp",
            color: "#25D366",
            label: "WhatsApp",
            car: "Honda Civic 2022",
            price: "R$ 119.900",
            likes: "89",
            comments: "21",
            carGradient: "from-emerald-900 to-teal-800",
            pos: "bottom-[38%] right-[1%]",
            delay: 3.2,
            rotate: "rotate-1",
            scale: "scale-[0.88]",
          },
          {
            platform: "olx",
            color: "#FF6600",
            label: "OLX",
            car: "Chevrolet Onix Plus",
            price: "R$ 89.500",
            likes: "56",
            comments: "12",
            carGradient: "from-orange-900 to-amber-800",
            pos: "bottom-[42%] left-[1%]",
            delay: 2.5,
            rotate: "-rotate-2",
            scale: "scale-[0.85]",
          },
          {
            platform: "youtube",
            color: "#FF0000",
            label: "YouTube",
            car: "Jeep Renegade Sport",
            price: "R$ 134.990",
            likes: "211",
            comments: "43",
            carGradient: "from-red-900 to-rose-800",
            pos: "top-[52%] left-[3%]",
            delay: 4,
            rotate: "rotate-3",
            scale: "scale-[0.82]",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            className={`absolute ${card.pos} ${card.rotate} ${card.scale} pointer-events-none z-0`}
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={{
              opacity: [0, 0.92, 0.92, 0],
              y: [30, 0, -10, -30],
            }}
            transition={{
              duration: 7,
              delay: card.delay,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          >
            <div className="w-52 rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md shadow-2xl">
              {/* Header da plataforma */}
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10"
                style={{ background: `${card.color}22` }}>
                {/* Ícone da rede */}
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: card.color }}>
                  {card.platform === "facebook" && (
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                  {card.platform === "instagram" && (
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  )}
                  {card.platform === "whatsapp" && (
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  )}
                  {card.platform === "olx" && (
                    <span className="text-[8px] font-black text-white">OLX</span>
                  )}
                  {card.platform === "youtube" && (
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )}
                </div>
                <span className="text-[10px] font-bold text-white/80">{card.label}</span>
                {/* Badge "Publicado por IA" */}
                <span className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">IA ✓</span>
              </div>

              {/* Imagem do carro (gradiente simulado) */}
              <div className={`h-24 bg-gradient-to-br ${card.carGradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                {/* Preço overlay */}
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-[10px] font-black text-white">{card.price}</span>
                </div>
              </div>

              {/* Info */}
              <div className="px-3 py-2.5">
                <p className="text-[11px] font-bold text-white/90 truncate mb-1">{card.car}</p>
                <p className="text-[9px] text-white/40 mb-2 leading-relaxed">Publicado automaticamente pelo CarPost IA</p>
                {/* Engajamento */}
                <div className="flex items-center gap-3">
                  <span className="text-[9px] text-white/50 flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    {card.likes}
                  </span>
                  <span className="text-[9px] text-white/50 flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    {card.comments}
                  </span>
                  {/* Pulsing dot — ao vivo */}
                  <span className="ml-auto text-[8px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ao vivo
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
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
                  size="xl"
                  className="border-2 border-white/25 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/40 font-semibold rounded-2xl px-8 w-full sm:w-auto gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="h-3 w-3 ml-0.5 fill-white text-white" />
                  </div>
                  Ver Demonstração
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

          {/* Right — Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Anel de glow atrás do mockup */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-violet-400/20 rounded-3xl blur-3xl scale-90" />

            <motion.img
              src={heroMockup}
              alt="Plataforma CarPost — Dashboard e App"
              // @ts-ignore
              fetchpriority="high"
              className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl h-auto drop-shadow-[0_30px_80px_rgba(100,60,240,0.35)]"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
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
