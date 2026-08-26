$ErrorActionPreference = "Stop"

function ReadFile($path) {
  if (!(Test-Path $path)) { throw "$path bulunamadi." }
  return Get-Content $path -Raw -Encoding UTF8
}
function WriteFile($path, $content) {
  Set-Content $path $content -Encoding UTF8
}

# -------- SiteManagementPanel.tsx --------
$path = "components\admin\SiteManagementPanel.tsx"
$c = ReadFile $path

if (-not $c.Contains('import { defaultOpeningHours, dayLabels, normalizeOpeningHours } from "@/lib/opening-hours";')) {
  $needle = 'import { getSupabaseBrowserClient } from "@/lib/supabase";'
  if (-not $c.Contains($needle)) { throw "SiteManagementPanel supabase import bulunamadi." }
  $c = $c.Replace($needle, $needle + "`r`n" + 'import { defaultOpeningHours, dayLabels, normalizeOpeningHours } from "@/lib/opening-hours";')
}

if (-not $c.Contains('const openingHours = normalizeOpeningHours(settings.opening_hours ?? defaultOpeningHours);')) {
  $needle = '  const [message, setMessage] = useState("");'
  if (-not $c.Contains($needle)) { throw "SiteManagementPanel state noktasi bulunamadi." }
  $c = $c.Replace($needle, $needle + "`r`n`r`n" + '  const openingHours = normalizeOpeningHours(settings.opening_hours ?? defaultOpeningHours);')
}

if (-not $c.Contains('function updateOpeningHour(')) {
  $needle = '  const field = (key: string, label: string, placeholder = "") => ('
  if (-not $c.Contains($needle)) { throw "SiteManagementPanel field helper bulunamadi." }
  $helper = @'
  function updateOpeningHour(day: string, key: string, value: string | boolean) {
    const current = normalizeOpeningHours(settings.opening_hours ?? defaultOpeningHours);
    setSettings((state) => ({
      ...state,
      opening_hours: {
        ...current,
        [day]: { ...current[day], [key]: value },
      },
    }));
  }

'@
  $c = $c.Replace($needle, $helper + $needle)
}

