"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";
import styles from "./ServicesCatalog.module.css";

const featuredServices = [
  {
    title: "Lazer Epilasyon",
    slug: "/lazer-epilasyon",
    category: "LAZER EPİLASYON",
    image: "/images/services-premium/lazer-epilasyon.webp",
    description:
      "Kadın ve erkeklere özel, cilt ve kıl yapısına göre planlanan profesyonel lazer epilasyon uygulamaları.",
    points: ["Kişiye özel plan", "Modern teknoloji", "Konforlu süreç"],
  },
  {
    title: "Protez Tırnak",
    slug: "/tirnak/protez-tirnak",
    category: "TIRNAK HİZMETLERİ",
    image: "/images/services-premium/protez-tirnak.webp",
    description:
      "Güçlü, estetik ve doğal görünümlü tırnaklar için profesyonel protez tırnak uygulamaları.",
    points: ["Uzun süre kalıcı", "Premium malzeme", "Hijyenik uygulama"],
  },
  {
    title: "Cilt Bakımı",
    slug: "/cilt-bakimi",
    category: "CİLT BAKIMI",
    image: "/images/services-premium/cilt-bakimi.webp",
    description:
      "Cilt analiziyle ihtiyacınıza göre planlanan arındırma, nem ve canlılık odaklı profesyonel bakım.",
    points: ["Cilt analizi", "Kişisel bakım planı", "Uzman takip"],
  },
  {
    title: "Kalıcı Makyaj",
    slug: "/kalici-makyaj",
    category: "KALICI MAKYAJ",
    image: "/images/services-premium/kalici-makyaj.webp",
    description:
      "Yüz hatlarınıza uyumlu microblading, pudralama kaş, dipliner ve dudak renklendirme seçenekleri.",
    points: ["Yüze özel tasarım", "Doğal görünüm", "Profesyonel uygulama"],
  },
];

const categoryCards = [
  {
    title: "Lazer Epilasyon",
    slug: "/lazer-epilasyon",
    icon: "⌁",
    description: "Kalıcı pürüzsüzlük için son teknoloji lazer epilasyon uygulamaları.",
  },
  {
    title: "Cilt Bakımı",
    slug: "/cilt-bakimi",
    icon: "♙",
    description: "Cildinizi yenileyen ve canlandıran özel bakım uygulamaları.",
  },
  {
    title: "Kalıcı Makyaj",
    slug: "/kalici-makyaj",
    icon: "⌒",
    description: "Doğal ve kalıcı güzellik için profesyonel kalıcı makyaj uygulamaları.",
  },
  {
    title: "Kaş & Kirpik",
    slug: "/kas-kirpik",
    icon: "◉",
    description: "Belirgin bakışlar için kaş tasarımı ve kirpik uygulamaları.",
  },
  {
    title: "Tırnak Hizmetleri",
    slug: "/tirnak",
    icon: "♧",
    description: "Bakımlı ve estetik tırnaklar için profesyonel uygulamalar.",
    active: true,
  },
  {
    title: "Bölgesel İncelme",
    slug: "/bolgesel-incelme",
    icon: "♢",
    description: "İstenmeyen yağlardan kurtulmak için etkili incelme yöntemleri.",
  },
];

