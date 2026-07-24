"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  MessageCircle,
  Sparkles,
  UserRound,
  ClipboardCheck,
  HandHeart,
} from "lucide-react";
import styles from "./ServicesCatalog.module.css";

const mainServices = [
  {
    title: "Lazer Epilasyon",
    href: "/lazer-epilasyon",
    image: "/images/services-reference/service-laser.webp",
    description:
      "İstenmeyen tüylerden konforlu ve etkili şekilde kurtulmaya yardımcı, cilt ve kıl yapısına göre kişiselleştirilen lazer epilasyon uygulamaları.",
  },
  {
    title: "Cilt Bakımı",
    href: "/cilt-bakimi",
    image: "/images/services-reference/service-skin.webp",
    description:
      "Cildinizin ihtiyacına göre planlanan profesyonel bakım uygulamaları ile daha canlı, dengeli ve bakımlı bir görünüm.",
  },
  {
    title: "Kalıcı Makyaj",
    href: "/kalici-makyaj",
    image: "/images/services-reference/service-pmu.webp",
    description:
      "Yüz hatlarınıza uyum sağlayan doğal ve estetik sonuçlara odaklanan profesyonel kalıcı makyaj uygulamaları.",
  },
];

const otherServices = [
  {
    title: "İpek Kirpik",
    href: "/kas-kirpik/ipek-kirpik",
    image: "/images/services-reference/service-lashes.webp",
    description: "Doğal hacim ve uzunluk sağlayan, bakışları belirginleştiren ipek kirpik uygulaması.",
  },
  {
    title: "Kirpik Laminasyonu",
    href: "/kas-kirpik/kirpik-laminasyonu",
    image: "/images/services-reference/service-lamination.webp",
    description: "Kirpiklerin daha kalkık, düzenli ve belirgin görünmesini sağlayan bakım uygulaması.",
  },
  {
    title: "Kaş Tasarımı",
    href: "/kas-kirpik",
    image: "/images/services-reference/service-brow.webp",
    description: "Yüz oranlarınıza göre belirlenen doğal ve dengeli kaş tasarımı.",
  },
  {
    title: "Microblading",
    href: "/kalici-makyaj/microblading",
    image: "/images/services-reference/service-microblading.webp",
    description: "Kıl tekniği görünümüyle daha dolgun ve dengeli kaşlar için profesyonel uygulama.",
  },
  {
    title: "Protez Tırnak",
    href: "/tirnak/protez-tirnak",
    image: "/images/services-reference/service-nails.webp",
    description: "Estetik, dayanıklı ve bakımlı tırnak görünümü için profesyonel uygulama.",
  },
  {
    title: "İğneli Epilasyon",
    href: "/igneli-epilasyon",
    image: "/images/services-reference/service-needle.webp",
    description: "İnce ve açık renkli tüylerde de uygulanabilen, kişiye özel planlanan epilasyon yöntemi.",
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

export default function ServicesCatalog() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/images/services-reference/services-hero.webp"
          alt="TDA Luxury Uşak güzellik salonu hizmet odası"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Hizmetlerimiz</h1>
          <p>Güzelliğinize özel, profesyonel bakım çözümleri</p>
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
            {mainServices.map((service) => (
              <article key={service.href} className={styles.mainCard}>
                <Link href={service.href} className={styles.imageWrap}>
                  <Image
                    src={service.image}
                    alt={`${service.title} uygulaması - TDA Luxury Uşak`}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </Link>
                <div className={styles.cardBody}>
                  <h2>{service.title}</h2>
                  <span className={styles.goldLine} />
                  <p>{service.description}</p>
                  <Link href={service.href} className={styles.textLink}>
                    İncele <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <header className={styles.otherHeader}>
            <h2>Diğer Uygulamalarımız</h2>
            <span><i /><b /><i /></span>
          </header>

          <div className={styles.otherGrid}>
            {otherServices.map((service) => (
              <article key={service.title} className={styles.otherCard}>
                <Link href={service.href} className={styles.otherImage}>
                  <Image
                    src={service.image}
                    alt={`${service.title} uygulaması - TDA Luxury Uşak`}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </Link>
                <div className={styles.otherBody}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href={service.href}>
                    Detaylı Bilgi <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.consultation}>
        <div className={styles.consultImage}>
          <Image
            src="/images/services-reference/services-consultation.webp"
            alt="TDA Luxury ücretsiz ön görüşme"
            fill
            sizes="(max-width: 800px) 100vw, 47vw"
          />
        </div>
        <div className={styles.consultContent}>
          <span />
          <h2>Size En Uygun İşlemi<br />Birlikte Belirleyelim</h2>
          <p>
            Her cilt ve her ihtiyaç farklıdır. Uzmanlarımız beklentilerinizi dinler,
            ihtiyaçlarınızı değerlendirir ve size en uygun uygulama planını oluşturur.
          </p>
          <div className={styles.consultActions}>
            <Link href="/randevu" className={styles.goldButton}>
              <CalendarDays size={18} /> Ücretsiz Ön Görüşme
            </Link>
            <a
              href="https://wa.me/905366651064?text=Merhaba%2C%20TDA%20Luxury%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.outlineButton}
            >
              <MessageCircle size={18} /> WhatsApp&apos;tan Sor
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
                    <ArrowRight className={styles.processArrow} size={38} strokeWidth={1.1} />
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
          <div><b>UŞAK MERKEZ</b><p>Fatih Mah. Yavuz Sultan Selim Cad. No: 10/B</p></div>
        </div>
        <div className={styles.infoItem}>
          <MessageCircle size={25} />
          <div><b>BİZE ULAŞIN</b><p>0536 665 10 64</p></div>
        </div>
        <div className={styles.infoItem}>
          <Clock3 size={25} />
          <div><b>ÇALIŞMA SAATLERİ</b><p>Pazartesi – Cumartesi<br />09.00 – 19.30</p></div>
        </div>
        <div className={styles.infoItem}>
          <CalendarDays size={25} />
          <div><b>RANDEVU ALIN</b><p>Hızlı ve kolay randevu için bize ulaşın.</p></div>
          <Link href="/randevu">Randevu Al</Link>
        </div>
      </section>
    </div>
  );
}
