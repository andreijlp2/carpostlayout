import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/hooks/use-scroll-animation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardMockup from "@/assets/dashboard-mockup.png";
import { useRef } from "react";

const features = [
  "Criação automática de anúncios",
  "Geração de legendas por IA",
  "Integração com Facebook e Instagram",
  "Biblioteca de templates",
  "Agendamento de posts",
  "Automação de marketing",
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image with parallax */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInLeft}
            className="relative"
            style={{ y: imageY }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-hero">
              <img
                src={dashboardMockup}
                alt="Dashboard CarPost"
                className="w-full h-auto rounded-2xl"
              />
              {/* Overlay shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                initial={{ x: "-150%" }}
                whileInView={{ x: "150%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
              />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-4 sm:right-4 bg-hero-gradient text-primary-foreground rounded-2xl p-5 shadow-hero"
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-extrabold font-heading">5+</div>
              <div className="text-sm text-primary-foreground/80">Anos de Experiência</div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInRight}
          >
            <motion.span
              className="text-sm font-semibold text-primary uppercase tracking-widest inline-block"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Sobre a Plataforma
            </motion.span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-foreground mt-3 mb-6">
              Sua loja de veículos com tecnologia de ponta
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              O CarPost centraliza tudo o que sua loja precisa: do cadastro do veículo até a geração de leads qualificados, tudo em um único painel intuitivo.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 group cursor-default"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6 }}
                >
                  <motion.div
                    className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300"
                  >
                    <Check className="h-3.5 w-3.5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </motion.div>
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">{f}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-semibold shadow-lg hover:shadow-hero transition-shadow duration-300">
                Saiba Mais
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
