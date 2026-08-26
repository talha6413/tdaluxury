import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ScanFace,
  Sparkles,
  UserRound,
  PenTool,
  Clock3,
} from "lucide-react";
import {
  getManagedFeaturedServices,
  type ManagedService,
} from "@/lib/managed-content";
import type { HomeSection } from "@/lib/home-sections";

const fallbackServices: (ManagedService & { icon: typeof UserRound })[] = [
  {
    title: "Lazer Epilasyon",
    subtitle: "Uşak'ta kişiye özel bölge ve seans planlaması",
    meta: "Kadın & Erkek",
    duration: "Ön görüşme",
    price: "Bilgi alın",
    href: "/lazer-epilasyon",
    image: "/images/real/salon-03.webp",
    imagePosition: "center center",
    icon: UserRound,
  },
  {
    title: "Cilt Bakımı",
    subtitle: "Uşak'ta cilt ihtiyacına göre profesyonel bakım",
    meta: "Cilt Analizi",
    duration: "45–90 dk",
    price: "Bilgi alın",
    href: "/cilt-bakimi",
    image: "/images/real/salon-06.webp",
    imagePosition: "center center",
    icon: ScanFace,
  },
  {
    title: "Kalıcı Makyaj",
    subtitle: "Uşak'ta yüz hatlarına uyumlu kalıcı makyaj uygulamaları",
    meta: "Kaş & Dudak",
    duration: "Ön görüşme",
    price: "Bilgi alın",
    href: "/kalici-makyaj",
    image: "/images/real/dudak-oncesi-sonrasi.webp",
    imagePosition: "center center",
    icon: PenTool,
  },
];

export default async function ServicesHome({
  section,
}: {
  section?: HomeSection;
}) {
  const managed = await getManagedFeaturedServices(fallbackServices);
  const managedByHref = new Map(
    managed.map((service) => [service.href, service] as const)
  );

  // Ana para getiren üç kategori daima ana sayfadan doğrudan link alır.
  // Yönetim panelinde bir kart yanlışlıkla featured dışına alınsa bile
  // iç link hiyerarşisi bozulmaz.
  const displayServices = fallbackServices.map((fallbackService) => {
    const managedService = managedByHref.get(fallbackService.href);

    return {
      ...fallbackService,
      ...(managedService ?? {}),
      icon:
        fallbackServices.find(
          (item) => item.href === fallbackService.href
        )?.icon ?? Sparkles,
    };
  });

  const eyebrow = section?.eyebrow?.trim() || "HİZMETLERİMİZ";
  const title =
    section?.title?.trim() || "Uşak'ta Öne Çıkan Güzellik Hizmetlerimiz";
  const description =
    section?.description?.trim() ||
    "Lazer epilasyon, cilt bakımı ve kalıcı makyaj hizmetlerimizi inceleyin; ihtiyacınıza uygun uygulama için detaylı bilgi alın.";
  const buttonText = section?.button_text?.trim() || "Tüm Hizmetleri İncele";
  const buttonUrl = section?.button_url?.trim() || "/hizmetler";

  return (
    <section className="stage19-services" id="hizmetler">
      <div className="container">
        <div className="stage19-section-head">
          <div>
            <p className="section-label">{eyebrow}</p>
            <h2>{title}</h2>
            <p className="stage19-section-lead">{description}</p>
          </div>

          <Link href={buttonUrl} className="stage19-all-services">
            {buttonText} <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="stage19-service-grid">
          {displayServices.map(
            (
              {
                title: serviceTitle,
                subtitle,
                meta,
                duration,
                href,
                image,
                imagePosition,
                icon: Icon,
              },
              index
            ) => (
              <Link
                key={href}
                href={href}
                className="stage19-service-card"
                style={
                  {
                    "--service-image": `url(${image})`,
                    "--service-position": imagePosition,
                    "--service-index": index,
                  } as CSSProperties
                }
              >
                <div className="stage19-service-image" />
                <div className="stage19-service-shade" />
                <div className="stage19-service-top">
                  <span className="stage19-service-icon">
                    <Icon size={21} strokeWidth={1.55} />
                  </span>
                  <span className="stage19-service-no">0{index + 1}</span>
                </div>
                <div className="stage19-service-copy">
                  <div className="stage19-service-meta">
                    <span>{meta}</span>
                    <span>
                      <Clock3 size={13} /> {duration}
                    </span>
                  </div>
                  <p>{subtitle}</p>
                  <h3>{serviceTitle}</h3>
                  <span className="stage19-service-cta">
                    Detaylı İncele <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
