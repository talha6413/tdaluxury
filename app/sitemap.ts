import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { site } from "@/lib/site";

const RELEASE_DATE = "2026-07-13";

const staticPages = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/usak-guzellik-salonu", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/hizmetler", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/lazer-epilasyon", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/cilt-bakimi", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/kalici-makyaj", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/hakkimizda", priority: 0.75, changeFrequency: "yearly" as const },
  { path: "/iletisim", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/galeri", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/sonuclar", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/sss", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/kampanyalar", priority: 0.65, changeFrequency: "weekly" as const },
  { path: "/randevu", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/kalite-hijyen", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/yayin-ilkeleri", priority: 0.55, changeFrequency: "yearly" as const },
  { path: "/gizlilik-politikasi", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/cerez-politikasi", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/kvkk-aydinlatma-metni", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: new URL(page.path, site.url).toString(),
    lastModified: new Date(RELEASE_DATE),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services
    .filter((service) => !staticPages.some((page) => page.path === service.slug))
    .map((service) => ({
      url: new URL(service.slug, site.url).toString(),
      lastModified: new Date(RELEASE_DATE),
      changeFrequency: "monthly",
      priority: service.parent ? 0.72 : 0.82,
    }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, site.url).toString(),
    lastModified: new Date(post.dateModified || post.datePublished),
    changeFrequency: "monthly",
    priority: 0.68,
  }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
