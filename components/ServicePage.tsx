import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/lib/schema";
import { site, waUrl } from "@/lib/site";
import { getServiceImage } from "@/lib/service-media";
import { services, type Service } from "@/data/services";
import { richServiceContent } from "@/data/service-content";
import SeoTopicCluster from "@/components/SeoTopicCluster";
import { getClusterForService } from "@/data/seo-clusters";

const defaultFaqItems = (service: Service) => [
  {
    question: `${service.title} için randevu nasıl alınır?`,
    answer:
      "WhatsApp üzerinden bize ulaşarak uygun gün ve saat seçeneklerini öğrenebilir, kısa ön değerlendirme sonrasında randevunuzu oluşturabilirsiniz.",
  },
  {
    question: "İşlem öncesi değerlendirme yapılıyor mu?",
    answer:
      "Evet. Hizmete başlamadan önce ihtiyaç, beklenti ve uygulamaya uygunluk değerlendirilir. Uygulama planı kişiye göre belirlenir.",
  },
  {
    question: "Sonuçlar kişiden kişiye değişir mi?",
    answer:
      "Evet. Cilt yapısı, uygulama alanı, düzenli bakım ve kişisel özellikler süreç ve sonuç üzerinde etkili olabilir.",
  },
];


const getServiceProfile = (service: Service) => {
  const slug = service.slug;

  if (slug.includes("lazer-epilasyon") || slug === "/igneli-epilasyon") {
    return [
      ["PLANLAMA", "Kişiye özel seans planı"],
      ["ÖN GÖRÜŞME", "Uygunluk değerlendirmesi"],
      ["TAKİP", "Seans aralıklarının izlenmesi"],
      ["BİLGİLENDİRME", "Öncesi ve sonrası öneriler"],
    ];
  }

  if (slug.includes("cilt-bakimi")) {
    return [
      ["ANALİZ", "Cilt ihtiyacının belirlenmesi"],
      ["PROTOKOL", "Kişiye özel bakım seçimi"],
      ["SÜREÇ", "Kontrollü uygulama adımları"],
      ["EV BAKIMI", "Bakım sonrası rutin önerisi"],
    ];
  }

  if (slug.includes("kalici-makyaj")) {
    return [
      ["TASARIM", "Yüz oranına göre ön çizim"],
      ["RENK", "Ten ve beklentiye göre seçim"],
      ["UYGULAMA", "Kontrollü ve hijyenik süreç"],
      ["İYİLEŞME", "Bakım süreci bilgilendirmesi"],
    ];
  }

  return [
    ["DEĞERLENDİRME", "İhtiyacın birlikte belirlenmesi"],
    ["PLANLAMA", "Kişiye özel hizmet akışı"],
    ["UYGULAMA", "Hijyen ve konfor odağı"],
    ["TAKİP", "Sonrası öneriler ve destek"],
  ];
};

const processSteps = [
  ["01", "Ön Değerlendirme", "İhtiyaç, beklenti ve uygulama alanı birlikte değerlendirilir."],
  ["02", "Kişiye Özel Plan", "Hizmet kapsamı, seans veya bakım planı kişiye göre oluşturulur."],
  ["03", "Profesyonel Uygulama", "Hijyen ve konfor odağında kontrollü uygulama gerçekleştirilir."],
  ["04", "Bakım Takibi", "Uygulama sonrası öneriler paylaşılır ve süreç düzenli takip edilir."],
];

