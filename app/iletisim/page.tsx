import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { buildManagedMetadata } from "@/lib/seo";
import { BreadcrumbSchema, JsonLd } from "@/lib/schema";
import { site, waUrl } from "@/lib/site";

export async function generateMetadata() { return buildManagedMetadata("iletisim", {
  title: "İletişim | Uşak Merkez Güzellik Salonu",
  description:
    "TDA Luxury Uşak adresi, çalışma saatleri ve yol tarifini görüntüleyin. Lazer epilasyon, cilt bakımı ve kalıcı makyaj randevusu için WhatsApp’tan ulaşın.",
  path: "/iletisim",
}); }

const mapsUrl = site.mapsUrl;
const mapsEmbedUrl = site.mapsEmbedUrl;

const contactCards = [
  {
    icon: Phone,
    label: "Telefon",
    title: site.phoneDisplay,
    text: "Hızlı bilgi ve randevu için bizi arayın.",
    href: `tel:+${site.whatsapp}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    title: "Hemen Yazışın",
    text: "Hizmet bilgisi ve uygun saat için mesaj gönderin.",
    href: waUrl(),
  },
  {
    icon: MapPin,
    label: "Konum",
    title: site.address,
    text: "Google Haritalar üzerinden yol tarifini açın.",
    href: mapsUrl,
  },
  {
    icon: Clock3,
    label: "Çalışma Saatleri",
    title: "Pzt–Cmt 10:00–20:00",
    text: "Pazar günü randevu durumuna göre hizmet verilir.",
    href: "#calisma-saatleri",
  },
];


const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "TDA Luxury İletişim",
  url: `${site.url}/iletisim`,
  description:
    "TDA Luxury Uşak iletişim, WhatsApp randevu, telefon, çalışma saatleri ve Google Haritalar yol tarifi bilgileri.",
  mainEntity: { "@id": `${site.url}/#business` },
};

const hours = [
  ["Pazartesi", "10:00 – 20:00"],
  ["Salı", "10:00 – 20:00"],
  ["Çarşamba", "10:00 – 20:00"],
  ["Perşembe", "10:00 – 20:00"],
  ["Cuma", "10:00 – 20:00"],
  ["Cumartesi", "10:00 – 20:00"],
  ["Pazar", "Randevu ile"],
];

export default function Page() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", url: site.url },
          { name: "İletişim", url: `${site.url}/iletisim` },
        ]}
      />
      <Nav />
      <main>
        <section className="contact-hero">
          <div className="contact-hero-bg" />
          <div className="container contact-hero-inner">
            <div className="contact-hero-copy">
              <p className="contact-kicker">TDA LUXURY İLETİŞİM</p>
              <h1>Premium Güzellik Deneyimi Bir Mesaj Kadar Yakın</h1>
              <p>
                Hizmet seçimi, ücretsiz ön görüşme ve randevu planlaması için
                ekibimize doğrudan ulaşın.
              </p>
              <div className="contact-hero-actions">
                <a className="btn-gold" href={waUrl()} target="_blank" rel="noreferrer">
                  <MessageCircle size={20} />
                  WhatsApp&apos;tan Randevu Al
                  <ArrowRight size={18} />
                </a>
                <a className="contact-hero-outline" href={mapsUrl} target="_blank" rel="noreferrer">
                  <MapPin size={19} />
                  Yol Tarifi Al
                </a>
              </div>
              <div className="contact-hero-trust">
                <span><ShieldCheck size={18} /> Ücretsiz ön görüşme</span>
                <span><Sparkles size={18} /> Kişiye özel planlama</span>
                <span><Star size={18} /> Premium hizmet deneyimi</span>
              </div>
            </div>

            <aside className="contact-concierge-card">
              <span>TDA CONCIERGE</span>
              <h2>Size En Uygun Hizmeti Birlikte Belirleyelim</h2>
              <ul>
                <li>Ücretsiz ön görüşme</li>
                <li>Kişiye özel bakım planı</li>
                <li>Uzman ekip yönlendirmesi</li>
                <li>Randevu öncesi bilgilendirme</li>
              </ul>
              <a href={waUrl("Merhaba, TDA Luxury danışmanlık hizmeti hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">
                Danışmana Yaz <ArrowRight size={17} />
              </a>
            </aside>
          </div>
        </section>

        <section className="contact-main-section">
          <div className="container">
            <div className="contact-card-grid">
              {contactCards.map(({ icon: Icon, label, title, text, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="contact-info-card">
                  <div className="contact-info-icon"><Icon size={24} /></div>
                  <span>{label}</span>
                  <h2>{title}</h2>
                  <p>{text}</p>
                  <b>Detayı Aç <ArrowRight size={15} /></b>
                </a>
              ))}
            </div>

            <div className="contact-layout">
              <ContactForm />

              <div className="contact-side-stack">
                <section id="calisma-saatleri" className="contact-hours-card">
                  <p className="section-label">ÇALIŞMA SAATLERİ</p>
                  <h2>Randevunuzu Size Uygun Zamana Planlayın</h2>
                  <div className="contact-hours-list">
                    {hours.map(([day, time]) => (
                      <div key={day}>
                        <span>{day}</span>
                        <b>{time}</b>
                      </div>
                    ))}
                  </div>
                  <p className="contact-hours-note">
                    Yoğunluk nedeniyle gelmeden önce randevu oluşturmanızı öneririz.
                  </p>
                </section>

                <section className="contact-social-card">
                  <p className="section-label">SOSYAL MEDYA</p>
                  <h2>Güncel İşlemlerimizi Takip Edin</h2>
                  <a href={site.instagram} target="_blank" rel="noreferrer">
                    <Instagram size={22} />
                    <span>
                      <small>Instagram</small>
                      <strong>@tdaluxuryusak</strong>
                    </span>
                    <ArrowRight size={17} />
                  </a>
                  <a href={waUrl()} target="_blank" rel="noreferrer">
                    <MessageCircle size={22} />
                    <span>
                      <small>WhatsApp</small>
                      <strong>{site.phoneDisplay}</strong>
                    </span>
                    <ArrowRight size={17} />
                  </a>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-map-section">
          <div className="container contact-map-grid contact-map-grid-premium">
            <div className="contact-map-copy">
              <p className="section-label">YOL TARİFİ</p>
              <h2>TDA Luxury Uşak Merkez&apos;de</h2>
              <p>
                Google Haritalar üzerinden bulunduğunuz noktadan doğrudan rota
                oluşturabilir, randevu öncesinde ekibimizden konum desteği
                alabilirsiniz.
              </p>

              <div className="contact-location-card">
                <MapPin size={24} />
                <div>
                  <small>Salon Konumu</small>
                  <strong>{site.address}</strong>
                  <span>Uşak ve çevre ilçelerden kolay ulaşım</span>
                </div>
              </div>

              <div className="contact-map-actions">
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="dark-btn">
                  Google Haritalar&apos;da Aç <ArrowRight size={16} />
                </a>
                <a href={`tel:+${site.whatsapp}`} className="contact-map-secondary">
                  <Phone size={17} /> Konum İçin Ara
                </a>
              </div>

              <div className="contact-service-areas">
                <span>Hizmet bölgeleri</span>
                <div>
                  {site.serviceAreas.map((area) => (
                    <b key={area}>{area}</b>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-map-stage">
              <div className="contact-map-badge">
                <MapPin size={18} />
                <span>Canlı Yol Tarifi</span>
              </div>
              <div className="contact-map-frame-wrap">
                <iframe
                  title="TDA Luxury Uşak konumu"
                  src={mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="contact-map-frame"
                />
              </div>
              <div className="contact-map-footer">
                <span>Randevu öncesi konumu telefonunuza kaydedin.</span>
                <a href={waUrl("Merhaba, TDA Luxury konum bilgisi ve yol tarifi hakkında destek almak istiyorum.")} target="_blank" rel="noreferrer">
                  WhatsApp&apos;tan Konum İste <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-final-cta">
          <div className="container contact-final-cta-inner">
            <div>
              <p>KENDİNİZ İÇİN BİR ADIM ATIN</p>
              <h2>Bugün Ücretsiz Danışmanlık Alın</h2>
              <span>İhtiyacınıza uygun hizmeti birlikte belirleyelim.</span>
            </div>
            <a href={waUrl()} target="_blank" rel="noreferrer">
              <CalendarDays size={20} />
              Randevu Oluştur
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
