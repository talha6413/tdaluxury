"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useSiteSettings, useWhatsAppUrl } from "@/components/SiteSettingsProvider";

const footerGallery = [
  { src: "/images/real/salon-01.webp", alt: "TDA Luxury salon iç mekanı" },
  { src: "/images/real/salon-02.webp", alt: "TDA Luxury resepsiyon alanı" },
  { src: "/images/real/salon-03.webp", alt: "TDA Luxury bakım alanı" },
  { src: "/images/real/salon-04.webp", alt: "TDA Luxury Uşak güzellik salonu" },
];

export default function Footer() {
  const settings = useSiteSettings();
  const defaultWhatsAppUrl = useWhatsAppUrl();
  const infoWhatsAppUrl = useWhatsAppUrl("Merhaba, TDA Luxury web siteniz üzerinden hizmetler hakkında bilgi almak istiyorum.");
  return (
    <footer className="premium-footer premium-footer-v207">
      <div className="container premium-footer-cta premium-footer-cta-v207">
        <div>
          <span className="premium-footer-kicker">TDA LUXURY DENEYİMİ</span>
          <h2>Güzelliğiniz İçin Doğru Adımı Bugün Atın.</h2>
          <p>
            Size uygun hizmeti birlikte belirleyelim; kişiye özel ön görüşme
            ve randevu planlaması için hemen iletişime geçin.
          </p>
        </div>

        <div className="premium-footer-cta-actions">
          <Link href="/randevu" className="premium-footer-main-btn">
            <CalendarDays size={21} /> Randevu Oluştur
          </Link>
          <a
            href={infoWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-footer-outline-btn"
          >
            <MessageCircle size={20} /> WhatsApp
          </a>
        </div>
      </div>

      <div className="container premium-footer-grid premium-footer-grid-v207">
        <div className="premium-footer-brand">
          <Link href="/" className="premium-footer-logo" aria-label="TDA Luxury ana sayfa">
            <span className="premium-footer-logo-main">TDA</span>
            <span className="premium-footer-logo-sub">LUXURY</span>
          </Link>

          <p>
            Uşak’ta lazer epilasyon, cilt bakımı, kalıcı makyaj, kaş-kirpik,
            tırnak ve bölgesel bakım hizmetlerinde premium deneyim.
          </p>

          <div className="premium-footer-socials">
            <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href={defaultWhatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle size={20} />
            </a>
            <a href={`tel:+${settings.whatsappNumber}`} aria-label="Telefon">
              <Phone size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3>Hizmetler</h3>
          <Link href="/lazer-epilasyon">Lazer Epilasyon</Link>
          <Link href="/cilt-bakimi">Cilt Bakımı</Link>
          <Link href="/kalici-makyaj">Kalıcı Makyaj</Link>
          <Link href="/kas-kirpik">Kaş &amp; Kirpik</Link>
          <Link href="/bolgesel-incelme">Bölgesel İncelme</Link>
          <Link href="/hizmetler">Tüm Hizmetler</Link>
        </div>

        <div>
          <h3>Kurumsal</h3>
          <Link href="/usak-guzellik-salonu">Uşak Güzellik Salonu</Link>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/galeri">Galeri</Link>
          <Link href="/sonuclar">Öncesi / Sonrası</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/kalite-hijyen">Kalite ve Hijyen</Link>
        </div>

        <div className="premium-footer-contact">
          <h3>İletişim</h3>
          <a href={`tel:+${settings.whatsappNumber}`}>
            <Phone size={17} /> {settings.phoneDisplay}
          </a>
          <a href={defaultWhatsAppUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={17} /> WhatsApp’tan Yazın
          </a>
          <Link href="/iletisim">
            <MapPin size={17} /> {settings.address}
          </Link>
          <span>Pzt–Cmt: 09.00–20.00</span>
        </div>
      </div>

      <div className="container premium-footer-experience-grid">
        <div className="premium-footer-gallery-card">
          <div className="premium-footer-section-head">
            <div>
              <span>MEKÂNI KEŞFEDİN</span>
              <h3>TDA Luxury’den Kareler</h3>
            </div>
            <Link href="/galeri" aria-label="Galeriyi aç">
              Galeri <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="premium-footer-gallery">
            {footerGallery.map((item) => (
              <Link href="/galeri" key={item.src} className="premium-footer-gallery-item">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 700px) 50vw, 180px"
                  className="premium-footer-gallery-image"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="premium-footer-location-card">
          <span className="premium-footer-location-kicker">UŞAK MERKEZ</span>
          <h3>Salonumuza kolayca ulaşın.</h3>
          <p>
            Konum, çalışma saatleri ve randevu bilgileri için iletişim sayfamızı
            ziyaret edin veya doğrudan yol tarifi alın.
          </p>

          <div className="premium-footer-location-actions">
            <Link href="/iletisim" className="premium-footer-location-primary">
              <MapPin size={18} /> İletişim ve Konum
            </Link>
            <a
              href={settings.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-footer-location-secondary"
            >
              Yol Tarifi <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="container premium-footer-bottom">
        <span>© {new Date().getFullYear()} TDA Luxury. Tüm hakları saklıdır.</span>
        <div>
          <Link href="/gizlilik-politikasi">Gizlilik</Link>
          <Link href="/kvkk-aydinlatma-metni">KVKK</Link>
          <Link href="/cerez-politikasi">Çerezler</Link>
          <Link href="/yayin-ilkeleri">Yayın İlkeleri</Link>
        </div>
        <span>www.tdaluxury.com.tr</span>
      </div>
    </footer>
  );
}
