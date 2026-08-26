$ErrorActionPreference = "Stop"

$providerSource = Join-Path (Get-Location) "SiteSettingsProvider.tsx"
$providerTarget = Join-Path (Get-Location) "components\SiteSettingsProvider.tsx"
$contact = Join-Path (Get-Location) "app\iletisim\page.tsx"

if (!(Test-Path $providerSource)) { throw "SiteSettingsProvider.tsx proje kokunde bulunamadi." }
if (!(Test-Path $providerTarget)) { throw "components\SiteSettingsProvider.tsx bulunamadi." }
if (!(Test-Path $contact)) { throw "app\iletisim\page.tsx bulunamadi." }

Copy-Item $providerSource $providerTarget -Force

$c = Get-Content $contact -Raw -Encoding UTF8

if (-not $c.Contains('export const dynamic = "force-dynamic";')) {
    $marker = 'export async function generateMetadata()'
    $idx = $c.IndexOf($marker)
    if ($idx -lt 0) {
        throw "iletisim/page.tsx icinde generateMetadata bulunamadi."
    }
    $c = $c.Substring(0, $idx) +
         'export const dynamic = "force-dynamic";' + "`r`n`r`n" +
         $c.Substring($idx)

    Set-Content $contact $c -Encoding UTF8
}

Write-Host ""
Write-Host "SiteSettingsProvider dogrudan guncellendi." -ForegroundColor Green
Write-Host "Iletisim sayfasi force-dynamic yapildi." -ForegroundColor Green
Write-Host "Simdi npm run build calistirin." -ForegroundColor Cyan
