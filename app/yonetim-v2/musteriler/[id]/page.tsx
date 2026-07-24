import type { Metadata } from "next";
import CustomerDetail from "@/components/platform/CustomerDetail";

export const metadata: Metadata = {
  title: "Müşteri Kartı | TDA Luxury",
  robots: { index: false, follow: false },
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CustomerDetail customerId={id} />;
}
