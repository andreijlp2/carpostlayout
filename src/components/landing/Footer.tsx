import logoIcon from "@/assets/logoicone.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-[hsl(210,50%,8%)] py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="#" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <img src={logoIcon} alt="CarPost" className="h-10 w-auto" />
              CarPost
            </a>
            <p className="text-sm text-white/50 leading-relaxed">
              A plataforma completa para lojas de veículos venderem mais com automação inteligente.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Produto</h4>
            <ul className="space-y-2">
              {["Funcionalidades", "Planos", "Integrações", "API"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Empresa</h4>
            <ul className="space-y-2">
              {["Sobre", "Blog", "Carreiras", "Contato"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              {["Termos de uso", "Política de privacidade", "Cookies"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} CarPost. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            {["Instagram", "LinkedIn", "YouTube"].map((s) => (
              <a key={s} href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
