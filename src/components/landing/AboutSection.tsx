import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Wifi, Shield, Wand2, Brain, Share2, LayoutTemplate, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import systemScreenshot from "@/assets/system-screenshot.png";
import { useRef } from "react";

const features = [
  { icon: Wand2,          label: "Geração de Anúncios",       sub: "Automático",                gradient: "from-violet-500 to-indigo-600",  shadow: "shadow-violet-500/20" },
  { icon: Brain,          label: "Legendas Virais com IA",    sub: "Engajamento garantido",    gradient: "from-blue-500 to-cyan-500",      shadow: "shadow-blue-500/20" },
  { icon: Share2,         label: "Publicação Automática",     sub: "Facebook, Instagram e portais", gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20" },
  { icon: LayoutTemplate, label: "Templates Profissionais",   sub: "Vários Modelos Prontos",   gradient: "from-orange-500 to-amber-500",    shadow: "shadow-orange-500/20" },
  { icon: Clock,          label: "Agendamento de Posts",      sub: "Publique no horário certo", gradient: "from-pink-500 to-rose-500",      shadow: "shadow-pink-500/20" },
  { icon: BarChart3,      label: "Automação de Marketing",    sub: "Resultados em tempo real",  gradient: "from-purple-500 to-fuchsia-600", shadow: "shadow-purple-500/20" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-muted/10" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Esquerda — Mockup de Browser */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imageY }}
            className="relative order-2 lg:order-1 w-full max-w-full"
          >
            {/* Sombra de profundidade atrás */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-3xl blur-2xl opacity-50" />

            {/* Frame do computador/browser */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#1e1e2e] w-full max-w-full">
              
              {/* Barra do navegador */}
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2a2a3d] border-b border-white/10">
                {/* Botões semáforo */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
                </div>

                {/* Barra de URL */}
                <div className="flex-1 flex items-center gap-2 bg-[#1e1e2e] rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-white/50 border border-white/10 overflow-hidden">
                  <Shield className="w-3 h-3 text-emerald-400 flex-shrink-0 hidden flex-shrink sm:block" />
                  <span className="text-emerald-400/80 font-mono truncate w-full">app.carpost.com.br/dashboard/marketing</span>
                </div>

                {/* Ícones de ação */}
                <div className="flex items-center gap-2 flex-shrink-0 hidden sm:flex">
                  <Globe className="w-4 h-4 text-white/30" />
                  <Wifi className="w-4 h-4 text-white/30" />
                </div>
              </div>

              {/* Conteúdo — screenshot do sistema */}
              <div className="relative overflow-hidden w-full bg-black">
                <img
                  src={systemScreenshot}
                  alt="CarPost — Painel de Estoque de Veículos"
                  className="w-full h-auto block object-cover"
                  loading="lazy"
                />
                {/* Efeito de shine ao entrar na viewport */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -skew-x-12 pointer-events-none"
                  initial={{ x: "-150%" }}
                  whileInView={{ x: "150%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 1, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Badge flutuante — usuários ativos */}
            <motion.div
              className="absolute -bottom-4 sm:-bottom-5 -right-2 sm:right-6 flex items-center gap-2 sm:gap-3 bg-background border border-border rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-xl z-10 scale-[0.85] sm:scale-100 origin-bottom-right"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: "spring", stiffness: 220 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                <span className="text-lg sm:text-xl">🚗</span>
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-black text-foreground font-heading leading-none whitespace-nowrap">+300</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 whitespace-nowrap">Lojas usando agora</div>
              </div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5 sm:ml-1 flex-shrink-0" />
            </motion.div>

            {/* Badge flutuante — IA */}
            <motion.div
              className="absolute -top-3 sm:-top-4 -left-2 sm:left-6 flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-primary to-violet-600 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg z-10 scale-[0.85] sm:scale-100 origin-top-left"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-base sm:text-lg leading-none">✨</span>
              <span className="text-[10px] sm:text-xs font-bold text-white whitespace-nowrap">IA Integrada</span>
            </motion.div>
          </motion.div>

          {/* Direita — Conteúdo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 w-full max-w-full overflow-hidden sm:overflow-visible"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Sobre a Plataforma
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-foreground mt-3 mb-6 leading-tight">
              Sua loja de veículos com{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
                tecnologia de ponta
              </span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              O CarPost centraliza tudo o que sua loja precisa: do cadastro do veículo até a geração de leads qualificados, tudo em um único painel intuitivo e moderno.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="group relative flex items-center gap-3.5 p-3.5 rounded-xl border border-border bg-card hover:border-white/20 hover:shadow-lg transition-all duration-300 cursor-default overflow-hidden"
                  style={{ boxShadow: undefined }}
                >
                  {/* Glow bg hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${f.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 rounded-xl`} />

                  {/* Ícone */}
                  <div className={`relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-lg ${f.shadow}`}>
                    <f.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Texto */}
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground leading-tight truncate">{f.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{f.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <a 
                  href="https://app.carpost.com.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="bg-gradient-to-r from-primary to-violet-600 text-white hover:opacity-90 rounded-full px-8 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Teste Grátis por 7 Dias
                  </Button>
                </a>
              </motion.div>
              <motion.div whileHover={{ x: 4 }}>
                <a href="#como-funciona" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-300">
                  Ver como funciona
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
