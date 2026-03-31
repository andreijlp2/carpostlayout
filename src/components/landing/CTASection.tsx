import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SocialButtons } from "./SocialButtons";

const perks = [
  "7 dias grátis, sem cartão",
  "Cancele quando quiser",
  "Suporte incluso",
];

const CTASection = () => {
  return (
    <section id="contato" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Fundo gradiente rico */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(260,90%,45%)] via-[hsl(250,85%,50%)] to-[hsl(215,100%,48%)]" />

          {/* Grade de pontos */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px"
          }} />

          {/* Brilhos flutuantes */}
          <motion.div
            className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          {/* Formas geométricas decorativas */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-2 border-white/15 rounded-2xl"
            animate={{ rotate: [0, 15, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-8 right-12 w-10 h-10 border-2 border-white/10 rounded-full"
            animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 left-12 w-5 h-5 bg-white/10 rounded-full"
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Conteúdo */}
          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 lg:px-24">
            <div className="max-w-3xl mx-auto text-center">

              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Comece hoje mesmo
              </motion.div>

              {/* Título */}
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-6xl font-extrabold font-heading text-white leading-tight mb-6 drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Automatize sua Loja e{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Venda Mais</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-2 bg-[#f37020]/60 rounded-full -z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                </span>
              </motion.h2>

              {/* Subtítulo */}
              <motion.p
                className="text-white/70 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                Junte-se a mais de 300 lojas que já transformaram seu marketing com o CarPost.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.a
                  href="#planos"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-[#f37020] hover:bg-[#f78f1e] text-white font-bold text-base shadow-2xl shadow-orange-500/40 transition-all duration-300 uppercase tracking-wide"
                >
                  TESTE GRÁTIS POR 7 DIAS
                  <ArrowRight className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="#planos"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold text-base hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  Ver Planos
                </motion.a>
              </motion.div>

              {/* Perks */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                {perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2 text-white/70 text-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-300" />
                    </div>
                    {perk}
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
