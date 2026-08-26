"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ManagedSiteSettings } from "@/lib/managed-content";
import { site } from "@/lib/site";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { defaultOpeningHours, normalizeOpeningHours } from "@/lib/opening-hours";

const fallback: ManagedSiteSettings = {
  businessName: site.name,
  phoneDisplay: site.phoneDisplay,
  whatsappNumber: site.whatsapp,
  whatsappMessage: "Merhaba, TDA Luxury hizmetleri hakkında bilgi almak ve randevu oluşturmak istiyorum.",
  instagramUrl: site.instagram,
  address: site.address,
  mapsUrl: site.mapsUrl,
  maintenanceMode: false,
  openingHours: defaultOpeningHours,
  email: "",
  logoMain: "TDA",
  logoSub: "LUXURY",
  headerCtaText: "RANDEVU AL",
  headerCtaUrl: "/randevu",
  headerCtaTargetBlank: false,
  footerDescription: "Uşak’ta lazer epilasyon, cilt bakımı, kalıcı makyaj, kaş-kirpik, tırnak ve bölgesel bakım hizmetlerinde premium deneyim.",
  footerCopyright: "TDA Luxury. Tüm hakları saklıdır.",
  facebookUrl: "",
  tiktokUrl: "",
  youtubeUrl: "",
};

const SiteSettingsContext = createContext(fallback);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: ManagedSiteSettings | null;
  children: ReactNode;
}) {
  const [liveSettings, setLiveSettings] = useState<ManagedSiteSettings>({
    ...fallback,
    ...settings,
  });

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    supabase
      .from("site_settings")
      .select("*")
      .eq("id", true)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;

        setLiveSettings((current) => ({
          ...current,
          businessName: String(data.business_name || current.businessName),
          phoneDisplay: String(data.phone_display || current.phoneDisplay),
          whatsappNumber: String(data.whatsapp_number || current.whatsappNumber).replace(/\D/g, ""),
          whatsappMessage: String(data.whatsapp_message || current.whatsappMessage),
          instagramUrl: String(data.instagram_url || current.instagramUrl),
          address: String(data.address || current.address),
          mapsUrl: String(data.maps_url || current.mapsUrl),
          maintenanceMode: Boolean(data.maintenance_mode),
          openingHours: normalizeOpeningHours(data.opening_hours),
          email: String(data.email || current.email),
          logoMain: String(data.logo_main || current.logoMain),
          logoSub: String(data.logo_sub || current.logoSub),
          headerCtaText: String(data.header_cta_text || current.headerCtaText),
          headerCtaUrl: String(data.header_cta_url || current.headerCtaUrl),
          headerCtaTargetBlank: Boolean(data.header_cta_target_blank),
          footerDescription: String(data.footer_description || current.footerDescription),
          footerCopyright: String(data.footer_copyright || current.footerCopyright),
          facebookUrl: String(data.facebook_url || current.facebookUrl),
          tiktokUrl: String(data.tiktok_url || current.tiktokUrl),
          youtubeUrl: String(data.youtube_url || current.youtubeUrl),
        }));
      });
  }, []);

  return (
    <SiteSettingsContext.Provider value={liveSettings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export function useWhatsAppUrl(text?: string) {
  const settings = useSiteSettings();
  return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    text || settings.whatsappMessage
  )}`;
}
