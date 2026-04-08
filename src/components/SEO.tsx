import { HelmetProvider } from "react-helmet-async";

interface SEOProps {
  children: React.ReactNode;
}

const SEO = ({ children }: SEOProps) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default SEO;
