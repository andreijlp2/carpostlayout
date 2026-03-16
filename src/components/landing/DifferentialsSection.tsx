import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, fadeInUp } from "@/hooks/use-scroll-animation";
import { Check } from "lucide-react";
import coresPng from "@/assets/cores.png";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const leftFeatures = [
  { title: "Automação de marketing", desc: "Seus anúncios são criados e publicados automaticamente." },
  { title: "Interface simples", desc: "Qualquer pessoa da sua equipe consegue usar sem treinamento." },
  { title: "Integração com marketplaces", desc: "Conecte com OLX, Facebook e outros portais de uma vez." },
];

const rightFeatures = [
  { title: "Gerador de anúncios com IA", desc: "Textos profissionais gerados em segundos pela inteligência artificial." },
  { title: "Catálogo online automático", desc: "Seu site de veículos é gerado e atualizado automaticamente." },
  { title: "Relatórios completos", desc: "Acompanhe todas as métricas e resultados em tempo real." },
];

const DifferentialsSection = () => {
  return (
    <>
      {/* Block 1 */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="section-subtitle text-primary">Por que nos escolher?</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
              Proteja sua loja com a melhor plataforma digital
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Diferenciais que fazem do CarPost a melhor escolha para sua loja de veículos.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft}>
              <img src={coresPng} alt="CarPost plataforma" className="rounded-2xl shadow-hero" />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight}>
              <ul className="space-y-7">
                {leftFeatures.map((d, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-glow transition-all duration-400">
                      <Check className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 text-base">{d.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Block 2 */}
      <section className="py-24 lg:py-32 bg-secondary/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft}>
              <span className="section-subtitle text-primary">Confiança garantida</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-5">
                Transformação digital para sua loja de veículos
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-10 leading-relaxed">
                Com o CarPost, sua loja ganha presença digital profissional e ferramentas de automação que aumentam suas vendas.
              </p>

              <ul className="space-y-6">
                {rightFeatures.map((d, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:shadow-lg transition-all duration-400">
                      <Check className="h-5 w-5 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 text-base">{d.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight}>
              <img src={dashboardMockup} alt="CarPost dashboard" className="rounded-2xl shadow-hero" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DifferentialsSection;
