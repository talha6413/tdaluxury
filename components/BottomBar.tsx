"use client";

import { CalendarDays, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site, waUrl } from "@/lib/site";

export default function BottomBar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      if (current < 140) setVisible(true);
      else if (current > lastScrollY.current + 8) setVisible(false);
      else if (current < lastScrollY.current - 8) setVisible(true);
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`bottom-bar ${visible ? "is-visible" : "is-hidden"}`}>
      <div className="bottom-grid">
        <a className="bottom-item" href={`tel:+${site.whatsapp}`}>
          <Phone className="bottom-ico" />
          <div><div className="bottom-small">HEMEN ARA</div><div className="bottom-big">{site.phoneDisplay}</div></div>
        </a>
        <a className="bottom-item" href={waUrl()} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="bottom-ico" />
          <div><div className="bottom-small">WHATSAPP</div><div className="bottom-big">Yazışma Başlat</div></div>
        </a>
        <a className="bottom-item" href="/iletisim">
          <MapPin className="bottom-ico" />
          <div><div className="bottom-small">YOL TARİFİ</div><div className="bottom-big">Konumu Göster</div></div>
        </a>
        <a className="bottom-item gold-bg" href={waUrl()} target="_blank" rel="noopener noreferrer">
          <CalendarDays className="bottom-ico" />
          <div><div className="bottom-small">RANDEVU AL</div><div className="bottom-big">Hemen Rezervasyon</div></div>
        </a>
      </div>
    </div>
  );
}
