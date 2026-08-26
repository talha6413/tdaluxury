$ErrorActionPreference = "Stop"

$path = Join-Path (Get-Location) "components\admin\AdminPanel.tsx"

if (!(Test-Path $path)) {
    throw "components\admin\AdminPanel.tsx bulunamadi."
}

$content = Get-Content $path -Raw -Encoding UTF8

function Replace-Required([string]$old, [string]$new, [string]$label) {
    if (-not $script:content.Contains($old)) {
        throw "Beklenen kod bulunamadi: $label"
    }
    $script:content = $script:content.Replace($old, $new)
}

Replace-Required `
'  Settings, Trash2, Upload, X,' `
'  Settings, Trash2, Upload, X, Globe2,' `
"Globe2 import"

Replace-Required `
'import { getSupabaseBrowserClient } from "@/lib/supabase";' `
'import { getSupabaseBrowserClient } from "@/lib/supabase";`r`nimport SiteManagementPanel from "@/components/admin/SiteManagementPanel";' `
"SiteManagementPanel import"

Replace-Required `
'type View = "dashboard" | "settings" | Tab;' `
'type View = "dashboard" | "settings" | "site_management" | Tab;' `
"View type"

Replace-Required `
'  const activeTab: Tab = view === "dashboard" || view === "settings" ? "campaigns" : view;' `
'  const activeTab: Tab = view === "dashboard" || view === "settings" || view === "site_management" ? "campaigns" : view;' `
"activeTab"

Replace-Required `
'          <p>YAPILANDIRMA</p>
          <button className={view === "settings" ? "active" : ""} onClick={() => navigate("settings")}><Settings size={19} /><span>İşletme Ayarları</span></button>' `
'          <p>YAPILANDIRMA</p>
          <button className={view === "site_management" ? "active" : ""} onClick={() => navigate("site_management")}><Globe2 size={19} /><span>Site Yönetimi</span></button>
          <button className={view === "settings" ? "active" : ""} onClick={() => navigate("settings")}><Settings size={19} /><span>İşletme Ayarları</span></button>' `
"Sidebar Site Management"

Replace-Required `
'        {view === "dashboard" ? (
          <Dashboard rows={rowsByTab} total={total} published={published} busy={busy} navigate={navigate} refresh={loadAll} />
        ) : view === "settings" ? (' `
'        {view === "dashboard" ? (
          <Dashboard rows={rowsByTab} total={total} published={published} busy={busy} navigate={navigate} refresh={loadAll} />
        ) : view === "site_management" ? (
          <SiteManagementPanel />
        ) : view === "settings" ? (' `
"Render Site Management"

Set-Content $path $content -Encoding UTF8

Write-Host ""
Write-Host "AdminPanel.tsx basariyla guncellendi." -ForegroundColor Green
Write-Host "Simdi npm run build calistirabilirsiniz." -ForegroundColor Cyan
