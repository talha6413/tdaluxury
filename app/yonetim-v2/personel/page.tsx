import type { Metadata } from "next";
import StaffManagement from "@/components/platform/StaffManagement";

export const metadata: Metadata = {
  title: "Personel ve Prim | TDA Luxury",
  robots: { index: false, follow: false },
};

export default function StaffPage() {
  return <StaffManagement />;
}
