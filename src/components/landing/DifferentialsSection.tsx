import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/hooks/use-scroll-animation";
import { Rocket, MousePointerClick, Plug, Sparkles, Globe, Check } from "lucide-react";
import coresPng from "@/assets/cores.png";

const leftPoints = [
  { icon: Rocket, text: "Automação de marketing" },
  { icon: MousePointerClick, text: "Interface simples" },
  { icon: Plug, text: "Integração com marketplaces" },
];

const rightPoints = [
  { icon: Sparkles, text: "Gerador de anúncios com IA" },
  { icon: Globe, text: "Catálogo online automático" },
];

const DifferentialsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/60">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Por que nos escolher?</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 mt-3">Por que escolher o CarPost</h2>
          <p className="text-muted-foreground text-lg">Diferenciais que fazem do CarPost a melhor escolha para sua loja.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
          >
            <ul className="space-y-5">
              {[...leftPoints, ...rightPoints].map((d, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Check className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{d.text}</h4>
                    <p className="text-sm text-muted-foreground">
                      {d.icon === Rocket && "Seus anúncios são criados e publicados automaticamente."}
                      {d.icon === MousePointerClick && "Qualquer pessoa da sua equipe consegue usar sem treinamento."}
                      {d.icon === Plug && "Conecte com OLX, Facebook e outros portais de uma vez."}
                      {d.icon === Sparkles && "Textos profissionais gerados em segundos pela inteligência artificial."}
                      {d.icon === Globe && "Seu site de veículos é gerado e atualizado automaticamente."}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
          >
            <img
              src={coresPng}
              alt="CarPost diferenciais"
              className="rounded-2xl shadow-hero"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
