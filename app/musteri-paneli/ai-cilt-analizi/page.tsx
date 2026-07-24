import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AiSkinAnalyzer from "@/components/customer/AiSkinAnalyzer";

export const metadata: Metadata = {
  title: "AI Cilt Analizi | TDA Luxury",
  description: "TDA Luxury güvenli müşteri hesabında AI destekli cilt görünümü ve fotoğraf kalite analizi.",
  robots: { index: false, follow: false, nocache: true },
};

export default function AiSkinAnalysisPage() {
  return (
    <>
      <Nav />
      <AiSkinAnalyzer />
      <Footer />
    </>
  );
}
