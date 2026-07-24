import type { Metadata } from "next";
import StockManagement from "@/components/platform/StockManagement";

export const metadata: Metadata = {
  title: "Stok ve Depo | TDA Luxury",
  robots: { index: false, follow: false },
};

export default function StockPage() {
  return <StockManagement />;
}
