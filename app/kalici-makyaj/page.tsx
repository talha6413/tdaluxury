import type { Metadata } from "next";
import KaliciMakyajPage from "@/components/KaliciMakyajPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Uşak Kalıcı Makyaj ve Microblading | TDA Luxury",
  description: "Uşak kalıcı makyaj hizmetleri: microblading, pudralama kaş, dipliner, eyeliner ve dudak renklendirme. TDA Luxury Uşak Merkez.",
  path: "/kalici-makyaj",
  image: "/og/home.jpg",
});

export default function Page() {
  return <KaliciMakyajPage />;
}
