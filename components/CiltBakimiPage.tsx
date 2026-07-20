import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/lib/schema";
import { site, waUrl } from "@/lib/site";

const faqs = [
  { question: "Cilt bakımı kimler için uygundur?", answer: "Kuruluk, mat görünüm, düzensiz doku, yağlanma, gözenek görünümü veya bakım ihtiyacı yaşayan yetişkinler için kişiye özel planlanabilir. Uygulama öncesinde cilt analizi yapılması önemlidir." },
  { question: "İlk seansta sonuç görülür mü?", answer: "İlk uygulama sonrasında cilt daha temiz, nemli ve canlı görünebilir. Akne, leke görünümü veya bariyer hassasiyeti gibi ihtiyaçlarda düzenli bakım ve ev rutini gerekebilir." },
  { question: "Cilt bakımı ne kadar sürer?", answer: "Seçilen protokole göre çoğu bakım yaklaşık 45–90 dakika arasında planlanır." },
  { question: "Akneye eğilimli ciltlerde bakım yapılır mı?", answer: "Evet; ancak aktif ve iltihaplı lezyonların durumu değerlendirilmelidir. Gerektiğinde dermatoloji görüşü önerilir ve agresif işlemlerden kaçınılır." },
  { question: "Leke görünümüne yönelik bakım kaç seans sürer?", answer: "Leke türü, cilt tipi, güneş maruziyeti ve ev bakımı sonucu etkiler. Tek seans yerine düzenli ve kontrollü bir plan daha gerçekçidir." },
  { question: "Erkek cilt bakımı farklı mı planlanır?", answer: "Sakal bölgesi, yağlanma, tıraş hassasiyeti ve gözenek görünümü dikkate alınarak erkek cilt bakımı kişiye özel planlanır." },
  { question: "Bakım sonrasında güneşe çıkılır mı?", answer: "Güneş koruyucu kullanılması ve yoğun güneşten kaçınılması önerilir. Uygulamanın içeriğine göre uzmanınız ek öneriler paylaşır." },
  { question: "Cilt bakımı sonrasında makyaj yapılabilir mi?", answer: "Mümkünse cildin dinlenmesi için aynı gün yoğun makyajdan kaçınılması daha uygundur." },
  { question: "Hamilelik döneminde cilt bakımı yapılır mı?", answer: "Hamilelikte kullanılabilecek içerikler sınırlıdır. Uygulama öncesinde gebelik bilgisi mutlaka paylaşılmalı ve hekim önerileri dikkate alınmalıdır." },
  { question: "Hydrafacial hizmetiniz var mı?", answer: "Hydrafacial ve benzeri cihazlı bakım seçeneklerinin güncel durumunu WhatsApp üzerinden sorabilirsiniz. Cihaz adından çok cilt ihtiyacına uygun protokol belirlemek önemlidir." },
  { question: "Randevu öncesi cilt analizi yapılıyor mu?", answer: "Evet. Cilt görünümü, hassasiyet, yağ dengesi ve bakım hedefleri değerlendirilerek uygulama planı oluşturulur." },
  { question: "Bakım öncesinde kullandığım ürünleri söylemeli miyim?", answer: "Evet. Retinoid, asit, leke ürünü veya reçeteli tedaviler cilt hassasiyetini etkileyebilir. Kullandığınız ürünleri ön görüşmede paylaşın." },
];

const concerns = [
  ["01", "Kuruluk ve nem kaybı", "Gerginlik, pullanma ve mat görünümde nem ve bariyer desteği odaklı planlama yapılır."],
  ["02", "Akneye eğilim", "Yağ dengesi, gözenek görünümü ve hassasiyet birlikte değerlendirilir."],
  ["03", "Leke görünümü", "Cilt tonu eşitsizliği ve güneş kaynaklı görünüm için kontrollü bakım planı oluşturulur."],
  ["04", "Yaşlanma belirtileri", "Nem kaybı, canlılık ve ince çizgi görünümüne yönelik destekleyici uygulamalar seçilir."],
];

