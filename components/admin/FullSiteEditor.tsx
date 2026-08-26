"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Check, ChevronRight, Eye, EyeOff, FileText, Globe2, Home,
  ImageIcon, LayoutGrid, Loader2, Menu, Plus, RefreshCw, Save, Search,
  Settings, Sparkles, Trash2, Upload, X
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import styles from "./FullSiteEditor.module.css";

type ServiceRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  short_description: string;
  price_text: string;
  duration: string;
  image_url: string;
  image_position: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
  seo_title: string;
  seo_description: string;
  created_at?: string;
  updated_at?: string;
};

type SectionRow = {
  id: string;
  page_key: string;
  section_key: string;
  eyebrow: string | null;
  title: string | null;
  description: string | null;
  button_text: string | null;
  button_url: string | null;
  secondary_button_text: string | null;
  secondary_button_url: string | null;
  image_url: string | null;
  image_position: string;
  visible: boolean;
  sort_order: number;
  settings: Record<string, unknown>;
};

type PageRow = {
  id: string;
  title: string;
  page_key: string;
  eyebrow: string;
  description: string;
  button_text: string;
  button_url: string;
  image_url: string;
  image_position: string;
  seo_title: string;
  seo_description: string;
  published: boolean;
  sort_order: number;
};

type NavRow = {
  id: string;
  location: "header" | "footer";
  label: string;
  href: string;
  icon?: string | null;
  target_blank: boolean;
  published: boolean;
  sort_order: number;
};

type View = "dashboard" | "services" | "home" | "pages" | "navigation" | "settings";

