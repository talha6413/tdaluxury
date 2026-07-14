import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { serviceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
const service = serviceBySlug("/kalici-makyaj/eyeliner");
export const metadata: Metadata = buildMetadata({ title: "Uşak Kalıcı Eyeliner | TDA Luxury", description: service.description, path: service.slug, image: "/og/default.jpg" });
export default function Page(){ return <ServicePage service={service} />; }
