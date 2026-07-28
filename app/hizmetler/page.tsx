import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServicesCatalog from "@/components/ServicesCatalog";
import { buildManagedMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildManagedMetadata("hizmetler", {
    title: "Güzellik Hizmetleri | TDA Luxury Uşak",
    description:
      "TDA Luxury Uşak güzellik hizmetleri: lazer epilasyon, cilt bakımı, kalıcı makyaj, ipek kirpik, kirpik lifting, kaş tasarımı, microblading, protez tırnak ve iğneli epilasyon.",
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
    ["İpek Kirpik", "/kas-kirpik/ipek-kirpik"],
    ["Kirpik Lifting", "/kas-kirpik/kirpik-lifting"],
    ["Protez Tırnak", "/tirnak/protez-tirnak"],
    ["İğneli Epilasyon", "/igneli-epilasyon"],
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
