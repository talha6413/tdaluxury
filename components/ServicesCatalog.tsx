"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  MessageCircle,
  UserRound,
  ClipboardCheck,
  HandHeart,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { getServiceImage } from "@/lib/service-media";
import styles from "./ServicesCatalog.module.css";

type ManagedService = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  short_description: string;
  price_text: string;
  duration: string;
  image_url: string;
  image_position: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
};

type PageContent = {
  title: string;
  page_key: string;
  eyebrow: string;
  description: string;
  button_text: string;
  button_url: string;
  image_url: string;
  image_position: string;
  published: boolean;
};

const fallbackServices: ManagedService[] = [
  {
    id: "fallback-laser",
    title: "Lazer Epilasyon",
    slug: "/lazer-epilasyon",
    category: "Ana Hizmet",
    description:
      "İstenmeyen tüylerden konforlu ve etkili şekilde kurtulmaya yardımcı, cilt ve kıl yapısına göre kişiselleştirilen lazer epilasyon uygulamaları.",
    short_description: "",
    price_text: "Bilgi alın",
    duration: "Kişiye özel",
    image_url: "/images/services-premium/lazer-epilasyon.webp",
    image_position: "center center",
    featured: true,
    published: true,
    sort_order: 10,
  },
  {
    id: "fallback-skin",
    title: "Cilt Bakımı",
    slug: "/cilt-bakimi",
    category: "Ana Hizmet",
    description:
      "Cildinizin ihtiyacına göre planlanan profesyonel bakım uygulamaları ile daha canlı, dengeli ve bakımlı bir görünüm.",
    short_description: "",
    price_text: "Bilgi alın",
    duration: "Kişiye özel",
    image_url: "/images/services-premium/cilt-bakimi.webp",
    image_position: "center center",
    featured: true,
    published: true,
    sort_order: 20,
  },
  {
    id: "fallback-makeup",
    title: "Kalıcı Makyaj",
    slug: "/kalici-makyaj",
    category: "Ana Hizmet",
    description:
      "Yüz hatlarınıza uyum sağlayan doğal ve estetik sonuçlara odaklanan profesyonel kalıcı makyaj uygulamaları.",
    short_description: "",
    price_text: "Bilgi alın",
    duration: "Kişiye özel",
    image_url: "/images/services-premium/kalici-makyaj.webp",
    image_position: "center center",
    featured: true,
    published: true,
    sort_order: 30,
  },
];

const fallbackOthers: ManagedService[] = [
  {
    id: "fallback-lashes",
    title: "İpek Kirpik",
    slug: "/kas-kirpik/ipek-kirpik",
    category: "Kaş & Kirpik",
    description: "Doğal hacim ve uzunluk sağlayan, bakışları belirginleştiren ipek kirpik uygulaması.",
    short_description: "",
    price_text: "Bilgi alın",
    duration: "Kişiye özel",
    image_url: "/images/services-reference/service-lashes.webp",
    image_position: "center center",
    featured: false,
    published: true,
    sort_order: 40,
  },
  {
    id: "fallback-lifting",
    title: "Kirpik Lifting",
    slug: "/kas-kirpik/kirpik-lifting",
    category: "Kaş & Kirpik",
    description: "Kirpiklerin daha kalkık, düzenli ve belirgin görünümünü destekleyen bakım uygulaması.",
    short_description: "",
    price_text: "Bilgi alın",
    duration: "Kişiye özel",
    image_url: "/images/services-premium/kirpik-lifting.webp",
    image_position: "center center",
    featured: false,
    published: true,
    sort_order: 50,
  },
  {
    id: "fallback-nails",
    title: "Protez Tırnak",
    slug: "/tirnak/protez-tirnak",
    category: "Tırnak Hizmetleri",
    description: "Estetik, dayanıklı ve bakımlı tırnak görünümü için profesyonel uygulama.",
    short_description: "",
    price_text: "Bilgi alın",
    duration: "Kişiye özel",
    image_url: "/images/services-premium/protez-tirnak.webp",
    image_position: "center center",
    featured: false,
    published: true,
    sort_order: 60,
  },
  {
    id: "fallback-needle",
    title: "İğneli Epilasyon",
    slug: "/igneli-epilasyon",
    category: "Epilasyon",
    description: "İnce ve açık renkli tüylerde de uygulanabilen, kişiye özel planlanan epilasyon yöntemi.",
    short_description: "",
    price_text: "Bilgi alın",
    duration: "Kişiye özel",
    image_url: "/images/services-premium/igneli-epilasyon.webp",
    image_position: "center center",
    featured: false,
    published: true,
    sort_order: 70,
  },
];

