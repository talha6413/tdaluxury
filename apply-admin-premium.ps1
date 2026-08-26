$ErrorActionPreference = "Stop"
$cssFile = Join-Path (Get-Location) "admin-v2-premium.css"
$target = Join-Path (Get-Location) "app\globals.css"

if (!(Test-Path $cssFile)) { throw "admin-v2-premium.css bulunamadi." }
if (!(Test-Path $target)) { throw "app\globals.css bulunamadi." }

$current = Get-Content $target -Raw -Encoding UTF8
$premium = Get-Content $cssFile -Raw -Encoding UTF8

$marker = "/* ===== TDA LUXURY ADMIN V2 PREMIUM UI ===== */"
if ($current.Contains($marker)) {
    Write-Host "Premium admin CSS zaten ekli. Tekrar eklenmedi." -ForegroundColor Yellow
} else {
    Add-Content $target "`r`n`r`n$premium" -Encoding UTF8
    Write-Host "Premium admin tasarimi eklendi." -ForegroundColor Green
}
