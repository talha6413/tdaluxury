import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServicesCatalog from "@/components/ServicesCatalog";
import { buildManagedMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildManagedMetadata("hizmetler", {
    title: "Güzellik Hizmetleri | TDA Luxury Uşak",
    description:
      "TDA Luxury Uşak güzellik hizmetleri: lazer epilasyon, cilt bakımı, kalıcı makyaj, iğneli epilasyon, kaş-kirpik, tırnak hizmetleri ve bölgesel incelme.",
    path: "/hizmetler",
  });
}

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "TDA Luxury Uşak Güzellik Hizmetleri",
  itemListElement: [
    ["Lazer Epilasyon", "/lazer-epilasyon"],
    ["Cilt Bakımı", "/cilt-bakimi"],
    ["Kalıcı Makyaj", "/kalici-makyaj"],
    ["İğneli Epilasyon", "/igneli-epilasyon"],
    ["Kaş & Kirpik", "/kas-kirpik"],
    ["Tırnak Hizmetleri", "/tirnak"],
    ["Bölgesel İncelme", "/bolgesel-incelme"],
  ].map(([name, path], index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    url: `https://www.tdaluxury.com.tr${path}`,
  })),
};

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
        <ServicesCatalog />
      </main>
      <Footer />
    </>
  );
}
