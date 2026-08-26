$ErrorActionPreference = "Stop"

$project = $PSScriptRoot
$target = Join-Path $project "components\admin\FullSiteEditor.tsx"

Write-Host ""
Write-Host "TDA Luxury Admin Build Fix V2" -ForegroundColor Cyan
Write-Host "--------------------------------" -ForegroundColor DarkGray

if (-not (Test-Path -LiteralPath $target)) {
    Write-Host "HATA: $target bulunamadi." -ForegroundColor Red
    Write-Host "ZIP'i dogrudan tdaluxury proje ana klasorune cikartin." -ForegroundColor Yellow
    exit 1
}

$content = [System.IO.File]::ReadAllText($target)

$pattern = 'const\s+payload\s*=\s*\{\s*\.\.\.settingsRow\s*,\s*updated_at\s*:\s*new\s+Date\(\)\.toISOString\(\)\s*\}\s*;'
$replacement = @'
const payload: Record<string, unknown> = {
      ...settingsRow,
      updated_at: new Date().toISOString(),
    };
'@

if ($content -match 'const\s+payload\s*:\s*Record<string,\s*unknown>\s*=\s*\{\s*\.\.\.settingsRow') {
    Write-Host "Duzeltme zaten dosyada mevcut." -ForegroundColor Green
} elseif ([regex]::IsMatch($content, $pattern)) {
    $content = [regex]::Replace($content, $pattern, $replacement, 1)
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($target, $content, $utf8NoBom)
    Write-Host "FullSiteEditor.tsx basariyla duzeltildi." -ForegroundColor Green
} else {
    Write-Host "HATA: Duzeltilecek payload satiri bulunamadi." -ForegroundColor Red
    Write-Host "Dosyaya otomatik olarak dokunulmadi." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Kontrol edilen bolum:" -ForegroundColor Cyan
$check = Get-Content -LiteralPath $target -Encoding UTF8
for ($i = 390; $i -le [Math]::Min(406, $check.Count); $i++) {
    Write-Host ("{0,4}: {1}" -f $i, $check[$i-1])
}

Write-Host ""
Write-Host "npm run build baslatiliyor..." -ForegroundColor Cyan
Write-Host ""

Push-Location $project
try {
    & npm run build
    $exitCode = $LASTEXITCODE
} finally {
    Pop-Location
}

Write-Host ""
if ($exitCode -eq 0) {
    Write-Host "BUILD BASARILI." -ForegroundColor Green
    Write-Host ""
    Write-Host "Simdi terminalde:" -ForegroundColor Cyan
    Write-Host 'git add -A'
    Write-Host 'git commit -m "Admin editor TypeScript build hatasini duzelt"'
    Write-Host 'git push origin main'
} else {
    Write-Host "Build hala hata verdi. Yukaridaki YENI hatanin ekran goruntusunu gonderin." -ForegroundColor Red
}

exit $exitCode
