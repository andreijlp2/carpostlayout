import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Zap } from "lucide-react";
import logoCar from "@/assets/logocar1.png";
import logoColor from "@/assets/logocolor.png";

const navLinks = [
  { label: "Funcionalidades", url: "/#funcionalidades" },
  { label: "Como Funciona",   url: "/#como-funciona" },
  { label: "Planos",          url: "/#planos" },
  { label: "Dúvidas",         url: "/#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-xl shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 sm:h-18 md:h-20 lg:h-24 items-center justify-between px-4 md:px-6 lg:px-8">

        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0">
          <img
            src={scrolled ? logoColor : logoCar}
            alt="CarPost"
            className="h-[36px] sm:h-[44px] md:h-[52px] lg:h-[64px] w-auto transition-all duration-300"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.url}
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive("")}
              className="relative px-4 py-2 group"
            >
              {/* Fundo hover */}
              <motion.span
                className={`absolute inset-0 rounded-xl transition-colors duration-200 ${
                  scrolled ? "bg-muted/0 group-hover:bg-muted" : "bg-white/0 group-hover:bg-white/10"
                }`}
              />
              {/* Texto */}
              <span className={`relative text-sm font-semibold transition-colors duration-200 ${
                scrolled
                  ? "text-foreground/70 group-hover:text-primary"
                  : "text-white/80 group-hover:text-white"
              }`}>
                {item.label}
              </span>
              {/* Indicador underline */}
              <motion.span
                className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: active === item.label ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Botão Entrar */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
              scrolled
                ? "border-border text-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                : "border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/40"
            }`}
          >
            Entrar
          </motion.a>

          {/* Botão Teste */}
          <motion.a
            href="#planos"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f37020] to-[#f59e0b] text-white text-sm font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 overflow-hidden group"
          >
            {/* Brilho animado */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
            <Zap className="w-3.5 h-3.5" />
            <span className="relative">Teste Grátis</span>
            <ArrowRight className="w-3.5 h-3.5 relative group-hover:translate-x-0.5 transition-transform" />
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
            scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
          }`}
          onClick={() => setOpen(!open)}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-card/98 backdrop-blur-xl border-t border-border px-4 pb-6 pt-3 shadow-xl"
          >
            {/* Links */}
            <div className="flex flex-col gap-1 mb-4">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.url}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* CTAs mobile */}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <a
                href="#"
                className="text-center py-3 px-6 rounded-xl border border-border text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-all duration-200"
                onClick={() => setOpen(false)}
              >
                Entrar
              </a>
              <a
                href="#planos"
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#f37020] to-[#f59e0b] text-white text-sm font-bold shadow-lg shadow-orange-500/30"
                onClick={() => setOpen(false)}
              >
                <Zap className="w-4 h-4" />
                Teste Grátis por 7 Dias
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
