import { useEffect } from 'react';

const PLAUSIBLE_DOMAIN = process.env.REACT_APP_PLAUSIBLE_DOMAIN;
const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

export default function Analytics() {
  useEffect(() => {
    if (PLAUSIBLE_DOMAIN) {
      const script = document.createElement('script');
      script.defer = true;
      script.dataset.domain = PLAUSIBLE_DOMAIN;
      script.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(script);
      return () => script.remove();
    }

    if (GA_ID) {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(gtagScript);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_ID, { anonymize_ip: true });

      return () => {
        gtagScript.remove();
        delete window.gtag;
      };
    }

    return undefined;
  }, []);

  return null;
}
