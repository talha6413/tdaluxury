import { createClient } from "@supabase/supabase-js";
import { blogPosts as fallbackBlogPosts, type BlogPost } from "@/data/blog";

export type ManagedCampaign = { id?: string; title: string; eyebrow: string; description: string; image: string; href: string };
export type ManagedGalleryItem = { id?: string; src: string; title: string; category: string; alt: string };
export type ManagedService = { id?: string; title: string; subtitle: string; meta: string; duration: string; price: string; href: string; image: string; imagePosition: string };
export type ManagedFaqGroup = { title: string; items: [string, string][] };
export type ManagedResult = { id?: string; title: string; category: string; image: string; description: string; note?: string };
export type ManagedPageContent = { title: string; pageKey: string; eyebrow: string; description: string; buttonText: string; buttonUrl: string; image: string; imagePosition: string; seoTitle: string; seoDescription: string };

function serverClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
}

export async function getManagedCampaigns(fallback: ManagedCampaign[]) {
  const client = serverClient();
  if (!client) return fallback;
  const { data, error } = await client.from("campaigns").select("*").eq("published", true).order("sort_order");
  if (error || !data?.length) return fallback;
  return data.map((row) => ({ id: row.id, title: row.title, eyebrow: row.eyebrow, description: row.description, image: row.image_url, href: row.href }));
}

export async function getManagedGallery(fallback: ManagedGalleryItem[]) {
  const client = serverClient();
  if (!client) return fallback;
  const { data, error } = await client.from("gallery_items").select("*").eq("published", true).order("sort_order");
  if (error || !data?.length) return fallback;
  return data.map((row) => ({ id: row.id, src: row.image_url, title: row.title, category: row.category, alt: row.alt_text || row.title }));
}

export async function getManagedFeaturedServices(fallback: ManagedService[]) {
  const client = serverClient();
  if (!client) return fallback;
  const { data, error } = await client.from("services").select("*").eq("published", true).eq("featured", true).order("sort_order").limit(8);
  if (error || !data?.length) return fallback;
  return data.map((row) => ({
    id: row.id, title: row.title, subtitle: row.short_description || row.description,
    meta: row.category, duration: row.duration, price: row.price_text, href: row.slug,
    image: row.image_url, imagePosition: row.image_position || "center center",
  }));
}

export async function getManagedFaqGroups(fallback: ManagedFaqGroup[]) {
  const client = serverClient();
  if (!client) return fallback;
  const { data, error } = await client.from("faqs").select("*").eq("published", true).order("sort_order");
  if (error || !data?.length) return fallback;
  const groups = new Map<string, [string, string][]>();
  for (const row of data) {
    const category = String(row.category || "Genel");
    groups.set(category, [...(groups.get(category) ?? []), [String(row.title), String(row.answer)]]);
  }
  return Array.from(groups, ([title, items]) => ({ title, items }));
}

export async function getManagedResults(fallback: ManagedResult[]) {
  const client = serverClient();
  if (!client) return fallback;
  const { data, error } = await client.from("results").select("*").eq("published", true).order("sort_order");
  if (error || !data?.length) return fallback;
  return data.map((row) => ({
    id: row.id,
    title: String(row.title),
    category: String(row.category || "Sonuç"),
    image: `url(${String(row.before_image_url || row.after_image_url || "/images/result-lazer.svg")})`,
    description: String(row.description || ""),
    note: String(row.disclaimer || "Sonuçlar kişiden kişiye değişebilir."),
  }));
}

export async function getManagedPageContent(pageKey: string) {
  const client = serverClient();
  if (!client) return null;
  const { data, error } = await client.from("page_content").select("*").eq("page_key", pageKey).eq("published", true).maybeSingle();
  if (error || !data) return null;
  return {
    title: String(data.title), pageKey: String(data.page_key), eyebrow: String(data.eyebrow || ""),
    description: String(data.description || ""), buttonText: String(data.button_text || ""),
    buttonUrl: String(data.button_url || ""), image: String(data.image_url || ""),
    imagePosition: String(data.image_position || "center center"), seoTitle: String(data.seo_title || ""),
    seoDescription: String(data.seo_description || ""),
  } satisfies ManagedPageContent;
}

function mapBlogRow(row: Record<string, unknown>): BlogPost {
  const publishedAt = String(row.published_at ?? new Date().toISOString().slice(0, 10));
  return {
    slug: String(row.slug), title: String(row.title), excerpt: String(row.excerpt ?? ""),
    category: String(row.category ?? "Güzellik"), readTime: String(row.read_time ?? "5 dk"),
    image: String(row.image_url || "/images/services-premium/cilt-bakimi.webp"),
    intro: String(row.intro ?? ""), datePublished: publishedAt,
    dateModified: String(row.updated_at ?? publishedAt).slice(0, 10),
    keywords: Array.isArray(row.keywords) ? row.keywords.map(String) : [],
    relatedServices: [{ label: "Tüm Hizmetler", href: "/hizmetler" }],
    sections: Array.isArray(row.sections) ? row.sections as BlogPost["sections"] : [],
  };
}

export async function getManagedBlogPosts() {
  const client = serverClient();
  if (!client) return fallbackBlogPosts;
  const { data, error } = await client.from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false });
  if (error || !data?.length) return fallbackBlogPosts;
  const managed = data.map((row) => mapBlogRow(row));
  const managedSlugs = new Set(managed.map((post) => post.slug));
  return [...managed, ...fallbackBlogPosts.filter((post) => !managedSlugs.has(post.slug))];
}

export async function getManagedBlogPost(slug: string) {
  const client = serverClient();
  if (client) {
    const { data } = await client.from("blog_posts").select("*").eq("slug", slug).eq("published", true).maybeSingle();
    if (data) return mapBlogRow(data);
  }
  return fallbackBlogPosts.find((post) => post.slug === slug);
}
