import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoCar from "@/assets/logocar1.png";
import logoColor from "@/assets/logocolor.png";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/97 backdrop-blur-xl shadow-lg shadow-primary/[0.04] border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 sm:h-18 md:h-20 lg:h-[88px] items-center justify-between px-4 md:px-6 lg:px-8">
        <a href="#" className="flex items-center">
          <img
            src={scrolled ? logoColor : logoCar}
            alt="CarPost"
            className="h-[38px] sm:h-[45px] md:h-[55px] lg:h-[70px] w-auto transition-all duration-300"
          />
        </a>

        <div className="hidden md:flex items-center gap-5 lg:gap-8">
          {["funcionalidades", "como-funciona", "planos", "depoimentos"].map((id) => {
            const labels: Record<string, string> = { funcionalidades: "Funcionalidades", "como-funciona": "Como funciona", planos: "Planos", depoimentos: "Depoimentos" };
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`text-[13px] md:text-sm font-bold transition-colors whitespace-nowrap relative group ${
                  scrolled
                    ? "text-foreground/70 hover:text-primary"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {labels[id]}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${scrolled ? "bg-primary" : "bg-accent"}`} />
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={`text-[13px] md:text-sm font-bold ${
              scrolled
                ? "text-foreground/70 hover:text-primary"
                : "text-white/75 hover:text-white hover:bg-white/10"
            }`}
          >
            Entrar
          </Button>
          <Button
            size="sm"
            className={`font-bold text-[13px] md:text-sm px-5 rounded-full shadow-md transition-all duration-300 ${
              scrolled
                ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent/20"
                : "bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent/25"
            }`}
          >
            Começar agora
          </Button>
        </div>

        <button
          className={`md:hidden p-1 ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border px-4 pb-5 animate-fade-in shadow-xl">
          <div className="flex flex-col gap-1 pt-2">
            {[
              { id: "funcionalidades", label: "Funcionalidades" },
              { id: "como-funciona", label: "Como funciona" },
              { id: "planos", label: "Planos" },
              { id: "depoimentos", label: "Depoimentos" },
            ].map(({ id, label }) => (
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
              <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold rounded-full shadow-md">
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