export default function ServicePage({ service }: { service: Service }) {
  const parentService = service.parent
    ? services.find((item) => item.slug === service.parent)
    : undefined;

  const related = services
    .filter(
      (item) =>
        item.slug !== service.slug &&
        (item.parent === service.parent ||
          item.parent === service.slug ||
          item.slug === service.parent),
    )
    .slice(0, 4);

  const fullUrl = `${site.url}${service.slug}`;
  const breadcrumbs = [
    { name: "Ana Sayfa", url: site.url },
    { name: "Hizmetler", url: `${site.url}/hizmetler` },
    ...(parentService
      ? [{ name: parentService.title, url: `${site.url}${parentService.slug}` }]
      : []),
    { name: service.title, url: fullUrl },
  ];

  const rich = richServiceContent[service.slug];
  const faqs = rich?.faqs ?? defaultFaqItems(service);
  const heroImage = getServiceImage(service.slug);
  const profile = getServiceProfile(service);
  const seoCluster = getClusterForService(service.slug);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema name={`Uşak ${service.title}`} description={service.description} path={service.slug} />
      <FaqSchema items={faqs} />

      <Nav />

      <main>
        <section className="service-detail-hero">
          <Image
            src={heroImage}
            alt={`${service.title} uygulaması`}
            fill
            priority
            sizes="100vw"
            className="service-detail-hero-image"
          />
          <div className="service-detail-hero-overlay" />
          <div className="container service-detail-hero-inner">
            <nav className="breadcrumb service-detail-breadcrumb" aria-label="Sayfa yolu">
              <Link href="/">Ana Sayfa</Link><span>/</span>
              <Link href="/hizmetler">Hizmetler</Link>
              {parentService && <><span>/</span><Link href={parentService.slug}>{parentService.title}</Link></>}
              <span>/</span><span aria-current="page">{service.title}</span>
            </nav>
            <p className="service-detail-kicker">TDA LUXURY UŞAK</p>
            <h1>{service.title}</h1>
            <p className="service-detail-lead">{service.description}</p>
            <div className="service-detail-actions">
              <a className="btn-gold" href={waUrl(`${service.title} hakkında bilgi almak istiyorum.`)} target="_blank" rel="noreferrer">
                WhatsApp ile Randevu Al →
              </a>
              <Link className="service-detail-secondary" href="/hizmetler">Tüm Hizmetleri Gör</Link>
            </div>
            <div className="service-detail-trust">
              <span>✦ Kişiye Özel Planlama</span>
              <span>✦ Hijyenik Uygulama Alanı</span>
              <span>✦ Uzman Süreç Takibi</span>
            </div>
          </div>
        </section>

        <section className="service-detail-facts" aria-label={`${service.title} hızlı bilgiler`}>
          <div className="container service-detail-facts-grid">
            {profile.map(([label, value], index) => (
              <div className="service-detail-fact" key={label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <b>{label}</b>
                  <p>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="service-detail-intro">
          <div className="container service-detail-intro-grid">
            <div className="service-detail-photo-card">
              <Image src={heroImage} alt={service.title} fill sizes="(max-width: 900px) 100vw, 48vw" />
              <div className="service-detail-photo-shade" />
              <div className="service-detail-photo-copy">
                <span>PREMIUM BAKIM DENEYİMİ</span>
                <strong>Doğru analiz, doğru plan, kontrollü süreç.</strong>
              </div>
            </div>

            <article className="service-detail-copy">
              <p className="section-label">HİZMET HAKKINDA</p>
              <h2>{service.title} Nedir?</h2>
              <p>{rich?.summary ?? `${service.title}, TDA Luxury'de kişinin ihtiyacına, beklentisine ve uygulama alanının özelliklerine göre planlanan profesyonel bir güzellik hizmetidir.`}</p>
              <p>Her uygulama öncesinde kısa değerlendirme yapılır. Cilt yapısı, uygulama bölgesi, önceki işlemler ve beklentiler dikkate alınarak uygun plan oluşturulur.</p>
              <div className="service-detail-highlights">
                <div><b>01</b><span>Kişisel değerlendirme</span></div>
                <div><b>02</b><span>Şeffaf bilgilendirme</span></div>
                <div><b>03</b><span>Konforlu salon deneyimi</span></div>
              </div>
            </article>
          </div>
        </section>

        <section className="service-detail-process">
          <div className="container">
            <div className="service-detail-section-head">
              <div><p className="section-label">UYGULAMA SÜRECİ</p><h2>TDA Luxury&apos;de Süreç Nasıl İlerler?</h2></div>
              <p>Her aşama açık biçimde anlatılır; uygulama öncesi ve sonrası süreç tek bir plan içinde yürütülür.</p>
            </div>
            <div className="service-detail-step-grid">
              {processSteps.map(([number, title, text]) => (
                <div className="service-detail-step" key={number}>
                  <span>{number}</span><h3>{title}</h3><p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="service-detail-content">
          <div className="container service-detail-content-grid">
            <article className="service-detail-article">
              <section><p className="section-label">UYGUNLUK</p><h2>Kimler İçin Uygundur?</h2>{rich ? <ul className="service-seo-list">{rich.suitability.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Bu hizmet, bakım sürecini profesyonel destekle yürütmek isteyen kişiler için değerlendirilebilir.</p>}</section>
              <section><p className="section-label">AVANTAJLAR</p><h2>Gerçekçi ve Kişiye Özel Planlama</h2>{rich ? <ul className="service-seo-list">{rich.benefits.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Şeffaf bilgilendirme, hijyen ve kişiye özel planlama öne çıkarılır.</p>}</section>
              <section><p className="section-label">DİKKAT</p><h2>Kimler İçin Uygun Olmayabilir?</h2>{rich ? <ul className="service-seo-list service-seo-list-warn">{rich.cautions.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Mevcut sağlık durumu ve uygulama bölgesi randevu öncesinde değerlendirilmelidir.</p>}</section>
              {rich && <section><p className="section-label">HAZIRLIK</p><h2>İşlem Öncesi Hazırlık</h2><ul className="service-seo-list">{rich.preparation.map((item) => <li key={item}>{item}</li>)}</ul></section>}
              {rich && <section><p className="section-label">SONRASI</p><h2>İşlem Sonrası Bakım</h2><ul className="service-seo-list">{rich.aftercare.map((item) => <li key={item}>{item}</li>)}</ul></section>}
            </article>

            <aside className="service-detail-side-card">
              <p className="section-label">HIZLI BİLGİ</p>
              <h2>{service.title}</h2>
              <ul>
                <li><span>✓</span>Kişiye özel değerlendirme</li>
                <li><span>✓</span>Hijyenik salon ortamı</li>
                <li><span>✓</span>Uzman süreç takibi</li>
                <li><span>✓</span>WhatsApp ile hızlı randevu</li>
              </ul>
              <a href={waUrl(`${service.title} için randevu almak istiyorum.`)} target="_blank" rel="noreferrer" className="btn-gold">Randevu Oluştur →</a>
            </aside>
          </div>
        </section>

        <section className="service-detail-faq-section">
          <div className="container service-detail-faq-grid">
            <div><p className="section-label">MERAK EDİLENLER</p><h2>Sık Sorulan Sorular</h2><p>Randevu öncesinde en sık sorulan soruları kısa ve açık biçimde yanıtladık.</p></div>
            <div className="service-detail-faq-list">
              {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="service-detail-related">
            <div className="container">
              <div className="service-detail-section-head"><div><p className="section-label">DİĞER SEÇENEKLER</p><h2>İlgili Hizmetler</h2></div><Link href="/hizmetler">Tüm Hizmetleri Gör →</Link></div>
              <div className="service-detail-related-grid">
                {related.map((item) => (
                  <Link className="service-detail-related-card" href={item.slug} key={item.slug}>
                    <Image src={getServiceImage(item.slug)} alt={item.title} fill sizes="(max-width: 760px) 100vw, 25vw" />
                    <div className="service-detail-related-shade" />
                    <div><h3>{item.title}</h3><span>DETAYLI BİLGİ →</span></div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {seoCluster && (
          <SeoTopicCluster cluster={seoCluster} currentServiceSlug={service.slug} />
        )}

        <section className="service-detail-final-cta">
          <div className="container service-detail-final-cta-inner">
            <div><p className="section-label">SİZE ÖZEL PLANLAMA</p><h2>{service.title} için bilgi alın</h2><p>Uygunluk, süreç ve randevu seçenekleri için WhatsApp üzerinden bize ulaşın.</p></div>
            <a className="btn-gold" href={waUrl(`${service.title} hakkında bilgi almak istiyorum.`)} target="_blank" rel="noreferrer">WhatsApp&apos;tan Yazın →</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
