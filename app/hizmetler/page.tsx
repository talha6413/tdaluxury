import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServicesCatalog from "@/components/ServicesCatalog";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Hizmetlerimiz | TDA Luxury Uşak",
  description: "Lazer epilasyon, cilt bakımı, kalıcı makyaj, bölgesel incelme, kaş-kirpik ve tırnak hizmetlerimizin tamamını inceleyin.",
  path: "/hizmetler",
});

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <section className="services-page-hero">
          <div className="services-page-hero-bg" />
          <div className="services-page-hero-shade" />
          <div className="container services-page-hero-inner">
            <p className="services-page-kicker">PROFESYONEL BAKIM HİZMETLERİ</p>
            <h1>Hizmetlerimiz</h1>
            <p>Alanında uzman ekibimiz ve modern cihazlarımızla size en iyi hizmeti sunuyoruz. İhtiyacınıza uygun bakım ve güzellik uygulamalarını keşfedin.</p>
            <div className="services-page-features">
              <span>✦ Uzman Ekip</span>
              <span>✦ Modern Teknoloji</span>
              <span>✦ Hijyenik Ortam</span>
              <span>✦ Kişiye Özel Planlama</span>
            </div>
          </div>
        </section>

        <section className="services-premium-section">
          <div className="container">
            <ServicesCatalog services={services} />
          </div>
        </section>

        <section className="services-bottom-cta">
          <div className="container services-bottom-cta-inner">
            <div>
              <p>Size özel bakım planı oluşturalım</p>
              <span>Cilt tipinize ve ihtiyaçlarınıza uygun en doğru uygulama için uzmanlarımızdan destek alın.</span>
            </div>
            <a href="https://wa.me/905366651064" target="_blank" rel="noopener noreferrer">RANDEVU AL</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
