import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Hakkımızda | Uşak Güzellik Salonu | TDA Luxury",
  description:
    "TDA Luxury’nin hizmet anlayışını, uzman yaklaşımını, hijyen standartlarını ve Uşak’taki premium salon deneyimini keşfedin.",
  path: "/hakkimizda",
  image: "/images/services-premium/services-hero.webp",
});

const values = [
  { icon: ShieldCheck, title: "Hijyen ve Güven", text: "Her uygulamada temiz, düzenli ve kontrollü bir salon standardı." },
  { icon: Sparkles, title: "Kişiye Özel Yaklaşım", text: "Her danışan için ihtiyaç, beklenti ve uygunluk odaklı planlama." },
  { icon: Award, title: "Premium Deneyim", text: "Konfor, estetik ve profesyonel hizmeti tek çatı altında birleştiren yaklaşım." },
  { icon: HeartHandshake, title: "Şeffaf İletişim", text: "İşlem öncesi ve sonrası net bilgilendirme, gerçekçi beklenti yönetimi." },
];

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <section className="about-premium-hero">
          <Image
            src="/images/services-premium/services-hero.webp"
            alt="TDA Luxury premium güzellik salonu atmosferi"
            fill
            priority
            className="about-premium-hero-image"
          />
          <div className="about-premium-hero-overlay" />
          <div className="container about-premium-hero-inner">
            <p className="about-premium-kicker">TDA LUXURY HAKKINDA</p>
            <h1>Güzellikte Premium Bir Deneyim</h1>
            <p>
              Uşak’ta modern güzellik uygulamalarını hijyen, konfor ve kişiye özel
              bakım anlayışıyla bir araya getiriyoruz.
            </p>
            <div className="about-premium-actions">
              <Link href="/hizmetler" className="btn-gold">HİZMETLERİMİZİ KEŞFEDİN →</Link>
              <Link href="/iletisim" className="about-premium-secondary">BİZE ULAŞIN</Link>
            </div>
          </div>
        </section>

        <section className="about-story-section">
          <div className="container about-story-grid">
            <div className="about-story-visual">
              <Image src="/images/salon-lounge.svg" alt="TDA Luxury salon içi premium alan" fill sizes="(max-width: 900px) 100vw, 50vw" className="about-story-image" />
              <div className="about-story-badge"><strong>TDA</strong><span>LUXURY</span></div>
            </div>
            <div className="about-story-copy">
              <p className="section-label">BİZİM HİKÂYEMİZ</p>
              <h2>Uşak’ta Güzellik Deneyimini Yeniden Tanımlıyoruz</h2>
              <p>
                TDA Luxury; lazer epilasyon, cilt bakımı, kalıcı makyaj, bölgesel
                incelme, kaş-kirpik ve tırnak hizmetlerini tek çatı altında sunan
                premium bir güzellik salonudur.
              </p>
              <p>
                Hedefimiz yalnızca işlem uygulamak değil; doğru analiz, açık
                bilgilendirme, kişiye özel planlama ve salon konforunu bir araya
                getiren güçlü bir deneyim sunmaktır.
              </p>
              <div className="about-story-signature">
                <span>Güzelliğiniz bizim sanatımız.</span>
                <b>TDA Luxury</b>
              </div>
            </div>
          </div>
        </section>

        <section className="about-values-section">
          <div className="container">
            <div className="about-values-head">
              <div>
                <p className="section-label">DEĞERLERİMİZ</p>
                <h2>Her Detayda Kalite</h2>
              </div>
              <p>Salon deneyimimizin temelinde güven, profesyonellik ve kişisel özen bulunur.</p>
            </div>
            <div className="about-values-grid">
              {values.map(({ icon: Icon, title, text }, index) => (
                <article className="about-value-card" key={title}>
                  <span className="about-value-number">0{index + 1}</span>
                  <Icon size={34} strokeWidth={1.4} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-services-section">
          <div className="container about-services-grid">
            <div>
              <p className="section-label">TDA LUXURY DENEYİMİ</p>
              <h2>Tek Çatı Altında Bütünsel Güzellik Hizmetleri</h2>
            </div>
            <div className="about-service-links">
              <Link href="/lazer-epilasyon"><span>01</span><b>Lazer Epilasyon</b><em>→</em></Link>
              <Link href="/cilt-bakimi"><span>02</span><b>Cilt Bakımı</b><em>→</em></Link>
              <Link href="/kalici-makyaj"><span>03</span><b>Kalıcı Makyaj</b><em>→</em></Link>
              <Link href="/kas-kirpik"><span>04</span><b>Kaş &amp; Kirpik</b><em>→</em></Link>
              <Link href="/bolgesel-incelme"><span>05</span><b>Bölgesel İncelme</b><em>→</em></Link>
            </div>
          </div>
        </section>

        <section className="about-final-cta">
          <div className="container about-final-cta-inner">
            <div>
              <p className="section-label">SİZİ TANIYALIM</p>
              <h2>Size Uygun Bakım Planını Birlikte Oluşturalım</h2>
            </div>
            <Link href="/iletisim" className="btn-gold">RANDEVU VE İLETİŞİM →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
