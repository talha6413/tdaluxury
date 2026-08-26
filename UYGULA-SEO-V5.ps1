$ErrorActionPreference = "Stop"

$path = Join-Path $PSScriptRoot "components\ServicePage.tsx"

if (-not (Test-Path $path)) {
    throw "components\ServicePage.tsx bulunamadi. ZIP'i proje ana klasorune cikartin."
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$content = [System.IO.File]::ReadAllText($path, $utf8NoBom)

$oldImport = 'import { richServiceContent } from "@/data/service-content";'
$newImport = $oldImport + [Environment]::NewLine + 'import { primaryServiceContent } from "@/data/primary-service-content";'

if ($content -notmatch 'primary-service-content') {
    if (-not $content.Contains($oldImport)) {
        throw "ServicePage import satiri bulunamadi. Dosya beklenenden farkli."
    }
    $content = $content.Replace($oldImport, $newImport)
}

$oldRich = 'const rich = richServiceContent[service.slug];'
$newRich = 'const rich = richServiceContent[service.slug] ?? primaryServiceContent[service.slug];'

if ($content.Contains($oldRich)) {
    $content = $content.Replace($oldRich, $newRich)
}

$oldH1 = '<h1>{service.title}</h1>'
$newH1 = '<h1>{service.parent ? service.title : `Uşak ${service.title}`}</h1>'

if ($content.Contains($oldH1)) {
    $content = $content.Replace($oldH1, $newH1)
}

[System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
Write-Host "SEO V5 ServicePage yamasi uygulandi." -ForegroundColor Green
