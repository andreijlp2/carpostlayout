import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const points = [
  "Cadastro rápido de veículos",
  "Anúncios automáticos com IA",
  "Publicação em múltiplos canais",
  "Gestão centralizada de leads",
  "Catálogo online profissional",
  "Relatórios de desempenho",
];

const progressBars = [
  { label: "Automação de Marketing", value: 90 },
  { label: "Gestão de Leads", value: 85 },
  { label: "Integração Digital", value: 75 },
];

const SolutionSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInLeft}
            className="relative"
          >
            <div className="relative">
              <img
                src={dashboardMockup}
                alt="Dashboard CarPost"
                className="rounded-2xl shadow-hero"
              />
              {/* Experience badge - like Techvio "24 years" */}
              <motion.div
                className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 bg-accent text-accent-foreground rounded-2xl p-4 sm:p-5 shadow-xl shadow-accent/25"
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 180 }}
              >
                <div className="text-3xl sm:text-4xl font-extrabold leading-none">24</div>
                <div className="text-[10px] sm:text-xs font-bold mt-1 opacity-80">Meses de<br />Experiência</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInRight}
          >
            <span className="section-subtitle text-primary">Sobre a plataforma</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-5">
              Uma plataforma completa para vender mais veículos
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
              O CarPost centraliza tudo o que sua loja precisa: do cadastro do veículo até a geração de leads, tudo em um único painel.
            </p>

            {/* Progress bars like Techvio */}
            <div className="space-y-5 mb-8">
              {progressBars.map((bar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-foreground">{bar.label}</span>
                    <span className="text-sm font-bold text-primary">{bar.value}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-border overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-bold px-8">
                Saiba mais
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
