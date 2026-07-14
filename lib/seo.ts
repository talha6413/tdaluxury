import type { Metadata } from "next";
import { site } from "@/lib/site";

type SeoInput = { title: string; description: string; path: string; image?: string; type?: "website" | "article"; noindex?: boolean };
export function buildMetadata({ title, description, path, image = "/og/default.jpg", type = "website", noindex = false }: SeoInput): Metadata {
  const canonical = new URL(path, site.url).toString();
  const ogImage = new URL(image, site.url).toString();
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { type, locale: "tr_TR", siteName: site.name, url: canonical, title, description, images: [{ url: ogImage, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
