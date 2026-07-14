import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { site, waUrl } from "@/lib/site";
import HeroVideoButton from "@/components/HeroVideoButton";

const trustItems = [
  "Kişiye özel planlama",
  "Hijyen ve mahremiyet odağı",
  "Modern cihaz ve uygulamalar",
];

export default function Hero() {
  return (
    <section className="v20-hero" aria-labelledby="hero-title">
      <Image
        src="/images/hero-lounge.svg"
        alt="TDA Luxury premium güzellik salonu"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="v20-hero-bg"
      />
      <div className="v20-hero-overlay" aria-hidden="true" />
      <div className="v20-hero-glow v20-hero-glow-one" aria-hidden="true" />
      <div className="v20-hero-glow v20-hero-glow-two" aria-hidden="true" />

      <div className="container v20-hero-inner">
        <div className="v20-hero-copy">
          <p className="v20-kicker">UŞAK’IN PREMIUM GÜZELLİK DENEYİMİ</p>

          <h1 id="hero-title" className="v20-title">
            Güzelliğinize Değer,
            <span>Kendinize Zaman Ayırın</span>
          </h1>

          <p className="v20-lead">
            Lazer epilasyon, kişiye özel cilt bakımı ve kalıcı makyaj
            uygulamalarında kontrollü, konforlu ve premium bir salon deneyimi.
          </p>

          <div className="v20-actions">
            <Link href="/randevu" className="v20-primary-btn" data-conversion-event="appointment_click" data-conversion-source="hero_primary">
              <CalendarDays size={20} />
              ONLINE RANDEVU
              <ArrowRight size={18} />
            </Link>

            <a
              data-conversion-source="hero_whatsapp"
              href={waUrl(
                "Merhaba, TDA Luxury web siteniz üzerinden ulaşıyorum. Hizmetler ve uygun randevu saatleri hakkında bilgi almak istiyorum."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="v20-secondary-btn"
            >
              <MessageCircle size={20} />
              WHATSAPP
            </a>

            <HeroVideoButton />
          </div>

          <div className="v20-quick-links" aria-label="Hızlı iletişim">
            <a href={`tel:+${site.whatsapp}`} data-conversion-source="hero_phone">
              <Phone size={16} /> {site.phoneDisplay}
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-conversion-source="hero_map"
            >
              <MapPin size={16} /> Uşak Merkez
            </a>
          </div>
        </div>

        <aside className="v20-trust-card" aria-label="TDA Luxury hizmet yaklaşımı">
          <div className="v20-trust-icon">
            <Sparkles size={25} />
          </div>
          <p className="v20-trust-kicker">TDA LUXURY</p>
          <h2>Size özel bakım planı, net iletişim</h2>
          <p className="v20-trust-copy">
            İlk görüşmeden uygulama sonrasına kadar süreç, ihtiyacınız ve
            beklentiniz dikkate alınarak planlanır.
          </p>

          <div className="v20-trust-list">
            {trustItems.map((item) => (
              <div key={item}>
                <CheckCircle2 size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="v20-trust-bottom">
            <ShieldCheck size={20} />
            <span>Şeffaf bilgilendirme ve gerçekçi beklenti</span>
          </div>
        </aside>
      </div>

      <div className="v20-scroll-cue" aria-hidden="true">
        <span />
        HİZMETLERİMİZİ KEŞFEDİN
      </div>
    </section>
  );
}
