import type { Metadata } from "next";
import CiltBakimiPage from "@/components/CiltBakimiPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Uşak Cilt Bakımı ve Cilt Analizi | TDA Luxury",
  description: "Uşak’ta cilt analizi, Hydrafacial, akne, leke ve anti-aging bakım seçeneklerini keşfedin. Cildinize özel bakım planı ve randevu için bilgi alın.",
  path: "/cilt-bakimi",
  image: "/og/home.jpg",
});

export default function Page() {
  return <CiltBakimiPage />;
}