const processSteps = [
  {
    no: "1",
    icon: UserRound,
    title: "Ön Görüşme",
    text: "İhtiyaçlarınızı dinliyor, beklentinizi ve uygulama alanını birlikte değerlendiriyoruz.",
  },
  {
    no: "2",
    icon: ClipboardCheck,
    title: "Kişiye Özel Plan",
    text: "Size özel uygulama planı oluşturuyor ve tüm süreci açık şekilde anlatıyoruz.",
  },
  {
    no: "3",
    icon: HandHeart,
    title: "Uygulama ve Takip",
    text: "Plan doğrultusunda uygulamayı gerçekleştiriyor, sonrasında süreci takip ediyoruz.",
  },
];

function normalizeSlug(slug: string) {
  if (!slug) return "/hizmetler";
  return slug.startsWith("/") ? slug : `/${slug}`;
}

function serviceImage(service: ManagedService) {
  return service.image_url?.trim() || getServiceImage(normalizeSlug(service.slug));
}

function safeText(primary: string | null | undefined, fallback: string) {
  return primary?.trim() ? primary : fallback;
}

export default function ServicesCatalog() {
  const supabase = getSupabaseBrowserClient();

  const [services, setServices] = useState<ManagedService[]>([]);
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [settings, setSettings] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (!supabase) return;

    async function loadManagedContent(
      client: NonNullable<ReturnType<typeof getSupabaseBrowserClient>>
    ) {
      const [servicesRes, pageRes, settingsRes] = await Promise.all([
        client
          .from("services")
          .select("*")
          .eq("published", true)
          .order("sort_order", { ascending: true }),
        client
          .from("page_content")
          .select("*")
          .eq("page_key", "hizmetler")
          .eq("published", true)
          .order("sort_order", { ascending: true })
          .limit(1)
          .maybeSingle(),
        client
          .from("site_settings")
          .select("*")
          .eq("id", true)
          .maybeSingle(),
      ]);

      if (servicesRes.data?.length) {
        setServices(servicesRes.data as ManagedService[]);
      }

      if (pageRes.data) {
        setPageContent(pageRes.data as PageContent);
      }

      if (settingsRes.data) {
        setSettings(settingsRes.data as Record<string, unknown>);
      }
    }

    void loadManagedContent(supabase);
  }, [supabase]);

  const activeServices = useMemo(
    () => (services.length ? services : [...fallbackServices, ...fallbackOthers]),
    [services]
  );

  const featuredServices = useMemo(() => {
    const featured = activeServices.filter((item) => item.featured).slice(0, 3);
    if (featured.length >= 3) return featured;
    return activeServices.slice(0, 3);
  }, [activeServices]);

  const otherServices = useMemo(() => {
    const featuredIds = new Set(featuredServices.map((item) => item.id));
    return activeServices.filter((item) => !featuredIds.has(item.id));
  }, [activeServices, featuredServices]);

  const heroTitle = safeText(pageContent?.title, "Hizmetlerimiz");
  const heroDescription = safeText(
    pageContent?.description,
    "Güzelliğinize özel, profesyonel bakım çözümleri"
  );
  const heroImage = safeText(
    pageContent?.image_url,
    "/images/services-premium/services-hero.webp"
  );

  const phone = String(settings.phone_display || "0536 665 10 64");
  const whatsappNumber = String(settings.whatsapp_number || "905366651064");
  const whatsappMessage = String(
    settings.whatsapp_message ||
      "Merhaba, TDA Luxury hizmetleri hakkında bilgi almak istiyorum."
  );
  const address = String(
    settings.address ||
      "Fatih Mah. Yavuz Sultan Selim Cad. No: 10/B"
  );

  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image
          src={heroImage}
          alt="TDA Luxury Uşak güzellik hizmetleri"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
          style={{ objectPosition: pageContent?.image_position || "center center" }}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          {pageContent?.eyebrow ? <span>{pageContent.eyebrow}</span> : null}
          <h1>{heroTitle}</h1>
          <p>{heroDescription}</p>

          <nav aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <strong>Hizmetler</strong>
          </nav>
        </div>
      </section>

      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.mainGrid}>
            {featuredServices.map((service) => (
              <article key={service.id} className={styles.mainCard}>
                <Link href={normalizeSlug(service.slug)} className={styles.imageWrap}>
                  <Image
                    src={serviceImage(service)}
                    alt={`${service.title} uygulaması - TDA Luxury Uşak`}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                    style={{ objectPosition: service.image_position || "center center" }}
                  />
                </Link>

                <div className={styles.cardBody}>
                  <h2>{service.title}</h2>
                  <span className={styles.goldLine} />
                  <p>{service.short_description || service.description}</p>

                  <Link
                    href={normalizeSlug(service.slug)}
                    className={styles.textLink}
                  >
                    İncele <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {otherServices.length ? (
            <>
              <header className={styles.otherHeader}>
                <h2>Diğer Uygulamalarımız</h2>
                <span>
                  <i />
                  <b />
                  <i />
                </span>
              </header>

              <div className={styles.otherGrid}>
                {otherServices.map((service) => (
                  <article key={service.id} className={styles.otherCard}>
                    <Link
                      href={normalizeSlug(service.slug)}
                      className={styles.otherImage}
                    >
                      <Image
                        src={serviceImage(service)}
                        alt={`${service.title} uygulaması - TDA Luxury Uşak`}
                        fill
                        sizes="(max-width: 760px) 100vw, 33vw"
                        style={{
                          objectPosition:
                            service.image_position || "center center",
                        }}
                      />
                    </Link>

                    <div className={styles.otherBody}>
                      <h3>{service.title}</h3>
                      <p>{service.short_description || service.description}</p>

                      {(service.price_text || service.duration) && (
                        <small>
                          {service.price_text ? service.price_text : ""}
                          {service.price_text && service.duration ? " · " : ""}
                          {service.duration ? service.duration : ""}
                        </small>
                      )}

                      <Link href={normalizeSlug(service.slug)}>
                        Detaylı Bilgi <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section className={styles.consultation}>
        <div className={styles.consultImage}>
          <Image
            src="/images/real/salon-02.webp"
            alt="TDA Luxury Uşak güzellik salonunda ön görüşme alanı"
            fill
            sizes="(max-width: 800px) 100vw, 47vw"
          />
        </div>

        <div className={styles.consultContent}>
          <span />
          <h2>
            Size En Uygun İşlemi
            <br />
            Birlikte Belirleyelim
          </h2>
          <p>
            Her cilt ve her ihtiyaç farklıdır. Uzmanlarımız beklentilerinizi dinler,
            ihtiyaçlarınızı değerlendirir ve size en uygun uygulama planını oluşturur.
          </p>

          <div className={styles.consultActions}>
            <Link
              href={pageContent?.button_url || "/randevu"}
              className={styles.goldButton}
            >
              <CalendarDays size={18} />
              {pageContent?.button_text || "Ücretsiz Ön Görüşme"}
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.outlineButton}
            >
              <MessageCircle size={18} />
              WhatsApp&apos;tan Sor
            </a>
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.container}>
          <h2>SÜRECİMİZ NASIL İŞLİYOR?</h2>

          <div className={styles.processGrid}>
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div className={styles.processItem} key={step.title}>
                  <div className={styles.processIcon}>
                    <Icon size={42} strokeWidth={1.35} />
                    <b>{step.no}</b>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {index < processSteps.length - 1 ? (
                    <ArrowRight
                      className={styles.processArrow}
                      size={38}
                      strokeWidth={1.1}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.infoStrip}>
        <div className={styles.infoItem}>
          <MapPin size={25} />
          <div>
            <b>UŞAK MERKEZ</b>
            <p>{address}</p>
          </div>
        </div>

        <div className={styles.infoItem}>
          <MessageCircle size={25} />
          <div>
            <b>BİZE ULAŞIN</b>
            <p>{phone}</p>
          </div>
        </div>

        <div className={styles.infoItem}>
          <Clock3 size={25} />
          <div>
            <b>ÇALIŞMA SAATLERİ</b>
            <p>Güncel çalışma saatleri için bize ulaşın.</p>
          </div>
        </div>

        <div className={styles.infoItem}>
          <CalendarDays size={25} />
          <div>
            <b>RANDEVU ALIN</b>
            <p>Hızlı ve kolay randevu için bize ulaşın.</p>
          </div>
          <Link href="/randevu">Randevu Al</Link>
        </div>
      </section>
    </div>
  );
}
