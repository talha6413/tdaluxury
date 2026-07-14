import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { serviceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
const service = serviceBySlug("/bolgesel-incelme");
export const metadata: Metadata = buildMetadata({ title: "Uşak Bölgesel İncelme | TDA Luxury", description: service.description, path: service.slug, image: "/og/default.jpg" });
export default function Page(){ return <ServicePage service={service} />; }
