"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tda-cookie-consent";

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const readConsent = () => {
      setEnabled(localStorage.getItem(STORAGE_KEY) === "accepted");
    };

    readConsent();
    window.addEventListener("tda-consent-change", readConsent as EventListener);
    window.addEventListener("storage", readConsent);

    return () => {
      window.removeEventListener("tda-consent-change", readConsent as EventListener);
      window.removeEventListener("storage", readConsent);
    };
  }, []);

  if (!gaId || !enabled) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
