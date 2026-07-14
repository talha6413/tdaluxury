import type { Metadata } from "next";
import LaserEpilasyonPage from "@/components/LaserEpilasyonPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Uşak Lazer Epilasyon | Kadın ve Erkek Lazer | TDA Luxury",
  description: "Uşak lazer epilasyon hizmeti: kadın ve erkek uygulamaları, seans süreci, öncesi-sonrası bakım ve sık sorulan sorular. TDA Luxury Uşak Merkez.",
  path: "/lazer-epilasyon",
  image: "/og/home.jpg",
});

export default function Page() {
  return <LaserEpilasyonPage />;
}
