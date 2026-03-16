import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoCar from "@/assets/logocar1.png";
import logoColor from "@/assets/logocolor.png";

const navLinks = [
  { id: "funcionalidades", label: "Funcionalidades" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "planos", label: "Planos" },
  { id: "depoimentos", label: "Depoimentos" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/[0.03] border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 sm:h-18 md:h-20 lg:h-[88px] items-center justify-between px-4 md:px-6 lg:px-8">
        <a href="#" className="flex items-center">
          <img
            src={scrolled ? logoColor : logoCar}
            alt="CarPost"
            className="h-[40px] sm:h-[50px] md:h-[60px] lg:h-[80px] w-auto transition-all duration-300"
          />
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-7">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-xs lg:text-sm font-bold transition-colors whitespace-nowrap relative group ${
                scrolled
                  ? "text-foreground/70 hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  scrolled ? "bg-primary" : "bg-accent"
                }`}
              />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs lg:text-sm font-bold ${
              scrolled
                ? "text-foreground/70 hover:text-primary"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Entrar
          </Button>
          <Button
            size="sm"
            className="font-bold text-xs lg:text-sm px-5 lg:px-6 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-md shadow-accent/20 transition-all duration-300"
          >
            Começar agora
          </Button>
        </div>

        <button
          className={`md:hidden p-1.5 ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-5 animate-fade-in shadow-xl">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm font-bold text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg py-2.5 px-3 transition-colors"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="pt-3 mt-1 border-t border-border">
              <Button
                size="sm"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold rounded-full shadow-md"
              >
                Começar agora
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
