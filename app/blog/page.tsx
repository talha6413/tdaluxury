import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { getManagedBlogPosts } from "@/lib/managed-content";

export const metadata: Metadata = buildMetadata({
  title: "Güzellik Blogu | Uşak Lazer Epilasyon ve Cilt Bakımı | TDA Luxury",
  description:
    "Lazer epilasyon, cilt bakımı, kalıcı makyaj, kaş-kirpik ve bölgesel incelme üzerine güncel içerikler ve uzman ipuçları.",
  path: "/blog",
  image: "/images/services-premium/cilt-bakimi.webp",
});

export const revalidate = 60;

export default async function Page() {
  const blogPosts = await getManagedBlogPosts();
  const [featured, ...posts] = blogPosts;
  return (
    <>
      <Nav />
      <main>
        <section className="blog-premium-hero">
          <div className="container blog-premium-hero-inner">
            <p className="blog-premium-kicker">TDA LUXURY BLOG</p>
            <h1>Güzellik Rehberi</h1>
            <p>Lazer epilasyon, cilt bakımı ve bakım uygulamaları hakkında sade, güvenilir ve kullanıcı odaklı içerikler.</p>
          </div>
        </section>

        <section className="blog-featured-section">
          <div className="container">
            <Link href={`/blog/${featured.slug}`} className="blog-featured-card">
              <div className="blog-featured-image-wrap">
                <Image src={featured.image} alt={featured.title} fill priority sizes="(max-width: 900px) 100vw, 50vw" quality={80} className="blog-featured-image" />
              </div>
              <div className="blog-featured-copy">
                <span className="blog-category">ÖNE ÇIKAN • {featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className="blog-meta"><Clock3 size={16} /> {featured.readTime} okuma</div>
                <strong>YAZIYI OKU <ArrowRight size={17} /></strong>
              </div>
            </Link>
          </div>
        </section>

        <section className="blog-grid-section">
          <div className="container">
            <div className="blog-section-head">
              <div>
                <p className="section-label">SON YAZILAR</p>
                <h2>Uzman Bakış Açısıyla Hazırlanan İçerikler</h2>
              </div>
              <p>Doğru beklenti oluşturmanıza ve hizmetleri daha yakından tanımanıza yardımcı olan rehberler.</p>
            </div>
            <div className="blog-premium-grid">
              {posts.map((post) => (
                <article className="blog-premium-card" key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="blog-premium-card-image">
                    <Image src={post.image} alt={post.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" quality={75} className="blog-premium-card-photo" />
                    <span>{post.category}</span>
                  </Link>
                  <div className="blog-premium-card-copy">
                    <div className="blog-meta"><Clock3 size={15} /> {post.readTime} okuma</div>
                    <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                    <p>{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="blog-read-more">DEVAMINI OKU <ArrowRight size={16} /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="blog-bottom-cta">
          <div className="container blog-bottom-cta-inner">
            <div>
              <p className="section-label">MERAK ETTİĞİNİZ BİR KONU MU VAR?</p>
              <h2>Uzman Ekibimizden Bilgi Alın</h2>
            </div>
            <Link href="/iletisim" className="btn-gold">İLETİŞİME GEÇİN →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
