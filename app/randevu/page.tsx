import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppointmentPlanner from "@/components/AppointmentPlanner";
import { buildManagedMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildManagedMetadata("randevu", {
    title: "Randevu Al | TDA Luxury Uşak",
    description:
      "Uşak TDA Luxury’de lazer epilasyon, cilt bakımı veya kalıcı makyaj için gün ve saat tercihinizi seçerek WhatsApp üzerinden randevu talebi oluşturun.",
    path: "/randevu",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Anasayfa",
      item: "https://www.tdaluxury.com.tr/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Randevu Al",
      item: "https://www.tdaluxury.com.tr/randevu",
    },
  ],
};

export default function AppointmentPage() {
  return (
    <main className="appointment-page">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="appointment-hero">
        <div className="container appointment-hero-inner">
          <span className="appointment-hero-kicker">TDA LUXURY UŞAK</span>
          <h1>Size Uygun Hizmeti, Günü ve Saati Seçin.</h1>
          <p>
            Hizmetinizi ve tercih ettiğiniz randevu zamanını seçin; talebiniz
            WhatsApp üzerinden doğrudan ekibimize ulaşsın.
          </p>
        </div>
      </section>

      <div className="container appointment-page-grid">
        <AppointmentPlanner />

        <aside className="appointment-trust">
          <span>HIZLI RANDEVU</span>
          <h2>Talebinizi birkaç adımda oluşturun.</h2>
          <ul>
            <li>
              <b>01</b>
              <div>
                <strong>Hizmetinizi seçin</strong>
                <p>İlgilendiğiniz işlemi seçerek başlayın.</p>
              </div>
            </li>
            <li>
              <b>02</b>
              <div>
                <strong>Gün ve saati belirleyin</strong>
                <p>Uygun olduğunuz günü ve saat aralığını doğrudan seçin.</p>
              </div>
            </li>
            <li>
              <b>03</b>
              <div>
                <strong>WhatsApp’tan gönderin</strong>
                <p>Ekibimiz seçiminizin uygunluğunu teyit ederek size dönüş yapsın.</p>
              </div>
            </li>
          </ul>
        </aside>
      </div>

      <Footer />
    </main>
  );
}
