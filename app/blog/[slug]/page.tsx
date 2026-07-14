import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { blogPosts, getBlogPost } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";
import { waUrl } from "@/lib/site";
import SeoTopicCluster from "@/components/SeoTopicCluster";
import { getClusterForBlog } from "@/data/seo-clusters";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return buildMetadata({
      title: "Blog Yazısı",
      description: "TDA Luxury blog içeriği.",
      path: `/blog/${slug}`,
      noindex: true,
    });
  }

  return {
    ...buildMetadata({
      title: `${post.title} | TDA Luxury Blog`,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      image: post.image,
      type: "article",
    }),
    keywords: post.keywords,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const seoCluster = getClusterForBlog(post.slug);

  const related = blogPosts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .concat(blogPosts.filter((item) => item.slug !== post.slug && item.category !== post.category))
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [`https://www.tdaluxury.com.tr${post.image}`],
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: `https://www.tdaluxury.com.tr/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: "TDA Luxury İçerik Ekibi",
      url: "https://www.tdaluxury.com.tr/yayin-ilkeleri",
    },
    publisher: {
      "@type": "Organization",
      name: "TDA Luxury",
      url: "https://www.tdaluxury.com.tr",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Anasayfa",
        item: "https://www.tdaluxury.com.tr/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.tdaluxury.com.tr/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://www.tdaluxury.com.tr/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <Nav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
          }}
        />

        <section className="blog-detail-hero">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="blog-detail-hero-image"
          />
          <div className="blog-detail-hero-overlay" />
          <div className="container blog-detail-hero-inner">
            <Link href="/blog" className="blog-back">
              <ArrowLeft size={16} /> BLOGA DÖN
            </Link>
            <span className="blog-category">{post.category}</span>
            <h1>{post.title}</h1>
            <p>{post.intro}</p>
            <div className="blog-detail-meta">
              <Clock3 size={17} /> {post.readTime} okuma · Güncelleme: {post.dateModified}
            </div>
            <div className="blog-author-line">
              TDA Luxury İçerik Ekibi · <Link href="/yayin-ilkeleri">Yayın ilkelerimiz</Link>
            </div>
          </div>
        </section>

        <section className="blog-detail-content">
          <div className="container blog-detail-layout">
            <article className="blog-detail-article">
              <p className="blog-detail-lead">{post.intro}</p>

              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </section>
              ))}

              <section>
                <h2>İlgili hizmetler</h2>
                <p>
                  Bu konuyla ilgili hizmetleri inceleyerek uygulama kapsamı,
                  süreç ve randevu seçenekleri hakkında daha ayrıntılı bilgi
                  alabilirsiniz.
                </p>
                <div className="blog-service-links">
                  {post.relatedServices.map((service) => (
                    <Link key={service.href} href={service.href}>
                      {service.label} →
                    </Link>
                  ))}
                </div>
              </section>

              <div className="blog-detail-note">
                <strong>Önemli not</strong>
                <p>
                  Bu içerik genel bilgilendirme amaçlıdır. Uygunluk ve kişisel
                  planlama için yüz yüze değerlendirme önerilir.
                </p>
              </div>
            </article>

            <aside className="blog-detail-side">
              <p className="section-label">TDA LUXURY UŞAK</p>
              <h2>Size Özel Bilgi Alın</h2>
              <p>
                Hizmetlerimiz ve randevu planı için WhatsApp üzerinden bize
                ulaşabilirsiniz.
              </p>
              <a
                href={waUrl(`Merhaba, ${post.title} hakkında bilgi almak istiyorum.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <MessageCircle size={19} /> WHATSAPP’TAN YAZIN
              </a>
              <Link href="/hizmetler" className="blog-side-link">
                TÜM HİZMETLERİ İNCELEYİN →
              </Link>
            </aside>
          </div>
        </section>

        {seoCluster && (
          <SeoTopicCluster cluster={seoCluster} currentBlogSlug={post.slug} />
        )}

        <section className="blog-related-section">
          <div className="container">
            <div className="blog-section-head">
              <div>
                <p className="section-label">İLGİLİ YAZILAR</p>
                <h2>Okumaya Devam Edin</h2>
              </div>
            </div>
            <div className="blog-premium-grid blog-related-grid">
              {related.map((item) => (
                <article className="blog-premium-card" key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="blog-premium-card-image"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="blog-premium-card-photo"
                    />
                  </Link>
                  <div className="blog-premium-card-copy">
                    <span className="blog-category">{item.category}</span>
                    <h2>
                      <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                    </h2>
                    <Link href={`/blog/${item.slug}`} className="blog-read-more">
                      YAZIYI OKU →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
