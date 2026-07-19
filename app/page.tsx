import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { buildManagedMetadata } from "@/lib/seo";

export const revalidate = 60;

const ServicesHome = dynamic(() => import("@/components/ServicesHome"));
const Results = dynamic(() => import("@/components/Results"));
const AboutStrip = dynamic(() => import("@/components/AboutStrip"));
const Stats = dynamic(() => import("@/components/Stats"));
const InstagramShowcase = dynamic(
  () => import("@/components/InstagramShowcase")
);
const ConversionConsultation = dynamic(
  () => import("@/components/ConversionConsultation")
);
const GoogleTrust = dynamic(() => import("@/components/GoogleTrust"));
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"));
const MotionReveal = dynamic(() => import("@/components/MotionReveal"));
const PremiumSplash = dynamic(() => import("@/components/PremiumSplash"));

export async function generateMetadata() { return buildManagedMetadata("ana-sayfa", {
  title:
    "Uşak Güzellik Salonu | Lazer Epilasyon, Cilt Bakımı | TDA Luxury",
  description:
    "TDA Luxury Uşak'ta lazer epilasyon, cilt bakımı, kalıcı makyaj, bölgesel incelme, kaş-kirpik ve tırnak hizmetleri sunan premium güzellik salonudur.",
  path: "/",
  image: "/og/home.jpg",
}); }

export default function Home() {
  return (
    <>
      <PremiumSplash />
      <ScrollProgress />
      <Nav />

      <main id="main-content">
        <Hero />
        <Stats />

        <MotionReveal>
          <ServicesHome />
        </MotionReveal>

        <MotionReveal delay={80}>
          <Results />
        </MotionReveal>

        <MotionReveal delay={90}>
          <GoogleTrust />
        </MotionReveal>

        <MotionReveal delay={100}>
          <AboutStrip />
        </MotionReveal>

        <MotionReveal delay={130}>
          <ConversionConsultation />
        </MotionReveal>

        <MotionReveal delay={140}>
          <InstagramShowcase />
        </MotionReveal>
      </main>

      <Footer />
    </>
  );
}
