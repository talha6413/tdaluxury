import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, ScanFace, Sparkles, UserRound, Waves, Eye, PenTool, Gem, Clock3 } from "lucide-react";

const services = [
  { title: "Lazer Epilasyon", subtitle: "Kişiye özel bölge ve seans planlaması", meta: "Kadın & Erkek", duration: "Ön görüşme", href: "/lazer-epilasyon", image: "url(/images/services-premium/lazer-epilasyon.webp)", icon: UserRound },
  { title: "Kadın Lazer", subtitle: "Konforlu ve kontrollü uygulama süreci", meta: "Lazer Epilasyon", duration: "Kişiye özel", href: "/lazer-epilasyon/kadin-lazer-epilasyon", image: "url(/images/services-premium/kadin-lazer.webp)", icon: Sparkles },
  { title: "Erkek Lazer", subtitle: "Erkek cildine ve kıl yapısına özel plan", meta: "Erkek Bakım", duration: "Kişiye özel", href: "/lazer-epilasyon/erkek-lazer-epilasyon", image: "url(/images/services-premium/erkek-lazer.webp)", icon: UserRound },
  { title: "Cilt Bakımı", subtitle: "Cilt ihtiyacına göre profesyonel bakım", meta: "Cilt Analizi", duration: "45–90 dk", href: "/cilt-bakimi", image: "url(/images/services-premium/cilt-bakimi.webp)", icon: ScanFace },
  { title: "Hydrafacial", subtitle: "Arındırma, nem ve canlı görünüm desteği", meta: "Cilt Bakımı", duration: "45–75 dk", href: "/cilt-bakimi/hydrafacial", image: "url(/images/services-premium/hydrafacial.webp)", icon: Waves },
  { title: "Kalıcı Makyaj", subtitle: "Yüz hatlarına uyumlu zarif uygulamalar", meta: "Kaş & Dudak", duration: "Ön görüşme", href: "/kalici-makyaj", image: "url(/images/services-premium/leke-bakimi.webp)", icon: PenTool },
  { title: "Kirpik Lifting", subtitle: "Daha belirgin ve kıvrımlı kirpik görünümü", meta: "Kaş & Kirpik", duration: "45–60 dk", href: "/kas-kirpik/kirpik-lifting", image: "url(/images/services-premium/kirpik-lifting.webp)", icon: Eye },
  { title: "Bölgesel İncelme", subtitle: "Kişiye özel destekleyici bakım programı", meta: "Vücut Bakımı", duration: "Planlı seans", href: "/bolgesel-incelme", image: "url(/images/services-premium/bolgesel-incelme.webp)", icon: Gem },
];

export default function ServicesHome() {
  return (
    <section className="stage19-services" id="hizmetler">
      <div className="container">
        <div className="stage19-section-head">
          <div>
            <p className="section-label">HİZMETLERİMİZ</p>
            <h2>Size Özel Hizmetlerimiz</h2>
            <p className="stage19-section-lead">Uzman değerlendirmesi, hijyenik uygulama alanları ve kişiye özel planlama ile güzellik deneyiminizi birlikte şekillendiriyoruz.</p>
          </div>
          <Link href="/hizmetler" className="stage19-all-services">Tüm Hizmetleri İncele <ArrowUpRight size={17} /></Link>
        </div>

        <div className="stage19-service-grid">
          {services.map(({ title, subtitle, meta, duration, href, image, icon: Icon }, index) => (
            <Link
              key={href}
              href={href}
              className="stage19-service-card"
              style={{ "--service-image": image, "--service-index": index } as CSSProperties}
            >
              <div className="stage19-service-image" />
              <div className="stage19-service-shade" />
              <div className="stage19-service-top">
                <span className="stage19-service-icon"><Icon size={21} strokeWidth={1.55} /></span>
                <span className="stage19-service-no">0{index + 1}</span>
              </div>
              <div className="stage19-service-copy">
                <div className="stage19-service-meta">
                  <span>{meta}</span>
                  <span><Clock3 size={13} /> {duration}</span>
                </div>
                <p>{subtitle}</p>
                <h3>{title}</h3>
                <span className="stage19-service-cta">Detaylı İncele <ArrowUpRight size={15} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
