$ErrorActionPreference = "Stop"

$path = Join-Path (Get-Location) "components\admin\AdminPanel.tsx"
if (!(Test-Path $path)) { throw "components\admin\AdminPanel.tsx bulunamadi." }

$c = Get-Content $path -Raw -Encoding UTF8

# 1) Import
if (-not $c.Contains('import HomePageManagementPanel from "@/components/admin/HomePageManagementPanel";')) {
    $siteImport = 'import SiteManagementPanel from "@/components/admin/SiteManagementPanel";'
    if ($c.Contains($siteImport)) {
        $c = $c.Replace(
            $siteImport,
            $siteImport + "`r`n" + 'import HomePageManagementPanel from "@/components/admin/HomePageManagementPanel";'
        )
    } else {
        $supabaseImport = 'import { getSupabaseBrowserClient } from "@/lib/supabase";'
        if ($c.Contains($supabaseImport)) {
            $c = $c.Replace(
                $supabaseImport,
                $supabaseImport + "`r`n" + 'import HomePageManagementPanel from "@/components/admin/HomePageManagementPanel";'
            )
        } else {
            throw "Import eklemek icin uygun nokta bulunamadi."
        }
    }
}

# 2) View type
if ($c -notmatch '"home_management"') {
    $c = [regex]::Replace(
        $c,
        'type View = ([^;]+);',
        { param($m)
            $v = $m.Groups[1].Value
            if ($v -notmatch '"home_management"') {
                $v = $v -replace '\|\s*Tab\s*$', '| "home_management" | Tab'
            }
            "type View = $v;"
        },
        1
    )
}

# 3) activeTab guard
$activePattern = 'const activeTab: Tab = ([^;]+);'
$c = [regex]::Replace(
    $c,
    $activePattern,
    { param($m)
        $expr = $m.Groups[1].Value
        if ($expr -notmatch 'home_management') {
            if ($expr -match '\?\s*"campaigns"\s*:\s*view') {
                $expr = $expr -replace '\?\s*"campaigns"\s*:\s*view', '|| view === "home_management" ? "campaigns" : view'
            }
        }
        "const activeTab: Tab = $expr;"
    },
    1
)

# Safer explicit fix if previous regex produced odd expression.
$c = $c -replace 'const activeTab: Tab = view === "dashboard" \|\| view === "settings" \|\| view === "site_management" \? "campaigns" : view;',
'const activeTab: Tab = view === "dashboard" || view === "settings" || view === "site_management" || view === "home_management" ? "campaigns" : view;'

# 4) Sidebar button
if (-not $c.Contains('navigate("home_management")')) {
    $siteButtonPattern = '(<button className=\{view === "site_management" \? "active" : ""\} onClick=\{\(\) => navigate\("site_management"\)\}><Globe2 size=\{19\} /><span>Site Yönetimi</span></button>)'
    if ($c -match $siteButtonPattern) {
        $homeButton = '$1' + "`r`n          " + '<button className={view === "home_management" ? "active" : ""} onClick={() => navigate("home_management")}><PanelsTopLeft size={19} /><span>Ana Sayfa</span></button>'
        $c = [regex]::Replace($c, $siteButtonPattern, $homeButton, 1)
    } else {
        throw "Site Yonetimi sidebar butonu bulunamadi."
    }
}

# 5) Render block — insert immediately before settings branch.
if (-not $c.Contains('<HomePageManagementPanel />')) {
    $settingsBranch = ') : view === "settings" ? ('
    $idx = $c.IndexOf($settingsBranch)
    if ($idx -lt 0) {
        throw "Settings render blogu bulunamadi."
    }

    $insert = ') : view === "home_management" ? (' + "`r`n" +
              '          <HomePageManagementPanel />' + "`r`n" +
              '        '

    $c = $c.Substring(0, $idx) + $insert + $c.Substring($idx)
}

Set-Content $path $c -Encoding UTF8

Write-Host ""
Write-Host "Ana Sayfa modulu AdminPanel.tsx dosyasina basariyla baglandi." -ForegroundColor Green
Write-Host "Simdi npm run build calistirin." -ForegroundColor Cyan
