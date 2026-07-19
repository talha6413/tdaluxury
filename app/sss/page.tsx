import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/schema";
import { getManagedFaqGroups, type ManagedFaqGroup } from "@/lib/managed-content";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Sık Sorulan Sorular | TDA Luxury Uşak",
  description:
    "Lazer epilasyon, cilt bakımı, kalıcı makyaj, bölgesel incelme, randevu ve bakım süreçleri hakkında sık sorulan soruların yanıtları.",
  path: "/sss",
});

const fallbackGroups: ManagedFaqGroup[] = [
  {
    title: "Lazer Epilasyon",
    items: [
      ["Lazer epilasyon kaç seans sürer?", "Seans sayısı kıl yapısı, bölge, cilt tipi ve hormonal faktörlere göre değişir. Kişisel değerlendirme sonrasında yaklaşık bir plan oluşturulur."],
      ["Lazer öncesi nelere dikkat edilmeli?", "Uygulama bölgesine ağda veya epilatör yapılmamalı; güneşlenme ve aktif tahriş durumu ekiple paylaşılmalıdır."],
      ["Erkek lazer epilasyon yapılıyor mu?", "Evet. Sırt, göğüs, omuz, ense, sakal üstü ve farklı bölgeler için erkeklere özel planlama yapılır."],
    ],
  },
  {
    title: "Cilt Bakımı",
    items: [
      ["Hangi cilt bakımı bana uygun?", "Cilt tipi ve ihtiyaca göre profesyonel değerlendirme yapılır. Akne, leke, nem, anti-aging veya genel bakım hedeflerine göre seçim yapılır."],
      ["Cilt bakımı sonrası makyaj yapılabilir mi?", "Uygulamaya göre değişmekle birlikte cildin dinlenmesi için bakım sonrası bir süre makyaj yapılmaması önerilebilir."],
      ["Erkek cilt bakımı mevcut mu?", "Evet. Erkek cildinin yapısına ve ihtiyaçlarına uygun temizlik, dengeleme ve bakım seçenekleri sunulur."],
    ],
  },
  {
    title: "Kalıcı Makyaj & Kaş Kirpik",
    items: [
      ["Microblading ile pudralama kaş arasındaki fark nedir?", "Microblading kıl efekti odaklıdır; pudralama kaş daha yumuşak ve gölgeli bir görünüm hedefler. Uygun yöntem cilt tipi ve beklentiye göre belirlenir."],
      ["Kirpik lifting ne kadar kalıcıdır?", "Kişisel kirpik döngüsüne ve bakım alışkanlıklarına göre etkisi genellikle birkaç hafta devam eder."],
      ["Kalıcı makyaj sonrası bakım nasıl yapılır?", "Uygulama sonrası verilen bakım talimatlarına uyulmalı, bölge tahriş edilmemeli ve önerilen süre boyunca su/kozmetik teması sınırlandırılmalıdır."],
    ],
  },
  {
    title: "Randevu & Salon",
    items: [
      ["Randevu nasıl oluşturulur?", "WhatsApp üzerinden hizmet ve uygun gün bilgisi göndererek kolayca randevu oluşturabilirsiniz."],
      ["Ücretsiz danışmanlık var mı?", "Birçok hizmet için kısa ön değerlendirme ve bilgi görüşmesi yapılabilir. Detay için WhatsApp üzerinden ulaşabilirsiniz."],
      ["Konum ve çalışma saatleri nedir?", "Salonumuz Uşak Merkez’dedir. Güncel çalışma saatleri ve yol tarifi iletişim sayfamızda yer alır."],
    ],
  },
];

export default async function FAQPage() {
  const groups = await getManagedFaqGroups(fallbackGroups);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((group) => group.items.map(([question, answer]) => ({
      "@type": "Question", name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    }))),
  };
  return (
    <>
      <JsonLd data={faqSchema} />
      <Nav />
      <main className="faq-premium-page">
        <section className="faq-premium-hero">
          <div className="container faq-premium-hero-inner">
            <p className="faq-premium-kicker"><HelpCircle size={18} /> MERAK ETTİKLERİNİZ</p>
            <h1>Sık Sorulan Sorular</h1>
            <p>Lazer epilasyon, cilt bakımı, kalıcı makyaj ve randevu süreçleri hakkında en çok merak edilenleri sizin için derledik.</p>
            <a className="btn-gold" href="https://wa.me/905366651064" target="_blank" rel="noreferrer"><MessageCircle size={20} /> SORUNUZU BİZE YAZIN</a>
          </div>
        </section>

        <section className="faq-premium-content">
          <div className="container faq-premium-layout">
            <aside className="faq-premium-aside">
              <p className="section-label">HIZLI DESTEK</p>
              <h2>Aradığınız Yanıtı Bulamadınız mı?</h2>
              <p>Uzman ekibimiz hizmetler, uygulama süreçleri ve randevu hakkında size yardımcı olur.</p>
              <ul>
                <li><ShieldCheck size={18} /> Kişiye özel bilgi</li>
                <li><ShieldCheck size={18} /> Hızlı WhatsApp desteği</li>
                <li><ShieldCheck size={18} /> Premium danışmanlık</li>
              </ul>
              <a href="https://wa.me/905366651064" target="_blank" rel="noreferrer">WHATSAPP’TAN YAZIN <ArrowRight size={17} /></a>
            </aside>

            <div className="faq-premium-groups">
              {groups.map((group, groupIndex) => (
                <section key={group.title} className="faq-premium-group">
                  <div className="faq-premium-group-title"><span>0{groupIndex + 1}</span><h2>{group.title}</h2></div>
                  <div className="faq-premium-list">
                    {group.items.map(([question, answer]) => (
                      <details key={question}>
                        <summary>{question}<span>+</span></summary>
                        <p>{answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-premium-final">
          <div className="container faq-premium-final-inner">
            <div>
              <p className="section-label"><Sparkles size={16} /> TDA LUXURY DANIŞMANLIK</p>
              <h2>Size Özel Bir Plan Oluşturalım</h2>
              <p>Hangi hizmetin size uygun olduğunu birlikte belirleyelim.</p>
            </div>
            <div className="faq-premium-final-actions">
              <Link href="/hizmetler" className="faq-premium-outline">HİZMETLERİ GÖR</Link>
              <a className="btn-gold" href="https://wa.me/905366651064" target="_blank" rel="noreferrer">RANDEVU AL <ArrowRight size={18} /></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
