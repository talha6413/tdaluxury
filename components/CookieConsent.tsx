"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "tda-cookie-consent";

type ConsentValue = "accepted" | "rejected";

function saveConsent(value: ConsentValue) {
  localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent("tda-consent-change", { detail: value }));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== "accepted" && stored !== "rejected") {
      const timer = window.setTimeout(() => setVisible(true), 900);
      return () => window.clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const decide = (value: ConsentValue) => {
    saveConsent(value);
    setVisible(false);
  };

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      className="cookie-consent"
    >
      <button
        type="button"
        className="cookie-consent__close"
        aria-label="Çerez bildirimini kapat ve isteğe bağlı çerezleri reddet"
        onClick={() => decide("rejected")}
      >
        <X size={18} />
      </button>

      <div className="cookie-consent__icon" aria-hidden="true">
        <Cookie size={22} />
      </div>

      <div className="cookie-consent__content">
        <h2 id="cookie-consent-title">Çerez tercihleri</h2>
        <p>
          Zorunlu çerezler sitenin çalışması için kullanılır. Analitik çerezleri
          yalnızca onay verirseniz etkinleştiririz.
        </p>
        <Link href="/cerez-politikasi">Çerez politikasını inceleyin</Link>
      </div>

      <div className="cookie-consent__actions">
        <button type="button" className="cookie-button cookie-button--ghost" onClick={() => decide("rejected")}>Reddet</button>
        <button type="button" className="cookie-button cookie-button--gold" onClick={() => decide("accepted")}>Kabul Et</button>
      </div>
    </section>
  );
}
