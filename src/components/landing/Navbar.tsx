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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-primary/5 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 sm:h-18 md:h-20 lg:h-24 items-center justify-between px-4 md:px-6 lg:px-8">
        <a href="#" className="flex items-center">
          <img
            src={scrolled ? logoColor : logoCar}
            alt="CarPost"
            className="h-[40px] sm:h-[50px] md:h-[60px] lg:h-[80px] w-auto py-1 sm:py-2 lg:py-3 transition-all duration-300"
          />
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {["funcionalidades", "como-funciona", "planos", "depoimentos"].map((id) => {
            const labels: Record<string, string> = { funcionalidades: "Funcionalidades", "como-funciona": "Como funciona", planos: "Planos", depoimentos: "Depoimentos" };
            return (
              <a key={id} href={`#${id}`} className={`text-xs md:text-sm transition-colors whitespace-nowrap ${scrolled ? "text-muted-foreground hover:text-foreground" : "text-foreground/70 hover:text-foreground"}`}>
                {labels[id]}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <Button variant="ghost" size="sm" className={`text-xs md:text-sm ${scrolled ? "text-muted-foreground hover:text-foreground" : "text-foreground/70 hover:text-foreground"}`}>
            Entrar
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-semibold text-xs md:text-sm px-3 lg:px-4">
            Começar agora
          </Button>
        </div>

        <button className={`md:hidden ${scrolled ? "text-foreground" : "text-foreground"}`} onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-border px-4 pb-4 animate-fade-in">
          <div className="flex flex-col gap-3 pt-2">
            <a href="#funcionalidades" className="text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setOpen(false)}>Funcionalidades</a>
            <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setOpen(false)}>Como funciona</a>
            <a href="#planos" className="text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setOpen(false)}>Planos</a>
            <a href="#depoimentos" className="text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setOpen(false)}>Depoimentos</a>
            <Button size="sm" className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Começar agora
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
