import type { Metadata } from "next";
import CiltBakimiPage from "@/components/CiltBakimiPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Uşak Cilt Bakımı | Cilt Analizi ve Kişiye Özel Bakım | TDA Luxury",
  description: "Uşak cilt bakımı: cilt analizi, nem bakımı, akneye eğilimli cilt bakımı, leke görünümü ve anti-aging uygulamaları. TDA Luxury Uşak Merkez.",
  path: "/cilt-bakimi",
  image: "/og/home.jpg",
});

export default function Page() {
  return <CiltBakimiPage />;
}