const treatments = ["Cilt analizi", "Klasik cilt bakımı", "Nem bakımı", "Akneye eğilimli cilt bakımı", "Leke görünümü bakımı", "Anti-aging bakım", "Erkek cilt bakımı", "Hydrafacial hakkında bilgi"];

export default function CiltBakimiPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Ana Sayfa", url: site.url }, { name: "Hizmetler", url: `${site.url}/hizmetler` }, { name: "Cilt Bakımı", url: `${site.url}/cilt-bakimi` }]} />
      <ServiceSchema name="Uşak Cilt Bakımı" description="TDA Luxury Uşak'ta cilt analizi, nem, akneye eğilim, leke görünümü ve anti-aging odaklı kişiye özel cilt bakım hizmetleri." path="/cilt-bakimi" />
      <FaqSchema items={faqs} />
      <Nav />

      <main className="laser-page">
        <section className="laser-hero">
          <Image src="/images/real/salon-06.webp" alt="TDA Luxury Uşak cilt bakımı salonu" fill priority sizes="100vw" className="laser-hero-image" />
          <div className="laser-hero-overlay" />
          <div className="container laser-hero-content">
            <nav className="breadcrumb laser-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana Sayfa</Link><span>/</span><Link href="/hizmetler">Hizmetler</Link><span>/</span><span>Cilt Bakımı</span></nav>
            <p className="section-label">TDA LUXURY UŞAK</p>
            <h1>Uşak Cilt Bakımı</h1>
            <p className="laser-hero-lead">Cilt analiziyle başlayan; nem, akneye eğilim, leke görünümü ve anti-aging ihtiyaçlarına göre kişiselleştirilen premium bakım deneyimi.</p>
            <div className="laser-actions">
              <a className="btn-gold" href={waUrl("Cilt bakımı ve cilt analizi hakkında bilgi almak, ücretsiz ön görüşme planlamak istiyorum.")} target="_blank" rel="noreferrer">WhatsApp’tan Bilgi Al →</a>
              <a className="laser-outline-btn" href="#rehber">Bakım Rehberini İncele</a>
            </div>
            <div className="laser-trust-row"><span>✦ Cilt analizi</span><span>✦ Kişiye özel protokol</span><span>✦ Uşak Merkez</span></div>
          </div>
        </section>

        <section id="rehber" className="laser-intro section-light">
          <div className="container laser-two-col">
            <article>
              <p className="section-label">KİŞİYE ÖZEL BAKIM REHBERİ</p>
              <h2>Cilt Bakımı Nedir?</h2>
              <p>Profesyonel cilt bakımı; yalnızca cildi temizlemekten ibaret değildir. Cilt bariyeri, nem dengesi, yağlanma, hassasiyet, gözenek görünümü, leke eğilimi ve kişinin kullandığı ürünler birlikte değerlendirilerek planlanan kontrollü bir bakım sürecidir.</p>
              <p>Her cildin ihtiyacı aynı değildir. Kuru ve hassas bir cilt ile yağlanmaya ve akneye eğilimli bir ciltte aynı ürün ve uygulamaları kullanmak doğru olmaz. TDA Luxury’de bakım öncesinde cildin mevcut durumu ve beklentiniz konuşulur; ihtiyaç varsa daha sade bir bakım veya dermatoloji görüşü önerilebilir.</p>
              <p>Gerçekçi beklenti önemlidir. Tek seans cildin daha canlı ve temiz görünmesine katkı sağlayabilir; ancak akne eğilimi, leke görünümü veya bariyer sorunlarında düzenli bakım ve doğru ev rutini gerekebilir.</p>
            </article>
            <aside className="laser-summary-card">
              <span>HIZLI ÖZET</span>
              <h3>Doğru bakımın 4 temeli</h3>
              <ul><li>Cilt analizi</li><li>İhtiyaca uygun ürün ve uygulama</li><li>Bariyere saygılı kontrollü süreç</li><li>Ev bakımı ve güneş koruması</li></ul>
              <a href={waUrl("Cilt analizi ve kişiye özel bakım planı hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">Ön görüşme oluştur →</a>
            </aside>
          </div>
        </section>

        <section className="laser-dark-section">
          <div className="container">
            <div className="laser-section-head"><div><p className="section-label">CİLT İHTİYAÇLARI</p><h2>Hangi Durumlarda Tercih Edilebilir?</h2></div><p>Bakım seçimi işlem adına göre değil, cildin o günkü durumu ve uzun vadeli hedefe göre yapılmalıdır.</p></div>
            <div className="laser-feature-grid">{concerns.map(([n,t,d])=><div key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></div>)}</div>
          </div>
        </section>

        <section className="section-light laser-content-block">
          <div className="container laser-article-grid">
            <article>
              <p className="section-label">CİLT ANALİZİ</p>
              <h2>Bakımın İlk Adımı Doğru Değerlendirmedir</h2>
              <p>Cilt analizi sırasında kuruluk, yağ dengesi, hassasiyet, gözenek görünümü, aktif lezyonlar, güneşlenme ve mevcut ürün kullanımı değerlendirilir. Bu adım, gereksiz veya cildi yorabilecek uygulamalardan kaçınmak için önemlidir.</p>
              <p>Bazı durumlarda önce bariyer desteği gerekir. Aktif enfeksiyon, yoğun tahriş, açık yara veya devam eden medikal tedavide bakım ertelenebilir ve sağlık uzmanı görüşü önerilebilir.</p>
              <h3>Planlamayı etkileyen başlıca faktörler</h3>
              <ul className="laser-check-list"><li>Cilt tipi ve bariyer durumu</li><li>Aktif ürün ve ilaç kullanımı</li><li>Akne ve hassasiyet düzeyi</li><li>Güneş maruziyeti</li><li>Bakım hedefi</li><li>Ev rutini ve düzenlilik</li></ul>
            </article>
            <div className="laser-image-panel"><Image src="/images/real/salon-05.webp" alt="TDA Luxury danışmanlık ve cilt analizi alanı" fill sizes="(max-width: 900px) 100vw, 42vw" /></div>
          </div>
        </section>

        <section className="laser-process-section">
          <div className="container">
            <div className="laser-section-head"><div><p className="section-label">UYGULAMA AKIŞI</p><h2>TDA Luxury’de Cilt Bakımı Süreci</h2></div><p>Her adım bakım öncesinde açıklanır; cilt konforu, hijyen ve kontrollü uygulama önceliklendirilir.</p></div>
            <div className="laser-process-grid">
              {[["01","Ön görüşme","Cilt geçmişi, kullanılan ürünler ve bakım hedefleri konuşulur."],["02","Cilt analizi","Nem, yağ dengesi, hassasiyet ve mevcut görünüm değerlendirilir."],["03","Kişiye özel bakım","Temizleme, arındırma, nem ve destek adımları kontrollü uygulanır."],["04","Takip ve ev rutini","Güneş koruması, ürün kullanımı ve sonraki bakım zamanı paylaşılır."]].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
            </div>
          </div>
        </section>

        <section className="section-light laser-content-block">
          <div className="container laser-two-col laser-prep-grid">
            <article>
              <p className="section-label">BAKIM ÖNCESİ</p><h2>Nasıl Hazırlanmalısınız?</h2>
              <ul className="laser-number-list"><li><b>01</b><span>Kullandığınız aktif içerikleri ve ilaçları paylaşın.</span></li><li><b>02</b><span>Yakın zamanda yapılan peeling veya medikal işlemleri belirtin.</span></li><li><b>03</b><span>Aktif enfeksiyon veya açık yara varsa randevuyu erteleyin.</span></li><li><b>04</b><span>Mümkünse yoğun makyaj olmadan gelin.</span></li></ul>
            </article>
            <article>
              <p className="section-label">BAKIM SONRASI</p><h2>Nelere Dikkat Etmelisiniz?</h2>
              <ul className="laser-number-list"><li><b>01</b><span>Aynı gün yoğun makyaj ve sert peeling ürünlerinden kaçının.</span></li><li><b>02</b><span>Güneş koruyucuyu düzenli yenileyin.</span></li><li><b>03</b><span>Önerilen sade ev rutinini uygulayın.</span></li><li><b>04</b><span>Beklenmeyen yoğun hassasiyette merkeze veya sağlık uzmanına danışın.</span></li></ul>
            </article>
          </div>
        </section>

        <section className="laser-areas-section">
          <div className="container"><p className="section-label">BAKIM SEÇENEKLERİ</p><h2>Cilt İhtiyacınıza Göre Uygulamalar</h2><div className="laser-area-grid">{treatments.map(item=><div key={item}>{item}<span>→</span></div>)}</div><div className="laser-link-row"><Link href="/cilt-bakimi/hydrafacial">Hydrafacial</Link><Link href="/cilt-bakimi/cilt-analizi">Cilt analizi</Link><Link href="/cilt-bakimi/akne-bakimi">Akne bakımı</Link><Link href="/cilt-bakimi/leke-bakimi">Leke bakımı</Link><Link href="/cilt-bakimi/anti-aging">Anti-aging bakım</Link><Link href="/cilt-bakimi/erkek-cilt-bakimi">Erkek cilt bakımı</Link></div></div>
        </section>

        <section className="section-light laser-faq-section">
          <div className="container laser-faq-grid"><div><p className="section-label">SIK SORULAN SORULAR</p><h2>Cilt Bakımı Hakkında Merak Edilenler</h2><p>Yanıtlar genel bilgilendirme amaçlıdır. Cilt hastalığı, ilaç kullanımı veya özel sağlık durumunda kişisel değerlendirme gerekir.</p></div><div>{faqs.map(f=><details key={f.question}><summary>{f.question}<span>+</span></summary><p>{f.answer}</p></details>)}</div></div>
        </section>

        <section className="laser-related-section"><div className="container"><div className="laser-section-head"><div><p className="section-label">İLGİLİ İÇERİKLER</p><h2>Bakım Seçmeden Önce İnceleyin</h2></div></div><div className="laser-related-grid"><Link href="/cilt-bakimi/akne-bakimi"><span>HİZMET</span><h3>Akneye eğilimli cilt bakımı</h3><p>Yağ dengesi ve hassasiyet odaklı bakım yaklaşımı.</p></Link><Link href="/cilt-bakimi/anti-aging"><span>HİZMET</span><h3>Anti-aging bakım</h3><p>Nem, canlılık ve ince çizgi görünümüne yönelik destek.</p></Link><Link href="/blog/cilt-bakimi-sonrasi-makyaj"><span>BLOG</span><h3>Cilt bakımından sonra makyaj</h3><p>Bakım sonrasında nelere dikkat edilmeli?</p></Link></div></div></section>

        <section className="service-detail-final-cta"><div className="container service-detail-final-cta-inner"><div><p className="section-label">ÜCRETSİZ ÖN GÖRÜŞME</p><h2>Cildinize uygun bakım planını birlikte belirleyelim</h2><p>Uşak Merkez’de cilt analizi ve kişiye özel bakım seçenekleri için WhatsApp üzerinden bilgi alın.</p></div><a className="btn-gold" href={waUrl("Uşak cilt bakımı için ücretsiz ön görüşme ve randevu bilgisi almak istiyorum.")} target="_blank" rel="noreferrer">WhatsApp’tan Yazın →</a></div></section>
      </main>

      <Footer />
    </>
  );
}
