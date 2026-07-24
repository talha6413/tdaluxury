"use client";

import {
  Camera,
  CirclePlus,
  Images,
  LoaderCircle,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import PlatformShell from "./PlatformShell";
import styles from "./PhotoManagement.module.css";

type Customer = { id: string; full_name: string; phone: string | null };
type Album = {
  id: string;
  customer_id: string;
  title: string;
  service_type: string;
  treatment_date: string;
  notes: string | null;
  created_at: string;
};
type PhotoType = "before" | "after" | "progress" | "other";
type Photo = {
  id: string;
  album_id: string | null;
  customer_id: string;
  photo_type: PhotoType | null;
  category?: string | null;
  storage_path: string;
  caption: string | null;
  taken_at: string;
  signed_url?: string;
};

type UploadItem = { file: File; preview: string };

const PHOTO_LABELS: Record<PhotoType, string> = {
  before: "Öncesi",
  after: "Sonrası",
  progress: "Süreç",
  other: "Diğer",
};
const TODAY = new Date().toISOString().slice(0, 10);
const NOW_LOCAL = new Date().toISOString().slice(0, 16);

function normalizedPhotoType(photo: Photo): PhotoType {
  const candidate = photo.photo_type || photo.category;
  return candidate === "before" || candidate === "after" || candidate === "other"
    ? candidate
    : "progress";
}

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || /heic|heif/i.test(file.type) || file.size < 1_200_000) return file;

  const bitmap = await createImageBitmap(file);
  const maxEdge = 2200;
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) return file;
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.84));
  if (!blob || blob.size >= file.size) return file;
  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
}

function BeforeAfterSlider({ before, after }: { before: Photo; after: Photo }) {
  const [position, setPosition] = useState(50);
  return (
    <div className={styles.slider} style={{ "--position": `${position}%` } as React.CSSProperties}>
      <img src={after.signed_url} alt="İşlem sonrası" className={styles.sliderImage} />
      <div className={styles.beforeLayer}>
        <img src={before.signed_url} alt="İşlem öncesi" className={styles.sliderImage} />
      </div>
      <span className={`${styles.sliderBadge} ${styles.beforeBadge}`}>Öncesi</span>
      <span className={`${styles.sliderBadge} ${styles.afterBadge}`}>Sonrası</span>
      <div className={styles.sliderLine}><span>↔</span></div>
      <input
        className={styles.sliderRange}
        type="range"
        min="0"
        max="100"
        value={position}
        aria-label="Öncesi sonrası karşılaştırma"
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </div>
  );
}

