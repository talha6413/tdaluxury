import type { Metadata } from "next";
import FinanceManagement from "@/components/platform/FinanceManagement";

export const metadata: Metadata = {
  title: "Finans ve Kasa | TDA Luxury",
  robots: { index: false, follow: false },
};

export default function FinancePage() {
  return <FinanceManagement />;
}
