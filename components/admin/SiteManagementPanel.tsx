"use client";

import { FormEvent, useEffect, useState } from "react";
import { ExternalLink, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { defaultOpeningHours, dayLabels, normalizeOpeningHours } from "@/lib/opening-hours";

type NavItem = {
  id: string;
  location: "header" | "footer";
  label: string;
  href: string;
  target_blank: boolean;
  published: boolean;
  sort_order: number;
};

const emptyNav: Omit<NavItem, "id"> = {
  location: "header",
  label: "",
  href: "/",
  target_blank: false,
  published: true,
  sort_order: 100,
};

export default function SiteManagementPanel() {
  const supabase = getSupabaseBrowserClient();
  const [settings, setSettings] = useState<Record<string, unknown>>({});
  const [navigation, setNavigation] = useState<NavItem[]>([]);
  const [draftNav, setDraftNav] = useState(emptyNav);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const openingHours = normalizeOpeningHours(settings.opening_hours ?? defaultOpeningHours);

  async function load() {
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const [{ data: siteSettings, error: settingsError }, { data: navRows, error: navError }] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", true).maybeSingle(),
      supabase.from("site_navigation").select("*").order("sort_order", { ascending: true }),
    ]);

    if (siteSettings) setSettings(siteSettings);
    if (navRows) setNavigation(navRows as NavItem[]);
    const error = settingsError || navError;
    if (error) setMessage(error.message);
    setBusy(false);
  }

  useEffect(() => { void load(); }, []);

  async function saveSettings(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const payload: Record<string, unknown> = {
      ...settings,
      updated_at: new Date().toISOString(),
    };
    delete payload.id;
    const { error } = await supabase.from("site_settings").update(payload).eq("id", true);
    setMessage(error ? `Kaydedilemedi: ${error.message}` : "Site ayarları kaydedildi.");
    setBusy(false);
  }

  async function addNav(event: FormEvent) {
    event.preventDefault();
    if (!supabase || !draftNav.label.trim() || !draftNav.href.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("site_navigation").insert({
      ...draftNav,
      label: draftNav.label.trim(),
      href: draftNav.href.trim(),
      updated_at: new Date().toISOString(),
    });
    if (error) setMessage(`Menü eklenemedi: ${error.message}`);
    else {
      setDraftNav(emptyNav);
      setMessage("Menü öğesi eklendi.");
      await load();
    }
    setBusy(false);
  }

  async function updateNav(id: string, patch: Partial<NavItem>) {
    if (!supabase) return;
    setNavigation((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
    const { error } = await supabase.from("site_navigation").update({
      ...patch,
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    if (error) {
      setMessage(`Menü güncellenemedi: ${error.message}`);
      await load();
    } else {
      setMessage("Menü güncellendi.");
    }
  }

  async function removeNav(id: string) {
    if (!supabase || !confirm("Bu menü öğesi silinsin mi?")) return;
    const { error } = await supabase.from("site_navigation").delete().eq("id", id);
    setMessage(error ? `Silinemedi: ${error.message}` : "Menü öğesi silindi.");
    if (!error) await load();
  }  function updateOpeningHour(day: string, key: string, value: string | boolean) {
    const current = normalizeOpeningHours(settings.opening_hours ?? defaultOpeningHours);
    setSettings((state) => ({
      ...state,
      opening_hours: {
        ...current,
        [day]: { ...current[day], [key]: value },
      },
    }));
  }


  const field = (key: string, label: string, placeholder = "") => (
    <label className="admin-field">
      <span>{label}</span>
      <input
        value={String(settings[key] ?? "")}
        placeholder={placeholder}
        onChange={(e) => setSettings((current) => ({ ...current, [key]: e.target.value }))}
      />
    </label>
  );

  return (
    <div className="admin-site-management">
      <header className="admin-header">
        <div>
          <span>SİTE YÖNETİMİ</span>
          <h1>Sitenin Her Noktasını Yönetin</h1>
          <p>Header, iletişim, WhatsApp, logo, footer ve menü bağlantılarını kod açmadan değiştirin.</p>
        </div>
        <button className="admin-secondary-button" onClick={() => void load()} disabled={busy}>
          <RefreshCw size={17} className={busy ? "admin-spinner" : ""} /> Yenile
        </button>
      </header>

      {message ? <div className="admin-message">{message}</div> : null}

      <form onSubmit={saveSettings} className="admin-settings-grid">
        <section className="admin-settings-card">
          <div className="admin-settings-card-head">
            <div><span>MARKA</span><h2>Logo ve İşletme</h2></div>
          </div>
          <div className="admin-form-grid">
            {field("business_name", "İşletme adı", "TDA Luxury")}
            {field("logo_main", "Logo ana yazı", "TDA")}
            {field("logo_sub", "Logo alt yazı", "LUXURY")}
            {field("email", "E-posta")}
          </div>
        </section>

        <section className="admin-settings-card">
          <div className="admin-settings-card-head">
            <div><span>HEADER</span><h2>Üst Menü Butonu</h2></div>
          </div>
          <div className="admin-form-grid">
            {field("header_cta_text", "Buton yazısı", "RANDEVU AL")}
            {field("header_cta_url", "Buton bağlantısı", "https://wa.me/...")}
            <label className="admin-check">
              <input
                type="checkbox"
                checked={Boolean(settings.header_cta_target_blank)}
                onChange={(e) => setSettings((current) => ({ ...current, header_cta_target_blank: e.target.checked }))}
              />
              <span>Yeni sekmede aç</span>
            </label>
          </div>
        </section>

        <section className="admin-settings-card">
          <div className="admin-settings-card-head">
            <div><span>İLETİŞİM</span><h2>Telefon ve WhatsApp</h2></div>
          </div>
          <div className="admin-form-grid">
            {field("phone_display", "Telefon görünümü", "0536 665 10 64")}
            {field("whatsapp_number", "WhatsApp numarası", "905366651064")}
            {field("instagram_url", "Instagram bağlantısı")}
            {field("maps_url", "Google Maps bağlantısı")}
          </div>
          <label className="admin-field">
            <span>Varsayılan WhatsApp mesajı</span>
            <textarea
              rows={3}
              value={String(settings.whatsapp_message ?? "")}
              onChange={(e) => setSettings((current) => ({ ...current, whatsapp_message: e.target.value }))}
            />
          </label>
          <label className="admin-field">
            <span>Adres</span>
            <textarea
              rows={3}
              value={String(settings.address ?? "")}
              onChange={(e) => setSettings((current) => ({ ...current, address: e.target.value }))}
            />
          </label>
        </section>

        <section className="admin-settings-card">
          <div className="admin-settings-card-head">
            <div><span>FOOTER</span><h2>Alt Alan</h2></div>
          </div>
          <label className="admin-field">
            <span>Footer açıklaması</span>
            <textarea
              rows={4}
              value={String(settings.footer_description ?? "")}
              onChange={(e) => setSettings((current) => ({ ...current, footer_description: e.target.value }))}
            />
          </label>
          {field("footer_copyright", "Telif metni", "TDA Luxury. Tüm hakları saklıdır.")}
        </section>

                <section className="admin-settings-card admin-hours-card">
          <div className="admin-settings-card-head">
            <div>
              <span>ÇALIŞMA SAATLERİ</span>
              <h2>Haftalık Açılış / Kapanış</h2>
              <p>İletişim sayfası ve footer bu saatleri otomatik kullanır.</p>
            </div>
          </div>

          <div className="admin-hours-grid">
            {Object.keys(dayLabels).map((day) => {
              const item = openingHours[day];
              return (
                <div className="admin-hours-row" key={day}>
                  <strong>{dayLabels[day]}</strong>

                  <label className="admin-check compact">
                    <input
                      type="checkbox"
                      checked={!item.closed}
                      onChange={(e) => updateOpeningHour(day, "closed", !e.target.checked)}
                    />
                    <span>Açık</span>
                  </label>

                  <label className="admin-field compact">
                    <span>Açılış</span>
                    <input
                      type="time"
                      value={item.open}
                      disabled={item.closed}
                      onChange={(e) => updateOpeningHour(day, "open", e.target.value)}
                    />
                  </label>

                  <label className="admin-field compact">
                    <span>Kapanış</span>
                    <input
                      type="time"
                      value={item.close}
                      disabled={item.closed}
                      onChange={(e) => updateOpeningHour(day, "close", e.target.value)}
                    />
                  </label>

                  <label className="admin-field compact admin-hours-note">
                    <span>Not</span>
                    <input
                      value={item.note || ""}
                      placeholder={item.closed ? "Kapalı" : "Opsiyonel"}
                      onChange={(e) => updateOpeningHour(day, "note", e.target.value)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </section>
<div className="admin-settings-actions">
          <a href="/" target="_blank" rel="noreferrer" className="admin-secondary-button">
            <ExternalLink size={17} /> Siteyi Aç
          </a>
          <button type="submit" className="admin-primary-button" disabled={busy}>
            <Save size={17} /> {busy ? "Kaydediliyor…" : "Site Ayarlarını Kaydet"}
          </button>
        </div>
      </form>

      <section className="admin-settings-card">
        <div className="admin-settings-card-head">
          <div>
            <span>NAVİGASYON</span>
            <h2>Header Menü Yönetimi</h2>
            <p>Menü adı, hedefi, sırası ve görünürlüğünü değiştirebilirsiniz.</p>
          </div>
        </div>

        <div className="admin-nav-editor-list">
          {navigation.filter((item) => item.location === "header").map((item) => (
            <div className="admin-nav-editor-row" key={item.id}>
              <input value={item.label} onChange={(e) => void updateNav(item.id, { label: e.target.value })} />
              <input value={item.href} onChange={(e) => void updateNav(item.id, { href: e.target.value })} />
              <input
                type="number"
                value={item.sort_order}
                onChange={(e) => void updateNav(item.id, { sort_order: Number(e.target.value) })}
                aria-label="Sıra"
              />
              <label className="admin-check compact">
                <input
                  type="checkbox"
                  checked={item.published}
                  onChange={(e) => void updateNav(item.id, { published: e.target.checked })}
                />
                <span>Aktif</span>
              </label>
              <label className="admin-check compact">
                <input
                  type="checkbox"
                  checked={item.target_blank}
                  onChange={(e) => void updateNav(item.id, { target_blank: e.target.checked })}
                />
                <span>Yeni sekme</span>
              </label>
              <button className="admin-icon-button danger" type="button" onClick={() => void removeNav(item.id)}>
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={addNav} className="admin-nav-add">
          <input placeholder="Menü adı" value={draftNav.label} onChange={(e) => setDraftNav((v) => ({ ...v, label: e.target.value }))} />
          <input placeholder="/sayfa veya https://..." value={draftNav.href} onChange={(e) => setDraftNav((v) => ({ ...v, href: e.target.value }))} />
          <input type="number" value={draftNav.sort_order} onChange={(e) => setDraftNav((v) => ({ ...v, sort_order: Number(e.target.value) }))} />
          <button type="submit" className="admin-primary-button"><Plus size={17} /> Menü Ekle</button>
        </form>
      </section>
    </div>
  );
}

