import { Clock, Megaphone, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";

const services = [
  { icon: Clock, title: "Automação de Anúncios", desc: "Crie anúncios profissionais automaticamente e economize horas do seu dia com inteligência artificial." },
  { icon: Megaphone, title: "Publicação Multi-canal", desc: "Publique em Facebook, OLX e outros portais com um único clique. Alcance máximo sem esforço." },
  { icon: Users, title: "Gestão de Leads", desc: "Centralize todos os contatos em um painel organizado. Nunca mais perca uma oportunidade de venda." },
  { icon: Globe, title: "Catálogo Online", desc: "Tenha um site profissional da sua loja com todos os veículos disponíveis, atualizado automaticamente." },
];

const ProblemsSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="section-subtitle text-primary">O que oferecemos</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Soluções completas para sua loja de veículos crescer de forma inteligente.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {services.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.3 }}
              className="group bg-card rounded-xl p-7 sm:p-8 shadow-card border border-border hover:shadow-card-hover transition-all duration-400 cursor-default relative overflow-hidden text-center"
            >
              {/* Top gradient bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              
              <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:shadow-glow transition-all duration-400">
                <p.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-400" />
              </div>
              <h3 className="font-bold text-foreground mb-3 text-lg">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              
              <motion.div
                className="mt-5 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                Saiba mais →
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemsSection;
