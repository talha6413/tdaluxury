import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, CalendarDays, CheckCircle2, Gift, MessageCircle, Sparkles } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { getManagedCampaigns } from "@/lib/managed-content";

export const metadata: Metadata = buildMetadata({
  title: "TDA Luxury Kampanyalar | Uşak Güzellik Salonu",
  description:
    "TDA Luxury Uşak güncel kampanyalarını, dönemsel avantajlarını ve özel bakım fırsatlarını inceleyin. Randevu ve detaylar için WhatsApp’tan ulaşın.",
  path: "/kampanyalar",
});

const campaigns = [
  {
    title: "Lazer Epilasyon Danışmanlığı",
    eyebrow: "ÜCRETSİZ ÖN GÖRÜŞME",
    description: "Cilt ve kıl yapınıza göre kişisel seans planınızı uzman ekibimizle birlikte oluşturun.",
    image: "/images/services-premium/lazer-epilasyon.webp",
    href: "/lazer-epilasyon",
  },
  {
    title: "Cilt Bakımı Analiz Paketi",
    eyebrow: "KİŞİYE ÖZEL PLANLAMA",
    description: "Cildinizin ihtiyacını belirleyen analiz ve bakım önerisiyle doğru rutine başlayın.",
    image: "/images/services-premium/cilt-bakimi.webp",
    href: "/cilt-bakimi",
  },
  {
    title: "Bölgesel Bakım Programı",
    eyebrow: "DÖNEMSEL AVANTAJ",
    description: "G5 ve bölgesel incelme uygulamalarında ihtiyacınıza özel program seçeneklerini öğrenin.",
    image: "/images/services-premium/bolgesel-incelme.webp",
    href: "/bolgesel-incelme",
  },
];

export const revalidate = 60;

export default async function CampaignsPage() {
  const managedCampaigns = await getManagedCampaigns(campaigns);
  return (
    <>
      <Nav />
      <main className="campaign-page">
        <section className="campaign-hero">
          <Image src="/images/services-premium/services-hero.webp" alt="TDA Luxury kampanyalar" fill priority sizes="100vw" quality={80} className="campaign-hero-image" />
          <div className="campaign-hero-overlay" />
          <div className="container campaign-hero-inner">
            <p className="campaign-kicker"><BadgePercent size={18} /> TDA LUXURY AVANTAJLARI</p>
            <h1>Premium Bakımda<br />Özel Fırsatlar</h1>
            <p>Dönemsel kampanyalarımızı ve kişiye özel bakım avantajlarını keşfedin.</p>
            <a className="btn-gold" href="https://wa.me/905366651064" target="_blank" rel="noreferrer"><MessageCircle size={20} /> GÜNCEL KAMPANYAYI SOR</a>
          </div>
        </section>

        <section className="campaign-list-section">
          <div className="container">
            <div className="campaign-section-head">
              <div>
                <p className="section-label">SEÇİLİ AVANTAJLAR</p>
                <h2>Size Uygun Fırsatı Keşfedin</h2>
              </div>
              <p>Kampanya koşulları, uygunluk ve kontenjan bilgileri için doğrudan ekibimizle iletişime geçin.</p>
            </div>
            <div className="campaign-grid">
              {managedCampaigns.map((campaign) => (
                <article key={campaign.title} className="campaign-card">
                  <div className="campaign-card-media">
                    <Image src={campaign.image} alt={campaign.title} fill sizes="(max-width: 700px) 100vw, 33vw" />
                    <div className="campaign-card-shade" />
                    <span className="campaign-card-badge"><Gift size={15} /> {campaign.eyebrow}</span>
                  </div>
                  <div className="campaign-card-content">
                    <h2>{campaign.title}</h2>
                    <p>{campaign.description}</p>
                    <ul>
                      <li><CheckCircle2 size={17} /> Uzman ön değerlendirmesi</li>
                      <li><CheckCircle2 size={17} /> Kişiye özel planlama</li>
                      <li><CheckCircle2 size={17} /> Premium salon deneyimi</li>
                    </ul>
                    <div className="campaign-card-actions">
                      <Link href={campaign.href}>HİZMETİ İNCELE <ArrowRight size={16} /></Link>
                      <a href="https://wa.me/905366651064" target="_blank" rel="noreferrer">BİLGİ AL</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="campaign-how-section">
          <div className="container campaign-how-grid">
            <div>
              <p className="section-label">NASIL YARARLANIRIM?</p>
              <h2>Üç Adımda Randevu</h2>
              <p>Size uygun hizmeti ve kampanya koşullarını netleştirerek hızlıca randevu oluşturun.</p>
            </div>
            <div className="campaign-steps">
              {["WhatsApp’tan bize yazın", "Hizmet ve uygunluk değerlendirmesi yapalım", "Randevu gününüzü birlikte belirleyelim"].map((item, index) => (
                <div key={item}><span>0{index + 1}</span><p>{item}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="campaign-final-cta">
          <div className="container campaign-final-inner">
            <div>
              <p className="section-label"><CalendarDays size={16} /> SINIRLI KONTENJAN</p>
              <h2>Güncel Kampanyaları Kaçırmayın</h2>
              <p>Fiyat ve koşullar dönemsel olarak değişebilir. En güncel bilgi için bize yazın.</p>
            </div>
            <a className="btn-gold" href="https://wa.me/905366651064" target="_blank" rel="noreferrer"><Sparkles size={18} /> WHATSAPP’TAN BİLGİ AL</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
