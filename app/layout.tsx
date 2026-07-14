import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LocalBusinessSchema, WebsiteSchema } from "@/lib/schema";
import SkipLink from "@/components/SkipLink";
import DeferredSiteWidgets from "@/components/DeferredSiteWidgets";
import ClientOnlyGlobalWidgets from "@/components/ClientOnlyGlobalWidgets";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Uşak Güzellik Salonu | TDA Luxury",
    template: "%s | TDA Luxury",
  },
  description:
    "TDA Luxury Uşak'ta lazer epilasyon, cilt bakımı, kalıcı makyaj, bölgesel incelme, kaş-kirpik ve tırnak hizmetleri sunan premium güzellik salonudur.",
  applicationName: "TDA Luxury",
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "TDA Luxury",
    url: site.url,
    title: "Uşak Güzellik Salonu | TDA Luxury",
    description:
      "Uşak'ta lazer epilasyon, cilt bakımı, kalıcı makyaj ve kişiye özel güzellik hizmetleri.",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "TDA Luxury Uşak güzellik salonu",
      },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Uşak Güzellik Salonu | TDA Luxury",
    description:
      "Uşak'ta lazer epilasyon, cilt bakımı, kalıcı makyaj ve kişiye özel güzellik hizmetleri.",
    images: ["/og/home.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080706",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <SkipLink />
        <WebsiteSchema />
        <LocalBusinessSchema />

        {children}

        <DeferredSiteWidgets />
        <ClientOnlyGlobalWidgets />
      </body>
    </html>
  );
}
