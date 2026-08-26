$ErrorActionPreference="Stop"
$admin=Join-Path (Get-Location) "components\admin\AdminPanel.tsx"
if(!(Test-Path $admin)){throw "AdminPanel.tsx bulunamadi."}
$c=Get-Content $admin -Raw -Encoding UTF8
if(-not $c.Contains('import HomePageManagementPanel from "@/components/admin/HomePageManagementPanel";')){
 $n='import SiteManagementPanel from "@/components/admin/SiteManagementPanel";'
 if(-not $c.Contains($n)){throw "SiteManagementPanel import bulunamadi."}
 $c=$c.Replace($n,$n+"`r`n"+'import HomePageManagementPanel from "@/components/admin/HomePageManagementPanel";')
}
$c=$c.Replace('type View = "dashboard" | "settings" | "site_management" | Tab;','type View = "dashboard" | "settings" | "site_management" | "home_management" | Tab;')
$c=$c.Replace('view === "dashboard" || view === "settings" || view === "site_management"','view === "dashboard" || view === "settings" || view === "site_management" || view === "home_management"')
if(-not $c.Contains('navigate("home_management")')){
 $n='<button className={view === "site_management" ? "active" : ""} onClick={() => navigate("site_management")}><Globe2 size={19} /><span>Site Yönetimi</span></button>'
 if(-not $c.Contains($n)){throw "Site Yonetimi butonu bulunamadi."}
 $c=$c.Replace($n,$n+"`r`n          "+'<button className={view === "home_management" ? "active" : ""} onClick={() => navigate("home_management")}><PanelsTopLeft size={19} /><span>Ana Sayfa</span></button>')
}
if(-not $c.Contains('<HomePageManagementPanel />')){
 $n=') : view === "site_management" ? ('+"`r`n"+'          <SiteManagementPanel />'+"`r`n"+'        ) : view === "settings" ? ('
 if(-not $c.Contains($n)){throw "Render blogu bulunamadi."}
 $r=') : view === "site_management" ? ('+"`r`n"+'          <SiteManagementPanel />'+"`r`n"+'        ) : view === "home_management" ? ('+"`r`n"+'          <HomePageManagementPanel />'+"`r`n"+'        ) : view === "settings" ? ('
 $c=$c.Replace($n,$r)
}
Set-Content $admin $c -Encoding UTF8
Write-Host "Ana Sayfa modulu eklendi." -ForegroundColor Green
