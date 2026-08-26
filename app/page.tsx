import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { buildManagedMetadata } from "@/lib/seo";
import { getHomeSections, type HomeSection } from "@/lib/home-sections";

export const revalidate = 60;

const ServicesHome = dynamic(() => import("@/components/ServicesHome"));
const Results = dynamic(() => import("@/components/Results"));
const AboutStrip = dynamic(() => import("@/components/AboutStrip"));
const Stats = dynamic(() => import("@/components/Stats"));
const InstagramShowcase = dynamic(() => import("@/components/InstagramShowcase"));
const ConversionConsultation = dynamic(
  () => import("@/components/ConversionConsultation")
);
const GoogleTrust = dynamic(() => import("@/components/GoogleTrust"));
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"));
const MotionReveal = dynamic(() => import("@/components/MotionReveal"));
const PremiumSplash = dynamic(() => import("@/components/PremiumSplash"));

export async function generateMetadata() {
  return buildManagedMetadata("ana-sayfa", {
    title:
      "TDA Luxury Uşak | Lazer Epilasyon, Cilt Bakımı ve Kalıcı Makyaj",
    description:
      "TDA Luxury Uşak Merkez'de lazer epilasyon, profesyonel cilt bakımı, kalıcı makyaj ve kişiye özel güzellik hizmetleri. Randevu ve bilgi için bize ulaşın.",
    path: "/",
    image: "/og/home.jpg",
  });
}

function renderSection(section: HomeSection) {
  switch (section.section_key) {
    case "hero":
      return <Hero key={section.section_key} section={section} />;
    case "stats":
      return <Stats key={section.section_key} />;
    case "services":
      return (
        <MotionReveal key={section.section_key}>
          <ServicesHome section={section} />
        </MotionReveal>
      );
    case "results":
      return (
        <MotionReveal key={section.section_key} delay={80}>
          <Results />
        </MotionReveal>
      );
    case "google_trust":
      return (
        <MotionReveal key={section.section_key} delay={90}>
          <GoogleTrust />
        </MotionReveal>
      );
    case "about":
      return (
        <MotionReveal key={section.section_key} delay={100}>
          <AboutStrip section={section} />
        </MotionReveal>
      );
    case "consultation":
      return (
        <MotionReveal key={section.section_key} delay={130}>
          <ConversionConsultation section={section} />
        </MotionReveal>
      );
    case "instagram":
      return (
        <MotionReveal key={section.section_key} delay={140}>
          <InstagramShowcase />
        </MotionReveal>
      );
    default:
      return null;
  }
}

export default async function Home() {
  const sections = await getHomeSections();
  const visible = sections
    .filter((section) => section.visible)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <>
      <PremiumSplash />
      <ScrollProgress />
      <Nav />
      <main id="main-content">{visible.map(renderSection)}</main>
      <Footer />
    </>
  );
}
