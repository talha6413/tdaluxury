import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { getManagedBlogPosts } from "@/lib/managed-content";
import { buildMetadata } from "@/lib/seo";
import styles from "./site-haritasi.module.css";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "Site Haritası | TDA Luxury Uşak",
    description:
      "TDA Luxury Uşak web sitesindeki güzellik hizmetleri, blog rehberleri ve kurumsal sayfalara tek sayfadan ulaşın.",
    path: "/site-haritasi",
  });
}

const primaryPages = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/usak-guzellik-salonu", label: "Uşak Güzellik Salonu" },
  { href: "/hizmetler", label: "Tüm Hizmetler" },
  { href: "/randevu", label: "Randevu Al" },
  { href: "/blog", label: "Blog" },
  { href: "/sonuclar", label: "Öncesi / Sonrası" },
  { href: "/galeri", label: "Galeri" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/kalite-hijyen", label: "Kalite ve Hijyen" },
  { href: "/sss", label: "Sık Sorulan Sorular" },
  { href: "/iletisim", label: "İletişim" },
];

const topLevelServices = services.filter((service) => !service.parent);

export default async function SiteMapPage() {
  const blogPosts = await getManagedBlogPosts();

  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="page-hero">
          <div className="container">
            <p className="section-label">TDA LUXURY UŞAK</p>
            <h1>Site Haritası</h1>
            <p>
              Hizmetlerimize, bakım rehberlerimize ve kurumsal sayfalarımıza
              tek noktadan ulaşın.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.grid}>
              <article className={styles.card}>
                <span>01</span>
                <h2>Önemli Sayfalar</h2>
                <nav aria-label="Önemli sayfalar" className={styles.links}>
                  {primaryPages.map((item) => (
                    <Link href={item.href} key={item.href}>
                      {item.label} →
                    </Link>
                  ))}
                </nav>
              </article>

              {topLevelServices.map((parent) => {
                const children = services.filter(
                  (service) => service.parent === parent.slug
                );

                return (
                  <article className={styles.card} key={parent.slug}>
                    <span>HİZMET</span>
                    <h2>
                      <Link href={parent.slug}>{parent.title}</Link>
                    </h2>
                    <nav
                      aria-label={`${parent.title} hizmetleri`}
                      className={styles.links}
                    >
                      <Link href={parent.slug}>
                        {parent.title} ana sayfası →
                      </Link>
                      {children.map((child) => (
                        <Link href={child.slug} key={child.slug}>
                          {child.title} →
                        </Link>
                      ))}
                    </nav>
                  </article>
                );
              })}

              <article className={`${styles.card} ${styles.blogCard}`}>
                <span>BİLGİ MERKEZİ</span>
                <h2>Blog Rehberleri</h2>
                <p>
                  Lazer epilasyon, cilt bakımı, kalıcı makyaj ve diğer güzellik
                  hizmetleri hakkında yayınlanan rehberler.
                </p>
                <nav aria-label="Blog rehberleri" className={styles.blogLinks}>
                  {blogPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug}>
                      <strong>{post.title}</strong>
                      <small>{post.category}</small>
                    </Link>
                  ))}
                </nav>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
