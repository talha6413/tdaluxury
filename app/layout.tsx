import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { LocalBusinessSchema, WebsiteSchema } from "@/lib/schema";
import SkipLink from "@/components/SkipLink";
import DeferredSiteWidgets from "@/components/DeferredSiteWidgets";
import ClientOnlyGlobalWidgets from "@/components/ClientOnlyGlobalWidgets";
import { site } from "@/lib/site";
import { getManagedSiteSettings } from "@/lib/managed-content";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import ConsentGoogleScripts from "@/components/analytics/ConsentGoogleScripts";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getManagedSiteSettings();

  return (
    <html lang="tr">
      <body>
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){dataLayer.push(arguments);};
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});`}
        </Script>
        <ConsentGoogleScripts />
        <SiteSettingsProvider settings={settings}>
          <SkipLink />
          <WebsiteSchema />
          <LocalBusinessSchema />

          {children}

          <DeferredSiteWidgets />
          <ClientOnlyGlobalWidgets />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
