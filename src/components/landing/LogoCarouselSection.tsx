import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SocialButtons } from "./SocialButtons";
import { API_URL, IMAGE_BASE_URL } from "@/lib/api-config";

import logoAm from "@/assets/logo-am.png";
import logoAutototti from "@/assets/logo-autototti.png";
import logoBeto from "@/assets/logo-beto.png";
import logoDs7 from "@/assets/logo-ds7.png";
import logoFt from "@/assets/logo-ft.png";
import logoPassarin from "@/assets/logo-passarin.png";
import logoStock from "@/assets/logo-stock.png";
import logoTrotz from "@/assets/logo-trotz.png";
import logoVilmar from "@/assets/logo-vilmar.png";

const defaultLogos = [
  { src: logoAm, name: "AM Multimarcas", image_url: "" },
  { src: logoAutototti, name: "Auto Totti", image_url: "" },
  { src: logoBeto, name: "Beto Multimarcas", image_url: "" },
  { src: logoDs7, name: "DS7 Cars", image_url: "" },
  { src: logoFt, name: "FT Multimarcas", image_url: "" },
  { src: logoPassarin, name: "Patrick Passarin", image_url: "" },
  { src: logoStock, name: "Stock Car Veículos", image_url: "" },
  { src: logoTrotz, name: "Trotz Veículos", image_url: "" },
  { src: logoVilmar, name: "Vilmar Veículos", image_url: "" },
];

const LogoCard = ({ logo, isCustom = false, imageBaseUrl = "" }) => {
  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    // Se imageBaseUrl estiver definido e a URL ja começar com ele, não duplica
    if (imageBaseUrl && url.startsWith(imageBaseUrl)) return url;
    // Garante que não haja barras duplas ao concatenar
    const cleanBase = imageBaseUrl.endsWith("/") ? imageBaseUrl.slice(0, -1) : imageBaseUrl;
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;
    return `${cleanBase}${cleanUrl}`;
  };

  const src = isCustom ? getImageUrl(logo.image_url) : logo.src;
  const name = logo.name;

  return (
    <div className="group relative flex-shrink-0 mx-3">
      <div className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-default overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
          <img
            src={src}
            alt={name}
            className="max-h-9 max-w-9 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
          />
        </div>

        <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
          {name}
        </span>

        <div className="w-4 h-4 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 flex items-center justify-center transition-all duration-300 ml-1 flex-shrink-0">
          <svg className="w-2.5 h-2.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const LogoCarouselSection = () => {
  const [logos, setLogos] = useState(defaultLogos);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const response = await fetch(`${API_URL}/partner-logos`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const customLogos = data.map(logo => ({
            name: logo.name,
            image_url: logo.image_url,
            src: null
          }));
          setLogos(customLogos);
        } else {
          setLogos(defaultLogos);
        }
      } else {
        setLogos(defaultLogos);
      }
    } catch (error) {
      console.log("Usando logos padrão");
    }
  };

  const row1 = [...logos, ...logos, ...logos];
  const row2 = [...[...logos].reverse(), ...[...logos].reverse(), ...[...logos].reverse()];

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 via-transparent to-transparent" />

      <motion.div
        className="container mx-auto px-4 lg:px-8 text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SocialButtons className="mb-16" />

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border" />
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            +{logos.length > 9 ? logos.length : '300'} lojas ativas
          </span>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground mb-3">
          Empresas que confiam no{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
            CarPost
          </span>
        </h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto">
          Centenas de lojas de veículos já automatizaram seu marketing com nossa plataforma.
        </p>
      </motion.div>

      <div className="space-y-4">
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="marquee-track w-max flex">
            {row1.map((logo, i) => (
              <LogoCard key={i} logo={logo} isCustom={!!logo.image_url} imageBaseUrl={IMAGE_BASE_URL} />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="marquee-track-reverse w-max flex">
            {row2.map((logo, i) => (
              <LogoCard key={i} logo={logo} isCustom={!!logo.image_url} imageBaseUrl={IMAGE_BASE_URL} />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="container mx-auto px-4 lg:px-8 mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { value: `+${logos.length > 9 ? logos.length : '300'}`, label: "Lojas Parceiras" },
            { value: "98%", label: "Satisfação dos Clientes" },
            { value: "+50k", label: "Anúncios Gerados" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div>
                <div className="text-2xl font-black text-foreground font-heading">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
              <div className="w-px h-8 bg-border last:hidden" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default LogoCarouselSection;
