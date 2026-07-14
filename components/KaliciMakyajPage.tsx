import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/lib/schema";
import { site, waUrl } from "@/lib/site";

const faqs = [
  { question: "Kalıcı makyaj ne kadar süre kalır?", answer: "Kalıcılık; cilt tipi, uygulama tekniği, pigment seçimi, güneş maruziyeti ve bakım alışkanlıklarına göre değişir. Zamanla doğal biçimde silikleşir ve tazeleme gerekebilir." },
  { question: "İşlem öncesinde ön görüşme yapılır mı?", answer: "Evet. Yüz oranı, cilt yapısı, beklenti, renk seçimi ve sağlık bilgileri değerlendirilmeden uygulamaya başlanmamalıdır." },
  { question: "Microblading ile pudralama kaş arasındaki fark nedir?", answer: "Microblading kıl efekti odaklıdır; pudralama kaş ise daha yumuşak gölgelendirme görünümü sunar. Uygun yöntem cilt tipi ve istenen sonuca göre seçilir." },
  { question: "Dudak renklendirme doğal görünür mü?", answer: "Doğru pigment ve kontrollü uygulamayla dudak tonunu destekleyen doğal bir görünüm hedeflenebilir. İlk günlerde renk daha yoğun, iyileşme sonrası daha yumuşak görünür." },
  { question: "Dipliner ve eyeliner aynı uygulama mı?", answer: "Dipliner kirpik hattına daha yakın ve ince bir görünüm hedefler. Eyeliner daha belirgin kuyruk veya çizgi formunda planlanabilir." },
  { question: "İşlem acıtır mı?", answer: "Hissedilen konfor kişiden kişiye değişir. Uygulama öncesi ve sırasında konforu artırmaya yönelik yöntemler kullanılabilir." },
  { question: "Kalıcı makyaj kimlere uygulanmaz?", answer: "Aktif enfeksiyon, açık yara, bazı cilt hastalıkları, kontrolsüz kronik hastalıklar, gebelik veya kullanılan ilaçlar değerlendirmeyi etkileyebilir. Gerekirse hekim görüşü istenir." },
  { question: "İşlem sonrası kabuklanma olur mu?", answer: "Hafif kuruluk, kabuklanma veya renk koyuluğu görülebilir. Kabuklar koparılmamalı ve verilen bakım önerileri uygulanmalıdır." },
  { question: "Renk zamanla değişir mi?", answer: "Pigment zamanla solar. Güneş, cilt yapısı, ürün kullanımı ve bakım rutini renk değişimini etkileyebilir." },
  { question: "Rötuş gerekli midir?", answer: "İyileşme sonrası pigment tutunumu değerlendirilir. Bazı danışanlarda rötuş gerekebilir; karar kişiye özel verilir." },
  { question: "İşlem öncesi nelere dikkat etmeliyim?", answer: "Kan sulandırıcı kullanımı, uçuk geçmişi, alerjiler ve yakın zamanda yapılan estetik işlemler ön görüşmede paylaşılmalıdır." },
  { question: "Kalıcı makyaj sonrası makyaj yapılabilir mi?", answer: "Uygulama bölgesi iyileşene kadar yoğun makyaj, havuz, sauna ve aşırı terlemeden kaçınılması önerilir." },
];

const applications = [
  ["01", "Microblading", "Kıl efektiyle doğal kaş görünümü hedefleyen yöntem."],
  ["02", "Pudralama Kaş", "Yumuşak gölgelendirme ve daha dolgun kaş görünümü."],
  ["03", "Dipliner & Eyeliner", "Kirpik hattını belirginleştiren ince veya daha net çizgi seçenekleri."],
  ["04", "Dudak Renklendirme", "Dudak tonunu ve kontur görünümünü destekleyen kişiye özel uygulama."],
];

const services = ["Microblading", "Pudralama kaş", "Dipliner", "Eyeliner", "Dudak renklendirme", "Kaş tasarımı", "Rötuş değerlendirmesi", "Renk ve form danışmanlığı"];

