import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, CalendarClock, ExternalLink, ShieldCheck } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Yayın ve İçerik İlkeleri | TDA Luxury",
  description:
    "TDA Luxury web sitesindeki hizmet ve blog içeriklerinin hazırlanma, güncellenme ve bilgilendirme ilkelerini inceleyin.",
  path: "/yayin-ilkeleri",
});

const items = [
  {
    icon: BookOpenCheck,
    title: "Kullanıcıya Fayda",
    text: "İçerikler anahtar kelime tekrarı için değil, ziyaretçilerin sık sorduğu sorulara açık ve anlaşılır yanıt vermek amacıyla hazırlanır.",
  },
  {
    icon: ShieldCheck,
    title: "Abartısız Dil",
    text: "Kesin sonuç, garanti, tıbbi tedavi veya herkeste aynı etki iddiası kullanılmaz. Kişisel farklılıklar özellikle belirtilir.",
  },
  {
    icon: CalendarClock,
    title: "Düzenli Güncelleme",
    text: "Blog içeriklerinde yayın ve güncelleme tarihleri gösterilir. Hizmet kapsamı değiştiğinde ilgili sayfalar gözden geçirilir.",
  },
  {
    icon: ExternalLink,
    title: "Doğru Yönlendirme",
    text: "Güzellik uygulamasının kapsamını aşan sağlık sorunlarında uzman hekim veya uygun sağlık kuruluşuna başvurulması önerilir.",
  },
];

export default function EditorialPage() {
  return (
    <>
      <Nav />
      <main className="editorial-page">
        <BreadcrumbSchema
          items={[
            { name: "Anasayfa", url: `${site.url}/` },
            { name: "Yayın İlkeleri", url: `${site.url}/yayin-ilkeleri` },
          ]}
        />
        <section className="editorial-hero">
          <div className="container editorial-hero-inner">
            <p className="editorial-kicker">ŞEFFAFLIK VE GÜVEN</p>
            <h1>Yayın ve İçerik İlkelerimiz</h1>
            <p>
              Web sitemizdeki içeriklerin amacı, hizmetler hakkında anlaşılır
              bilgi sunmak ve doğru beklenti oluşturmaktır. İçerikler tıbbi
              teşhis veya tedavi önerisi yerine geçmez.
            </p>
          </div>
        </section>

        <section className="editorial-content">
          <div className="container">
            <div className="editorial-grid">
              {items.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon size={30} />
                  <h2>{title}</h2>
                  <p>{text}</p>
                </article>
              ))}
            </div>

            <div className="editorial-detail-grid">
              <section>
                <p className="section-label">İÇERİK SORUMLULUĞU</p>
                <h2>İçerikleri kim hazırlıyor?</h2>
                <p>
                  Hizmet içerikleri TDA Luxury’nin sunduğu uygulamalar, danışan
                  soruları ve işletme deneyimi temel alınarak hazırlanır. Genel
                  sağlık ve güvenlik bilgileri gerektiğinde güvenilir sağlık
                  kaynaklarıyla karşılaştırılır.
                </p>
              </section>
              <section>
                <p className="section-label">DÜZELTME VE GERİ BİLDİRİM</p>
                <h2>Hatalı bilgi fark ederseniz</h2>
                <p>
                  Güncelliğini yitirmiş veya yanlış olduğunu düşündüğünüz bir
                  bilgi için iletişim sayfamızdan bize ulaşabilirsiniz. Uygun
                  bulunan düzeltmeler içerik güncelleme tarihiyle birlikte
                  uygulanır.
                </p>
              </section>
            </div>

            <div className="editorial-cta">
              <div>
                <p className="section-label">DAHA FAZLA BİLGİ</p>
                <h2>Hizmetlerimizi ve güven yaklaşımımızı inceleyin</h2>
              </div>
              <div>
                <Link href="/kalite-hijyen" className="btn-gold">
                  KALİTE VE HİJYEN <ArrowRight size={18} />
                </Link>
                <Link href="/iletisim" className="editorial-secondary">
                  İLETİŞİM
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
