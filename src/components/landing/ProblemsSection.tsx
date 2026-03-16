import { Clock, Megaphone, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";

const problems = [
  { icon: Clock, title: "Perda de tempo criando anúncios", desc: "Criar anúncios manualmente para cada veículo consome horas preciosas que poderiam ser usadas para vender." },
  { icon: Megaphone, title: "Dificuldade para divulgar veículos", desc: "Publicar em vários canais é trabalhoso e muitas lojas acabam ficando limitadas a poucos portais." },
  { icon: Users, title: "Leads desorganizados", desc: "Sem um sistema, contatos se perdem no WhatsApp, e-mail e ligações. Oportunidades escapam todos os dias." },
  { icon: Globe, title: "Falta de presença digital", desc: "Muitas lojas não têm site próprio e dependem apenas de marketplaces para serem encontradas." },
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
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Desafios do mercado</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 mt-3">
            Os maiores desafios das lojas de veículos
          </h2>
          <p className="text-muted-foreground text-lg">
            Se você enfrenta algum desses problemas, o CarPost foi feito para você.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {problems.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="group bg-card rounded-xl p-7 shadow-card border border-border hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 cursor-default relative overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <p.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-lg">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemsSection;
