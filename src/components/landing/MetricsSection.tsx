import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";

const metrics = [
  { value: "+10.000", label: "Anúncios gerados" },
  { value: "+3.000", label: "Lojas na plataforma" },
  { value: "+50.000", label: "Posts publicados" },
  { value: "+200M", label: "Visualizações" },
];

const MetricsSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-hero relative overflow-hidden">
      {/* Decorative */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              className="text-center"
            >
              <motion.div
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {metric.value}
              </motion.div>
              <div className="text-primary-foreground/60 text-sm sm:text-base font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsSection;
