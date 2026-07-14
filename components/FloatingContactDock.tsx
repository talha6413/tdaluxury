"use client";

import { ArrowUp, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, waUrl } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function FloatingContactDock() {
  const items = [
    { label: "Ara", href: `tel:+${site.whatsapp}`, icon: <Phone size={25} />, external: false },
    { label: "WhatsApp", href: waUrl(), icon: <MessageCircle size={25} />, external: true },
    { label: "Instagram", href: site.instagram, icon: <InstagramIcon />, external: true },
    {
      label: "Yol Tarifi",
      href: site.mapsUrl,
      icon: <MapPin size={25} />,
      external: true,
    },
  ];

  return (
    <aside className="stage15-dock" aria-label="Hızlı iletişim">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          aria-label={item.label}
          data-conversion-source="floating_contact_dock"
        >
          <span>{item.icon}</span>
          <small>{item.label}</small>
        </a>
      ))}

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Yukarı çık"
      >
        <span><ArrowUp size={27} /></span>
        <small>Yukarı Çık</small>
      </button>
    </aside>
  );
}
