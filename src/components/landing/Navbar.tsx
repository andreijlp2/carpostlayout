import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoCar from "@/assets/logocar1.png";

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
          ? "bg-[hsl(210,100%,30%)]/95 backdrop-blur-md shadow-lg shadow-[hsl(210,100%,50%)/0.15]"
          : "bg-transparent"
      }`}
    >
      {/* Subtle bottom glow */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[hsl(185,100%,50%)] to-transparent opacity-50" />
      )}

      <div className="container mx-auto flex h-24 items-center justify-between px-4 lg:px-8">
        <a href="#" className="flex items-center">
          <img
            src={logoCar}
            alt="CarPost"
            className="h-[80px] w-auto py-3"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#funcionalidades" className="text-sm text-white/70 hover:text-white transition-colors">Funcionalidades</a>
          <a href="#como-funciona" className="text-sm text-white/70 hover:text-white transition-colors">Como funciona</a>
          <a href="#planos" className="text-sm text-white/70 hover:text-white transition-colors">Planos</a>
          <a href="#depoimentos" className="text-sm text-white/70 hover:text-white transition-colors">Depoimentos</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
            Entrar
          </Button>
          <Button size="sm" className="bg-white text-[hsl(210,100%,40%)] hover:bg-white/90 shadow-md font-semibold">
            Começar agora
          </Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[hsl(210,100%,25%)]/95 backdrop-blur-md border-t border-white/10 px-4 pb-4 animate-fade-in">
          <div className="flex flex-col gap-3 pt-2">
            <a href="#funcionalidades" className="text-sm text-white/70 hover:text-white py-2" onClick={() => setOpen(false)}>Funcionalidades</a>
            <a href="#como-funciona" className="text-sm text-white/70 hover:text-white py-2" onClick={() => setOpen(false)}>Como funciona</a>
            <a href="#planos" className="text-sm text-white/70 hover:text-white py-2" onClick={() => setOpen(false)}>Planos</a>
            <a href="#depoimentos" className="text-sm text-white/70 hover:text-white py-2" onClick={() => setOpen(false)}>Depoimentos</a>
            <Button size="sm" className="w-full mt-2 bg-white text-[hsl(210,100%,40%)] hover:bg-white/90 font-semibold">
              Começar agora
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
