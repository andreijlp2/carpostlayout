import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { ClipboardList, Wand2, Share2 } from "lucide-react";

const steps = [
  { icon: ClipboardList, step: "01", title: "Cadastre seus Veículos", desc: "Adicione os veículos do seu estoque de forma rápida e organizada com dados completos." },
  { icon: Wand2, step: "02", title: "Gere Anúncios Automaticamente", desc: "A IA cria textos profissionais, legendas e descrições otimizadas para cada veículo." },
  { icon: Share2, step: "03", title: "Publique em Todas as Redes", desc: "Publique automaticamente no Facebook, Instagram, OLX e outros portais com um clique." },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Processo Simples</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-foreground mt-3 mb-4">
            Como Funciona
          </h2>
          <p className="text-muted-foreground text-lg">
            Em 3 passos simples, sua loja começa a vender mais todos os dias.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {/* Connecting line */}
          <div className="hidden sm:block absolute top-16 left-[20%] right-[20%] h-[2px] bg-border z-0">
            <motion.div
              className="h-full bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{ originX: 0 }}
            />
          </div>

          {steps.map((s, i) => (
            <motion.div key={i} variants={fadeInUp} custom={i} className="relative text-center z-10">
              <motion.div
                className="w-32 h-32 rounded-full bg-card border-2 border-border flex flex-col items-center justify-center mx-auto mb-6 shadow-card group hover:border-primary hover:shadow-card-hover transition-all duration-500"
                whileHover={{ scale: 1.08 }}
              >
                <s.icon className="h-10 w-10 text-primary mb-1" />
                <span className="text-xs font-bold text-primary">{s.step}</span>
              </motion.div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
