import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Zap, Check } from "lucide-react";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const points = [
  "Cadastro rápido de veículos",
  "Anúncios automáticos com IA",
  "Publicação em múltiplos canais",
  "Gestão centralizada de leads",
  "Catálogo online profissional",
  "Relatórios de desempenho",
];

const SolutionSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInLeft}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Sobre a plataforma</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 sm:mb-6 mt-3">
              Uma plataforma completa para vender mais veículos
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              O CarPost centraliza tudo o que sua loja precisa: do cadastro do veículo até a geração de leads, tudo em um único painel.
            </p>
            <motion.div
              className="grid sm:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {points.map((p, i) => (
                <motion.div key={i} variants={fadeInUp} custom={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{p}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInRight}
            className="relative"
          >
            <div className="relative">
              <img
                src={dashboardMockup}
                alt="Dashboard CarPost"
                className="rounded-2xl shadow-hero border border-border"
              />
              {/* Experience badge */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-5 shadow-xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="text-3xl font-extrabold">24</div>
                <div className="text-xs text-primary-foreground/80 font-semibold">Meses de<br />Experiência</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
