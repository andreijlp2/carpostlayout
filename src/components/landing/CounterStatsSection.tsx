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
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/10">
        <Icon className="h-7 w-7 text-accent" />
      </div>
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2">
        {count.toLocaleString("pt-BR")}{item.suffix}
      </div>
      <div className="text-sm sm:text-base text-white/60 font-medium">{item.label}</div>
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
    <section ref={sectionRef} className="relative py-20 lg:py-24 bg-gradient-hero overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-8 left-[10%] w-12 h-12 border-2 border-white/10 rounded-full"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-8 right-[10%] w-8 h-8 bg-white/5 rounded-lg rotate-45"
        animate={{ rotate: [45, 135, 45] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
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
