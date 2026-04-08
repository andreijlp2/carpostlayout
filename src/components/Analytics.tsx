import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api-config";

const Analytics = () => {
  const [settings, setSettings] = useState({
    google_analytics_id: "",
    google_tag_manager_id: "",
    meta_pixel_id: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_URL}/settings`);
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.log("Backend não disponível, usando configurações padrão");
    }
  };

  // Injeta Google Analytics via DOM sempre que o ID mudar
  useEffect(() => {
    const gaId = settings.google_analytics_id?.trim();
    if (!gaId) return;

    // Evita injeção duplicada
    if (document.getElementById("ga-script")) return;

    const script1 = document.createElement("script");
    script1.id = "ga-script";
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.id = "ga-inline";
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(script2);
  }, [settings.google_analytics_id]);

  // Injeta Google Tag Manager via DOM
  useEffect(() => {
    const gtmId = settings.google_tag_manager_id?.trim();
    if (!gtmId) return;
    if (document.getElementById("gtm-script")) return;

    const script = document.createElement("script");
    script.id = "gtm-script";
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(script);
  }, [settings.google_tag_manager_id]);

  // Injeta Meta Pixel via DOM
  useEffect(() => {
    const pixelId = settings.meta_pixel_id?.trim();
    if (!pixelId) return;
    if (document.getElementById("meta-pixel-script")) return;

    const script = document.createElement("script");
    script.id = "meta-pixel-script";
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  }, [settings.meta_pixel_id]);

  return null;
};

export default Analytics;
