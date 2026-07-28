"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tda-cookie-consent";
const GTM_ID = "GTM-WP8X59MJ";
const ADS_ID = "AW-11143224041";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ConsentGoogleScripts() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      const accepted = window.localStorage.getItem(STORAGE_KEY) === "accepted";
      setEnabled(accepted);

      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };

      window.gtag("consent", "update", {
        analytics_storage: accepted ? "granted" : "denied",
        ad_storage: accepted ? "granted" : "denied",
        ad_user_data: accepted ? "granted" : "denied",
        ad_personalization: accepted ? "granted" : "denied",
      });
    };

    syncConsent();
    window.addEventListener("tda-consent-change", syncConsent as EventListener);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener("tda-consent-change", syncConsent as EventListener);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script id="tda-gtm-loader" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="tda-google-ads" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){dataLayer.push(arguments);};
gtag('js', new Date());
gtag('config', '${ADS_ID}', { send_page_view: false });`}
      </Script>
    </>
  );
}
