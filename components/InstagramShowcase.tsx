import Image from "next/image";
import { ArrowUpRight, Instagram } from "lucide-react";

const items = [
  { src: "/images/real/salon-01.webp", alt: "TDA Luxury Uşak salon iç mekân görünümü" },
  { src: "/images/real/salon-02.webp", alt: "TDA Luxury premium resepsiyon alanı" },
  { src: "/images/real/salon-03.webp", alt: "TDA Luxury güzellik salonu uygulama alanı" },
  { src: "/images/real/salon-04.webp", alt: "TDA Luxury salon detayları ve dekorasyonu" },
  { src: "/images/real/salon-05.webp", alt: "TDA Luxury Uşak bekleme ve danışmanlık alanı" },
  { src: "/images/real/salon-06.webp", alt: "TDA Luxury güzellik merkezi iç mekânı" },
];

export default function InstagramShowcase() {
  return (
    <section className="instagram-showcase" aria-labelledby="instagram-title">
      <div className="container">
        <div className="instagram-showcase-head">
          <div>
            <p className="section-label">INSTAGRAM’DAN</p>
            <h2 id="instagram-title">TDA LUXURY’Yİ YAKINDAN KEŞFEDİN</h2>
          </div>
          <a
            href="https://www.instagram.com/tdaluxuryusak"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-profile-link"
          >
            <Instagram size={20} /> @tdaluxuryusak <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="instagram-grid">
          {items.map((item, index) => (
            <a
              key={item.src}
              href="https://www.instagram.com/tdaluxuryusak"
              target="_blank"
              rel="noopener noreferrer"
              className={`instagram-card ${index === 0 || index === 5 ? "instagram-card-wide" : ""}`}
              aria-label={`${item.alt} - Instagram profilini aç`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                quality={72}
                loading="lazy"
                className="instagram-card-image"
              />
              <span className="instagram-card-overlay" />
              <span className="instagram-card-icon"><Instagram size={21} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