const blankService: Omit<ServiceRow, "id"> = {
  title: "",
  slug: "",
  category: "Genel",
  description: "",
  short_description: "",
  price_text: "Bilgi alın",
  duration: "Kişiye özel",
  image_url: "",
  image_position: "center center",
  featured: false,
  published: true,
  sort_order: 100,
  seo_title: "",
  seo_description: "",
};

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function FullSiteEditor() {
  const supabase = getSupabaseBrowserClient();

  const [ready, setReady] = useState(!supabase);
  const [signedIn, setSignedIn] = useState(false);
  const [view, setView] = useState<View>("dashboard");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const [services, setServices] = useState<ServiceRow[]>([]);
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [pages, setPages] = useState<PageRow[]>([]);
  const [navigation, setNavigation] = useState<NavRow[]>([]);
  const [settingsRow, setSettingsRow] = useState<Record<string, unknown>>({});

  const [serviceSearch, setServiceSearch] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceRow | null>(null);
  const [serviceDraft, setServiceDraft] = useState<Partial<ServiceRow>>({});
  const [serviceEditorOpen, setServiceEditorOpen] = useState(false);

  const [selectedSection, setSelectedSection] = useState<SectionRow | null>(null);
  const [selectedPage, setSelectedPage] = useState<PageRow | null>(null);
  const [selectedNav, setSelectedNav] = useState<NavRow | null>(null);

  const loadAll = useCallback(async () => {
    if (!supabase) return;
    setBusy(true);
    setMessage("");

    const [servicesRes, sectionsRes, pagesRes, navRes, settingsRes] = await Promise.all([
      supabase.from("services").select("*").order("sort_order", { ascending: true }),
      supabase.from("site_sections").select("*").order("page_key", { ascending: true }).order("sort_order", { ascending: true }),
      supabase.from("page_content").select("*").order("sort_order", { ascending: true }),
      supabase.from("site_navigation").select("*").order("sort_order", { ascending: true }),
      supabase.from("site_settings").select("*").eq("id", true).maybeSingle(),
    ]);

    if (servicesRes.data) setServices(servicesRes.data as ServiceRow[]);
    if (sectionsRes.data) setSections(sectionsRes.data as SectionRow[]);
    if (pagesRes.data) setPages(pagesRes.data as PageRow[]);
    if (navRes.data) setNavigation(navRes.data as NavRow[]);
    if (settingsRes.data) setSettingsRow(settingsRes.data as Record<string, unknown>);

    const error = servicesRes.error || sectionsRes.error || pagesRes.error || navRes.error || settingsRes.error;
    if (error) setMessage(error.message);

    setBusy(false);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      const ok = Boolean(data.session);
      setSignedIn(ok);
      setReady(true);
      if (ok) void loadAll();
    });
  }, [supabase, loadAll]);

  const filteredServices = useMemo(() => {
    const q = serviceSearch.trim().toLocaleLowerCase("tr-TR");
    if (!q) return services;
    return services.filter((item) =>
      `${item.title} ${item.category} ${item.slug}`.toLocaleLowerCase("tr-TR").includes(q)
    );
  }, [services, serviceSearch]);

  const homeSections = useMemo(
    () => sections.filter((section) => section.page_key === "home"),
    [sections]
  );

  function toast(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 3500);
  }

  async function uploadImage(file: File, folder: string) {
    if (!supabase) return "";
    setBusy(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
    const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
    const path = `${folder}/${Date.now()}-${base}.${ext}`;

    const { error } = await supabase.storage
      .from("tda-media")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (error) {
      setBusy(false);
      toast(`Görsel yüklenemedi: ${error.message}`);
      return "";
    }

    const { data } = supabase.storage.from("tda-media").getPublicUrl(path);
    setBusy(false);
    return data.publicUrl;
  }

  function openNewService() {
    setSelectedService(null);
    setServiceDraft({ ...blankService });
    setServiceEditorOpen(true);
  }

  function openService(row: ServiceRow) {
    setSelectedService(row);
    setServiceDraft({ ...row });
    setServiceEditorOpen(true);
  }

  async function saveService(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;

    const title = String(serviceDraft.title ?? "").trim();
    if (!title) {
      toast("Hizmet adı boş bırakılamaz.");
      return;
    }

    const payload: Record<string, unknown> = {
      ...blankService,
      ...serviceDraft,
      title,
      slug: String(serviceDraft.slug || slugify(title)),
      sort_order: Number(serviceDraft.sort_order ?? 100),
      updated_at: new Date().toISOString(),
    };

    delete payload.id;
    delete payload.created_at;

    setBusy(true);
    const query = selectedService
      ? supabase.from("services").update(payload).eq("id", selectedService.id)
      : supabase.from("services").insert(payload);

    const { error } = await query;
    setBusy(false);

    if (error) {
      toast(`Kaydedilemedi: ${error.message}`);
      return;
    }

    setServiceEditorOpen(false);
    toast("Hizmet kaydedildi.");
    await loadAll();
  }

  async function deleteService(row: ServiceRow) {
    if (!supabase || !confirm(`${row.title} silinsin mi?`)) return;
    setBusy(true);
    const { error } = await supabase.from("services").delete().eq("id", row.id);
    setBusy(false);
    if (error) toast(`Silinemedi: ${error.message}`);
    else {
      toast("Hizmet silindi.");
      await loadAll();
    }
  }

  async function saveSection(event: FormEvent) {
    event.preventDefault();
    if (!supabase || !selectedSection) return;

    setBusy(true);
    const payload = {
      eyebrow: selectedSection.eyebrow,
      title: selectedSection.title,
      description: selectedSection.description,
      button_text: selectedSection.button_text,
      button_url: selectedSection.button_url,
      secondary_button_text: selectedSection.secondary_button_text,
      secondary_button_url: selectedSection.secondary_button_url,
      image_url: selectedSection.image_url,
      image_position: selectedSection.image_position || "center center",
      visible: selectedSection.visible,
      sort_order: Number(selectedSection.sort_order),
      settings: selectedSection.settings || {},
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("site_sections").update(payload).eq("id", selectedSection.id);
    setBusy(false);

    if (error) toast(`Kaydedilemedi: ${error.message}`);
    else {
      toast("Ana sayfa bölümü kaydedildi.");
      await loadAll();
    }
  }

  async function savePage(event: FormEvent) {
    event.preventDefault();
    if (!supabase || !selectedPage) return;

    setBusy(true);
    const payload = {
      title: selectedPage.title,
      page_key: selectedPage.page_key,
      eyebrow: selectedPage.eyebrow,
      description: selectedPage.description,
      button_text: selectedPage.button_text,
      button_url: selectedPage.button_url,
      image_url: selectedPage.image_url,
      image_position: selectedPage.image_position || "center center",
      seo_title: selectedPage.seo_title,
      seo_description: selectedPage.seo_description,
      published: selectedPage.published,
      sort_order: Number(selectedPage.sort_order),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("page_content").update(payload).eq("id", selectedPage.id);
    setBusy(false);

    if (error) toast(`Kaydedilemedi: ${error.message}`);
    else {
      toast("Sayfa içeriği kaydedildi.");
      await loadAll();
    }
  }

  async function saveNav(event: FormEvent) {
    event.preventDefault();
    if (!supabase || !selectedNav) return;

    setBusy(true);
    const { error } = await supabase.from("site_navigation").update({
      location: selectedNav.location,
      label: selectedNav.label,
      href: selectedNav.href,
      target_blank: selectedNav.target_blank,
      published: selectedNav.published,
      sort_order: Number(selectedNav.sort_order),
      updated_at: new Date().toISOString(),
    }).eq("id", selectedNav.id);
    setBusy(false);

    if (error) toast(`Kaydedilemedi: ${error.message}`);
    else {
      toast("Menü öğesi kaydedildi.");
      await loadAll();
    }
  }

  async function addNav() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.from("site_navigation").insert({
      location: "header",
      label: "Yeni Menü",
      href: "/",
      target_blank: false,
      published: true,
      sort_order: 100,
      updated_at: new Date().toISOString(),
    });
    setBusy(false);
    if (error) toast(error.message);
    else {
      toast("Yeni menü öğesi eklendi.");
      await loadAll();
    }
  }

  async function deleteNav(row: NavRow) {
    if (!supabase || !confirm(`${row.label} silinsin mi?`)) return;
    setBusy(true);
    const { error } = await supabase.from("site_navigation").delete().eq("id", row.id);
    setBusy(false);
    if (error) toast(error.message);
    else {
      if (selectedNav?.id === row.id) setSelectedNav(null);
      toast("Menü öğesi silindi.");
      await loadAll();
    }
  }

  async function saveSettings(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);

    const payload = { ...settingsRow, updated_at: new Date().toISOString() };
    delete payload.id;

    const { error } = await supabase.from("site_settings").update(payload).eq("id", true);
    setBusy(false);

    if (error) toast(`Kaydedilemedi: ${error.message}`);
    else {
      toast("Site ayarları kaydedildi.");
      await loadAll();
    }
  }

  if (!ready) {
    return (
      <main className={styles.center}>
        <Loader2 className={styles.spin} />
        <p>Editör hazırlanıyor…</p>
      </main>
    );
  }

  if (!supabase) {
    return (
      <main className={styles.center}>
        <h1>Supabase bağlantısı bulunamadı</h1>
        <p>Vercel ortam değişkenlerini kontrol edin.</p>
      </main>
    );
  }

  if (!signedIn) {
    return (
      <main className={styles.center}>
        <Sparkles size={42} />
        <h1>TDA Site Editörü</h1>
        <p>Önce yönetici hesabınızla giriş yapın.</p>
        <Link href="/admin" className={styles.goldButton}>Admin Girişine Git</Link>
      </main>
    );
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <b>TDA</b>
          <span>SITE EDITOR</span>
        </div>

        <nav className={styles.nav}>
          <button className={view === "dashboard" ? styles.active : ""} onClick={() => setView("dashboard")}><LayoutGrid size={18}/> Genel Bakış</button>
          <button className={view === "services" ? styles.active : ""} onClick={() => setView("services")}><Sparkles size={18}/> Hizmetler</button>
          <button className={view === "home" ? styles.active : ""} onClick={() => setView("home")}><Home size={18}/> Ana Sayfa</button>
          <button className={view === "pages" ? styles.active : ""} onClick={() => setView("pages")}><FileText size={18}/> Sayfalar & SEO</button>
          <button className={view === "navigation" ? styles.active : ""} onClick={() => setView("navigation")}><Menu size={18}/> Menü</button>
          <button className={view === "settings" ? styles.active : ""} onClick={() => setView("settings")}><Settings size={18}/> Site Ayarları</button>
        </nav>

        <div className={styles.sidebarBottom}>
          <Link href="/admin"><ArrowLeft size={17}/> Klasik Admin</Link>
          <Link href="/" target="_blank"><Globe2 size={17}/> Canlı Site</Link>
        </div>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <div>
            <span>TDA LUXURY</span>
            <h1>{{
              dashboard: "Site Yönetim Merkezi",
              services: "Hizmetler & Alt Hizmetler",
              home: "Ana Sayfa Düzenleyici",
              pages: "Sayfalar & SEO",
              navigation: "Menü Yönetimi",
              settings: "Site Ayarları",
            }[view]}</h1>
          </div>

          <button className={styles.secondaryButton} onClick={() => void loadAll()} disabled={busy}>
            <RefreshCw size={17} className={busy ? styles.spin : ""}/> Yenile
          </button>
        </header>

        {message ? <div className={styles.message}>{message}</div> : null}

        {view === "dashboard" && (
          <div className={styles.dashboard}>
            <div className={styles.stats}>
              <Stat title="Hizmet" value={services.length} />
              <Stat title="Ana Sayfa Bölümü" value={homeSections.length} />
              <Stat title="Yönetilen Sayfa" value={pages.length} />
              <Stat title="Menü Öğesi" value={navigation.length} />
            </div>

            <div className={styles.quickGrid}>
              <Quick icon={<Sparkles/>} title="Hizmetleri Düzenle" text="İsim, görsel, fiyat, SEO ve öne çıkarma." onClick={() => setView("services")} />
              <Quick icon={<Home/>} title="Ana Sayfayı Düzenle" text="Başlıklar, butonlar, görseller ve sıralama." onClick={() => setView("home")} />
              <Quick icon={<FileText/>} title="Sayfalar & SEO" text="Sayfa başlıkları, açıklamalar ve SEO alanları." onClick={() => setView("pages")} />
              <Quick icon={<Menu/>} title="Menüyü Düzenle" text="Header/footer bağlantıları ve sıralama." onClick={() => setView("navigation")} />
            </div>
          </div>
        )}

        {view === "services" && (
          <div className={styles.twoCol}>
            <section className={styles.listPane}>
              <div className={styles.toolbar}>
                <div className={styles.search}>
                  <Search size={17}/>
                  <input value={serviceSearch} onChange={(e) => setServiceSearch(e.target.value)} placeholder="Hizmet ara…" />
                </div>
                <button className={styles.goldButton} onClick={openNewService}><Plus size={17}/> Yeni Hizmet</button>
              </div>

              <div className={styles.cardList}>
                {filteredServices.map((service) => (
                  <button key={service.id} className={styles.rowCard} onClick={() => openService(service)}>
                    <div className={styles.rowThumb}>
                      {service.image_url ? <img src={service.image_url} alt="" /> : <ImageIcon />}
                    </div>
                    <div className={styles.rowMain}>
                      <b>{service.title}</b>
                      <span>{service.category} · {service.slug}</span>
                    </div>
                    <div className={styles.badges}>
                      {service.featured ? <em>Öne Çıkan</em> : null}
                      <span className={service.published ? styles.live : styles.draft}>{service.published ? "Yayında" : "Taslak"}</span>
                    </div>
                    <ChevronRight size={18}/>
                  </button>
                ))}
              </div>
            </section>

            <aside className={styles.helpPane}>
              <h3>Hizmet yönetimi</h3>
              <p>Bir hizmete tıklayıp görsel, açıklama, fiyat, süre, sıralama ve SEO bilgilerini değiştirebilirsiniz.</p>
              <p><b>Alt hizmet mantığı:</b> kategori alanına ana hizmet adını yazın. Örnek: “Tırnak Hizmetleri”.</p>
            </aside>
          </div>
        )}

        {view === "home" && (
          <div className={styles.editorLayout}>
            <div className={styles.itemList}>
              {homeSections.map((section) => (
                <button
                  key={section.id}
                  className={`${styles.itemButton} ${selectedSection?.id === section.id ? styles.selected : ""}`}
                  onClick={() => setSelectedSection({ ...section })}
                >
                  <span>{section.section_key}</span>
                  <b>{section.title || section.section_key}</b>
                  {section.visible ? <Eye size={16}/> : <EyeOff size={16}/>}
                </button>
              ))}
            </div>

            <div className={styles.editorPane}>
              {selectedSection ? (
                <form onSubmit={saveSection} className={styles.form}>
                  <FormHeader title={selectedSection.title || selectedSection.section_key} />
                  <Field label="Küçük üst başlık" value={selectedSection.eyebrow || ""} onChange={(v) => setSelectedSection({...selectedSection, eyebrow:v})}/>
                  <Field label="Ana başlık" value={selectedSection.title || ""} onChange={(v) => setSelectedSection({...selectedSection, title:v})}/>
                  <TextArea label="Açıklama" value={selectedSection.description || ""} onChange={(v) => setSelectedSection({...selectedSection, description:v})}/>
                  <div className={styles.grid2}>
                    <Field label="Buton metni" value={selectedSection.button_text || ""} onChange={(v) => setSelectedSection({...selectedSection, button_text:v})}/>
                    <Field label="Buton bağlantısı" value={selectedSection.button_url || ""} onChange={(v) => setSelectedSection({...selectedSection, button_url:v})}/>
                    <Field label="İkinci buton" value={selectedSection.secondary_button_text || ""} onChange={(v) => setSelectedSection({...selectedSection, secondary_button_text:v})}/>
                    <Field label="İkinci bağlantı" value={selectedSection.secondary_button_url || ""} onChange={(v) => setSelectedSection({...selectedSection, secondary_button_url:v})}/>
                  </div>

                  <ImageEditor
                    imageUrl={selectedSection.image_url || ""}
                    position={selectedSection.image_position}
                    busy={busy}
                    onUrl={(v) => setSelectedSection({...selectedSection, image_url:v})}
                    onPosition={(v) => setSelectedSection({...selectedSection, image_position:v})}
                    onUpload={async (file) => {
                      const url = await uploadImage(file, "site-sections");
                      if (url) setSelectedSection((current) => current ? {...current, image_url:url} : current);
                    }}
                  />

                  <div className={styles.grid2}>
                    <NumberField label="Sıra" value={selectedSection.sort_order} onChange={(v) => setSelectedSection({...selectedSection, sort_order:v})}/>
                    <Toggle label="Bölüm görünür" checked={selectedSection.visible} onChange={(v) => setSelectedSection({...selectedSection, visible:v})}/>
                  </div>

                  <SaveBar busy={busy}/>
                </form>
              ) : <Empty text="Düzenlemek için soldan bir ana sayfa bölümü seçin."/>}
            </div>
          </div>
        )}

        {view === "pages" && (
          <div className={styles.editorLayout}>
            <div className={styles.itemList}>
              {pages.map((page) => (
                <button
                  key={page.id}
                  className={`${styles.itemButton} ${selectedPage?.id === page.id ? styles.selected : ""}`}
                  onClick={() => setSelectedPage({ ...page })}
                >
                  <span>{page.page_key}</span>
                  <b>{page.title}</b>
                  {page.published ? <Eye size={16}/> : <EyeOff size={16}/>}
                </button>
              ))}
            </div>

            <div className={styles.editorPane}>
              {selectedPage ? (
                <form onSubmit={savePage} className={styles.form}>
                  <FormHeader title={selectedPage.title} />
                  <div className={styles.grid2}>
                    <Field label="Sayfa anahtarı" value={selectedPage.page_key} onChange={(v) => setSelectedPage({...selectedPage, page_key:v})}/>
                    <NumberField label="Sıra" value={selectedPage.sort_order} onChange={(v) => setSelectedPage({...selectedPage, sort_order:v})}/>
                  </div>
                  <Field label="Küçük üst başlık" value={selectedPage.eyebrow} onChange={(v) => setSelectedPage({...selectedPage, eyebrow:v})}/>
                  <Field label="Başlık" value={selectedPage.title} onChange={(v) => setSelectedPage({...selectedPage, title:v})}/>
                  <TextArea label="Açıklama" value={selectedPage.description} onChange={(v) => setSelectedPage({...selectedPage, description:v})}/>
                  <div className={styles.grid2}>
                    <Field label="Buton metni" value={selectedPage.button_text} onChange={(v) => setSelectedPage({...selectedPage, button_text:v})}/>
                    <Field label="Buton bağlantısı" value={selectedPage.button_url} onChange={(v) => setSelectedPage({...selectedPage, button_url:v})}/>
                  </div>

                  <ImageEditor
                    imageUrl={selectedPage.image_url}
                    position={selectedPage.image_position}
                    busy={busy}
                    onUrl={(v) => setSelectedPage({...selectedPage, image_url:v})}
                    onPosition={(v) => setSelectedPage({...selectedPage, image_position:v})}
                    onUpload={async (file) => {
                      const url = await uploadImage(file, "pages");
                      if (url) setSelectedPage((current) => current ? {...current, image_url:url} : current);
                    }}
                  />

                  <section className={styles.seoBox}>
                    <span>SEO</span>
                    <Field label="SEO başlığı" value={selectedPage.seo_title} onChange={(v) => setSelectedPage({...selectedPage, seo_title:v})}/>
                    <TextArea label="SEO açıklaması" value={selectedPage.seo_description} onChange={(v) => setSelectedPage({...selectedPage, seo_description:v})}/>
                  </section>

                  <Toggle label="Sayfa yayınında" checked={selectedPage.published} onChange={(v) => setSelectedPage({...selectedPage, published:v})}/>
                  <SaveBar busy={busy}/>
                </form>
              ) : <Empty text="Düzenlemek için soldan bir sayfa seçin."/>}
            </div>
          </div>
        )}

        {view === "navigation" && (
          <div className={styles.editorLayout}>
            <div className={styles.itemList}>
              <button className={styles.goldButton} onClick={() => void addNav()}><Plus size={16}/> Menü Öğesi Ekle</button>
              {navigation.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.itemButton} ${selectedNav?.id === item.id ? styles.selected : ""}`}
                  onClick={() => setSelectedNav({ ...item })}
                >
                  <span>{item.location}</span>
                  <b>{item.label}</b>
                  {item.published ? <Eye size={16}/> : <EyeOff size={16}/>}
                </button>
              ))}
            </div>

            <div className={styles.editorPane}>
              {selectedNav ? (
                <form onSubmit={saveNav} className={styles.form}>
                  <FormHeader title={selectedNav.label} />
                  <div className={styles.grid2}>
                    <label className={styles.field}>
                      <span>Konum</span>
                      <select value={selectedNav.location} onChange={(e) => setSelectedNav({...selectedNav, location:e.target.value as "header"|"footer"})}>
                        <option value="header">Header</option>
                        <option value="footer">Footer</option>
                      </select>
                    </label>
                    <NumberField label="Sıra" value={selectedNav.sort_order} onChange={(v) => setSelectedNav({...selectedNav, sort_order:v})}/>
                  </div>
                  <Field label="Menü adı" value={selectedNav.label} onChange={(v) => setSelectedNav({...selectedNav, label:v})}/>
                  <Field label="Bağlantı" value={selectedNav.href} onChange={(v) => setSelectedNav({...selectedNav, href:v})}/>
                  <div className={styles.grid2}>
                    <Toggle label="Aktif" checked={selectedNav.published} onChange={(v) => setSelectedNav({...selectedNav, published:v})}/>
                    <Toggle label="Yeni sekmede aç" checked={selectedNav.target_blank} onChange={(v) => setSelectedNav({...selectedNav, target_blank:v})}/>
                  </div>
                  <div className={styles.actions}>
                    <button type="button" className={styles.dangerButton} onClick={() => void deleteNav(selectedNav)}><Trash2 size={16}/> Sil</button>
                    <button type="submit" className={styles.goldButton} disabled={busy}><Save size={16}/> Kaydet</button>
                  </div>
                </form>
              ) : <Empty text="Düzenlemek için soldan bir menü öğesi seçin."/>}
            </div>
          </div>
        )}

        {view === "settings" && (
          <form onSubmit={saveSettings} className={styles.formWide}>
            <section className={styles.settingsCard}>
              <span>MARKA</span>
              <h2>İşletme ve Logo</h2>
              <div className={styles.grid2}>
                {SettingField("business_name", "İşletme adı")}
                {SettingField("email", "E-posta")}
                {SettingField("logo_main", "Logo ana yazı")}
                {SettingField("logo_sub", "Logo alt yazı")}
              </div>
            </section>

            <section className={styles.settingsCard}>
              <span>İLETİŞİM</span>
              <h2>Telefon ve WhatsApp</h2>
              <div className={styles.grid2}>
                {SettingField("phone_display", "Telefon")}
                {SettingField("whatsapp_number", "WhatsApp numarası")}
                {SettingField("instagram_url", "Instagram")}
                {SettingField("maps_url", "Google Maps")}
              </div>
              {SettingTextarea("whatsapp_message", "Varsayılan WhatsApp mesajı")}
              {SettingTextarea("address", "Adres")}
            </section>

            <section className={styles.settingsCard}>
              <span>HEADER / FOOTER</span>
              <h2>Butonlar ve Alt Alan</h2>
              <div className={styles.grid2}>
                {SettingField("header_cta_text", "Header buton metni")}
                {SettingField("header_cta_url", "Header buton bağlantısı")}
                {SettingField("footer_copyright", "Telif metni")}
                {SettingField("facebook_url", "Facebook")}
                {SettingField("tiktok_url", "TikTok")}
                {SettingField("youtube_url", "YouTube")}
              </div>
              {SettingTextarea("footer_description", "Footer açıklaması")}
            </section>

            <SaveBar busy={busy}/>
          </form>
        )}
      </section>

      {serviceEditorOpen ? (
        <div className={styles.modalBackdrop}>
          <form className={styles.modal} onSubmit={saveService}>
            <div className={styles.modalHead}>
              <div>
                <span>HİZMET EDİTÖRÜ</span>
                <h2>{selectedService ? selectedService.title : "Yeni Hizmet"}</h2>
              </div>
              <button type="button" onClick={() => setServiceEditorOpen(false)}><X/></button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.grid2}>
                <Field label="Hizmet adı" value={String(serviceDraft.title ?? "")} onChange={(v) => setServiceDraft({...serviceDraft, title:v})}/>
                <Field label="URL / slug" value={String(serviceDraft.slug ?? "")} onChange={(v) => setServiceDraft({...serviceDraft, slug:v})}/>
                <Field label="Kategori / ana hizmet" value={String(serviceDraft.category ?? "")} onChange={(v) => setServiceDraft({...serviceDraft, category:v})}/>
                <NumberField label="Sıra" value={Number(serviceDraft.sort_order ?? 100)} onChange={(v) => setServiceDraft({...serviceDraft, sort_order:v})}/>
              </div>

              <TextArea label="Kısa açıklama" value={String(serviceDraft.short_description ?? "")} onChange={(v) => setServiceDraft({...serviceDraft, short_description:v})}/>
              <TextArea label="Detaylı açıklama" value={String(serviceDraft.description ?? "")} onChange={(v) => setServiceDraft({...serviceDraft, description:v})}/>

              <div className={styles.grid2}>
                <Field label="Fiyat" value={String(serviceDraft.price_text ?? "")} onChange={(v) => setServiceDraft({...serviceDraft, price_text:v})}/>
                <Field label="Süre" value={String(serviceDraft.duration ?? "")} onChange={(v) => setServiceDraft({...serviceDraft, duration:v})}/>
              </div>

              <ImageEditor
                imageUrl={String(serviceDraft.image_url ?? "")}
                position={String(serviceDraft.image_position ?? "center center")}
                busy={busy}
                onUrl={(v) => setServiceDraft({...serviceDraft, image_url:v})}
                onPosition={(v) => setServiceDraft({...serviceDraft, image_position:v})}
                onUpload={async (file) => {
                  const url = await uploadImage(file, "services");
                  if (url) setServiceDraft((current) => ({...current, image_url:url}));
                }}
              />

              <section className={styles.seoBox}>
                <span>SEO</span>
                <Field label="SEO başlığı" value={String(serviceDraft.seo_title ?? "")} onChange={(v) => setServiceDraft({...serviceDraft, seo_title:v})}/>
                <TextArea label="SEO açıklaması" value={String(serviceDraft.seo_description ?? "")} onChange={(v) => setServiceDraft({...serviceDraft, seo_description:v})}/>
              </section>

              <div className={styles.grid2}>
                <Toggle label="Öne çıkan hizmet" checked={Boolean(serviceDraft.featured)} onChange={(v) => setServiceDraft({...serviceDraft, featured:v})}/>
                <Toggle label="Yayında" checked={Boolean(serviceDraft.published)} onChange={(v) => setServiceDraft({...serviceDraft, published:v})}/>
              </div>
            </div>

            <div className={styles.modalFooter}>
              {selectedService ? (
                <button type="button" className={styles.dangerButton} onClick={() => void deleteService(selectedService)}><Trash2 size={16}/> Hizmeti Sil</button>
              ) : <span />}
              <button type="submit" className={styles.goldButton} disabled={busy}><Save size={16}/> {busy ? "Kaydediliyor…" : "Kaydet"}</button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  );

  function SettingField(key: string, label: string) {
    return (
      <Field
        label={label}
        value={String(settingsRow[key] ?? "")}
        onChange={(v) => setSettingsRow((current) => ({ ...current, [key]: v }))}
      />
    );
  }

  function SettingTextarea(key: string, label: string) {
    return (
      <TextArea
        label={label}
        value={String(settingsRow[key] ?? "")}
        onChange={(v) => setSettingsRow((current) => ({ ...current, [key]: v }))}
      />
    );
  }
}

function Stat({ title, value }: { title: string; value: number }) {
  return <div className={styles.stat}><span>{title}</span><b>{value}</b></div>;
}

function Quick({ icon, title, text, onClick }: { icon: React.ReactNode; title: string; text: string; onClick: () => void }) {
  return <button className={styles.quick} onClick={onClick}><i>{icon}</i><div><b>{title}</b><span>{text}</span></div><ChevronRight/></button>;
}

function FormHeader({ title }: { title: string }) {
  return <div className={styles.formHeader}><span>DÜZENLE</span><h2>{title}</h2></div>;
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <label className={styles.field}><span>{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <label className={styles.field}><span>{label}</span><textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return <label className={styles.field}><span>{label}</span><input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return <label className={styles.toggle}><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} /><span>{label}</span></label>;
}

function ImageEditor({
  imageUrl, position, onUrl, onPosition, onUpload, busy
}: {
  imageUrl: string;
  position: string;
  onUrl: (v: string) => void;
  onPosition: (v: string) => void;
  onUpload: (file: File) => Promise<void>;
  busy: boolean;
}) {
  return (
    <section className={styles.imageBox}>
      <div className={styles.imagePreview}>
        {imageUrl ? <img src={imageUrl} alt="" style={{objectPosition: position || "center center"}} /> : <ImageIcon size={34}/>}
      </div>
      <div className={styles.imageControls}>
        <Field label="Görsel URL" value={imageUrl} onChange={onUrl}/>
        <Field label="Görsel pozisyonu" value={position} onChange={onPosition}/>
        <label className={styles.uploadButton}>
          <Upload size={17}/>
          {busy ? "Yükleniyor…" : "Bilgisayardan Görsel Yükle"}
          <input type="file" accept="image/*" disabled={busy} onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void onUpload(file);
          }}/>
        </label>
      </div>
    </section>
  );
}

function SaveBar({ busy }: { busy: boolean }) {
  return <div className={styles.saveBar}><button type="submit" className={styles.goldButton} disabled={busy}>{busy ? <Loader2 size={16} className={styles.spin}/> : <Save size={16}/>} Değişiklikleri Kaydet</button></div>;
}

function Empty({ text }: { text: string }) {
  return <div className={styles.empty}><Sparkles/><p>{text}</p></div>;
}