export default function KaliciMakyajPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Ana Sayfa", url: site.url }, { name: "Hizmetler", url: `${site.url}/hizmetler` }, { name: "Kalıcı Makyaj", url: `${site.url}/kalici-makyaj` }]} />
      <ServiceSchema name="Uşak Kalıcı Makyaj" description="TDA Luxury Uşak'ta microblading, pudralama kaş, dipliner, eyeliner ve dudak renklendirme uygulamaları." path="/kalici-makyaj" />
      <FaqSchema items={faqs} />
      <Nav />

      <main className="laser-page">
        <section className="laser-hero">
          <Image src="/images/real/dudak-oncesi-sonrasi.webp" alt="Uşak kalıcı makyaj ve dudak renklendirme" fill priority sizes="100vw" className="laser-hero-image" />
          <div className="laser-hero-overlay" />
          <div className="container laser-hero-content">
            <nav className="breadcrumb laser-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana Sayfa</Link><span>/</span><Link href="/hizmetler">Hizmetler</Link><span>/</span><span>Kalıcı Makyaj</span></nav>
            <p className="section-label">TDA LUXURY UŞAK</p>
            <h1>Uşak Kalıcı Makyaj</h1>
            <p className="laser-hero-lead">Microblading, pudralama kaş, dipliner, eyeliner ve dudak renklendirme uygulamalarında yüz oranı, cilt yapısı ve doğal görünüm odaklı kişiye özel planlama.</p>
            <div className="laser-actions">
              <a className="btn-gold" href={waUrl("Kalıcı makyaj uygulamaları hakkında bilgi almak ve ön görüşme planlamak istiyorum.")} target="_blank" rel="noreferrer">WhatsApp’tan Bilgi Al →</a>
              <a className="laser-outline-btn" href="#rehber">Detaylı Rehberi İncele</a>
            </div>
            <div className="laser-trust-row"><span>✦ Altın oran değerlendirmesi</span><span>✦ Kişiye özel renk seçimi</span><span>✦ Uşak Merkez</span></div>
          </div>
        </section>

        <section id="rehber" className="laser-intro section-light">
          <div className="container laser-two-col">
            <article>
              <p className="section-label">BİLİNÇLİ KARAR REHBERİ</p>
              <h2>Kalıcı Makyaj Nedir?</h2>
              <p>Kalıcı makyaj, seçilen pigmentin cildin üst tabakalarına kontrollü şekilde uygulanmasıyla kaş, göz ve dudak bölgesinde uzun süreli görünüm desteği sağlamayı amaçlayan estetik bir uygulamadır.</p>
              <p>Başarılı sonuç yalnızca uygulama tekniğine bağlı değildir. Yüz oranı, cilt tipi, mevcut kaş yapısı, dudak tonu, kişinin günlük makyaj alışkanlığı ve beklentisi birlikte değerlendirilmelidir. Bu nedenle TDA Luxury’de ilk adım doğrudan işlem değil, form ve renk danışmanlığıdır.</p>
              <p>İlk günlerde renk daha yoğun görünebilir. İyileşme sürecinde pigment yumuşar ve gerçek sonuç birkaç hafta içinde netleşir. Kalıcılık kişiden kişiye değişir; zamanla tazeleme gerekebilir.</p>
            </article>
            <aside className="laser-summary-card">
              <span>HIZLI ÖZET</span>
              <h3>Doğal sonucun 4 temeli</h3>
              <ul><li>Yüz oranına uygun tasarım</li><li>Doğru pigment ve ton seçimi</li><li>Kontrollü uygulama tekniği</li><li>İyileşme ve bakım kurallarına uyum</li></ul>
              <a href={waUrl("Kalıcı makyaj için form ve renk danışmanlığı almak istiyorum.")} target="_blank" rel="noreferrer">Ön görüşme oluştur →</a>
            </aside>
          </div>
        </section>

        <section className="laser-dark-section">
          <div className="container">
            <div className="laser-section-head"><div><p className="section-label">UYGULAMA SEÇENEKLERİ</p><h2>Size Uygun Görünümü Birlikte Belirleyelim</h2></div><p>Teknik seçimi trend yerine yüz yapısı, cilt tipi ve günlük görünüm beklentisine göre yapılmalıdır.</p></div>
            <div className="laser-feature-grid">{applications.map(([n,t,d])=><div key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></div>)}</div>
          </div>
        </section>

        <section className="section-light laser-content-block">
          <div className="container laser-article-grid">
            <article>
              <p className="section-label">TASARIM VE RENK SEÇİMİ</p>
              <h2>Doğal Görünüm, Doğru Planlamayla Başlar</h2>
              <p>Kaş, göz ve dudak uygulamalarında hazır şablon kullanmak yerine yüz simetrisi, kemik yapısı ve kişisel stil dikkate alınmalıdır. Tasarım işlem öncesinde gösterilir ve onayınız alınmadan uygulamaya geçilmez.</p>
              <p>Pigment seçimi yalnızca istenen renge göre yapılmaz. Cilt alt tonu, mevcut pigment, iyileşme eğilimi ve zaman içindeki solma karakteri de değerlendirilir.</p>
              <h3>Planlamayı etkileyen başlıca faktörler</h3>
              <ul className="laser-check-list"><li>Yüz oranı ve simetri</li><li>Cilt tipi ve hassasiyet</li><li>Mevcut pigment veya eski işlem</li><li>Günlük makyaj alışkanlığı</li><li>Beklenen yoğunluk ve doğallık</li><li>İyileşme ve bakım uyumu</li></ul>
            </article>
            <div className="laser-image-panel"><Image src="/images/real/dudak-oncesi-sonrasi.webp" alt="TDA Luxury dudak renklendirme öncesi sonrası" fill sizes="(max-width: 900px) 100vw, 42vw" /></div>
          </div>
        </section>

        <section className="laser-process-section">
          <div className="container">
            <div className="laser-section-head"><div><p className="section-label">UYGULAMA AKIŞI</p><h2>TDA Luxury’de Kalıcı Makyaj Süreci</h2></div><p>Her aşama uygulama öncesinde açıklanır ve tasarım onayı alınarak ilerlenir.</p></div>
            <div className="laser-process-grid">
              {[["01","Ön görüşme","Sağlık bilgileri, beklenti, önceki işlemler ve günlük stil konuşulur."],["02","Tasarım ve renk","Yüz oranına göre form çizilir, pigment tonu birlikte belirlenir."],["03","Uygulama","Hijyen ve kontrollü teknikle seçilen bölgeye uygulama yapılır."],["04","İyileşme ve kontrol","Bakım önerileri paylaşılır; iyileşme sonrası rötuş ihtiyacı değerlendirilir."]].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
            </div>
          </div>
        </section>

        <section className="section-light laser-content-block">
          <div className="container laser-two-col laser-prep-grid">
            <article>
              <p className="section-label">İŞLEM ÖNCESİ</p><h2>Nasıl Hazırlanmalısınız?</h2>
              <ul className="laser-number-list"><li><b>01</b><span>Kullandığınız ilaçları ve alerjileri paylaşın.</span></li><li><b>02</b><span>Uçuk geçmişi ve yakın zamanda yapılan estetik işlemleri belirtin.</span></li><li><b>03</b><span>Uygulama bölgesinde aktif enfeksiyon veya açık yara varsa randevuyu erteleyin.</span></li><li><b>04</b><span>İşlem günü yoğun kafein ve alkol tüketiminden kaçının.</span></li></ul>
            </article>
            <article>
              <p className="section-label">İŞLEM SONRASI</p><h2>Nelere Dikkat Etmelisiniz?</h2>
              <ul className="laser-number-list"><li><b>01</b><span>Kabukları koparmayın ve bölgeyi kaşımayın.</span></li><li><b>02</b><span>İyileşme süresince havuz, sauna ve yoğun terlemeden kaçının.</span></li><li><b>03</b><span>Verilen bakım ürünlerini önerildiği şekilde kullanın.</span></li><li><b>04</b><span>Güneşten korunma ve kontrol randevusu önerilerine uyun.</span></li></ul>
            </article>
          </div>
        </section>

        <section className="laser-areas-section">
          <div className="container"><p className="section-label">KALICI MAKYAJ HİZMETLERİ</p><h2>Uygulama Seçenekleri</h2><div className="laser-area-grid">{services.map(item=><div key={item}>{item}<span>→</span></div>)}</div><div className="laser-link-row"><Link href="/kalici-makyaj/microblading">Microblading</Link><Link href="/kalici-makyaj/pudralama-kas">Pudralama kaş</Link><Link href="/kalici-makyaj/dipliner">Dipliner</Link><Link href="/kalici-makyaj/dudak-renklendirme">Dudak renklendirme</Link></div></div>
        </section>

        <section className="section-light laser-faq-section">
          <div className="container laser-faq-grid"><div><p className="section-label">SIK SORULAN SORULAR</p><h2>Kalıcı Makyaj Hakkında Merak Edilenler</h2><p>Yanıtlar genel bilgilendirme amaçlıdır. Sağlık durumu, ilaç kullanımı ve önceki işlemler kişisel değerlendirme gerektirir.</p></div><div>{faqs.map(f=><details key={f.question}><summary>{f.question}<span>+</span></summary><p>{f.answer}</p></details>)}</div></div>
        </section>

        <section className="laser-related-section"><div className="container"><div className="laser-section-head"><div><p className="section-label">İLGİLİ HİZMETLER</p><h2>Uygulama Öncesi İnceleyin</h2></div></div><div className="laser-related-grid"><Link href="/kalici-makyaj/microblading"><span>HİZMET</span><h3>Microblading</h3><p>Kıl efekti odaklı doğal kaş görünümü.</p></Link><Link href="/kalici-makyaj/pudralama-kas"><span>HİZMET</span><h3>Pudralama kaş</h3><p>Yumuşak gölgelendirme ve dolgun kaş görünümü.</p></Link><Link href="/kalici-makyaj/dudak-renklendirme"><span>HİZMET</span><h3>Dudak renklendirme</h3><p>Dudak tonu ve kontur görünümünü destekleyen uygulama.</p></Link></div></div></section>

        <section className="service-detail-final-cta"><div className="container service-detail-final-cta-inner"><div><p className="section-label">ÖN GÖRÜŞME</p><h2>Size uygun kalıcı makyaj uygulamasını birlikte belirleyelim</h2><p>Uşak Merkez’de form, renk ve teknik danışmanlığı için WhatsApp üzerinden bilgi alın.</p></div><a className="btn-gold" href={waUrl("Uşak kalıcı makyaj için ön görüşme ve randevu bilgisi almak istiyorum.")} target="_blank" rel="noreferrer">WhatsApp’tan Yazın →</a></div></section>
      </main>

      <Footer />
    </>
  );
}
