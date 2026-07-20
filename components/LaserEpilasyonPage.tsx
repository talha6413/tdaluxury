import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/lib/schema";
import { site, waUrl } from "@/lib/site";

const faqs = [
  { question: "Lazer epilasyon kaç seans sürer?", answer: "Seans sayısı kıl yapısı, cilt tonu, uygulama bölgesi, hormonal durum ve düzenli katılıma göre değişir. Kesin sayı yerine kişiye özel değerlendirme yapılması daha doğrudur." },
  { question: "İlk seansta sonuç alınır mı?", answer: "İlk seanstan sonra bazı kıllarda dökülme ve büyüme hızında azalma görülebilir; kalıcı ve düzenli azalma için seri seanslar gerekir." },
  { question: "Lazer epilasyon tamamen kalıcı mıdır?", answer: "Doğru ifade uzun süreli kıl azalmasıdır. Zaman içinde hormonal değişiklikler veya yeni folikül aktivitesi nedeniyle bakım seansları gerekebilir." },
  { question: "İşlem acıtır mı?", answer: "Hissedilen konfor kişiden kişiye değişir. Çoğu kişi kısa süreli sıcaklık veya lastik çarpmasına benzer bir his tarif eder. Soğutma ve doğru ayar konforu artırabilir." },
  { question: "Lazer öncesi jilet yapılır mı?", answer: "Genellikle uygulama bölgesinin kökten alınmadan kısaltılması istenir. Ağda, epilatör veya cımbız kıl kökünü aldığı için seans planını etkileyebilir." },
  { question: "Güneşlenmiş cilde lazer yapılır mı?", answer: "Yeni bronzlaşmış ciltte risk artabilir. Güneşlenme, solaryum ve bronzlaştırıcı ürünler mutlaka ön görüşmede bildirilmelidir." },
  { question: "Lazer sonrası güneşe çıkılır mı?", answer: "Uygulama sonrası doğrudan güneşten kaçınmak ve bölgeyi uygun şekilde korumak önemlidir. Size verilen bakım önerileri uygulanmalıdır." },
  { question: "Yaz aylarında lazer yapılabilir mi?", answer: "Uygun bölge, cilt durumu ve güneşten korunma planıyla bazı uygulamalar yaz döneminde yapılabilir. Karar kişiye özel verilmelidir." },
  { question: "Hangi kıl renklerinde daha etkilidir?", answer: "Lazer enerjisi kıldaki melanini hedeflediği için koyu ve kalın kıllarda yanıt genellikle daha belirgindir. Çok açık, beyaz veya gri kıllarda etkinlik sınırlı olabilir." },
  { question: "Erkek lazer epilasyon yapılır mı?", answer: "Evet. Sırt, göğüs, omuz, ense, sakal üstü ve diğer bölgeler için erkeklere özel planlama yapılabilir." },
  { question: "Yüz bölgesine lazer yapılır mı?", answer: "Yüz bölgesi dikkatli değerlendirme gerektirir. Kılın kalınlığı, hormonal durum ve cilt tipi incelenmeden standart protokol uygulanmamalıdır." },
  { question: "Hamilelikte lazer yapılır mı?", answer: "Hamilelik döneminde estetik lazer uygulamaları genellikle ertelenir. Kişisel durum için sağlık profesyoneline danışılmalıdır." },
  { question: "İlaç kullanıyorsam lazer yaptırabilir miyim?", answer: "Işığa duyarlılık oluşturabilecek ilaçlar ve bazı cilt tedavileri risk yaratabilir. Kullandığınız ilaçları ön görüşmede eksiksiz paylaşmalısınız." },
  { question: "Seans aralıkları ne kadar?", answer: "Bölgeye ve kıl döngüsüne göre değişir. Vücut bölgelerinde çoğu plan birkaç haftalık aralıklarla ilerler; net takvim değerlendirme sonrası belirlenir." },
];

const areas = ["Kadın lazer epilasyon", "Erkek lazer epilasyon", "Tüm vücut lazer", "Yüz lazer epilasyon", "Bacak ve kol", "Koltuk altı", "Bikini bölgesi", "Sırt, göğüs ve omuz"];

