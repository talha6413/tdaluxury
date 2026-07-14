import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/lib/schema";
import { site, waUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Uşak Güzellik Salonu | TDA Luxury Uşak Merkez",
  description:
    "TDA Luxury; Uşak Merkez'de lazer epilasyon, cilt bakımı, kalıcı makyaj, kaş-kirpik, tırnak ve bölgesel bakım hizmetleri sunan premium güzellik salonudur.",
  path: "/usak-guzellik-salonu",
  image: "/og/home.jpg",
});

const faqs = [
  {
    question: "TDA Luxury Uşak'ın hangi bölgesinde hizmet veriyor?",
    answer:
      "TDA Luxury Uşak Merkez'de hizmet verir. Güncel açık adres ve yol tarifi için iletişim sayfasındaki Google Haritalar bağlantısını kullanabilirsiniz.",
  },
  {
    question: "Randevu almadan gelebilir miyim?",
    answer:
      "Yoğunluk nedeniyle gelmeden önce WhatsApp üzerinden uygun saat teyidi almanız önerilir.",
  },
  {
    question: "Hangi hizmetler sunuluyor?",
    answer:
      "Lazer epilasyon, cilt bakımı, kalıcı makyaj, kaş-kirpik, tırnak ve bölgesel bakım başta olmak üzere farklı ihtiyaçlara yönelik hizmetler sunulur.",
  },
  {
    question: "Uşak ilçelerinden gelen danışanlara hizmet veriliyor mu?",
    answer:
      "Evet. Banaz, Eşme, Ulubey, Sivaslı ve Karahallı dahil Uşak çevresinden gelen danışanlar randevu oluşturabilir.",
  },
  {
    question: "İlk görüşme ücretli mi?",
    answer:
      "Hizmet seçimi ve süreç hakkında ön bilgilendirme WhatsApp üzerinden yapılabilir. Uygulama kapsamı hizmete göre değişir.",
  },
];

const services = [
  ["Lazer Epilasyon", "/lazer-epilasyon", "Kadın ve erkek danışanlara kişiye özel değerlendirme ve seans planı."],
  ["Cilt Bakımı", "/cilt-bakimi", "Cilt analizi, nem, akneye eğilim, leke görünümü ve anti-aging odaklı bakım."],
  ["Kalıcı Makyaj", "/kalici-makyaj", "Microblading, pudralama kaş, dipliner, eyeliner ve dudak renklendirme."],
  ["Bölgesel Bakım", "/bolgesel-incelme", "Kişiye özel değerlendirme ile destekleyici bölgesel bakım seçenekleri."],
];

export default function UsakBeautySalonPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", url: site.url },
          { name: "Uşak Güzellik Salonu", url: `${site.url}/usak-guzellik-salonu` },
        ]}
      />
      <ServiceSchema
        name="Uşak Güzellik Salonu Hizmetleri"
        description="TDA Luxury Uşak Merkez'de lazer epilasyon, cilt bakımı, kalıcı makyaj, kaş-kirpik, tırnak ve bölgesel bakım hizmetleri sunar."
        path="/usak-guzellik-salonu"
      />
      <FaqSchema items={faqs} />

      <Nav />
      <main className="local-seo-page">
        <section className="local-seo-hero">
          <div className="local-seo-glow" />
          <div className="container local-seo-hero-grid">
            <div className="local-seo-hero-copy">
              <p className="local-seo-kicker">TDA LUXURY UŞAK MERKEZ</p>
              <h1>Uşak&apos;ta Premium Güzellik Salonu Deneyimi</h1>
              <p className="local-seo-lead">
                Teknoloji, hijyen ve kişiye özel planlamayı aynı çatı altında
                buluşturan TDA Luxury; bakım sürecini yalnızca uygulama değil,
                doğru bilgilendirme ve düzenli takip olarak ele alır.
              </p>

              <div className="local-seo-actions">
                <a
                  href={waUrl("Merhaba, TDA Luxury Uşak güzellik salonu hizmetleri hakkında bilgi almak istiyorum.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  <MessageCircle size={20} /> WhatsApp&apos;tan Bilgi Al
                  <ArrowRight size={18} />
                </a>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="local-seo-secondary"
                >
                  <MapPin size={19} /> Yol Tarifi
                </a>
              </div>

              <div className="local-seo-feature-grid">
                {[
                  [BadgeCheck, "Uzman ekip", "Hizmete göre yönlendirme"],
                  [ShieldCheck, "Hijyen", "Kontrollü salon standartları"],
                  [Sparkles, "Kişiye özel", "İhtiyaca göre bakım planı"],
                ].map(([Icon, title, text]) => {
                  const Comp = Icon as typeof BadgeCheck;
                  return (
                    <article key={String(title)} className="local-seo-feature-card">
                      <Comp size={24} />
                      <h3>{String(title)}</h3>
                      <p>{String(text)}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="local-seo-area-card">
              <p className="local-seo-card-label">HİZMET BÖLGESİ</p>
              <h2>Uşak Merkez ve çevre ilçeler</h2>
              <p>
                Uşak Merkez başta olmak üzere Banaz, Eşme, Ulubey, Sivaslı ve
                Karahallı&apos;dan gelen danışanlar randevu oluşturabilir.
              </p>
              <div className="local-seo-area-tags">
                {site.serviceAreas.map((area) => (
                  <span key={area}>{area}</span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="local-seo-services">
          <div className="container">
            <div className="local-seo-section-head">
              <div>
                <p className="section-label">HİZMETLERİMİZ</p>
                <h2>İhtiyacınıza göre doğru hizmete ulaşın</h2>
              </div>
              <p>
                Her hizmet ayrı değerlendirme gerektirir. Sayfaları inceleyebilir,
                uygun seçeneği belirlemek için WhatsApp üzerinden ön bilgi alabilirsiniz.
              </p>
            </div>

            <div className="local-seo-service-grid">
              {services.map(([title, href, text]) => (
                <Link key={title} href={href} className="local-seo-service-card">
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <ArrowRight />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="local-seo-why">
          <div className="container local-seo-why-grid">
            <div className="local-seo-why-copy">
              <p className="section-label">NEDEN TDA LUXURY?</p>
              <h2>Güven, şeffaf bilgi ve düzenli takip</h2>
              <p>
                TDA Luxury&apos;de hedef, gerçekçi beklenti oluşturmak ve bakım
                sürecini açık biçimde yönetmektir. Sonuçlar kişiden kişiye değişebilir;
                bu nedenle kesin vaat yerine değerlendirme ve sürdürülebilir planlama önceliklidir.
              </p>
            </div>

            <div className="local-seo-value-grid">
              {[
                ["Kişiye özel planlama", "Cilt, kıl yapısı veya bakım hedefi değerlendirilerek süreç belirlenir."],
                ["Şeffaf bilgilendirme", "İşlem öncesi ve sonrasında dikkat edilmesi gerekenler açıkça paylaşılır."],
                ["Kolay iletişim", "Telefon, WhatsApp ve yol tarifi bağlantılarıyla hızlı erişim sağlanır."],
                ["Yerel hizmet", "Uşak Merkez'de yüz yüze değerlendirme ve randevu imkânı sunulur."],
              ].map(([title, text]) => (
                <article key={title} className="local-seo-value-card">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="local-seo-faq">
          <div className="container local-seo-faq-grid">
            <div>
              <p className="local-seo-kicker">SIK SORULANLAR</p>
              <h2>Uşak güzellik salonu hakkında merak edilenler</h2>
            </div>
            <div className="local-seo-faq-list">
              {faqs.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
