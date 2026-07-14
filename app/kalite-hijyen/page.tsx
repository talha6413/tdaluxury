import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/lib/schema";
import { site, waUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Kalite ve Hijyen Yaklaşımımız | TDA Luxury Uşak",
  description:
    "TDA Luxury Uşak'ta danışan bilgilendirmesi, hijyen yaklaşımı, cihaz takibi ve kişiye özel uygulama planlaması hakkında bilgi alın.",
  path: "/kalite-hijyen",
  image: "/og/home.jpg",
});

const principles = [
  {
    icon: ClipboardCheck,
    title: "Uygulama Öncesi Değerlendirme",
    text: "Beklenti, cilt veya kıl yapısı, yakın dönem uygulamalar ve paylaşılması gereken özel durumlar işlem öncesinde konuşulur.",
  },
  {
    icon: ShieldCheck,
    title: "Hijyen Odaklı Çalışma",
    text: "Uygulama alanı, temas yüzeyleri ve kullanılan başlıklar hizmet türüne uygun temizlik adımlarıyla hazırlanır.",
  },
  {
    icon: Wrench,
    title: "Cihaz ve Ekipman Takibi",
    text: "Cihazların kullanım, bakım ve servis süreçleri üretici veya yetkili servis yönlendirmeleri doğrultusunda takip edilir.",
  },
  {
    icon: MessageCircle,
    title: "Şeffaf Bilgilendirme",
    text: "Seans sayısı, kalıcılık veya sonuç konusunda kesin garanti verilmez; kişisel farklılıklar açıkça anlatılır.",
  },
];

const checklist = [
  "İşlem öncesinde uygunluk ve beklenti değerlendirmesi",
  "Kullanılan ürün veya cihaz hakkında anlaşılır bilgilendirme",
  "Uygulama alanının düzenli ve kontrollü hazırlanması",
  "İşlem sonrası bakım önerilerinin paylaşılması",
  "Beklenmeyen hassasiyetlerde yeniden değerlendirme",
  "Kişisel bilgilerin gizliliğine özen gösterilmesi",
];

export default function QualityPage() {
  return (
    <>
      <Nav />
      <main className="trust-page">
        <BreadcrumbSchema
          items={[
            { name: "Anasayfa", url: `${site.url}/` },
            { name: "Kalite ve Hijyen", url: `${site.url}/kalite-hijyen` },
          ]}
        />

        <section className="trust-hero">
          <div className="trust-hero-glow" />
          <div className="container trust-hero-grid">
            <div>
              <p className="trust-kicker">GÜVEN ODAKLI HİZMET</p>
              <h1>Kalite ve Hijyen Yaklaşımımız</h1>
              <p className="trust-lead">
                Premium deneyim yalnızca dekorla oluşmaz. Doğru bilgilendirme,
                kontrollü uygulama, düzenli hijyen ve gerçekçi beklenti yönetimi
                hizmet anlayışımızın temelidir.
              </p>
              <div className="trust-actions">
                <a href={waUrl("Merhaba, TDA Luxury hizmet ve hijyen yaklaşımı hakkında bilgi almak istiyorum.")} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  <MessageCircle size={19} /> BİLGİ ALIN
                </a>
                <Link href="/hakkimizda" className="trust-secondary">
                  HAKKIMIZDA <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            <div className="trust-hero-card">
              <FileCheck2 size={38} />
              <p className="trust-card-label">TDA LUXURY STANDARDI</p>
              <h2>Her adımda açıklık ve kontrol</h2>
              <p>
                Uygulama öncesi değerlendirmeden işlem sonrası önerilere kadar
                danışanın ne yapılacağını ve ne beklemesi gerektiğini bilmesini
                önemsiyoruz.
              </p>
            </div>
          </div>
        </section>

        <section className="trust-principles">
          <div className="container">
            <div className="trust-section-head">
              <div>
                <p className="section-label">ÇALIŞMA İLKELERİMİZ</p>
                <h2>Güveni oluşturan dört temel yaklaşım</h2>
              </div>
              <p>
                Her hizmetin uygulama biçimi farklıdır. Ortak standart ise
                danışanın güvenliği, bilgilenmesi ve konforudur.
              </p>
            </div>

            <div className="trust-principle-grid">
              {principles.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="trust-principle-card">
                  <span>0{index + 1}</span>
                  <Icon size={30} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="trust-check-section">
          <div className="container trust-check-grid">
            <div>
              <p className="section-label">DANIŞAN DENEYİMİ</p>
              <h2>Randevunuzda hangi adımları bekleyebilirsiniz?</h2>
              <p>
                Hizmete göre detaylar değişse de sürecin açık, anlaşılır ve
                takip edilebilir olması hedeflenir.
              </p>
            </div>
            <div className="trust-check-list">
              {checklist.map((item) => (
                <div key={item}>
                  <CheckCircle2 size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="trust-note-section">
          <div className="container trust-note-grid">
            <div>
              <Sparkles size={28} />
              <h2>Gerçekçi sonuç iletişimi</h2>
              <p>
                Lazer epilasyon, cilt bakımı, kalıcı makyaj ve bölgesel bakım
                uygulamalarında sonuçlar kişiden kişiye değişebilir. Bu nedenle
                kesin sonuç, kesin seans veya kalıcılık garantisi vermek yerine
                değerlendirmeye dayalı bir plan sunuyoruz.
              </p>
            </div>
            <Link href="/hizmetler" className="btn-gold">
              HİZMETLERİ İNCELEYİN <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
