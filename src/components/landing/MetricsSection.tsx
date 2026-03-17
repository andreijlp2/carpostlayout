import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { useEffect, useRef, useState } from "react";

const counters = [
  { value: 10000, suffix: "+", label: "Anúncios Gerados" },
  { value: 3000, suffix: "+", label: "Lojas Usando" },
  { value: 50000, suffix: "+", label: "Posts Publicados" },
  { value: 200, suffix: "M+", label: "Visualizações" },
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

  const formatNumber = (n: number) => {
    return n.toLocaleString("pt-BR");
  };

  return (
    <div ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white">
      {formatNumber(count)}{suffix}
    </div>
  );
}

const MetricsSection = () => {
  return (
    <section className="py-20 lg:py-24 bg-counter-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/5 rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/3 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {counters.map((c, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              className="text-center"
            >
              <AnimatedCounter target={c.value} suffix={c.suffix} />
              <div className="text-white/60 text-sm sm:text-base mt-2 font-medium">{c.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsSection;
