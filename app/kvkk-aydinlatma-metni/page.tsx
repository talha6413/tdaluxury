import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "KVKK Aydınlatma Metni",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında TDA Luxury aydınlatma metni.",
  path: "/kvkk-aydinlatma-metni",
});

export default function KvkkPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="legal-page">
        <section className="legal-hero">
          <div className="container legal-shell">
            <p className="eyebrow">KVKK</p>
            <h1>Aydınlatma Metni</h1>
            <p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri işleme süreçlerimiz hakkında bilgilendirme.</p>
          </div>
        </section>
        <section className="container legal-content">
          <h2>Veri sorumlusu</h2>
          <p>Veri sorumlusu olarak {site.name}, kişisel verilerinizi hukuka ve dürüstlük kurallarına uygun şekilde işler.</p>
          <h2>İşlenen kişisel veriler</h2>
          <p>Kimlik ve iletişim bilgileri, randevu talebi, tercih edilen hizmet ve tarafınızca paylaşılan mesaj içerikleri işlenebilir.</p>
          <h2>İşleme amaçları</h2>
          <p>Randevu planlama, hizmet sunumu, müşteri ilişkileri, talep ve şikâyet yönetimi ile yasal yükümlülüklerin yerine getirilmesi amaçlanır.</p>
          <h2>Hukuki sebepler</h2>
          <p>Kişisel veriler; sözleşmenin kurulması veya ifası, hukuki yükümlülükler, meşru menfaat ve gerektiğinde açık rıza hukuki sebeplerine dayanılarak işlenebilir.</p>
          <h2>Aktarım</h2>
          <p>Veriler yalnızca hizmetin yürütülmesi için gerekli olduğu ölçüde yetkili hizmet sağlayıcılar ve kanunen yetkili kamu kurumlarıyla paylaşılabilir.</p>
          <h2>Haklarınız</h2>
          <p>KVKK’nın 11. maddesi kapsamında verilerinizin işlenip işlenmediğini öğrenme, düzeltme, silme ve işlemeye itiraz etme haklarına sahipsiniz.</p>
          <h2>Başvuru</h2>
          <p>Başvurularınızı {site.phoneDisplay} üzerinden iletebilirsiniz. Yayına geçmeden önce işletmenin açık unvanı ve adresi bu metne eklenmelidir.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
