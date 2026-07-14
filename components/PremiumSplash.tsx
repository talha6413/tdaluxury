"use client";

import { memo, useEffect, useState } from "react";

const STORAGE_KEY = "tda-premium-splash-seen";

function PremiumSplash() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => setVisible(true))
      : window.setTimeout(() => setVisible(true), 150);

    document.documentElement.classList.add("splash-active");

    const leave = window.setTimeout(() => setLeaving(true), 650);
    const done = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.classList.remove("splash-active");
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 1000);

    return () => {
      if (window.cancelIdleCallback) {
        try { window.cancelIdleCallback(idle as number); } catch {}
      } else {
        clearTimeout(idle as number);
      }
      clearTimeout(leave);
      clearTimeout(done);
      document.documentElement.classList.remove("splash-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`premium-splash ${leaving ? "is-leaving" : ""}`} role="status" aria-label="TDA Luxury yükleniyor">
      <div className="premium-splash__glow" aria-hidden="true" />
      <div className="premium-splash__brand">
        <span className="premium-splash__tda">TDA</span>
        <span className="premium-splash__luxury">LUXURY</span>
        <span className="premium-splash__line" aria-hidden="true"><span /></span>
      </div>
    </div>
  );
}

export default memo(PremiumSplash);
