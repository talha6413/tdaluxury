import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PremiumResultsPageClient from "@/components/PremiumResultsPageClient";
import { buildManagedMetadata } from "@/lib/seo";
import { getManagedResults } from "@/lib/managed-content";
import { fallbackPageResults } from "@/components/PremiumResultsPageClient";

export const revalidate = 60;

export async function generateMetadata() { return buildManagedMetadata("sonuclar", {
  title: "Öncesi Sonrası | TDA Luxury Uşak Güzellik Salonu",
  description:
    "TDA Luxury Uşak lazer epilasyon, cilt bakımı, kalıcı makyaj ve bölgesel bakım öncesi sonrası görsellerini inceleyin. Sonuçlar kişiden kişiye değişebilir.",
  path: "/sonuclar",
  image: "/images/real/dudak-oncesi-sonrasi.webp",
}); }

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TDA Luxury Öncesi Sonrası Sonuçları",
  url: "https://www.tdaluxury.com.tr/sonuclar",
  description:
    "TDA Luxury Uşak güzellik salonunda seçili uygulamalara ait önce ve sonra görselleri.",
  isPartOf: {
    "@type": "WebSite",
    name: "TDA Luxury",
    url: "https://www.tdaluxury.com.tr",
  },
};

export default async function ResultsPage() {
  const results = await getManagedResults(fallbackPageResults);
  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />

      <main className="results-v20-page">
        <section className="results-v20-hero">
          <Image
            src="/images/real/dudak-oncesi-sonrasi.webp"
            alt="TDA Luxury Uşak öncesi sonrası sonuçları"
            fill
            priority
            className="results-v20-hero-image"
          />
          <div className="results-v20-hero-overlay" />
          <div className="container results-v20-hero-inner">
            <p className="results-v20-kicker"><Sparkles size={17} /> ÖNCESİ &amp; SONRASI</p>
            <h1>Sonuçları Şeffaf ve Gerçekçi Şekilde İnceleyin</h1>
            <p>
              Lazer epilasyon, cilt bakımı, kalıcı makyaj ve bölgesel bakım uygulamalarında
              seçili karşılaştırmaları kategori bazında keşfedin.
            </p>
            <div className="results-v20-hero-actions">
              <a className="btn-gold" href="https://wa.me/905366651064" target="_blank" rel="noreferrer">
                <MessageCircle size={20} /> RANDEVU AL
              </a>
              <Link href="/galeri" className="results-v20-outline">
                GALERİYİ GÖR <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="results-v20-content">
          <div className="container">
            <div className="results-v20-head">
              <div>
                <p className="section-label">SEÇİLİ UYGULAMALAR</p>
                <h2>Karşılaştırma Çizgisini Sürükleyin</h2>
              </div>
              <p>
                Her bakım süreci kişiye özeldir. Bu bölüm bilgilendirme amacıyla hazırlanır;
                kesin sonuç veya standart seans garantisi sunmaz.
              </p>
            </div>

            <PremiumResultsPageClient results={results} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
