"use client";

/* eslint-disable @next/next/no-img-element -- Admin previews accept dynamic CMS and local blob URLs. */

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  BookOpen, Check, ChevronRight, CircleUserRound, ExternalLink, Eye, FileText,
  BadgeHelp, BriefcaseBusiness, ImageIcon, LayoutDashboard, LogOut, Megaphone,
  Menu, PanelsTopLeft, Pencil, Plus, RefreshCw, Save, Search, Sparkles,
  Settings, Trash2, Upload, X,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type Tab = "services" | "campaigns" | "blog_posts" | "gallery_items" | "results" | "faqs" | "page_content";
type View = "dashboard" | "settings" | Tab;
type Row = Record<string, unknown> & {
  id: string;
  title: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

const tabConfig = {
  services: { label: "Hizmetler & Fiyatlar", singular: "Hizmet", icon: BriefcaseBusiness, description: "Hizmet, fiyat, süre ve SEO bilgilerini yönetin" },
  campaigns: { label: "Kampanyalar", singular: "Kampanya", icon: Megaphone, description: "Dönemsel fırsatları yönetin" },
  blog_posts: { label: "Blog Yazıları", singular: "Blog yazısı", icon: BookOpen, description: "Yazıları hazırlayın ve yayınlayın" },
  gallery_items: { label: "Galeri", singular: "Galeri öğesi", icon: ImageIcon, description: "Salon ve sonuç görsellerini yönetin" },
  results: { label: "Öncesi / Sonrası", singular: "Sonuç", icon: Sparkles, description: "Uygulama sonuçlarını ve açıklamalarını yönetin" },
  faqs: { label: "Sık Sorulan Sorular", singular: "Soru", icon: BadgeHelp, description: "Soru, yanıt ve kategorileri yönetin" },
  page_content: { label: "Sayfalar & SEO", singular: "Sayfa içeriği", icon: PanelsTopLeft, description: "Sayfa başlıkları, butonlar ve SEO alanlarını yönetin" },
} satisfies Record<Tab, { label: string; singular: string; icon: typeof Megaphone; description: string }>;

const emptyRows: Record<Tab, Record<string, unknown>> = {
  services: { title: "", slug: "", category: "Genel", description: "", short_description: "", price_text: "Bilgi alın", duration: "Kişiye özel", image_url: "", image_position: "center center", featured: false, published: false, sort_order: 0, seo_title: "", seo_description: "" },
  campaigns: { title: "", eyebrow: "DÖNEMSEL AVANTAJ", description: "", image_url: "", image_position: "center center", href: "/hizmetler", published: false, sort_order: 0 },
  blog_posts: { slug: "", title: "", excerpt: "", category: "Güzellik", read_time: "5 dk", image_url: "", intro: "", sections: [], keywords: [], published: false, published_at: new Date().toISOString().slice(0, 10) },
  gallery_items: { title: "", category: "Salon", alt_text: "", image_url: "", image_position: "center center", published: false, sort_order: 0 },
  results: { title: "", category: "Sonuç", description: "", before_image_url: "", after_image_url: "", image_position: "center center", disclaimer: "Sonuçlar kişiden kişiye değişebilir.", published: false, sort_order: 0 },
  faqs: { title: "", answer: "", category: "Genel", published: false, sort_order: 0 },
  page_content: { title: "", page_key: "", eyebrow: "", description: "", button_text: "", button_url: "", image_url: "", image_position: "center center", seo_title: "", seo_description: "", published: false, sort_order: 0 },
};

function emptyRowsByTab(): Record<Tab, Row[]> {
  return { services: [], campaigns: [], blog_posts: [], gallery_items: [], results: [], faqs: [], page_content: [] };
}

function slugify(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatDate(value?: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export default function AdminPanel() {
  const supabase = getSupabaseBrowserClient();
  const [ready, setReady] = useState(!supabase);
  const [signedIn, setSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<View>("dashboard");
  const [rowsByTab, setRowsByTab] = useState<Record<Tab, Row[]>>(emptyRowsByTab);
  const [draft, setDraft] = useState<Record<string, unknown>>({ ...emptyRows.campaigns });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null);
  const [settings, setSettings] = useState<Record<string, unknown>>({ business_name: "TDA Luxury", phone_display: "", whatsapp_number: "", whatsapp_message: "", instagram_url: "", address: "", maps_url: "", maintenance_mode: false });

  const loadAll = useCallback(async () => {
    if (!supabase) return;
    setBusy(true);
    const tables = Object.keys(tabConfig) as Tab[];
    const results = await Promise.all(tables.map(async (table) => {
      const orderColumn = table === "blog_posts" ? "published_at" : "sort_order";
      const result = await supabase.from(table).select("*").order(orderColumn, { ascending: false });
      return [table, result] as const;
    }));
    const next = emptyRowsByTab();
    for (const [table, result] of results) {
      next[table] = (result.data as Row[]) ?? [];
      if (result.error) setMessage(result.error.message);
    }
    const { data: siteSettings } = await supabase.from("site_settings").select("*").eq("id", true).maybeSingle();
    if (siteSettings) setSettings(siteSettings);
    setRowsByTab(next);
    setBusy(false);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(Boolean(data.session));
      setUserEmail(data.session?.user.email ?? "");
      setReady(true);
      if (data.session) loadAll();
    });
  }, [supabase, loadAll]);

  const activeTab: Tab = view === "dashboard" || view === "settings" ? "campaigns" : view;
  const activeRows = rowsByTab[activeTab];
  const filteredRows = useMemo(() => activeRows.filter((row) => {
    const matchesSearch = row.title.toLocaleLowerCase("tr-TR").includes(search.toLocaleLowerCase("tr-TR"));
    const matchesStatus = status === "all" || (status === "published" ? row.published : !row.published);
    return matchesSearch && matchesStatus;
  }), [activeRows, search, status]);
  const total = Object.values(rowsByTab).reduce((sum, rows) => sum + rows.length, 0);
  const published = Object.values(rowsByTab).flat().filter((row) => row.published).length;

  function navigate(next: View) {
    setView(next); setSearch(""); setStatus("all"); setMessage(""); setEditorOpen(false); setMenuOpen(false);
  }

  function openEditor(row?: Row) {
    setDraft(row ? { ...row } : { ...emptyRows[activeTab] });
    setEditingId(row?.id ?? null);
    setEditorOpen(true);
    setMessage("");
  }

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage("Giriş başarısız: " + error.message);
    else { setSignedIn(true); setUserEmail(data.user.email ?? email); await loadAll(); }
    setBusy(false);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const payload: Record<string, unknown> = { ...draft, updated_at: new Date().toISOString() };
    if ((activeTab === "blog_posts" || activeTab === "services") && !payload.slug) payload.slug = slugify(String(payload.title));
    if (activeTab === "page_content" && !payload.page_key) payload.page_key = slugify(String(payload.title));
    delete payload.id; delete payload.created_at;
    const query = editingId ? supabase.from(activeTab).update(payload).eq("id", editingId) : supabase.from(activeTab).insert(payload);
    const { error } = await query;
    if (error) setMessage("Kaydedilemedi: " + error.message);
    else { setMessage("Değişiklikler başarıyla kaydedildi."); setEditorOpen(false); await loadAll(); }
    setBusy(false);
  }

  async function togglePublish(row: Row) {
    if (!supabase) return;
    const { error } = await supabase.from(activeTab).update({ published: !row.published, updated_at: new Date().toISOString() }).eq("id", row.id);
    setMessage(error ? "Durum değiştirilemedi: " + error.message : row.published ? "İçerik taslağa alındı." : "İçerik yayınlandı.");
    if (!error) await loadAll();
  }

  async function remove() {
    if (!supabase || !deleteTarget) return;
    setBusy(true);
    const { error } = await supabase.from(activeTab).delete().eq("id", deleteTarget.id);
    setMessage(error ? "Silinemedi: " + error.message : "İçerik silindi.");
    setDeleteTarget(null); setBusy(false);
    if (!error) await loadAll();
  }

  async function uploadImage(file: File) {
    if (!supabase) return;
    setBusy(true); setMessage("Görsel yükleniyor…");
    const extension = file.name.split(".").pop()?.toLowerCase();
    const path = `${activeTab}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${extension}`;
    const { error } = await supabase.storage.from("tda-media").upload(path, file, { upsert: false, cacheControl: "3600" });
    if (error) setMessage("Görsel yüklenemedi: " + error.message);
    else {
      const { data } = supabase.storage.from("tda-media").getPublicUrl(path);
      setDraft((current) => ({ ...current, image_url: data.publicUrl }));
      setMessage("Görsel hazır.");
    }
    setBusy(false);
  }

  async function saveSettings(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const payload: Record<string, unknown> = { ...settings, updated_at: new Date().toISOString() };
    delete payload.id;
    const { error } = await supabase.from("site_settings").update(payload).eq("id", true);
    setMessage(error ? "Ayarlar kaydedilemedi: " + error.message : "İşletme ayarları kaydedildi.");
    setBusy(false);
  }

  if (!ready) return <main className="admin-shell"><RefreshCw className="admin-spinner" /><p>Panel hazırlanıyor…</p></main>;
  if (!supabase) return <main className="admin-shell"><section className="admin-setup"><strong>TDA LUXURY</strong><h1>Admin paneli kuruluma hazır</h1><p>Supabase bağlantı bilgileri henüz Vercel ortam değişkenlerine eklenmedi.</p></section></main>;
  if (!signedIn) return <AdminLogin email={email} password={password} message={message} busy={busy} setEmail={setEmail} setPassword={setPassword} signIn={signIn} />;

  return (
    <main className="admin-page">
      <button className="admin-mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Menüyü aç"><Menu /></button>
      <aside className={`admin-sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="admin-brand"><strong>TDA</strong><span>LUXURY YÖNETİM</span><button onClick={() => setMenuOpen(false)} aria-label="Menüyü kapat"><X /></button></div>
        <nav>
          <button className={view === "dashboard" ? "active" : ""} onClick={() => navigate("dashboard")}><LayoutDashboard size={19} /><span>Genel Bakış</span></button>
          <p>İÇERİK</p>
          {(Object.keys(tabConfig) as Tab[]).map((key) => { const Icon = tabConfig[key].icon; return <button key={key} className={view === key ? "active" : ""} onClick={() => navigate(key)}><Icon size={19} /><span>{tabConfig[key].label}</span><b>{rowsByTab[key].length}</b></button>; })}
          <p>YAPILANDIRMA</p>
          <button className={view === "settings" ? "active" : ""} onClick={() => navigate("settings")}><Settings size={19} /><span>İşletme Ayarları</span></button>
        </nav>
        <div className="admin-account"><CircleUserRound /><span><b>Yönetici</b><small>{userEmail}</small></span></div>
        <button className="admin-logout" onClick={async () => { await supabase.auth.signOut(); setSignedIn(false); }}><LogOut size={18} /> Çıkış Yap</button>
      </aside>

      <section className="admin-content">
        {view === "dashboard" ? (
          <Dashboard rows={rowsByTab} total={total} published={published} busy={busy} navigate={navigate} refresh={loadAll} />
        ) : view === "settings" ? (
          <SettingsPanel settings={settings} setSettings={setSettings} save={saveSettings} busy={busy} message={message} />
        ) : (
          <>
            <header className="admin-header"><div><span>İÇERİK YÖNETİMİ</span><h1>{tabConfig[activeTab].label}</h1><p>{tabConfig[activeTab].description}</p></div><button onClick={() => openEditor()}><Plus size={18} /> Yeni {tabConfig[activeTab].singular}</button></header>
            {message && <div className="admin-message"><Check size={17} />{message}<button onClick={() => setMessage("")}><X size={16} /></button></div>}
            <div className="admin-toolbar"><label><Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="İçeriklerde ara…" /></label><div>{(["all", "published", "draft"] as const).map((item) => <button key={item} className={status === item ? "active" : ""} onClick={() => setStatus(item)}>{item === "all" ? "Tümü" : item === "published" ? "Yayında" : "Taslak"}</button>)}</div></div>
            <div className="admin-table-card">
              <div className="admin-table-head"><span>İçerik</span><span>Durum</span><span>Son güncelleme</span><span>İşlemler</span></div>
              {busy && activeRows.length === 0 ? <div className="admin-empty"><RefreshCw className="admin-spinner" />İçerikler yükleniyor…</div> : filteredRows.length === 0 ? <div className="admin-empty"><FileText /><h3>İçerik bulunamadı</h3><p>Aramanızı değiştirin veya yeni bir içerik ekleyin.</p></div> : filteredRows.map((row) => <article className="admin-table-row" key={row.id}><div className="admin-row-title">{String(row.image_url || "") ? <img src={String(row.image_url)} alt="" /> : <span><FileText /></span>}<div><h3>{row.title}</h3><small>{activeTab === "blog_posts" ? `/${String(row.slug || "")}` : String(row.category || row.eyebrow || tabConfig[activeTab].singular)}</small></div></div><button className={`admin-status ${row.published ? "published" : "draft"}`} onClick={() => togglePublish(row)}><i />{row.published ? "Yayında" : "Taslak"}</button><time>{formatDate(row.updated_at || row.created_at)}</time><div className="admin-row-actions"><button onClick={() => openEditor(row)} aria-label="Düzenle"><Pencil size={17} /></button><button className="danger" onClick={() => setDeleteTarget(row)} aria-label="Sil"><Trash2 size={17} /></button></div></article>)}
            </div>
          </>
        )}
      </section>

      {editorOpen && <div className="admin-drawer-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setEditorOpen(false)}><section className="admin-drawer"><header><div><span>{editingId ? "İÇERİĞİ DÜZENLE" : "YENİ İÇERİK"}</span><h2>{editingId ? String(draft.title) : tabConfig[activeTab].singular}</h2></div><button type="button" onClick={() => setEditorOpen(false)}><X /></button></header><form onSubmit={save}><AdminFields tab={activeTab} draft={draft} setDraft={setDraft} uploadImage={uploadImage} /><footer><button type="button" onClick={() => setEditorOpen(false)}>Vazgeç</button><button className="admin-save" disabled={busy}><Save size={18} />{busy ? "Kaydediliyor…" : "Kaydet"}</button></footer></form></section></div>}
      {deleteTarget && <div className="admin-modal-backdrop"><section className="admin-confirm"><span><Trash2 /></span><h2>İçeriği sil?</h2><p><b>{deleteTarget.title}</b> kalıcı olarak silinecek. Bu işlem geri alınamaz.</p><div><button onClick={() => setDeleteTarget(null)}>Vazgeç</button><button onClick={remove} disabled={busy}>Evet, sil</button></div></section></div>}
      {menuOpen && <button className="admin-sidebar-scrim" onClick={() => setMenuOpen(false)} aria-label="Menüyü kapat" />}
    </main>
  );
}

function SettingsPanel({ settings, setSettings, save, busy, message }: { settings: Record<string, unknown>; setSettings: React.Dispatch<React.SetStateAction<Record<string, unknown>>>; save: (event: FormEvent) => void; busy: boolean; message: string }) {
  const field = (name: string, label: string, placeholder = "") => <label><span>{label}</span><input value={String(settings[name] ?? "")} placeholder={placeholder} onChange={(e) => setSettings((current) => ({ ...current, [name]: e.target.value }))} /></label>;
  return <><header className="admin-header"><div><span>YAPILANDIRMA</span><h1>İşletme Ayarları</h1><p>Sitedeki iletişim ve işletme bilgilerini tek noktadan yönetin.</p></div></header>{message && <div className="admin-message"><Check size={17} />{message}</div>}<form className="admin-settings-form" onSubmit={save}><section><h2>İletişim bilgileri</h2>{field("business_name", "İşletme adı", "TDA Luxury")}{field("phone_display", "Görünen telefon", "0536 665 10 64")}{field("whatsapp_number", "WhatsApp numarası", "905366651064")}{field("instagram_url", "Instagram bağlantısı", "https://instagram.com/...")}</section><section><h2>Konum ve WhatsApp</h2><label><span>Adres</span><textarea rows={4} value={String(settings.address ?? "")} onChange={(e) => setSettings((current) => ({ ...current, address: e.target.value }))} /></label>{field("maps_url", "Google Haritalar bağlantısı", "https://maps.google.com/...")}<label><span>Varsayılan WhatsApp mesajı</span><textarea rows={5} value={String(settings.whatsapp_message ?? "")} onChange={(e) => setSettings((current) => ({ ...current, whatsapp_message: e.target.value }))} /></label><label className="admin-switch"><input type="checkbox" checked={Boolean(settings.maintenance_mode)} onChange={(e) => setSettings((current) => ({ ...current, maintenance_mode: e.target.checked }))} /><span /><div><b>Bakım modu</b><small>Hazırlık tamamlanana kadar kullanılmak üzere kaydedilir.</small></div></label></section><footer><button className="admin-settings-save" disabled={busy}><Save size={18} />{busy ? "Kaydediliyor…" : "Ayarları Kaydet"}</button></footer></form></>;
}

function AdminLogin({ email, password, message, busy, setEmail, setPassword, signIn }: { email: string; password: string; message: string; busy: boolean; setEmail: (value: string) => void; setPassword: (value: string) => void; signIn: (event: FormEvent) => void }) {
  return <main className="admin-shell"><form className="admin-login" onSubmit={signIn}><div className="admin-login-brand"><strong>TDA</strong><span>LUXURY</span></div><h1>Tekrar hoş geldiniz</h1><p>İçeriklerinizi yönetmek için hesabınıza giriş yapın.</p><label>E-posta adresi<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="ornek@tdaluxury.com" /></label><label>Şifre<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder="••••••••" /></label>{message && <div className="admin-message">{message}</div>}<button disabled={busy}>{busy ? "Giriş yapılıyor…" : "Giriş Yap"}<ChevronRight size={19} /></button><small>Güvenli yönetim alanı · TDA Luxury</small></form></main>;
}

function Dashboard({ rows, total, published, busy, navigate, refresh }: { rows: Record<Tab, Row[]>; total: number; published: number; busy: boolean; navigate: (view: View) => void; refresh: () => void }) {
  const recent = (Object.entries(rows) as [Tab, Row[]][]).flatMap(([tab, items]) => items.map((row) => ({ ...row, tab }))).sort((a, b) => new Date(String(b.updated_at || b.created_at || 0)).getTime() - new Date(String(a.updated_at || a.created_at || 0)).getTime()).slice(0, 5);
  return <><header className="admin-header admin-dashboard-header"><div><span>YÖNETİM PANELİ</span><h1>Genel Bakış</h1><p>Sitenizdeki tüm içeriklerin güncel durumu.</p></div><div><a href="/" target="_blank">Siteyi Görüntüle <ExternalLink size={17} /></a><button onClick={refresh} disabled={busy}><RefreshCw size={17} className={busy ? "admin-spinner" : ""} /> Yenile</button></div></header><div className="admin-stat-grid"><article><span><FileText /></span><div><small>Toplam içerik</small><strong>{total}</strong><p>Tüm içerik türleri</p></div></article><article><span><Eye /></span><div><small>Yayındaki içerik</small><strong>{published}</strong><p>Ziyaretçilere açık</p></div></article><article><span><Pencil /></span><div><small>Taslak içerik</small><strong>{total - published}</strong><p>Yayın bekliyor</p></div></article></div><div className="admin-dashboard-grid"><section className="admin-quick"><header><div><h2>İçerik alanları</h2><p>Yönetmek istediğiniz alanı seçin.</p></div></header>{(Object.keys(tabConfig) as Tab[]).map((tab) => { const Icon = tabConfig[tab].icon; const live = rows[tab].filter((row) => row.published).length; return <button key={tab} onClick={() => navigate(tab)}><span><Icon /></span><div><h3>{tabConfig[tab].label}</h3><p>{live} yayında · {rows[tab].length - live} taslak</p></div><ChevronRight /></button>; })}</section><section className="admin-recent"><header><div><h2>Son güncellenenler</h2><p>En yeni içerik hareketleri.</p></div></header>{recent.length === 0 ? <div className="admin-empty"><FileText /><p>Henüz içerik eklenmedi.</p></div> : recent.map((row) => <button key={`${row.tab}-${row.id}`} onClick={() => navigate(row.tab)}><span className={row.published ? "live" : "draft"} /><div><h3>{row.title}</h3><p>{tabConfig[row.tab].label} · {formatDate(row.updated_at || row.created_at)}</p></div><ChevronRight /></button>)}</section></div></>;
}

function AdminFields({ tab, draft, setDraft, uploadImage }: { tab: Tab; draft: Record<string, unknown>; setDraft: React.Dispatch<React.SetStateAction<Record<string, unknown>>>; uploadImage: (file: File) => void }) {
  const field = (name: string, label: string, type = "text", placeholder = "") => <label><span>{label}</span><input type={type} value={String(draft[name] ?? "")} placeholder={placeholder} onChange={(e) => setDraft((d) => ({ ...d, [name]: type === "number" ? Number(e.target.value) : e.target.value }))} required={name === "title"} /></label>;
  const area = (name: string, label: string, rows = 5, placeholder = "") => <label><span>{label}</span><textarea rows={rows} value={String(draft[name] ?? "")} placeholder={placeholder} onChange={(e) => setDraft((d) => ({ ...d, [name]: e.target.value }))} /></label>;
  const imageUpload = (name = "image_url", label = "Görsel URL") => <label><span>{label}</span><input value={String(draft[name] ?? "")} onChange={(e) => setDraft((d) => ({ ...d, [name]: e.target.value }))} placeholder="https://…" />{name === "image_url" && <span className="admin-upload"><Upload size={18} /><b>Bilgisayardan görsel seç</b><small>JPG, PNG veya WEBP</small><input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} /></span>}</label>;
  const imagePosition = <label><span>Görsel odak noktası</span><select value={String(draft.image_position ?? "center center")} onChange={(e) => setDraft((d) => ({ ...d, image_position: e.target.value }))}><option value="center center">Tam orta</option><option value="center top">Üst orta</option><option value="center bottom">Alt orta</option><option value="left center">Sol orta</option><option value="right center">Sağ orta</option><option value="left top">Sol üst</option><option value="right top">Sağ üst</option></select><small className="admin-input-help">Önemli yüz veya uygulama bölgesinin kesilmesini önler.</small></label>;

  return <div className="admin-fields">
    <section><h3>Temel bilgiler</h3>
      {field("title", tab === "faqs" ? "Soru" : "Başlık", "text", tab === "faqs" ? "Soruyu yazın" : "İçerik başlığını yazın")}
      {tab === "services" && <>{field("slug", "Sayfa adresi", "text", "Boş bırakılırsa otomatik oluşur")}{field("category", "Kategori")}{area("short_description", "Kart açıklaması", 3)}{area("description", "Detaylı açıklama", 7)}{field("price_text", "Fiyat / fiyat bilgisi", "text", "Örn. 1.500 TL veya Bilgi alın")}{field("duration", "İşlem süresi", "text", "Örn. 45–60 dk")}{field("sort_order", "Sıralama", "number")}</>}
      {tab === "campaigns" && <>{field("eyebrow", "Üst etiket")}{area("description", "Açıklama", 5, "Kampanyayı kısa ve anlaşılır biçimde anlatın")}{field("href", "Yönlendirme bağlantısı", "text", "/hizmetler")}{field("sort_order", "Sıralama", "number")}</>}
      {tab === "blog_posts" && <>{field("slug", "URL adresi", "text", "Boş bırakılırsa otomatik oluşturulur")}{field("category", "Kategori")}{field("read_time", "Okuma süresi")}{area("excerpt", "Kısa açıklama", 4)}{area("intro", "Giriş metni", 6)}<label><span>İçerik bölümleri (JSON)</span><textarea rows={9} value={JSON.stringify(draft.sections ?? [], null, 2)} onChange={(e) => { try { setDraft((d) => ({ ...d, sections: JSON.parse(e.target.value) })); } catch { /* only apply valid JSON */ } }} /></label>{field("published_at", "Yayın tarihi", "date")}</>}
      {tab === "gallery_items" && <>{field("category", "Kategori")}{field("alt_text", "Görsel açıklaması", "text", "Erişilebilirlik ve SEO için açıklayın")}{field("sort_order", "Sıralama", "number")}</>}
      {tab === "results" && <>{field("category", "Hizmet kategorisi")}{area("description", "Sonuç açıklaması", 4)}{area("disclaimer", "Yasal bilgilendirme", 3)}{field("sort_order", "Sıralama", "number")}</>}
      {tab === "faqs" && <>{field("category", "Kategori")}{area("answer", "Yanıt", 7, "Açık ve anlaşılır yanıtı yazın")}{field("sort_order", "Sıralama", "number")}</>}
      {tab === "page_content" && <>{field("page_key", "Bölüm anahtarı", "text", "Örn. ana-sayfa-hero")}{field("eyebrow", "Üst etiket")}{area("description", "Açıklama", 6)}{field("button_text", "Buton yazısı")}{field("button_url", "Buton bağlantısı")}{field("sort_order", "Sıralama", "number")}</>}
    </section>
    <section><h3>{tab === "faqs" ? "Yayın ayarları" : "Görsel ve yayın"}</h3>
      {String(draft.image_url || "") && <div className="admin-image-preview"><img src={String(draft.image_url)} alt="Önizleme" /></div>}
      {!["faqs", "results"].includes(tab) && imageUpload()}
      {tab === "results" && <>{imageUpload("before_image_url", "Öncesi görsel URL")}{imageUpload("after_image_url", "Sonrası görsel URL")}</>}
      {tab !== "faqs" && imagePosition}
      {tab === "services" && <label className="admin-switch"><input type="checkbox" checked={Boolean(draft.featured)} onChange={(e) => setDraft((d) => ({ ...d, featured: e.target.checked }))} /><span /><div><b>Ana sayfada öne çıkar</b><small>Hizmeti ana sayfa kartlarında gösterir.</small></div></label>}
      <label className="admin-switch"><input type="checkbox" checked={Boolean(draft.published)} onChange={(e) => setDraft((d) => ({ ...d, published: e.target.checked }))} /><span /><div><b>Yayında göster</b><small>Aktif olduğunda ziyaretçiler bu içeriği görür.</small></div></label>
    </section>
    {(tab === "services" || tab === "page_content") && <section><h3>Arama motoru ayarları</h3>{field("seo_title", "SEO başlığı", "text", "Google sonuçlarında görünen başlık")}{area("seo_description", "SEO açıklaması", 4, "Google sonuçlarında görünen kısa açıklama")}<p className="admin-field-note">Başlık için yaklaşık 50–60, açıklama için 140–160 karakter önerilir.</p></section>}
  </div>;
}
