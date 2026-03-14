import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <a href="#" className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Car className="h-6 w-6 text-primary" />
          CarPost
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#funcionalidades" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</a>
          <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Como funciona</a>
          <a href="#planos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Planos</a>
          <a href="#depoimentos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Depoimentos</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Entrar</Button>
          <Button variant="default" size="sm">Começar agora</Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 animate-fade-in">
          <div className="flex flex-col gap-3">
            <a href="#funcionalidades" className="text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>Funcionalidades</a>
            <a href="#como-funciona" className="text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>Como funciona</a>
            <a href="#planos" className="text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>Planos</a>
            <a href="#depoimentos" className="text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>Depoimentos</a>
            <Button variant="default" size="sm" className="w-full mt-2">Começar agora</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
