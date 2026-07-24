import type { Metadata } from "next";
import CustomerManagement from "@/components/platform/CustomerManagement";

export const metadata: Metadata = {
  title: "Müşteri Yönetimi | TDA Luxury",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CustomerManagement />;
}
