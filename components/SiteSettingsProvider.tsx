"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ManagedSiteSettings } from "@/lib/managed-content";
import { site } from "@/lib/site";

const fallback: ManagedSiteSettings = {
  businessName: site.name,
  phoneDisplay: site.phoneDisplay,
  whatsappNumber: site.whatsapp,
  whatsappMessage: "Merhaba, TDA Luxury hizmetleri hakkında bilgi almak ve randevu oluşturmak istiyorum.",
  instagramUrl: site.instagram,
  address: site.address,
  mapsUrl: site.mapsUrl,
  maintenanceMode: false,
};

const SiteSettingsContext = createContext(fallback);

export function SiteSettingsProvider({ settings, children }: { settings: ManagedSiteSettings | null; children: ReactNode }) {
  return <SiteSettingsContext.Provider value={{ ...fallback, ...settings }}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export function useWhatsAppUrl(text?: string) {
  const settings = useSiteSettings();
  return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text || settings.whatsappMessage)}`;
}
