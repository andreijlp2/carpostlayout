import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/hooks/use-scroll-animation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const features = [
  "Criação automática de anúncios",
  "Geração de legendas por IA",
  "Integração com Facebook e Instagram",
  "Biblioteca de templates",
  "Agendamento de posts",
  "Automação de marketing",
];

const AboutSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInLeft}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-hero">
              <img
                src={dashboardMockup}
                alt="Dashboard CarPost"
                className="w-full h-auto rounded-2xl"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-4 sm:right-4 bg-primary text-primary-foreground rounded-2xl p-5 shadow-hero"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
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
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Sobre a Plataforma</span>
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
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{f}</span>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-semibold">
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
