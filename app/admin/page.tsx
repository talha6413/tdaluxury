import type { Metadata } from "next";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  return <AdminPanel />;
}
