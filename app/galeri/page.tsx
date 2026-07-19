import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PremiumGalleryClient from "@/components/PremiumGalleryClient";
import { buildManagedMetadata } from "@/lib/seo";
import { getManagedGallery } from "@/lib/managed-content";

export async function generateMetadata() { return buildManagedMetadata("galeri", {
  title: "TDA Luxury Galeri | Uşak Güzellik Salonu Fotoğrafları",
  description:
    "TDA Luxury Uşak salon atmosferini, uygulama alanlarını, lazer epilasyon, cilt bakımı, kalıcı makyaj ve seçili sonuç görsellerini keşfedin.",
  path: "/galeri",
  image: "/images/services-premium/services-hero.webp",
}); }

const gallery = [
  { src: "/images/services-premium/services-hero.webp", title: "Premium Salon Atmosferi", category: "Salon", alt: "TDA Luxury Uşak premium salon atmosferi" },
  { src: "/images/services-premium/lazer-epilasyon.webp", title: "Lazer Epilasyon Uygulaması", category: "Lazer", alt: "TDA Luxury Uşak lazer epilasyon uygulaması" },
  { src: "/images/services-premium/cilt-bakimi.webp", title: "Profesyonel Cilt Bakımı", category: "Cilt", alt: "TDA Luxury Uşak profesyonel cilt bakımı" },
  { src: "/images/services-premium/hydrafacial.webp", title: "Hydrafacial Bakımı", category: "Cilt", alt: "TDA Luxury Uşak Hydrafacial cilt bakımı" },
  { src: "/images/services-premium/bolgesel-incelme.webp", title: "Bölgesel İncelme", category: "Vücut", alt: "TDA Luxury Uşak bölgesel incelme uygulaması" },
  { src: "/images/services-premium/kirpik-lifting.webp", title: "Kirpik Lifting", category: "Kaş & Kirpik", alt: "TDA Luxury Uşak kirpik lifting uygulaması" },
  { src: "/images/services-premium/g5-masaji.webp", title: "G5 Masajı", category: "Vücut", alt: "TDA Luxury Uşak G5 masajı uygulaması" },
  { src: "/images/services-premium/erkek-lazer.webp", title: "Erkek Lazer Epilasyon", category: "Lazer", alt: "TDA Luxury Uşak erkek lazer epilasyon" },
  { src: "/images/services-premium/dudak-renklendirme.webp", title: "Dudak Renklendirme", category: "Kalıcı Makyaj", alt: "TDA Luxury Uşak dudak renklendirme uygulaması" },
  { src: "/images/services-premium/microblading.webp", title: "Microblading", category: "Kalıcı Makyaj", alt: "TDA Luxury Uşak microblading uygulaması" },
  { src: "/images/services-premium/ipek-kirpik.webp", title: "İpek Kirpik", category: "Kaş & Kirpik", alt: "TDA Luxury Uşak ipek kirpik uygulaması" },
  { src: "/images/services-premium/akne-bakimi.webp", title: "Akneye Eğilimli Cilt Bakımı", category: "Cilt", alt: "TDA Luxury Uşak akneye eğilimli cilt bakımı" },
];

const results = [
  { src: "/images/result-lazer.svg", title: "Lazer Epilasyon Sonucu" },
  { src: "/images/result-belly.svg", title: "Bölgesel Bakım Sonucu" },
  { src: "/images/result-leg.svg", title: "Bacak Bakımı Sonucu" },
];

const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "TDA Luxury Galeri",
  url: "https://www.tdaluxury.com.tr/galeri",
  description: "TDA Luxury Uşak salon, uygulama ve seçili sonuç görselleri.",
  image: gallery.map((item) => `https://www.tdaluxury.com.tr${item.src}`),
};

export const revalidate = 60;

export default async function GalleryPage() {
  const managedGallery = await getManagedGallery(gallery);
  const managedGallerySchema = {
    ...gallerySchema,
    image: managedGallery.map((item) =>
      item.src.startsWith("http")
        ? item.src
        : `https://www.tdaluxury.com.tr${item.src}`
    ),
  };
  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(managedGallerySchema).replace(/</g, "\\u003c") }}
      />

      <main className="gallery-premium-page gallery-v20-page">
        <section className="gallery-premium-hero gallery-v20-hero">
          <Image
            src="/images/services-premium/services-hero.webp"
            alt="TDA Luxury Uşak salon galerisi"
            fill
            priority
            className="gallery-premium-hero-image"
          />
          <div className="gallery-premium-hero-overlay" />
          <div className="container gallery-premium-hero-inner">
            <p className="gallery-premium-kicker"><Camera size={17} /> TDA LUXURY GALERİ</p>
            <h1>Markamızı Anlatan<br />Gerçek Kareler</h1>
            <p>
              Salon atmosferimizi, uygulama alanlarımızı ve seçili sonuç görsellerini
              premium bir galeri deneyimiyle keşfedin.
            </p>
            <div className="gallery-premium-actions">
              <a className="btn-gold" href="https://wa.me/905366651064" target="_blank" rel="noreferrer">
                <MessageCircle size={20} /> RANDEVU AL
              </a>
              <Link href="/hizmetler" className="gallery-premium-secondary">
                HİZMETLERİ İNCELE <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="gallery-premium-section gallery-v20-section">
          <div className="container">
            <div className="gallery-premium-head">
              <div>
                <p className="section-label">SALON & UYGULAMALAR</p>
                <h2>Her Detayda Premium Deneyim</h2>
              </div>
              <p>
                Profesyonel çekimler geldikçe bu galeri gerçek salon, ekip ve işlem
                görselleriyle sürekli güncellenecek.
              </p>
            </div>

            <PremiumGalleryClient items={managedGallery} />
          </div>
        </section>

        <section className="gallery-results-section gallery-v20-results">
          <div className="container">
            <div className="gallery-results-head">
              <div>
                <p className="section-label">ÖNCE & SONRA</p>
                <h2>Seçili Uygulama Sonuçları</h2>
              </div>
              <div className="gallery-trust-note">
                <CheckCircle2 size={21} />
                <span>Sonuçlar kişiden kişiye değişebilir. Planlama kişisel değerlendirmeyle yapılır.</span>
              </div>
            </div>

            <div className="gallery-results-grid">
              {results.map((item) => (
                <article key={item.title} className="gallery-result-card">
                  <Image src={item.src} alt={item.title} fill sizes="(max-width: 700px) 100vw, 33vw" />
                  <div className="gallery-result-labels"><span>ÖNCE</span><span>SONRA</span></div>
                  <div className="gallery-result-divider"><span>↔</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-final-cta gallery-v20-cta">
          <div className="container gallery-final-cta-inner">
            <div>
              <p className="section-label"><Sparkles size={16} /> KİŞİYE ÖZEL PLANLAMA</p>
              <h2>Size En Uygun Hizmeti Birlikte Belirleyelim</h2>
              <p>Ücretsiz ön görüşme için WhatsApp üzerinden bize ulaşın.</p>
            </div>
            <a className="btn-gold" href="https://wa.me/905366651064" target="_blank" rel="noreferrer">
              WHATSAPP’TAN YAZIN <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
