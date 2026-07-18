"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { BookOpen, ImageIcon, LogOut, Megaphone, Pencil, Plus, Save, Trash2, Upload } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type Tab = "campaigns" | "blog_posts" | "gallery_items";
type Row = Record<string, unknown> & { id: string; title: string; published: boolean };

const tabConfig = {
  campaigns: { label: "Kampanyalar", icon: Megaphone },
  blog_posts: { label: "Blog", icon: BookOpen },
  gallery_items: { label: "Galeri", icon: ImageIcon },
} satisfies Record<Tab, { label: string; icon: typeof Megaphone }>;

const emptyRows: Record<Tab, Record<string, unknown>> = {
  campaigns: { title: "", eyebrow: "DÖNEMSEL AVANTAJ", description: "", image_url: "", href: "/hizmetler", published: false, sort_order: 0 },
  blog_posts: { slug: "", title: "", excerpt: "", category: "Güzellik", read_time: "5 dk", image_url: "", intro: "", sections: [], keywords: [], published: false, published_at: new Date().toISOString().slice(0, 10) },
  gallery_items: { title: "", category: "Salon", alt_text: "", image_url: "", published: false, sort_order: 0 },
};

function slugify(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminPanel() {
  const supabase = getSupabaseBrowserClient();
  const [ready, setReady] = useState(!supabase);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("campaigns");
  const [rows, setRows] = useState<Row[]>([]);
  const [draft, setDraft] = useState<Record<string, unknown>>(emptyRows.campaigns);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const loadRows = useCallback(async (table: Tab) => {
    if (!supabase) return;
    setBusy(true);
    const orderColumn = table === "blog_posts" ? "published_at" : "sort_order";
    const { data, error } = await supabase.from(table).select("*").order(orderColumn, { ascending: false });
    setRows((data as Row[]) ?? []);
    if (error) setMessage(error.message);
    setBusy(false);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(Boolean(data.session));
      setReady(true);
      if (data.session) loadRows("campaigns");
    });
  }, [supabase, loadRows]);

  const switchTab = (next: Tab) => {
    setTab(next);
    setDraft({ ...emptyRows[next] });
    setEditingId(null);
    setMessage("");
    loadRows(next);
  };

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage("Giriş başarısız: " + error.message);
    else { setSignedIn(true); await loadRows(tab); }
    setBusy(false);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const payload: Record<string, unknown> = {
      ...draft,
      updated_at: new Date().toISOString(),
    };
    if (tab === "blog_posts" && !payload.slug) payload.slug = slugify(String(payload.title));
    const query = editingId ? supabase.from(tab).update(payload).eq("id", editingId) : supabase.from(tab).insert(payload);
    const { error } = await query;
    if (error) setMessage("Kaydedilemedi: " + error.message);
    else { setMessage("İçerik kaydedildi."); setDraft({ ...emptyRows[tab] }); setEditingId(null); await loadRows(tab); }
    setBusy(false);
  }

  async function remove(id: string) {
    if (!supabase || !window.confirm("Bu içeriği kalıcı olarak silmek istiyor musunuz?")) return;
    const { error } = await supabase.from(tab).delete().eq("id", id);
    setMessage(error ? "Silinemedi: " + error.message : "İçerik silindi.");
    if (!error) loadRows(tab);
  }

  async function uploadImage(file: File) {
    if (!supabase) return;
    setBusy(true); setMessage("Görsel yükleniyor…");
    const path = `${tab}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${file.name.split(".").pop()?.toLowerCase()}`;
    const { error } = await supabase.storage.from("tda-media").upload(path, file, { upsert: false, cacheControl: "3600" });
    if (error) setMessage("Görsel yüklenemedi: " + error.message);
    else {
      const { data } = supabase.storage.from("tda-media").getPublicUrl(path);
      setDraft((current) => ({ ...current, image_url: data.publicUrl }));
      setMessage("Görsel yüklendi.");
    }
    setBusy(false);
  }

  if (!ready) return <main className="admin-shell"><p>Yükleniyor…</p></main>;
  if (!supabase) return <main className="admin-shell"><section className="admin-setup"><strong>TDA LUXURY</strong><h1>Admin paneli kuruluma hazır</h1><p>Supabase bağlantı bilgileri henüz Vercel ortam değişkenlerine eklenmedi.</p></section></main>;

  if (!signedIn) return (
    <main className="admin-shell">
      <form className="admin-login" onSubmit={signIn}>
        <strong>TDA LUXURY</strong><h1>Yönetim Paneli</h1><p>Yetkili hesabınızla giriş yapın.</p>
        <label>E-posta<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
        <label>Şifre<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>
        {message && <div className="admin-message">{message}</div>}
        <button disabled={busy}>{busy ? "Giriş yapılıyor…" : "Giriş Yap"}</button>
      </form>
    </main>
  );

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div><strong>TDA</strong><span>LUXURY YÖNETİM</span></div>
        <nav>{(Object.keys(tabConfig) as Tab[]).map((key) => { const Icon = tabConfig[key].icon; return <button key={key} className={tab === key ? "active" : ""} onClick={() => switchTab(key)}><Icon size={19} />{tabConfig[key].label}</button>; })}</nav>
        <button className="admin-logout" onClick={async () => { await supabase.auth.signOut(); setSignedIn(false); }}><LogOut size={18} /> Çıkış Yap</button>
      </aside>
      <section className="admin-content">
        <header><div><span>İÇERİK YÖNETİMİ</span><h1>{tabConfig[tab].label}</h1></div><button onClick={() => { setDraft({ ...emptyRows[tab] }); setEditingId(null); }}><Plus size={18} /> Yeni Ekle</button></header>
        {message && <div className="admin-message">{message}</div>}
        <div className="admin-grid">
          <form className="admin-editor" onSubmit={save}>
            <h2>{editingId ? "İçeriği Düzenle" : "Yeni İçerik"}</h2>
            <AdminFields tab={tab} draft={draft} setDraft={setDraft} uploadImage={uploadImage} />
            <button className="admin-save" disabled={busy}><Save size={18} /> {busy ? "İşleniyor…" : "Kaydet"}</button>
          </form>
          <div className="admin-list"><h2>Mevcut İçerikler</h2>{!busy && rows.length === 0 && <p className="admin-empty">Henüz içerik bulunmuyor.</p>}{rows.map((row) => <article key={row.id}><div><span className={row.published ? "published" : "draft"}>{row.published ? "Yayında" : "Taslak"}</span><h3>{row.title}</h3></div><div><button aria-label="Düzenle" onClick={() => { setDraft(row); setEditingId(row.id); }}><Pencil size={17} /></button><button aria-label="Sil" onClick={() => remove(row.id)}><Trash2 size={17} /></button></div></article>)}</div>
        </div>
      </section>
    </main>
  );
}

