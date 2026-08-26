$ErrorActionPreference="Stop"
$src=Join-Path (Get-Location) "opening-hours.css"
$target=Join-Path (Get-Location) "app\globals.css"
if(!(Test-Path $src)){throw "opening-hours.css bulunamadi."}
if(!(Test-Path $target)){throw "app\globals.css bulunamadi."}
$current=Get-Content $target -Raw -Encoding UTF8
$css=Get-Content $src -Raw -Encoding UTF8
$marker="/* ===== ADMIN OPENING HOURS ===== */"
if(-not $current.Contains($marker)){
  Add-Content $target "`r`n`r`n$css" -Encoding UTF8
  Write-Host "Calisma saatleri CSS eklendi." -ForegroundColor Green
}else{
  Write-Host "CSS zaten mevcut." -ForegroundColor Yellow
}
