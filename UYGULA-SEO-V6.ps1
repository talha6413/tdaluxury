$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# 1) V5 H1 karakter düzeltmesi
$servicePath = Join-Path $root "components\ServicePage.tsx"
if (-not (Test-Path $servicePath)) { throw "components/ServicePage.tsx bulunamadi." }
$service = [System.IO.File]::ReadAllText($servicePath, $utf8NoBom)
$service = $service.Replace('UÅŸak', 'Uşak')
[System.IO.File]::WriteAllText($servicePath, $service, $utf8NoBom)

# 2) Supabase blog yazılarını doğru hizmetlere bağla
$managedPath = Join-Path $root "lib\managed-content.ts"
if (-not (Test-Path $managedPath)) { throw "lib/managed-content.ts bulunamadi." }
$managed = [System.IO.File]::ReadAllText($managedPath, $utf8NoBom)

$importAnchor = 'import { getServiceImage } from "@/lib/service-media";'
$relatedImport = 'import { inferBlogRelatedServices } from "@/lib/blog-related-services";'
if (-not $managed.Contains($relatedImport)) {
  if (-not $managed.Contains($importAnchor)) { throw "managed-content import satiri bulunamadi." }
  $managed = $managed.Replace($importAnchor, $importAnchor + [Environment]::NewLine + $relatedImport)
}

$oldRelated = 'relatedServices: [{ label: "Tüm Hizmetler", href: "/hizmetler" }]'
$newRelated = 'relatedServices: inferBlogRelatedServices({ slug: String(row.slug), title: String(row.title), category: String(row.category ?? "Güzellik") })'
if ($managed.Contains($oldRelated)) {
  $managed = $managed.Replace($oldRelated, $newRelated)
}

[System.IO.File]::WriteAllText($managedPath, $managed, $utf8NoBom)
Write-Host "SEO V6 yamasi uygulandi: Uşak karakteri + blog hizmet bağlantıları." -ForegroundColor Green