function AdminFields({ tab, draft, setDraft, uploadImage }: { tab: Tab; draft: Record<string, unknown>; setDraft: React.Dispatch<React.SetStateAction<Record<string, unknown>>>; uploadImage: (file: File) => void }) {
  const field = (name: string, label: string, type = "text") => <label>{label}<input type={type} value={String(draft[name] ?? "")} onChange={(e) => setDraft((d) => ({ ...d, [name]: type === "number" ? Number(e.target.value) : e.target.value }))} required={name === "title"} /></label>;
  return <>
    {field("title", "Başlık")}
    {tab === "campaigns" && <>{field("eyebrow", "Üst Etiket")}<label>Açıklama<textarea value={String(draft.description ?? "")} onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))} /></label>{field("href", "Hizmet Bağlantısı")}{field("sort_order", "Sıralama", "number")}</>}
    {tab === "blog_posts" && <>{field("slug", "URL Adresi (boş bırakılabilir)")}{field("category", "Kategori")}{field("read_time", "Okuma Süresi")}<label>Kısa Açıklama<textarea value={String(draft.excerpt ?? "")} onChange={(e) => setDraft((d) => ({ ...d, excerpt: e.target.value }))} /></label><label>Giriş Metni<textarea value={String(draft.intro ?? "")} onChange={(e) => setDraft((d) => ({ ...d, intro: e.target.value }))} /></label><label>İçerik Bölümleri (JSON)<textarea rows={8} value={JSON.stringify(draft.sections ?? [], null, 2)} onChange={(e) => { try { const sections = JSON.parse(e.target.value); setDraft((d) => ({ ...d, sections })); } catch { /* keep last valid value */ } }} /></label>{field("published_at", "Yayın Tarihi", "date")}</>}
    {tab === "gallery_items" && <>{field("category", "Kategori")}{field("alt_text", "Görsel Açıklaması")}{field("sort_order", "Sıralama", "number")}</>}
    <label>Görsel URL<input value={String(draft.image_url ?? "")} onChange={(e) => setDraft((d) => ({ ...d, image_url: e.target.value }))} /><span className="admin-upload"><Upload size={16} /> Bilgisayardan yükle<input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} /></span></label>
    <label className="admin-switch"><input type="checkbox" checked={Boolean(draft.published)} onChange={(e) => setDraft((d) => ({ ...d, published: e.target.checked }))} /><span /> Yayında göster</label>
  </>;
}
