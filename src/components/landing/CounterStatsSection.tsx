import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/use-scroll-animation";
import { Car, Users, Eye, Trophy } from "lucide-react";

const counters = [
  { icon: Car, value: 2000, suffix: "+", label: "Veículos Anunciados" },
  { icon: Users, value: 300, suffix: "+", label: "Lojas Ativas" },
  { icon: Eye, value: 500, suffix: "+", label: "Leads por Mês" },
  { icon: Trophy, value: 98, suffix: "%", label: "Clientes Satisfeitos" },
];

function useCountUp(end: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };
    ref.current = requestAnimationFrame(animate);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [end, duration, trigger]);

  return count;
}

const CounterItem = ({ item, inView }: { item: typeof counters[0]; inView: boolean }) => {
  const count = useCountUp(item.value, 2200, inView);
  const Icon = item.icon;

  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5 border border-white/10">
        <Icon className="h-7 w-7 text-accent" />
      </div>
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2">
        {count.toLocaleString("pt-BR")}{item.suffix}
      </div>
      <div className="text-sm sm:text-base text-white/55 font-medium">{item.label}</div>
    </div>
  );
};

const CounterStatsSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-28 bg-gradient-hero overflow-hidden">
      <motion.div
        className="absolute top-10 left-[8%] w-14 h-14 border-2 border-white/[0.08] rounded-full"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-[8%] w-10 h-10 bg-white/[0.04] rounded-lg rotate-45"
        animate={{ rotate: [45, 180, 45] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {counters.map((item, i) => (
            <motion.div key={i} variants={fadeInUp} custom={i}>
              <CounterItem item={item} inView={inView} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CounterStatsSection;
