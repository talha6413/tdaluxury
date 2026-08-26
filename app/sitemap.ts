import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { site } from "@/lib/site";

const SITE_CONTENT_UPDATE = "2026-08-26";
const BLOG_SITEMAP_API =
  "https://ypgenxagjhccfgsyrgzx.supabase.co/functions/v1/blog-sitemap?format=json";

const staticPages = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly" as const,
    lastModified: SITE_CONTENT_UPDATE,
  },
  {
    path: "/usak-guzellik-salonu",
    priority: 0.95,
    changeFrequency: "monthly" as const,
  },
  { path: "/hizmetler", priority: 0.9, changeFrequency: "monthly" as const },
  {
    path: "/lazer-epilasyon",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/cilt-bakimi",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/kalici-makyaj",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  { path: "/hakkimizda", priority: 0.75, changeFrequency: "yearly" as const },
  { path: "/iletisim", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/galeri", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/sonuclar", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/sss", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/kampanyalar", priority: 0.65, changeFrequency: "weekly" as const },
  {
    path: "/randevu",
    priority: 0.85,
    changeFrequency: "monthly" as const,
    lastModified: SITE_CONTENT_UPDATE,
  },
  {
    path: "/kalite-hijyen",
    priority: 0.7,
    changeFrequency: "yearly" as const,
  },
  {
    path: "/yayin-ilkeleri",
    priority: 0.55,
    changeFrequency: "yearly" as const,
  },
  {
    path: "/gizlilik-politikasi",
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
  {
    path: "/cerez-politikasi",
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
  {
    path: "/kvkk-aydinlatma-metni",
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
];

type DynamicBlogEntry = {
  slug: string;
  url: string;
  lastModified: string;
};

async function getDynamicBlogEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetch(BLOG_SITEMAP_API, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Blog sitemap API returned ${response.status}`);
    }

    const posts = (await response.json()) as DynamicBlogEntry[];

    return posts.map((post) => ({
      url: post.url,
      lastModified: new Date(post.lastModified),
      changeFrequency: "monthly",
      priority: 0.68,
    }));
  } catch (error) {
    console.error("Dynamic blog sitemap failed, using static fallback.", error);

    return blogPosts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, site.url).toString(),
      lastModified: new Date(post.dateModified || post.datePublished),
      changeFrequency: "monthly",
      priority: 0.68,
    }));
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicBlogEntries = await getDynamicBlogEntries();

  const latestBlogUpdate =
    dynamicBlogEntries
      .map((entry) => entry.lastModified)
      .filter(Boolean)
      .map((value) => new Date(value as string | Date))
      .sort((a, b) => b.getTime() - a.getTime())[0] ??
    new Date(SITE_CONTENT_UPDATE);

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => {
    const lastModified =
      page.path === "/blog"
        ? latestBlogUpdate
        : "lastModified" in page && page.lastModified
          ? new Date(page.lastModified)
          : undefined;

    return {
      url: new URL(page.path, site.url).toString(),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    };
  });

  // Google'a sahte/eski lastmod göndermiyoruz.
  // Hizmet sayfalarında güvenilir bir içerik güncelleme tarihi yoksa
  // lastModified alanını boş bırakmak yanlış tarih göndermekten daha doğrudur.
  const serviceEntries: MetadataRoute.Sitemap = services
    .filter((service) => !staticPages.some((page) => page.path === service.slug))
    .map((service) => ({
      url: new URL(service.slug, site.url).toString(),
      changeFrequency: "monthly",
      priority: service.parent ? 0.72 : 0.82,
    }));

  const seen = new Set<string>();
  const dedupedBlogEntries = dynamicBlogEntries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });

  return [...staticEntries, ...serviceEntries, ...dedupedBlogEntries];
}
