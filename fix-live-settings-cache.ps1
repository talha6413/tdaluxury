$ErrorActionPreference = "Stop"

function ReadFile([string]$path) {
  if (!(Test-Path $path)) { throw "$path bulunamadi." }
  Get-Content $path -Raw -Encoding UTF8
}
function WriteFile([string]$path, [string]$content) {
  Set-Content $path $content -Encoding UTF8
}

# 1) İletişim sayfasını dinamik yap: admin değişikliği cache beklemeden yansısın.
$path = "app\iletisim\page.tsx"
$c = ReadFile $path

if (-not $c.Contains('export const dynamic = "force-dynamic";')) {
  $importEnd = 'import { compactOpeningHours, dayLabels, formatDayHours, normalizeOpeningHours } from "@/lib/opening-hours";'
  if ($c.Contains($importEnd)) {
    $c = $c.Replace($importEnd, $importEnd + "`r`n`r`n" + 'export const dynamic = "force-dynamic";')
  } else {
    # fallback: generateMetadata öncesine ekle
    $needle = 'export async function generateMetadata()'
    $idx = $c.IndexOf($needle)
    if ($idx -lt 0) { throw "Iletisim sayfasinda dynamic ekleme noktasi bulunamadi." }
    $c = $c.Substring(0,$idx) + 'export const dynamic = "force-dynamic";' + "`r`n`r`n" + $c.Substring($idx)
  }
}
WriteFile $path $c

# 2) SiteSettingsProvider: canlı ayarları client tarafında Supabase'den yenile.
$path = "components\SiteSettingsProvider.tsx"
$c = ReadFile $path

if (-not $c.Contains('getSupabaseBrowserClient')) {
  $needle = 'import { createContext, useContext, type ReactNode } from "react";'
  if (-not $c.Contains($needle)) { throw "SiteSettingsProvider React importu bulunamadi." }
  $c = $c.Replace(
    $needle,
    'import { createContext, useContext, useEffect, useState, type ReactNode } from "react";' + "`r`n" +
    'import { getSupabaseBrowserClient } from "@/lib/supabase";' + "`r`n" +
    'import { normalizeOpeningHours } from "@/lib/opening-hours";'
  )
} elseif (-not $c.Contains('useEffect')) {
  $c = $c.Replace(
    'import { createContext, useContext, type ReactNode } from "react";',
    'import { createContext, useContext, useEffect, useState, type ReactNode } from "react";'
  )
}

$oldProvider = 'export function SiteSettingsProvider({ settings, children }: { settings: ManagedSiteSettings | null; children: ReactNode }) {' + "`r`n" +
               '  return <SiteSettingsContext.Provider value={{ ...fallback, ...settings }}>{children}</SiteSettingsContext.Provider>;' + "`r`n" +
               '}'

if ($c.Contains($oldProvider)) {
  $newProvider = @'
export function SiteSettingsProvider({ settings, children }: { settings: ManagedSiteSettings | null; children: ReactNode }) {
  const [liveSettings, setLiveSettings] = useState<ManagedSiteSettings>({ ...fallback, ...settings });

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

  return <SiteSettingsContext.Provider value={liveSettings}>{children}</SiteSettingsContext.Provider>;
}
'@
  $c = $c.Replace($oldProvider, $newProvider)
} elseif (-not $c.Contains('const [liveSettings')) {
  throw "SiteSettingsProvider mevcut provider blogu beklenen formatta bulunamadi."
}

WriteFile $path $c

Write-Host ""
Write-Host "Canli ayar cache sorunu duzeltildi." -ForegroundColor Green
Write-Host "Iletisim sayfasi artik calisma saatlerini cache beklemeden okuyacak." -ForegroundColor Cyan
