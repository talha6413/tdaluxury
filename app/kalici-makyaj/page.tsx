import type { Metadata } from "next";
import KaliciMakyajPage from "@/components/KaliciMakyajPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Uşak Kalıcı Makyaj ve Microblading | TDA Luxury",
  description: "Uşak’ta microblading, pudralama kaş, dipliner, eyeliner ve dudak renklendirme uygulamalarını keşfedin. Kişiye özel tasarım için bilgi alın.",
  path: "/kalici-makyaj",
  image: "/og/home.jpg",
});

export default function Page() {
  return <KaliciMakyajPage />;
}
