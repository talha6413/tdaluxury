import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Çerez Politikası",
  description: "TDA Luxury web sitesinde kullanılan zorunlu ve analitik çerezler hakkında bilgilendirme.",
  path: "/cerez-politikasi",
});

export default function CookiePage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="legal-page">
        <section className="legal-hero">
          <div className="container legal-shell">
            <p className="eyebrow">YASAL BİLGİLENDİRME</p>
            <h1>Çerez Politikası</h1>
            <p>Çerezlerin ne olduğunu, hangi amaçlarla kullanılabileceğini ve tercihlerinizi nasıl yönetebileceğinizi açıklıyoruz.</p>
          </div>
        </section>
        <section className="container legal-content">
          <h2>Çerez nedir?</h2>
          <p>Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır.</p>
          <h2>Zorunlu çerezler</h2>
          <p>Sitenin güvenli ve doğru çalışması için gerekli olan teknik çerezler kullanıcı deneyiminin temelini oluşturur.</p>
          <h2>Analitik çerezler</h2>
          <p>Google Analytics gibi ölçüm araçları yalnızca ilgili kimlik tanımlandığında çalıştırılır. Bu araçlar sayfa görüntüleme ve kullanım davranışlarını toplu olarak analiz etmeye yardımcı olur.</p>
          <h2>Tercihlerinizi yönetme</h2>
          <p>Tarayıcı ayarlarınız üzerinden çerezleri silebilir, engelleyebilir veya belirli siteler için özel tercih belirleyebilirsiniz.</p>
          <h2>Güncellemeler</h2>
          <p>Bu politika, kullanılan teknolojiler veya yasal gereklilikler değiştiğinde güncellenebilir.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
