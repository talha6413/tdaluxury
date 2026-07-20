import type { Metadata } from "next";
import LaserEpilasyonPage from "@/components/LaserEpilasyonPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Uşak Lazer Epilasyon | Kadın ve Erkek | TDA Luxury",
  description: "Uşak’ta kadın ve erkek lazer epilasyon seçenekleri, bölge ve seans planlaması TDA Luxury’de. Kişiye özel ön görüşme ve randevu için bilgi alın.",
  path: "/lazer-epilasyon",
  image: "/og/home.jpg",
});

export default function Page() {
  return <LaserEpilasyonPage />;
}
