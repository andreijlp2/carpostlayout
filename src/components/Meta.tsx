import { Helmet } from "react-helmet-async";

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const Meta = ({ 
  title = "CarPost — Sistema de Marketing Automotivo com IA",
  description = "Automatize o marketing da sua loja de veículos. Crie anúncios profissionais, gere legendas com IA e publique automaticamente no Facebook, Instagram, OLX e portais. Teste grátis por 7 dias.",
  image = "https://carpost.com.br/og-image.png",
  url = "https://carpost.com.br/"
}: MetaProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="keywords" content="marketing automotivo, anúncios de veículos, automação de posts, IA para lojas de carros, CarPost, publicação automática, Facebook para lojas" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="CarPost" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={url} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    <link rel="canonical" href={url} />
  </Helmet>
);

export default Meta;
