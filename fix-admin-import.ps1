$ErrorActionPreference = "Stop"

$path = Join-Path (Get-Location) "components\admin\AdminPanel.tsx"

if (!(Test-Path $path)) {
    throw "components\admin\AdminPanel.tsx bulunamadi."
}

$content = Get-Content $path -Raw -Encoding UTF8

# Önce hatalı literal `r`n dizisini gerçek satır sonuna çevir.
$content = $content.Replace(';`r`nimport SiteManagementPanel', ";`r`nimport SiteManagementPanel")

# Import satırının tam ve tek olduğundan emin ol.
$badPatterns = @(
    'import { getSupabaseBrowserClient } from "@/lib/supabase";`r`nimport SiteManagementPanel from "@/components/admin/SiteManagementPanel";',
    'import { getSupabaseBrowserClient } from "@/lib/supabase";`nimport SiteManagementPanel from "@/components/admin/SiteManagementPanel";'
)

foreach ($bad in $badPatterns) {
    if ($content.Contains($bad)) {
        $good = "import { getSupabaseBrowserClient } from `"@/lib/supabase`";`r`nimport SiteManagementPanel from `"@/components/admin/SiteManagementPanel`";"
        $content = $content.Replace($bad, $good)
    }
}

# Güvenlik: yanlışlıkla aynı satırda kalmışsa regex ile ayır.
$content = [regex]::Replace(
    $content,
    'import \{ getSupabaseBrowserClient \} from "@/lib/supabase";\s*`r`n\s*import SiteManagementPanel',
    "import { getSupabaseBrowserClient } from `"@/lib/supabase`";`r`nimport SiteManagementPanel"
)

Set-Content $path $content -Encoding UTF8

Write-Host ""
Write-Host "AdminPanel.tsx import satiri duzeltildi." -ForegroundColor Green
Write-Host "Simdi npm run build calistirin." -ForegroundColor Cyan