export default function LaserEpilasyonPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Ana Sayfa", url: site.url }, { name: "Hizmetler", url: `${site.url}/hizmetler` }, { name: "Lazer Epilasyon", url: `${site.url}/lazer-epilasyon` }]} />
      <ServiceSchema name="Uşak Lazer Epilasyon" description="TDA Luxury Uşak'ta kadın ve erkek lazer epilasyon hizmeti; kişiye özel değerlendirme, seans planı ve profesyonel süreç takibi." path="/lazer-epilasyon" />
      <FaqSchema items={faqs} />
      <Nav />
      <main className="laser-page">
        <section className="laser-hero">
          <Image src="/images/real/salon-03.webp" alt="TDA Luxury Uşak lazer epilasyon salonu" fill priority sizes="100vw" className="laser-hero-image" />
          <div className="laser-hero-overlay" />
          <div className="container laser-hero-content">
            <nav className="breadcrumb laser-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana Sayfa</Link><span>/</span><Link href="/hizmetler">Hizmetler</Link><span>/</span><span>Lazer Epilasyon</span></nav>
            <p className="section-label">TDA LUXURY UŞAK</p>
            <h1>Uşak Lazer Epilasyon</h1>
            <p className="laser-hero-lead">Kadın ve erkek danışanlar için cilt-kıl yapısına göre planlanan, şeffaf bilgilendirme ve düzenli takip odaklı lazer epilasyon deneyimi.</p>
            <div className="laser-actions">
              <a className="btn-gold" href={waUrl("Lazer epilasyon hakkında bilgi almak ve ücretsiz ön görüşme planlamak istiyorum.")} target="_blank" rel="noreferrer">WhatsApp’tan Bilgi Al →</a>
              <a className="laser-outline-btn" href="#rehber">Detaylı Rehberi İncele</a>
            </div>
            <div className="laser-trust-row"><span>✦ Kişiye özel değerlendirme</span><span>✦ Kadın ve erkek uygulamaları</span><span>✦ Uşak Merkez</span></div>
          </div>
        </section>

        <section id="rehber" className="laser-intro section-light">
          <div className="container laser-two-col">
            <article>
              <p className="section-label">BİLİNÇLİ KARAR REHBERİ</p>
              <h2>Lazer Epilasyon Nedir?</h2>
              <p>Lazer epilasyon, ışık enerjisinin kıldaki pigment tarafından emilmesi prensibiyle çalışan ve kıl köklerinin yeniden üretim kapasitesini azaltmayı hedefleyen bir uygulamadır. Süreç tek seanstan ibaret değildir; kılların farklı büyüme evrelerinde olması nedeniyle belirli aralıklarla tekrarlanan seanslar gerekir.</p>
              <p>Başarılı bir plan yalnızca cihaz adına dayanmaz. Cilt tonu, kılın rengi ve kalınlığı, uygulama bölgesi, hormonal faktörler, güneşlenme durumu ve önceki epilasyon yöntemleri birlikte değerlendirilmelidir. Bu nedenle TDA Luxury’de ilk adım standart paket satışı değil, uygunluk ve beklenti değerlendirmesidir.</p>
              <p>Gerçekçi beklenti önemlidir: amaç “tek seansta tamamen bitirme” değil, zaman içinde belirgin ve uzun süreli kıl azalması sağlamaktır. Sonuçlar kişiden kişiye değişebilir ve bazı danışanlarda ilerleyen dönemde bakım seansları gerekebilir.</p>
            </article>
            <aside className="laser-summary-card">
              <span>HIZLI ÖZET</span>
              <h3>Doğru planın 4 temeli</h3>
              <ul><li>Cilt ve kıl analizi</li><li>Uygun enerji ve uygulama tekniği</li><li>Düzenli seans takibi</li><li>Güneş ve bakım kurallarına uyum</li></ul>
              <a href={waUrl("Lazer epilasyon için cilt ve kıl değerlendirmesi hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">Ön görüşme oluştur →</a>
            </aside>
          </div>
        </section>

        <section className="laser-dark-section">
          <div className="container">
            <div className="laser-section-head"><div><p className="section-label">KİŞİYE ÖZEL PLANLAMA</p><h2>Kimler İçin Uygun Olabilir?</h2></div><p>Uygunluk, yalnızca yaş veya cinsiyete göre değil; cilt, kıl ve sağlık öyküsüne göre değerlendirilir.</p></div>
            <div className="laser-feature-grid">
              <div><b>01</b><h3>Koyu ve belirgin kıllar</h3><p>Kıldaki pigment arttıkça ışık enerjisinin hedeflenmesi genellikle daha kolay olur.</p></div>
              <div><b>02</b><h3>Düzenli bakım isteyenler</h3><p>Jilet, ağda ve epilatör döngüsünü azaltmak isteyenler için uzun vadeli bir plan sunabilir.</p></div>
              <div><b>03</b><h3>Kadın ve erkek danışanlar</h3><p>Yüzden sırt bölgesine kadar farklı alanlar için ayrı protokoller gerekir.</p></div>
              <div><b>04</b><h3>Gerçekçi beklentiye sahip kişiler</h3><p>Seanslara düzenli katılım ve bakım önerilerine uyum sonuçları doğrudan etkiler.</p></div>
            </div>
          </div>
        </section>

        <section className="section-light laser-content-block">
          <div className="container laser-article-grid">
            <article>
              <p className="section-label">SEANS PLANI</p>
              <h2>Seans Sayısı ve Aralıkları Nasıl Belirlenir?</h2>
              <p>Kıllar aynı anda aktif büyüme evresinde bulunmaz. Lazer, özellikle aktif evredeki kılları daha iyi hedefler. Bu nedenle uygulamalar, bölgenin kıl döngüsüne uygun aralıklarla tekrarlanır. Yüz ve vücut bölgelerinin döngüleri aynı değildir; herkese tek tip takvim vermek doğru olmaz.</p>
              <p>İlk seanslardan sonra kılların daha yavaş uzaması, bazı alanlarda seyrelme ve kıl kalınlığında azalma görülebilir. Ancak düzenli takip tamamlanmadan erken sonuç değerlendirmesi yanıltıcı olabilir. Hormonal dengesizlik, bazı ilaçlar ve genetik özellikler seans sayısını artırabilir.</p>
              <h3>Sonucu etkileyen başlıca faktörler</h3>
              <ul className="laser-check-list"><li>Kıl rengi ve kalınlığı</li><li>Cilt tonu ve güneşlenme durumu</li><li>Uygulama bölgesi</li><li>Hormonal yapı ve ilaç kullanımı</li><li>Seans düzenine uyum</li><li>Seans aralarında kökten alma yapılmaması</li></ul>
            </article>
            <div className="laser-image-panel"><Image src="/images/real/salon-03.webp" alt="TDA Luxury Uşak lazer epilasyon salonu" fill sizes="(max-width: 900px) 100vw, 42vw" /></div>
          </div>
        </section>

        <section className="laser-process-section">
          <div className="container">
            <div className="laser-section-head"><div><p className="section-label">UYGULAMA AKIŞI</p><h2>TDA Luxury’de Süreç</h2></div><p>Her adım randevu öncesinde açıklanır; işlem sırasında konfor ve güvenlik önceliklendirilir.</p></div>
            <div className="laser-process-grid">
              {[['01','Ön görüşme','Cilt, kıl yapısı, kullanılan ilaçlar, güneşlenme ve beklentiler değerlendirilir.'],['02','Bölge hazırlığı','Kökten alma yapılmaz; bölge uygun şekilde kısaltılır ve uygulama öncesi kontrol edilir.'],['03','Kontrollü uygulama','Bölgeye ve kişiye uygun parametrelerle, koruyucu ekipman kullanılarak işlem gerçekleştirilir.'],['04','Takip ve bakım','Güneşten korunma, hassasiyet yönetimi ve bir sonraki seans zamanı hakkında bilgi verilir.']].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
            </div>
          </div>
        </section>

        <section className="section-light laser-content-block">
          <div className="container laser-two-col laser-prep-grid">
            <article>
              <p className="section-label">SEANS ÖNCESİ</p><h2>Nasıl Hazırlanmalısınız?</h2>
              <ul className="laser-number-list"><li><b>01</b><span>Güneşlenme ve solaryum geçmişinizi bildirin.</span></li><li><b>02</b><span>Ağda, epilatör ve cımbız gibi kökten alma yöntemlerini bırakın.</span></li><li><b>03</b><span>Kullandığınız ilaçları ve cilt ürünlerini eksiksiz paylaşın.</span></li><li><b>04</b><span>Randevu günü bölgeye parfüm, deodorant veya yoğun kozmetik sürmeyin.</span></li></ul>
            </article>
            <article>
              <p className="section-label">SEANS SONRASI</p><h2>Nelere Dikkat Etmelisiniz?</h2>
              <ul className="laser-number-list"><li><b>01</b><span>Doğrudan güneş ve solaryumdan kaçının.</span></li><li><b>02</b><span>İlk saatlerde sıcak duş, sauna ve yoğun sürtünmeyi sınırlayın.</span></li><li><b>03</b><span>Önerilen yatıştırıcı ve güneş koruyucu ürünleri kullanın.</span></li><li><b>04</b><span>Beklenmeyen kabarcık, yoğun ağrı veya kalıcı renk değişiminde sağlık profesyoneline başvurun.</span></li></ul>
            </article>
          </div>
        </section>

        <section className="laser-areas-section">
          <div className="container"><p className="section-label">UYGULAMA BÖLGELERİ</p><h2>Kadın ve Erkek Lazer Epilasyon Seçenekleri</h2><div className="laser-area-grid">{areas.map(area=><div key={area}>{area}<span>→</span></div>)}</div><div className="laser-link-row"><Link href="/lazer-epilasyon/kadin-lazer-epilasyon">Kadın lazer epilasyon rehberi</Link><Link href="/lazer-epilasyon/erkek-lazer-epilasyon">Erkek lazer epilasyon rehberi</Link><Link href="/lazer-epilasyon/tum-vucut-lazer-epilasyon">Tüm vücut lazer</Link><Link href="/lazer-epilasyon/yuz-lazer-epilasyon">Yüz lazer epilasyon</Link></div></div>
        </section>

        <section className="section-light laser-faq-section">
          <div className="container laser-faq-grid"><div><p className="section-label">SIK SORULAN SORULAR</p><h2>Lazer Epilasyon Hakkında Merak Edilenler</h2><p>Yanıtlar genel bilgilendirme amaçlıdır. Cilt hastalığı, ilaç kullanımı veya özel sağlık durumunda kişisel değerlendirme gerekir.</p></div><div>{faqs.map(f=><details key={f.question}><summary>{f.question}<span>+</span></summary><p>{f.answer}</p></details>)}</div></div>
        </section>

        <section className="laser-related-section"><div className="container"><div className="laser-section-head"><div><p className="section-label">İLGİLİ İÇERİKLER</p><h2>Karar Vermeden Önce İnceleyin</h2></div></div><div className="laser-related-grid"><Link href="/blog/lazer-epilasyon-kac-seans"><span>BLOG</span><h3>Lazer epilasyon kaç seans sürer?</h3><p>Seans sayısını etkileyen faktörleri öğrenin.</p></Link><Link href="/lazer-epilasyon/yuz-lazer-epilasyon"><span>HİZMET</span><h3>Yüz lazer epilasyon</h3><p>Yüz bölgesinde neden daha dikkatli planlama gerekir?</p></Link><Link href="/igneli-epilasyon"><span>ALTERNATİF</span><h3>İğneli epilasyon</h3><p>Açık renkli veya tekil kıllar için alternatif yaklaşım.</p></Link></div></div></section>

        <section className="service-detail-final-cta"><div className="container service-detail-final-cta-inner"><div><p className="section-label">ÜCRETSİZ ÖN GÖRÜŞME</p><h2>Size uygun lazer planını birlikte belirleyelim</h2><p>Uşak Merkez’de kadın ve erkek lazer epilasyon seçenekleri için WhatsApp üzerinden bilgi alın.</p></div><a className="btn-gold" href={waUrl("Uşak lazer epilasyon için ücretsiz ön görüşme ve randevu bilgisi almak istiyorum.")} target="_blank" rel="noreferrer">WhatsApp’tan Yazın →</a></div></section>
      </main>
      <Footer />
    </>
  );
}
