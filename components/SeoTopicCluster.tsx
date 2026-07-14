import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import type { SeoCluster } from "@/data/seo-clusters";
import { getClusterBlogPosts, getClusterServices } from "@/data/seo-clusters";

export default function SeoTopicCluster({
  cluster,
  currentServiceSlug,
  currentBlogSlug,
}: {
  cluster: SeoCluster;
  currentServiceSlug?: string;
  currentBlogSlug?: string;
}) {
  const posts = getClusterBlogPosts(cluster, currentBlogSlug).slice(0, 4);
  const clusterServices = getClusterServices(cluster, currentServiceSlug).slice(0, 5);

  if (posts.length === 0 && clusterServices.length === 0) return null;

  return (
    <section className="seo-cluster-section" aria-labelledby={`cluster-${cluster.key}`}>
      <div className="container">
        <div className="seo-cluster-head">
          <div>
            <p className="section-label">KONU REHBERİ</p>
            <h2 id={`cluster-${cluster.key}`}>{cluster.title}</h2>
          </div>
          <p>{cluster.description}</p>
        </div>

        {posts.length > 0 && (
          <div className="seo-cluster-post-grid">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} className="seo-cluster-post" key={post.slug}>
                <div className="seo-cluster-post-image">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 760px) 100vw, 25vw"
                  />
                </div>
                <div className="seo-cluster-post-copy">
                  <span><BookOpenText size={15} /> {post.readTime}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <b>REHBERİ OKU <ArrowRight size={15} /></b>
                </div>
              </Link>
            ))}
          </div>
        )}

        {clusterServices.length > 0 && (
          <nav className="seo-cluster-service-links" aria-label={`${cluster.title} ilgili hizmetleri`}>
            <span>İLGİLİ HİZMETLER</span>
            {clusterServices.map((service) => (
              <Link href={service.slug} key={service.slug}>{service.title} →</Link>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
