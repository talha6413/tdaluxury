"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const STORAGE_KEY = "tda-cookie-consent";

type Props = {
  src: string;
  title: string;
  className?: string;
};

export default function ConsentMap({ src, title, className }: Props) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => {
      setAllowed(window.localStorage.getItem(STORAGE_KEY) === "accepted");
    };

    sync();
    window.addEventListener("tda-consent-change", sync as EventListener);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tda-consent-change", sync as EventListener);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (allowed) {
    return (
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={className}
      />
    );
  }

  return (
    <div className={`${className || ""} consent-map-placeholder`} role="region" aria-label={title}>
      <MapPin size={34} aria-hidden="true" />
      <strong>Harita isteğe bağlı çerezlerle yüklenir</strong>
      <span>Haritayı görüntülemek için çerez tercihlerinizi kabul edin veya “Yol Tarifi” bağlantısını kullanın.</span>
    </div>
  );
}
