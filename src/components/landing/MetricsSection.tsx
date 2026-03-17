import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Megaphone, Store, Share2, Eye } from "lucide-react";

const counters = [
  { value: 10000, suffix: "+", label: "Anúncios Gerados", icon: Megaphone },
  { value: 3000, suffix: "+", label: "Lojas Usando", icon: Store },
  { value: 50000, suffix: "+", label: "Posts Publicados", icon: Share2 },
  { value: 200, suffix: "M+", label: "Visualizações", icon: Eye },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-heading text-white">
      {count.toLocaleString("pt-BR")}{suffix}
    </div>
  );
}

const MetricsSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-counter-gradient relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-28 sm:w-40 h-28 sm:h-40 border border-white/5 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-36 sm:w-56 h-36 sm:h-56 border border-white/5 rounded-full"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-primary/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-white/50 uppercase tracking-widest">Nossos Números</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white mt-3">
            Resultados que Falam por Si
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
          {counters.map((c, i) => (
            <motion.div
              key={i}
              className="text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 sm:mb-5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <c.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
              </motion.div>
              <AnimatedCounter target={c.value} suffix={c.suffix} />
              <div className="text-white/50 text-xs sm:text-sm lg:text-base mt-1 sm:mt-2 font-medium">{c.label}</div>
              <motion.div
                className="w-10 sm:w-12 h-0.5 bg-primary/30 mx-auto mt-3 sm:mt-4 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
