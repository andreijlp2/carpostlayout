import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { ClipboardList, Wand2, Share2, TrendingUp } from "lucide-react";

const steps = [
  { icon: ClipboardList, step: "01", title: "Cadastre os veículos", desc: "Cadastre os veículos da sua loja de forma rápida e organizada." },
  { icon: Wand2, step: "02", title: "Anúncios automáticos", desc: "O sistema gera anúncios e descrições automaticamente com IA." },
  { icon: Share2, step: "03", title: "Publique em todos os canais", desc: "Publique em redes sociais e marketplaces com um clique." },
  { icon: TrendingUp, step: "04", title: "Receba leads e venda", desc: "Receba leads qualificados e venda mais carros todos os dias." },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">Como funciona</h2>
          <p className="text-muted-foreground text-lg">Em 4 passos simples, sua loja começa a vender mais.</p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {steps.map((s, i) => (
            <motion.div key={i} variants={fadeInUp} custom={i} className="relative text-center">
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-border"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                />
              )}
              <motion.div
                className="relative z-10 w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5"
                whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "hsl(210 100% 50% / 0.15)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <s.icon className="h-8 w-8 text-primary" />
              </motion.div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Passo {s.step}</span>
              <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
