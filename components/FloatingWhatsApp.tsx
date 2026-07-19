"use client";

import { MessageCircle } from "lucide-react";
import { useWhatsAppUrl } from "@/components/SiteSettingsProvider";
export default function FloatingWhatsApp(){const whatsappUrl = useWhatsAppUrl(); return <a className="floating-wa" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle/></a>}
