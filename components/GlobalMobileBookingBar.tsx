"use client";

import Link from "next/link";
import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { site, waUrl } from "@/lib/site";

export default function GlobalMobileBookingBar() {
  return (
    <nav className="global-mobile-booking" aria-label="Hızlı randevu ve iletişim">
      <a
        href={`tel:+${site.whatsapp}`}
        className="global-mobile-booking-item"
        data-conversion-source="global_mobile_bar"
        aria-label={`TDA Luxury'yi ara: ${site.phoneDisplay}`}
      >
        <Phone size={19} strokeWidth={1.8} />
        <span>Ara</span>
      </a>

      <a
        href={waUrl(
          "Merhaba, TDA Luxury web siteniz üzerinden ulaşıyorum. Hizmetler hakkında bilgi almak istiyorum."
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="global-mobile-booking-item"
        data-conversion-source="global_mobile_bar"
        aria-label="TDA Luxury WhatsApp"
      >
        <MessageCircle size={20} strokeWidth={1.8} />
        <span>WhatsApp</span>
      </a>

      <Link
        href="/randevu"
        className="global-mobile-booking-item global-mobile-booking-primary"
        data-conversion-event="appointment_click"
        data-conversion-source="global_mobile_bar_appointment"
        aria-label="TDA Luxury randevu al"
      >
        <CalendarDays size={20} strokeWidth={1.8} />
        <span>Randevu Al</span>
      </Link>
    </nav>
  );
}
