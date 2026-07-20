import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getManagedPageContent } from "@/lib/managed-content";

export type SeoInput = { title: string; description: string; path: string; image?: string; type?: "website" | "article"; noindex?: boolean };
export function buildMetadata({ title, description, path, image = "/og/default.jpg", type = "website", noindex = false }: SeoInput): Metadata {
  const canonical = new URL(path, site.url).toString();
  const ogImage = new URL(image, site.url).toString();
  return {
    metadataBase: new URL(site.url),
    // Page titles already include the brand where appropriate. Marking them as
    // absolute prevents the root layout template from appending it a second time.
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: { type, locale: "tr_TR", siteName: site.name, url: canonical, title, description, images: [{ url: ogImage, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export async function buildManagedMetadata(pageKey: string, fallback: SeoInput): Promise<Metadata> {
  const managed = await getManagedPageContent(pageKey);
  return buildMetadata({
    ...fallback,
    title: managed?.seoTitle || fallback.title,
    description: managed?.seoDescription || fallback.description,
    image: managed?.image || fallback.image,
  });
}