if (-not $c.Contains('Çalışma Saatleri</h2>')) {
  $needle = '        <section className="admin-settings-card">' + "`r`n" +
            '          <div className="admin-settings-card-head">' + "`r`n" +
            '            <div><span>FOOTER</span><h2>Alt Alan</h2></div>'

  $idx = $c.IndexOf($needle)
  if ($idx -lt 0) { throw "Footer karti bulunamadi." }

  $hoursCard = @'
        <section className="admin-settings-card admin-hours-card">
          <div className="admin-settings-card-head">
            <div>
              <span>ÇALIŞMA SAATLERİ</span>
              <h2>Haftalık Açılış / Kapanış</h2>
              <p>İletişim sayfası ve footer bu saatleri otomatik kullanır.</p>
            </div>
          </div>

          <div className="admin-hours-grid">
            {Object.keys(dayLabels).map((day) => {
              const item = openingHours[day];
              return (
                <div className="admin-hours-row" key={day}>
                  <strong>{dayLabels[day]}</strong>

                  <label className="admin-check compact">
                    <input
                      type="checkbox"
                      checked={!item.closed}
                      onChange={(e) => updateOpeningHour(day, "closed", !e.target.checked)}
                    />
                    <span>Açık</span>
                  </label>

                  <label className="admin-field compact">
                    <span>Açılış</span>
                    <input
                      type="time"
                      value={item.open}
                      disabled={item.closed}
                      onChange={(e) => updateOpeningHour(day, "open", e.target.value)}
                    />
                  </label>

                  <label className="admin-field compact">
                    <span>Kapanış</span>
                    <input
                      type="time"
                      value={item.close}
                      disabled={item.closed}
                      onChange={(e) => updateOpeningHour(day, "close", e.target.value)}
                    />
                  </label>

                  <label className="admin-field compact admin-hours-note">
                    <span>Not</span>
                    <input
                      value={item.note || ""}
                      placeholder={item.closed ? "Kapalı" : "Opsiyonel"}
                      onChange={(e) => updateOpeningHour(day, "note", e.target.value)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </section>

'@

  $c = $c.Substring(0, $idx) + $hoursCard + $c.Substring($idx)
}

WriteFile $path $c

# -------- managed-content.ts --------
$path = "lib\managed-content.ts"
$c = ReadFile $path

if (-not $c.Contains('import { defaultOpeningHours, normalizeOpeningHours, type OpeningHours } from "@/lib/opening-hours";')) {
  $first = 'import { createClient } from "@supabase/supabase-js";'
  if (-not $c.Contains($first)) { throw "managed-content import noktasi bulunamadi." }
  $c = $c.Replace($first, $first + "`r`n" + 'import { defaultOpeningHours, normalizeOpeningHours, type OpeningHours } from "@/lib/opening-hours";')
}

if (-not $c.Contains('openingHours: OpeningHours;')) {
  $needle = '  maintenanceMode: boolean;'
  if (-not $c.Contains($needle)) { throw "ManagedSiteSettings maintenanceMode bulunamadi." }
  $c = $c.Replace($needle, $needle + "`r`n  openingHours: OpeningHours;")
}

if (-not $c.Contains('openingHours: normalizeOpeningHours(data.opening_hours ?? defaultOpeningHours),')) {
  $needle = '    maintenanceMode: Boolean(data.maintenance_mode),'
  if (-not $c.Contains($needle)) { throw "getManagedSiteSettings maintenanceMode bulunamadi." }
  $c = $c.Replace($needle, $needle + "`r`n    openingHours: normalizeOpeningHours(data.opening_hours ?? defaultOpeningHours),")
}
WriteFile $path $c

# -------- SiteSettingsProvider.tsx --------
$path = "components\SiteSettingsProvider.tsx"
$c = ReadFile $path

if (-not $c.Contains('import { defaultOpeningHours } from "@/lib/opening-hours";')) {
  $needle = 'import { site } from "@/lib/site";'
  if (-not $c.Contains($needle)) { throw "SiteSettingsProvider site import bulunamadi." }
  $c = $c.Replace($needle, $needle + "`r`n" + 'import { defaultOpeningHours } from "@/lib/opening-hours";')
}

if (-not $c.Contains('openingHours: defaultOpeningHours,')) {
  $needle = '  maintenanceMode: false,'
  if (-not $c.Contains($needle)) { throw "SiteSettingsProvider maintenanceMode bulunamadi." }
  $c = $c.Replace($needle, $needle + "`r`n  openingHours: defaultOpeningHours,")
}
WriteFile $path $c

# -------- Contact page --------
$path = "app\iletisim\page.tsx"
$c = ReadFile $path

if (-not $c.Contains('getManagedSiteSettings')) {
  $needle = 'import ConsentMap from "@/components/ConsentMap";'
  if (-not $c.Contains($needle)) { throw "Contact ConsentMap import bulunamadi." }
  $imports = $needle + "`r`n" +
             'import { getManagedSiteSettings } from "@/lib/managed-content";' + "`r`n" +
             'import { compactOpeningHours, dayLabels, formatDayHours, normalizeOpeningHours } from "@/lib/opening-hours";'
  $c = $c.Replace($needle, $imports)
}

# Remove static contactCards and hours blocks.
$c = [regex]::Replace($c, 'const contactCards = \[[\s\S]*?\];\r?\n\r?\n', '', 1)
$c = [regex]::Replace($c, 'const hours = \[[\s\S]*?\];\r?\n\r?\n', '', 1)

# Convert Page to async and insert settings-derived vars.
$c = $c.Replace('export default function Page() {', 'export default async function Page() {')
if (-not $c.Contains('const managedSettings = await getManagedSiteSettings();')) {
  $needle = 'export default async function Page() {' 
  $insert = @'
export default async function Page() {
  const managedSettings = await getManagedSiteSettings();
  const phoneDisplay = managedSettings?.phoneDisplay || site.phoneDisplay;
  const whatsappNumber = managedSettings?.whatsappNumber || site.whatsapp;
  const address = managedSettings?.address || site.address;
  const instagramUrl = managedSettings?.instagramUrl || site.instagram;
  const managedMapsUrl = managedSettings?.mapsUrl || mapsUrl;
  const openingHours = normalizeOpeningHours(managedSettings?.openingHours);
  const hours = Object.entries(dayLabels).map(([key, label]) => [label, formatDayHours(openingHours[key])] as const);
  const hoursSummary = compactOpeningHours(openingHours);
  const managedWaUrl = (text?: string) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text || managedSettings?.whatsappMessage || "Merhaba, TDA Luxury hizmetleri hakkında bilgi almak ve randevu oluşturmak istiyorum.")}`;

  const contactCards = [
    {
      icon: Phone,
      label: "Telefon",
      title: phoneDisplay,
      text: "Hızlı bilgi ve randevu için bizi arayın.",
      href: `tel:+${whatsappNumber}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      title: "Hemen Yazışın",
      text: "Hizmet bilgisi ve uygun saat için mesaj gönderin.",
      href: managedWaUrl(),
    },
    {
      icon: MapPin,
      label: "Konum",
      title: address,
      text: "Google Haritalar üzerinden yol tarifini açın.",
      href: managedMapsUrl,
    },
    {
      icon: Clock3,
      label: "Çalışma Saatleri",
      title: hoursSummary,
      text: "Detaylı haftalık çalışma saatlerini görüntüleyin.",
      href: "#calisma-saatleri",
    },
  ];
'@
  $c = $c.Replace($needle, $insert)
}

$c = $c.Replace('href={waUrl()}', 'href={managedWaUrl()}')
$c = $c.Replace('href={mapsUrl}', 'href={managedMapsUrl}')
$c = $c.Replace('href={site.instagram}', 'href={instagramUrl}')
$c = $c.Replace('<strong>@tdaluxuryusak</strong>', '<strong>@tdaluxuryusak</strong>')
$c = $c.Replace('<strong>{site.phoneDisplay}</strong>', '<strong>{phoneDisplay}</strong>')
$c = $c.Replace('href={`tel:+${site.whatsapp}`}', 'href={`tel:+${whatsappNumber}`}')
$c = $c.Replace('<strong>{site.address}</strong>', '<strong>{address}</strong>')

# Replace parameterized waUrl occurrences.
$c = $c.Replace('waUrl("Merhaba, TDA Luxury danışmanlık hizmeti hakkında bilgi almak istiyorum.")', 'managedWaUrl("Merhaba, TDA Luxury danışmanlık hizmeti hakkında bilgi almak istiyorum.")')
$c = $c.Replace('waUrl("Merhaba, TDA Luxury konum bilgisi ve yol tarifi hakkında destek almak istiyorum.")', 'managedWaUrl("Merhaba, TDA Luxury konum bilgisi ve yol tarifi hakkında destek almak istiyorum.")')

WriteFile $path $c

# -------- Footer.tsx --------
$path = "components\Footer.tsx"
$c = ReadFile $path
if (-not $c.Contains('compactOpeningHours')) {
  $needle = 'import { useSiteSettings, useWhatsAppUrl } from "@/components/SiteSettingsProvider";'
  if (-not $c.Contains($needle)) { throw "Footer provider import bulunamadi." }
  $c = $c.Replace($needle, $needle + "`r`n" + 'import { compactOpeningHours } from "@/lib/opening-hours";')
}
if (-not $c.Contains('const openingHoursSummary = compactOpeningHours(settings.openingHours);')) {
  $needle = '  const infoWhatsAppUrl = useWhatsAppUrl("Merhaba, TDA Luxury web siteniz üzerinden hizmetler hakkında bilgi almak istiyorum.");'
  if (-not $c.Contains($needle)) { throw "Footer infoWhatsAppUrl bulunamadi." }
  $c = $c.Replace($needle, $needle + "`r`n  const openingHoursSummary = compactOpeningHours(settings.openingHours);")
}
$c = $c.Replace('<span>Pzt–Cmt: 09.00–19.30</span>', '<span>{openingHoursSummary}</span>')
$c = $c.Replace('<span>Pzt–Cmt 09.00–19.30</span>', '<span>{openingHoursSummary}</span>')
WriteFile $path $c

Write-Host ""
Write-Host "Calisma saatleri yonetimi basariyla baglandi." -ForegroundColor Green
Write-Host "Simdi CSS scriptini ve npm run build komutunu calistirin." -ForegroundColor Cyan
