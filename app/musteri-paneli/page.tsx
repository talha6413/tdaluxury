import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomerPortal from "@/components/customer/CustomerPortal";

export const metadata: Metadata = {
  title: "Müşteri Paneli | TDA Luxury Uşak",
  description: "TDA Luxury randevu, paket, ödeme, fotoğraf, belge ve sadakat bilgilerinizi tek ekrandan takip edin.",
  robots: { index: false, follow: false, nocache: true },
};

export default function CustomerPortalPage() {
  return (
    <main>
      <Nav />
      <CustomerPortal />
      <Footer />
    </main>
  );
}