export default function ServicesCatalog({ services }: { services: Service[] }) {
  const [activeFeatured, setActiveFeatured] = useState(1);
  const featured = featuredServices[activeFeatured];

  const validServiceSlugs = useMemo(
    () => new Set(services.map((service) => service.slug)),
    [services]
  );

  const safeHref = (slug: string) =>
    validServiceSlugs.has(slug) ? slug : "/hizmetler";

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.decorOne} />
        <div className={styles.decorTwo} />

        <div className={styles.container}>
          <p className={styles.kicker}>TÜM GÜZELLİK HİZMETLERİMİZ</p>
          <h1>Hizmetlerimiz</h1>
          <p className={styles.heroLead}>
            Uzman kadromuz ve son teknoloji cihazlarımız ile
            <br />
            size en iyi güzellik deneyimini sunuyoruz.
          </p>
          <div className={styles.goldDivider}>
            <span />
            <b />
            <span />
          </div>

          <div className={styles.featuredTabs}>
            {featuredServices.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setActiveFeatured(index)}
                className={index === activeFeatured ? styles.activeTab : ""}
              >
                {item.title}
              </button>
            ))}
          </div>

          <section className={styles.featuredCard}>
            <div className={styles.featuredMedia}>
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <div className={styles.featuredBadge}>☆ &nbsp; ÖNE ÇIKAN HİZMET</div>
            </div>

            <div className={styles.featuredInfo}>
              <div className={styles.featuredCopy}>
                <p>{featured.category}</p>
                <h2>{featured.title}</h2>
                <span>{featured.description}</span>

                <div className={styles.featuredBenefits}>
                  {featured.points.map((point, index) => (
                    <div key={point}>
                      <b>{["♢", "◇", "♧"][index]}</b>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <Link href={safeHref(featured.slug)} className={styles.primaryButton}>
                  DETAYLI BİLGİ <b>→</b>
                </Link>
              </div>

              <div className={styles.thumbRail}>
                {featuredServices.map((item, index) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setActiveFeatured(index)}
                    className={index === activeFeatured ? styles.activeThumb : ""}
                    aria-label={`${item.title} hizmetini göster`}
                  >
                    <Image src={item.image} alt={item.title} fill sizes="120px" />
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>ANA HİZMET KATEGORİLERİMİZ</h2>

          <div className={styles.categoriesGrid}>
            {categoryCards.map((category) => (
              <Link
                key={category.slug}
                href={safeHref(category.slug)}
                className={`${styles.categoryCard} ${
                  category.active ? styles.activeCategory : ""
                }`}
              >
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span>
                  HİZMETLERİ GÖR <b>→</b>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.otherSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>DİĞER HİZMETLERİMİZ</h2>

          <div className={styles.otherGrid}>
            <Link href="/igneli-epilasyon" className={styles.otherCard}>
              <div className={styles.otherImage}>
                <Image
                  src="/images/services-premium/igneli-epilasyon.webp"
                  alt="İğneli epilasyon"
                  fill
                  sizes="(max-width: 760px) 100vw, 25vw"
                />
              </div>
              <div className={styles.otherContent}>
                <span className={styles.otherNumber}>01</span>
                <h3>İğneli Epilasyon</h3>
                <p>Kalıcı çözüm için iğneli epilasyon uygulaması.</p>
                <b>DETAYLI BİLGİ &nbsp; →</b>
              </div>
            </Link>

            <Link href="/cilt-bakimi" className={styles.otherCard}>
              <div className={styles.otherImage}>
                <Image
                  src="/images/services-premium/vip-cilt-bakimi.webp"
                  alt="VIP cilt bakımı"
                  fill
                  sizes="(max-width: 760px) 100vw, 25vw"
                />
              </div>
              <div className={styles.otherContent}>
                <span className={styles.otherNumber}>02</span>
                <h3>VIP Cilt Bakımı</h3>
                <p>Özel içerikli ürünlerle cildinize özel VIP bakım deneyimi.</p>
                <b>DETAYLI BİLGİ &nbsp; →</b>
              </div>
            </Link>
          </div>

          <div className={styles.contactBar}>
            <div>
              <i>▣</i>
              <span><b>HIZLI RANDEVU</b>Randevunuzu hemen alın</span>
            </div>

            <a href="https://wa.me/905366651064" target="_blank" rel="noreferrer">
              <i>◉</i>
              <span><b>WHATSAPP</b>7/24 bize yazın</span>
            </a>

            <a href="tel:+905366651064">
              <i>⌕</i>
              <span><b>BİZİ ARAYIN</b>0536 665 10 64</span>
            </a>

            <Link href="/randevu" className={styles.appointmentButton}>
              RANDEVU AL &nbsp; →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
