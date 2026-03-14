import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Zap, Check } from "lucide-react";

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
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground mb-6">
              <Zap className="h-4 w-4" />
              Solução completa
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 sm:mb-6">
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
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{p}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInRight}
          >
            <div className="relative bg-accent rounded-3xl p-8 lg:p-12">
              <div className="space-y-6">
                {[
                  { label: "Veículos anunciados", value: "2.847", change: "+12%" },
                  { label: "Leads este mês", value: "534", change: "+28%" },
                  { label: "Taxa de conversão", value: "8.2%", change: "+3%" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-card rounded-xl p-5 shadow-card border border-border"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                        <div className="text-2xl font-bold text-foreground mt-1">{stat.value}</div>
                      </div>
                      <motion.span
                        className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                      >
                        {stat.change}
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
