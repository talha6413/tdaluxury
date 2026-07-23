import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServicesCatalog from "@/components/ServicesCatalog";
import { services } from "@/data/services";
import { buildManagedMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildManagedMetadata("hizmetler", {
    title: "Hizmetlerimiz | TDA Luxury Uşak",
    description:
      "TDA Luxury Uşak hizmetlerini keşfedin. Lazer epilasyon, protez tırnak, cilt bakımı, kalıcı makyaj ve diğer profesyonel güzellik uygulamalarını inceleyin.",
    path: "/hizmetler",
  });
}

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <ServicesCatalog services={services} />
      </main>
      <Footer />
    </>
  );
}
