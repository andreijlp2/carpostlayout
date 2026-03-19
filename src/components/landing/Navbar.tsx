import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoCar from "@/assets/logocar1.png";
import logoColor from "@/assets/logocolor.png";

const navLinks = [
  { id: "funcionalidades", label: "Funcionalidades" },
  { id: "como-funciona", label: "Como Funciona" },
  { id: "planos", label: "Planos" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "contato", label: "Contato" },
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
          ? "bg-card/95 backdrop-blur-lg shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 sm:h-18 md:h-20 lg:h-24 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src={scrolled ? logoColor : logoCar}
            alt="CarPost"
            className="h-[36px] sm:h-[44px] md:h-[52px] lg:h-[64px] w-auto transition-all duration-300"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                scrolled ? "text-foreground" : "text-white/90 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={`font-medium ${
              scrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white hover:bg-white/10"
            }`}
          >
            Entrar
          </Button>
          <Button
            size="sm"
            className="bg-[#16cbbe] text-white hover:brightness-110 shadow-md font-semibold px-6 rounded-full"
          >
            Começar Agora
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-card/95 backdrop-blur-lg border-t border-border px-4 pb-4 animate-fade-in">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm font-medium text-foreground hover:text-primary py-3 px-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <Button
              size="sm"
              className="w-full mt-3 bg-[#16cbbe] text-white hover:brightness-110 font-semibold rounded-full"
            >
              Começar Agora
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
