import type { Metadata } from "next";
import AppointmentManagement from "@/components/platform/AppointmentManagement";

export const metadata: Metadata = {
  title: "Randevu Yönetimi | TDA Luxury",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AppointmentManagement />;
}