export default function PhotoManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<"album" | "photo" | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [albumForm, setAlbumForm] = useState({ customer_id: "", title: "", service_type: "Lazer Epilasyon", treatment_date: TODAY, notes: "" });
  const [photoForm, setPhotoForm] = useState({ photo_type: "before" as PhotoType, caption: "", taken_at: NOW_LOCAL });

  const clearUploads = useCallback(() => {
    setUploads((current) => {
      current.forEach((item) => URL.revokeObjectURL(item.preview));
      return [];
    });
  }, []);

  useEffect(() => () => uploads.forEach((item) => URL.revokeObjectURL(item.preview)), [uploads]);

  const load = useCallback(async (silent = false) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const [customersResult, albumsResult, photosResult] = await Promise.all([
        supabase.from("customers").select("id,full_name,phone").order("full_name"),
        supabase.from("customer_photo_albums").select("*").order("treatment_date", { ascending: false }).limit(300),
        supabase.from("customer_photos").select("*").order("taken_at", { ascending: true }).limit(1000),
      ]);
      const firstError = customersResult.error || albumsResult.error || photosResult.error;
      if (firstError) throw firstError;
      const rawPhotos = (photosResult.data || []) as Photo[];
      const signed = await Promise.all(rawPhotos.map(async (item) => {
        const result = await supabase.storage.from("customer-photos").createSignedUrl(item.storage_path, 3600);
        return { ...item, signed_url: result.data?.signedUrl };
      }));
      const nextAlbums = (albumsResult.data || []) as Album[];
      setCustomers((customersResult.data || []) as Customer[]);
      setAlbums(nextAlbums);
      setPhotos(signed);
      setSelectedAlbumId((current) => current || nextAlbums[0]?.id || "");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Fotoğraf kayıtları yüklenemedi.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const customerById = useMemo(() => new Map(customers.map((item) => [item.id, item])), [customers]);
  const filteredAlbums = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("tr-TR");
    return albums.filter((album) => {
      if (customerFilter && album.customer_id !== customerFilter) return false;
      if (!needle) return true;
      const customer = customerById.get(album.customer_id);
      return [album.title, album.service_type, customer?.full_name, customer?.phone]
        .filter(Boolean)
        .some((value) => String(value).toLocaleLowerCase("tr-TR").includes(needle));
    });
  }, [albums, customerFilter, query, customerById]);

  const selectedAlbum = albums.find((item) => item.id === selectedAlbumId);
  const selectedPhotos = photos.filter((item) => item.album_id === selectedAlbumId);
  const beforePhoto = selectedPhotos.find((item) => normalizedPhotoType(item) === "before" && item.signed_url);
  const afterPhoto = [...selectedPhotos].reverse().find((item) => normalizedPhotoType(item) === "after" && item.signed_url);
  const customerCount = new Set(albums.map((item) => item.customer_id)).size;

  function addFiles(files: FileList | File[]) {
    const accepted = Array.from(files).filter((file) => file.type.startsWith("image/")).slice(0, 20);
    if (!accepted.length) return;
    setUploads((current) => [
      ...current,
      ...accepted.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    ].slice(0, 20));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) addFiles(event.target.files);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  }

  function removeUpload(index: number) {
    setUploads((current) => current.filter((item, itemIndex) => {
      if (itemIndex === index) URL.revokeObjectURL(item.preview);
      return itemIndex !== index;
    }));
  }

  async function createAlbum(event: FormEvent) {
    event.preventDefault();
    if (!albumForm.customer_id || !albumForm.title.trim()) return;
    setSaving(true);
    setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error: insertError } = await supabase
        .from("customer_photo_albums")
        .insert({
          customer_id: albumForm.customer_id,
          title: albumForm.title.trim(),
          service_type: albumForm.service_type,
          treatment_date: albumForm.treatment_date,
          notes: albumForm.notes.trim() || null,
        } as never)
        .select("id")
        .single();
      if (insertError) throw insertError;
      setModal(null);
      setSelectedAlbumId((data as { id: string }).id);
      setAlbumForm({ customer_id: "", title: "", service_type: "Lazer Epilasyon", treatment_date: TODAY, notes: "" });
      await load(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Albüm oluşturulamadı.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadPhotos(event: FormEvent) {
    event.preventDefault();
    if (!selectedAlbum || !uploads.length) return;
    setSaving(true);
    setError("");
    const supabase = getSupabaseBrowserClient();
    const uploadedPaths: string[] = [];
    try {
      for (const item of uploads) {
        const compressed = await compressImage(item.file);
        const extension = compressed.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${selectedAlbum.customer_id}/${selectedAlbum.id}/${crypto.randomUUID()}.${extension}`;
        const upload = await supabase.storage.from("customer-photos").upload(path, compressed, {
          cacheControl: "3600",
          upsert: false,
          contentType: compressed.type || undefined,
        });
        if (upload.error) throw upload.error;
        uploadedPaths.push(path);
        const insert = await supabase.from("customer_photos").insert({
          album_id: selectedAlbum.id,
          customer_id: selectedAlbum.customer_id,
          photo_type: photoForm.photo_type,
          category: photoForm.photo_type,
          storage_path: path,
          caption: photoForm.caption.trim() || null,
          taken_at: new Date(photoForm.taken_at).toISOString(),
        } as never);
        if (insert.error) throw insert.error;
      }
      clearUploads();
      setModal(null);
      setPhotoForm({ photo_type: "before", caption: "", taken_at: NOW_LOCAL });
      await load(true);
    } catch (caught) {
      if (uploadedPaths.length) await supabase.storage.from("customer-photos").remove(uploadedPaths);
      setError(caught instanceof Error ? caught.message : "Fotoğraflar yüklenemedi.");
    } finally {
      setSaving(false);
    }
  }

  async function deletePhoto(photo: Photo) {
    if (!window.confirm("Bu fotoğraf kalıcı olarak silinsin mi?")) return;
    setSaving(true);
    setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const storageResult = await supabase.storage.from("customer-photos").remove([photo.storage_path]);
      if (storageResult.error) throw storageResult.error;
      const dbResult = await supabase.from("customer_photos").delete().eq("id", photo.id);
      if (dbResult.error) throw dbResult.error;
      await load(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Fotoğraf silinemedi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <PlatformShell title="Fotoğraf Yönetimi">
      <main className={styles.page}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>TDA LUXURY • MÜŞTERİ ARŞİVİ</p>
            <h1>Fotoğraf ve Sonuç Yönetimi</h1>
            <p>Müşteri işlemlerini albümleyin, öncesi ve sonrası sonuçlarını güvenli biçimde saklayın.</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.button} onClick={() => void load(true)} disabled={refreshing}>
              <RefreshCw size={17} className={refreshing ? styles.spin : ""} />Yenile
            </button>
            <button className={styles.primary} onClick={() => setModal("album")}>
              <CirclePlus size={17} />Yeni Albüm
            </button>
          </div>
        </header>

        {error && <div className={styles.error}>{error}</div>}

        <section className={styles.stats}>
          <article><span><Images size={21} /></span><div><small>Toplam Albüm</small><strong>{albums.length}</strong></div></article>
          <article><span><Camera size={21} /></span><div><small>Toplam Fotoğraf</small><strong>{photos.length}</strong></div></article>
          <article><span><UserRound size={21} /></span><div><small>Arşivlenen Müşteri</small><strong>{customerCount}</strong></div></article>
          <article><span><Upload size={21} /></span><div><small>Seçili Albüm</small><strong>{selectedPhotos.length} fotoğraf</strong></div></article>
        </section>

        <section className={styles.toolbar}>
          <div className={styles.search}><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Müşteri, işlem veya albüm ara" /></div>
          <select value={customerFilter} onChange={(e) => setCustomerFilter(e.target.value)}><option value="">Tüm müşteriler</option>{customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.full_name}</option>)}</select>
        </section>

        {loading ? <div className={styles.loading}><LoaderCircle className={styles.spin} /> Yükleniyor...</div> : (
          <section className={styles.layout}>
            <aside className={styles.albums}>{filteredAlbums.length ? filteredAlbums.map((album) => (
              <button key={album.id} onClick={() => setSelectedAlbumId(album.id)} className={`${styles.album} ${selectedAlbumId === album.id ? styles.albumActive : ""}`}>
                <strong>{album.title}</strong><span>{album.service_type}</span><small>{customerById.get(album.customer_id)?.full_name || "Müşteri"} • {new Date(album.treatment_date).toLocaleDateString("tr-TR")}</small>
              </button>
            )) : <div className={styles.empty}>Albüm bulunamadı.</div>}</aside>

            <div className={styles.content}>{selectedAlbum ? <>
              <div className={styles.contentHeader}>
                <div><h2>{selectedAlbum.title}</h2><p>{customerById.get(selectedAlbum.customer_id)?.full_name} • {selectedAlbum.service_type}</p></div>
                <button className={styles.primary} onClick={() => setModal("photo")}><Upload size={17} />Fotoğraf Yükle</button>
              </div>
              {beforePhoto && afterPhoto && <BeforeAfterSlider before={beforePhoto} after={afterPhoto} />}
              <div className={styles.gallery}>{selectedPhotos.length ? selectedPhotos.map((photo) => {
                const photoType = normalizedPhotoType(photo);
                return <article key={photo.id} className={styles.photoCard}>
                  <div className={styles.photo} style={{ backgroundImage: photo.signed_url ? `url(${photo.signed_url})` : undefined }} />
                  <div className={styles.photoMeta}><strong>{PHOTO_LABELS[photoType]}</strong><p>{photo.caption || "Açıklama eklenmemiş"}</p><small>{new Date(photo.taken_at).toLocaleString("tr-TR")}</small><div className={styles.photoActions}><button className={styles.deleteButton} onClick={() => void deletePhoto(photo)} disabled={saving}><Trash2 size={14} />Sil</button></div></div>
                </article>;
              }) : <div className={styles.empty}>Bu albümde henüz fotoğraf yok.</div>}</div>
            </> : <div className={styles.empty}>Görüntülemek için bir albüm seçin.</div>}</div>
          </section>
        )}

        {modal === "album" && <div className={styles.modalBackdrop}><form className={styles.modal} onSubmit={createAlbum}>
          <button type="button" className={styles.close} onClick={() => setModal(null)}><X /></button><h2>Yeni Müşteri Albümü</h2><p>İşlem sürecinin fotoğraflarını tek albümde toplayın.</p>
          <div className={styles.formGrid}>
            <label className={styles.full}>Müşteri<select required value={albumForm.customer_id} onChange={(e) => setAlbumForm({ ...albumForm, customer_id: e.target.value })}><option value="">Müşteri seçin</option>{customers.map((c) => <option key={c.id} value={c.id}>{c.full_name} {c.phone ? `• ${c.phone}` : ""}</option>)}</select></label>
            <label>Albüm adı<input required value={albumForm.title} onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })} placeholder="Örn. 1. Seans Sonuçları" /></label>
            <label>İşlem<select value={albumForm.service_type} onChange={(e) => setAlbumForm({ ...albumForm, service_type: e.target.value })}><option>Lazer Epilasyon</option><option>Cilt Bakımı</option><option>Kalıcı Makyaj</option><option>Kaş Tasarımı</option><option>İpek Kirpik</option><option>Protez Tırnak</option><option>İğneli Epilasyon</option><option>Diğer</option></select></label>
            <label>İşlem tarihi<input type="date" required value={albumForm.treatment_date} onChange={(e) => setAlbumForm({ ...albumForm, treatment_date: e.target.value })} /></label>
            <label className={styles.full}>Not<textarea rows={3} value={albumForm.notes} onChange={(e) => setAlbumForm({ ...albumForm, notes: e.target.value })} /></label>
          </div>
          <button className={`${styles.primary} ${styles.submit}`} disabled={saving}>{saving && <LoaderCircle size={17} className={styles.spin} />}Albümü Oluştur</button>
        </form></div>}

        {modal === "photo" && selectedAlbum && <div className={styles.modalBackdrop}><form className={styles.modal} onSubmit={uploadPhotos}>
          <button type="button" className={styles.close} onClick={() => { clearUploads(); setModal(null); }}><X /></button><h2>Fotoğraf Yükle</h2><p>{selectedAlbum.title} albümüne aynı anda en fazla 20 fotoğraf yükleyin.</p>
          <div className={styles.formGrid}>
            <label>Fotoğraf türü<select value={photoForm.photo_type} onChange={(e) => setPhotoForm({ ...photoForm, photo_type: e.target.value as PhotoType })}><option value="before">Öncesi</option><option value="after">Sonrası</option><option value="progress">Süreç</option><option value="other">Diğer</option></select></label>
            <label>Çekim zamanı<input type="datetime-local" required value={photoForm.taken_at} onChange={(e) => setPhotoForm({ ...photoForm, taken_at: e.target.value })} /></label>
            <div className={styles.full}>
              <input ref={fileInputRef} className={styles.hiddenInput} type="file" multiple accept="image/jpeg,image/png,image/webp,image/heic,image/heif" onChange={handleFileChange} />
              <div className={`${styles.dropzone} ${dragging ? styles.dropzoneActive : ""}`} onDragEnter={(e) => { e.preventDefault(); setDragging(true); }} onDragOver={(e) => e.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} role="button" tabIndex={0}>
                <Upload size={28} /><strong>Fotoğrafları buraya bırakın</strong><span>veya cihazdan seçmek için tıklayın</span><small>JPEG, PNG, WEBP, HEIC • maksimum 20 dosya</small>
              </div>
              {uploads.length > 0 && <div className={styles.previewGrid}>{uploads.map((item, index) => <div className={styles.previewItem} key={`${item.file.name}-${index}`}><img src={item.preview} alt="Yükleme önizlemesi" /><button type="button" onClick={() => removeUpload(index)} aria-label="Fotoğrafı kaldır"><X size={14} /></button><small>{item.file.name}</small></div>)}</div>}
            </div>
            <label className={styles.full}>Açıklama<textarea rows={3} value={photoForm.caption} onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })} placeholder="Bölge, seans veya gözlem notu" /></label>
          </div>
          <button className={`${styles.primary} ${styles.submit}`} disabled={saving || !uploads.length}>{saving && <LoaderCircle size={17} className={styles.spin} />}{saving ? "Yükleniyor..." : `${uploads.length || ""} Fotoğrafı Yükle`}</button>
        </form></div>}
      </main>
    </PlatformShell>
  );
}
