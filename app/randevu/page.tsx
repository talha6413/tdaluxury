import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppointmentPlanner from "@/components/AppointmentPlanner";
import { buildManagedMetadata } from "@/lib/seo";

export async function generateMetadata() { return buildManagedMetadata("randevu", {
  title: "Randevu Al | TDA Luxury Uşak",
  description:
    "Uşak TDA Luxury’de lazer epilasyon, cilt bakımı veya kalıcı makyaj için randevu talebinizi oluşturun; uygun gün ve saat seçeneklerini birlikte belirleyelim.",
  path: "/randevu",
}); }

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://www.tdaluxury.com.tr/" },
    { "@type": "ListItem", position: 2, name: "Randevu Al", item: "https://www.tdaluxury.com.tr/randevu" },
  ],
};

export default function AppointmentPage() {
  return (
    <main className="appointment-page">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="appointment-hero">
        <div className="container appointment-hero-inner">
          <span className="appointment-hero-kicker">TDA LUXURY UŞAK</span>
          <h1>Size Uygun Hizmeti ve Randevu Zamanını Birlikte Belirleyelim.</h1>
          <p>Formu doldurun; seçiminiz WhatsApp’a hazır mesaj olarak aktarılsın. Ekibimiz uygun gün ve saat seçeneklerini paylaşsın.</p>
        </div>
      </section>

      <div className="container appointment-page-grid">
        <AppointmentPlanner />
        <aside className="appointment-trust">
          <span>NEDEN ÖN GÖRÜŞME?</span>
          <h2>Doğru hizmet, doğru planlamayla başlar.</h2>
          <ul>
            <li><b>01</b><div><strong>İhtiyacınızı anlayalım</strong><p>Hedefinizi ve beklentinizi kısa şekilde netleştirelim.</p></div></li>
            <li><b>02</b><div><strong>Uygun hizmeti belirleyelim</strong><p>Tek tip paket yerine kişiye ve bölgeye göre planlama yapalım.</p></div></li>
            <li><b>03</b><div><strong>Uygun zamanı seçelim</strong><p>Salon yoğunluğuna göre size uygun gün ve saat seçeneklerini paylaşalım.</p></div></li>
          </ul>
        </aside>
      </div>

      <Footer />
    </main>
  );
}
