import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Gizlilik Politikası",
  description: "TDA Luxury web sitesi gizlilik politikası ve kişisel verilerin işlenmesine ilişkin genel bilgiler.",
  path: "/gizlilik-politikasi",
});

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="legal-page">
        <section className="legal-hero">
          <div className="container legal-shell">
            <p className="eyebrow">YASAL BİLGİLENDİRME</p>
            <h1>Gizlilik Politikası</h1>
            <p>Web sitemizi kullanırken paylaştığınız bilgilerin hangi amaçlarla işlendiğini açık ve anlaşılır biçimde açıklıyoruz.</p>
          </div>
        </section>
        <section className="container legal-content">
          <h2>1. Kapsam</h2>
          <p>Bu politika, {site.name} tarafından işletilen {site.url} alan adlı web sitesini ziyaret eden kullanıcılar için geçerlidir.</p>
          <h2>2. Toplanan bilgiler</h2>
          <p>İletişim formu, WhatsApp yönlendirmesi veya telefon görüşmesi üzerinden ad, telefon numarası, talep edilen hizmet ve mesaj içeriği gibi bilgiler paylaşılabilir.</p>
          <h2>3. Kullanım amacı</h2>
          <p>Bu bilgiler; randevu oluşturmak, hizmet taleplerini yanıtlamak, müşteri iletişimini sürdürmek ve yasal yükümlülükleri yerine getirmek amacıyla kullanılır.</p>
          <h2>4. Saklama ve güvenlik</h2>
          <p>Kişisel bilgiler yalnızca gerekli süre boyunca saklanır ve yetkisiz erişime karşı uygun idari ve teknik tedbirlerle korunur.</p>
          <h2>5. Üçüncü taraf bağlantıları</h2>
          <p>WhatsApp, Instagram ve Google Haritalar bağlantıları üçüncü taraf hizmetlere yönlendirir. Bu platformların kendi gizlilik politikaları geçerlidir.</p>
          <h2>6. İletişim</h2>
          <p>Gizlilik talepleriniz için {site.phoneDisplay} numarasından bizimle iletişime geçebilirsiniz.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
