import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoCar from "@/assets/logocar1.png";
import logoColor from "@/assets/logocolor.png";

const navLinks = [
  { id: "home", label: "Home", href: "#" },
  { id: "funcionalidades", label: "Funcionalidades", href: "#servicos" },
  { id: "como-funciona", label: "Como Funciona", href: "#como-funciona" },
  { id: "planos", label: "Planos", href: "#planos" },
  { id: "depoimentos", label: "Depoimentos", href: "#depoimentos" },
  { id: "contato", label: "Contato", href: "#contato" },
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
          ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6 lg:px-8">
        <a href="#" className="flex items-center">
          <img
            src={scrolled ? logoColor : logoCar}
            alt="CarPost"
            className="h-[36px] sm:h-[42px] md:h-[48px] lg:h-[56px] w-auto transition-all duration-300"
          />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-muted-foreground hover:text-primary"
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button
            size="sm"
            className="bg-cta text-cta-foreground hover:opacity-90 shadow-md font-semibold px-6 rounded-full"
          >
            Começar Agora
          </Button>
        </div>

        <button
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border px-4 pb-4 animate-fade-in">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary py-3 px-2 rounded-lg hover:bg-accent transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              size="sm"
              className="w-full mt-3 bg-cta text-cta-foreground hover:opacity-90 font-semibold rounded-full"
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
