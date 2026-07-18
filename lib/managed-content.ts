import { createClient } from "@supabase/supabase-js";
import { blogPosts as fallbackBlogPosts, type BlogPost } from "@/data/blog";

export type ManagedCampaign = { id?: string; title: string; eyebrow: string; description: string; image: string; href: string };
export type ManagedGalleryItem = { id?: string; src: string; title: string; category: string; alt: string };

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
