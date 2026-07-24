import type { Metadata } from "next";
import PhotoManagement from "@/components/platform/PhotoManagement";

export const metadata: Metadata = {
  title: "Müşteri Fotoğrafları | TDA Luxury",
  robots: { index: false, follow: false },
};

export default function PhotosPage() {
  return <PhotoManagement />;
}
