import { site } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function WebsiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        alternateName: "TDA Luxury Uşak",
        url: site.url,
        inLanguage: "tr-TR",
        publisher: { "@id": `${site.url}/#business` },
      }}
    />
  );
}

export function LocalBusinessSchema() {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: site.addressLocality,
    addressRegion: site.addressRegion,
    addressCountry: site.addressCountry,
  };

  if (site.streetAddress) address.streetAddress = site.streetAddress;
  if (site.postalCode) address.postalCode = site.postalCode;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "@id": `${site.url}/#business`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        image: `${site.url}/og/home.jpg`,
        logo: `${site.url}/favicon.ico`,
        telephone: `+${site.whatsapp}`,
        address,
        areaServed: site.serviceAreas.map((name) => ({
          "@type": name === "Uşak Merkez" ? "City" : "AdministrativeArea",
          name,
        })),
        sameAs: [site.instagram, site.mapsUrl],
        hasMap: site.mapsUrl,
        geo: {
          "@type": "GeoCoordinates",
          latitude: 38.6415326,
          longitude: 29.3987024,
        },
        priceRange: "₺₺₺",
        knowsAbout: [
          "Lazer epilasyon",
          "Cilt bakımı",
          "Kalıcı makyaj",
          "Kaş ve kirpik uygulamaları",
          "Bölgesel bakım",
        ],
        openingHoursSpecification: site.openingHours.map((item) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${item.day}`,
          opens: item.opens,
          closes: item.closes,
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: { "@id": `${site.url}/#business` },
        areaServed: site.serviceAreas.map((area) => ({
          "@type": area === "Uşak Merkez" ? "City" : "AdministrativeArea",
          name: area,
        })),
        url: `${site.url}${path}`,
      }}
    />
  );
}

export function FaqSchema({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}
