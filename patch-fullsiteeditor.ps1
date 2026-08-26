$ErrorActionPreference = "Stop"

$target = Join-Path $PSScriptRoot "components\admin\FullSiteEditor.tsx"

if (-not (Test-Path $target)) {
    Write-Host ""
    Write-Host "HATA: components\admin\FullSiteEditor.tsx bulunamadi." -ForegroundColor Red
    Write-Host "Bu ZIP'i TDA Luxury proje ana klasorune cikartin." -ForegroundColor Yellow
    exit 1
}

$content = Get-Content -LiteralPath $target -Raw -Encoding UTF8

$old = '    const payload = { ...settingsRow, updated_at: new Date().toISOString() };'
$new = @'
    const payload: Record<string, unknown> = {
      ...settingsRow,
      updated_at: new Date().toISOString(),
    };
'@

if ($content.Contains($new.TrimEnd())) {
    Write-Host ""
    Write-Host "Duzeltme zaten uygulanmis." -ForegroundColor Green
    exit 0
}

if (-not $content.Contains($old)) {
    Write-Host ""
    Write-Host "HATA: Beklenen eski kod satiri bulunamadi. Dosyayi otomatik degistirmedim." -ForegroundColor Red
    exit 1
}

$content = $content.Replace($old, $new.TrimEnd())

# UTF-8 without BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($target, $content, $utf8NoBom)

Write-Host ""
Write-Host "FullSiteEditor.tsx TypeScript build hatasi duzeltildi." -ForegroundColor Green
Write-Host "Simdi terminalde: npm run build" -ForegroundColor Cyan
