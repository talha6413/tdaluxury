"use client";

import {
  AlertTriangle,
  Boxes,
  Building2,
  CirclePlus,
  LoaderCircle,
  PackageCheck,
  PackageMinus,
  PackagePlus,
  RefreshCw,
  Search,
  Warehouse,
  X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import PlatformShell from "./PlatformShell";
import styles from "./StockManagement.module.css";

type MovementType = "in" | "out" | "waste" | "return" | "adjustment";

type Supplier = {
  id: string;
  name: string;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
};

type Product = {
  id: string;
  name: string;
  sku: string | null;
  barcode: string | null;
  brand: string | null;
  category: string | null;
  unit: string;
  purchase_price: number | string;
  sale_price: number | string;
  stock_quantity: number | string;
  critical_level: number | string;
  shelf_location: string | null;
  expiry_date: string | null;
  active: boolean;
  supplier_id: string | null;
  suppliers: { name: string } | null;
};

type StockMovement = {
  id: string;
  product_id: string;
  movement_type: MovementType;
  quantity: number | string;
  unit_cost: number | string;
  reference: string | null;
  notes: string | null;
  created_at: string;
  inventory_products: { name: string; unit: string } | null;
};

const movementLabels: Record<MovementType, string> = {
  in: "Stok Girişi",
  out: "Stok Çıkışı",
  waste: "Fire / Zayi",
  return: "İade",
  adjustment: "Sayım Düzeltmesi",
};

const INVENTORY_REFERENCE_TIME = Date.now();

function formatMoney(value: number | string | null | undefined) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export default function StockManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [tab, setTab] = useState<"products" | "movements" | "suppliers">("products");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<"product" | "movement" | "supplier" | null>(null);

  const [productForm, setProductForm] = useState({
    name: "",
    sku: "",
    barcode: "",
    brand: "",
    category: "",
    unit: "adet",
    purchase_price: "",
    sale_price: "",
    stock_quantity: "0",
    critical_level: "3",
    shelf_location: "",
    expiry_date: "",
    supplier_id: "",
  });

  const [movementForm, setMovementForm] = useState({
    product_id: "",
    movement_type: "in" as MovementType,
    quantity: "",
    unit_cost: "",
    reference: "",
    notes: "",
  });

  const [supplierForm, setSupplierForm] = useState({
    name: "",
    contact_name: "",
    phone: "",
    email: "",
  });

  const load = useCallback(async (silent = false) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError("");

    try {
      const supabase = getSupabaseBrowserClient();
      const [productResult, movementResult, supplierResult] = await Promise.all([
        supabase
          .from("inventory_products")
          .select(
            "id, name, sku, barcode, brand, category, unit, purchase_price, sale_price, stock_quantity, critical_level, shelf_location, expiry_date, active, supplier_id, suppliers(name)"
          )
          .eq("active", true)
          .order("name"),
        supabase
          .from("stock_movements")
          .select(
            "id, product_id, movement_type, quantity, unit_cost, reference, notes, created_at, inventory_products(name, unit)"
          )
          .order("created_at", { ascending: false })
          .limit(100),
        supabase
          .from("suppliers")
          .select("id, name, contact_name, phone, email")
          .eq("active", true)
          .order("name"),
      ]);

      const firstError = productResult.error || movementResult.error || supplierResult.error;
      if (firstError) throw firstError;

      setProducts((productResult.data || []) as Product[]);
      setMovements((movementResult.data || []) as StockMovement[]);
      setSuppliers((supplierResult.data || []) as Supplier[]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Stok kayıtları yüklenemedi.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [load]);

  const stats = useMemo(() => {
    const critical = products.filter(
      (item) => Number(item.stock_quantity) <= Number(item.critical_level)
    ).length;
    const value = products.reduce(
      (total, item) => total + Number(item.stock_quantity) * Number(item.purchase_price),
      0
    );
    const expiring = products.filter((item) => {
      if (!item.expiry_date) return false;
      const days = (new Date(item.expiry_date).getTime() - INVENTORY_REFERENCE_TIME) / 86400000;
      return days >= 0 && days <= 30;
    }).length;
    return { critical, value, expiring };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");
    if (!normalized) return products;
    return products.filter((item) =>
      [item.name, item.sku, item.barcode, item.brand, item.category]
        .filter(Boolean)
        .some((value) => String(value).toLocaleLowerCase("tr-TR").includes(normalized))
    );
  }, [products, query]);

  const filteredMovements = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");
    if (!normalized) return movements;
    return movements.filter((item) =>
      [item.inventory_products?.name, item.reference, item.notes]
        .filter(Boolean)
        .some((value) => String(value).toLocaleLowerCase("tr-TR").includes(normalized))
    );
  }, [movements, query]);

  async function createProduct(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: insertError } = await supabase.from("inventory_products").insert({
        name: productForm.name.trim(),
        sku: productForm.sku.trim() || null,
        barcode: productForm.barcode.trim() || null,
        brand: productForm.brand.trim() || null,
        category: productForm.category.trim() || null,
        unit: productForm.unit,
        purchase_price: Number(productForm.purchase_price || 0),
        sale_price: Number(productForm.sale_price || 0),
        stock_quantity: Number(productForm.stock_quantity || 0),
        critical_level: Number(productForm.critical_level || 0),
        shelf_location: productForm.shelf_location.trim() || null,
        expiry_date: productForm.expiry_date || null,
        supplier_id: productForm.supplier_id || null,
      } as never);
      if (insertError) throw insertError;
      setModal(null);
      setProductForm({
        name: "", sku: "", barcode: "", brand: "", category: "", unit: "adet",
        purchase_price: "", sale_price: "", stock_quantity: "0", critical_level: "3",
        shelf_location: "", expiry_date: "", supplier_id: "",
      });
      await load(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Ürün kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  async function createMovement(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const quantity = Number(movementForm.quantity || 0);
      if (!movementForm.product_id || quantity <= 0) throw new Error("Ürün ve miktar zorunludur.");

      const { error: movementError } = await supabase.from("stock_movements").insert({
        product_id: movementForm.product_id,
        movement_type: movementForm.movement_type,
        quantity,
        unit_cost: Number(movementForm.unit_cost || 0),
        reference: movementForm.reference.trim() || null,
        notes: movementForm.notes.trim() || null,
      } as never);
      if (movementError) throw movementError;

      setModal(null);
      setMovementForm({ product_id: "", movement_type: "in", quantity: "", unit_cost: "", reference: "", notes: "" });
      await load(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Stok hareketi kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  async function createSupplier(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: insertError } = await supabase.from("suppliers").insert({
        name: supplierForm.name.trim(),
        contact_name: supplierForm.contact_name.trim() || null,
        phone: supplierForm.phone.trim() || null,
        email: supplierForm.email.trim() || null,
      } as never);
      if (insertError) throw insertError;
      setModal(null);
      setSupplierForm({ name: "", contact_name: "", phone: "", email: "" });
      await load(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Tedarikçi kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <PlatformShell title="Stok ve Depo Yönetimi">
      <main className={styles.page}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>OPERASYON MERKEZİ</p>
            <h1>Stok ve Depo Yönetimi</h1>
            <p>Ürünleri, kritik stokları, tedarikçileri ve tüm depo hareketlerini canlı takip edin.</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.secondaryButton} onClick={() => void load(true)} disabled={refreshing}>
              <RefreshCw size={17} className={refreshing ? styles.spin : ""} /> Yenile
            </button>
            <button className={styles.primaryButton} onClick={() => setModal("product")}>
              <CirclePlus size={17} /> Yeni Ürün
            </button>
          </div>
        </header>

        {error && <div className={styles.error}>{error}</div>}

        <section className={styles.stats}>
          <article><span><Boxes size={19} /></span><div><small>Toplam Ürün</small><strong>{products.length}</strong></div></article>
          <article><span><AlertTriangle size={19} /></span><div><small>Kritik Stok</small><strong>{stats.critical}</strong></div></article>
          <article><span><Warehouse size={19} /></span><div><small>Depo Değeri</small><strong>{formatMoney(stats.value)}</strong></div></article>
          <article><span><PackageCheck size={19} /></span><div><small>30 Gün İçinde SKT</small><strong>{stats.expiring}</strong></div></article>
        </section>

        <section className={styles.toolbar}>
          <div className={styles.tabs}>
            <button className={tab === "products" ? styles.activeTab : ""} onClick={() => setTab("products")}>Ürünler</button>
            <button className={tab === "movements" ? styles.activeTab : ""} onClick={() => setTab("movements")}>Stok Hareketleri</button>
            <button className={tab === "suppliers" ? styles.activeTab : ""} onClick={() => setTab("suppliers")}>Tedarikçiler</button>
          </div>
          <div className={styles.search}><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ürün, barkod, marka veya referans ara" /></div>
          <div className={styles.quickActions}>
            <button onClick={() => setModal("movement")}><PackagePlus size={16} /> Hareket Ekle</button>
            <button onClick={() => setModal("supplier")}><Building2 size={16} /> Tedarikçi Ekle</button>
          </div>
        </section>

        {loading ? (
          <div className={styles.loading}><LoaderCircle className={styles.spin} /> Stok bilgileri yükleniyor...</div>
        ) : tab === "products" ? (
          <section className={styles.card}>
            <div className={styles.tableWrap}><table><thead><tr><th>Ürün</th><th>Kategori</th><th>Tedarikçi</th><th>Stok</th><th>Kritik Seviye</th><th>Alış</th><th>Depo Değeri</th><th>SKT</th></tr></thead><tbody>
              {filteredProducts.map((item) => {
                const critical = Number(item.stock_quantity) <= Number(item.critical_level);
                return <tr key={item.id}><td><strong>{item.name}</strong><small>{item.brand || "Marka yok"} · {item.sku || item.barcode || "Kod yok"}</small></td><td>{item.category || "Genel"}</td><td>{item.suppliers?.name || "—"}</td><td><span className={critical ? styles.dangerBadge : styles.goodBadge}>{Number(item.stock_quantity)} {item.unit}</span></td><td>{Number(item.critical_level)} {item.unit}</td><td>{formatMoney(item.purchase_price)}</td><td>{formatMoney(Number(item.stock_quantity) * Number(item.purchase_price))}</td><td>{formatDate(item.expiry_date)}</td></tr>;
              })}
              {!filteredProducts.length && <tr><td colSpan={8} className={styles.empty}>Ürün bulunamadı.</td></tr>}
            </tbody></table></div>
          </section>
        ) : tab === "movements" ? (
          <section className={styles.card}>
            <div className={styles.tableWrap}><table><thead><tr><th>Tarih</th><th>Ürün</th><th>Hareket</th><th>Miktar</th><th>Birim Maliyet</th><th>Referans</th><th>Not</th></tr></thead><tbody>
              {filteredMovements.map((item) => <tr key={item.id}><td>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "short", timeStyle: "short" }).format(new Date(item.created_at))}</td><td><strong>{item.inventory_products?.name || "Silinmiş ürün"}</strong></td><td><span className={item.movement_type === "in" || item.movement_type === "return" ? styles.goodBadge : styles.dangerBadge}>{movementLabels[item.movement_type]}</span></td><td>{Number(item.quantity)} {item.inventory_products?.unit || ""}</td><td>{formatMoney(item.unit_cost)}</td><td>{item.reference || "—"}</td><td>{item.notes || "—"}</td></tr>)}
              {!filteredMovements.length && <tr><td colSpan={7} className={styles.empty}>Stok hareketi bulunamadı.</td></tr>}
            </tbody></table></div>
          </section>
        ) : (
          <section className={styles.supplierGrid}>
            {suppliers.map((supplier) => <article key={supplier.id} className={styles.supplierCard}><div className={styles.supplierIcon}><Building2 size={20} /></div><div><h3>{supplier.name}</h3><p>{supplier.contact_name || "Yetkili belirtilmemiş"}</p><span>{supplier.phone || "Telefon yok"}</span><span>{supplier.email || "E-posta yok"}</span></div></article>)}
            {!suppliers.length && <div className={styles.emptyCard}>Henüz tedarikçi eklenmedi.</div>}
          </section>
        )}

        {modal && <div className={styles.modalBackdrop} onMouseDown={() => setModal(null)}><div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}><button className={styles.close} onClick={() => setModal(null)}><X size={20} /></button>
          {modal === "product" && <form onSubmit={createProduct}><h2>Yeni Ürün</h2><p>Depoya yeni ürün kartı ekleyin.</p><div className={styles.formGrid}>
            <label>Ürün adı<input required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} /></label>
            <label>Marka<input value={productForm.brand} onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })} /></label>
            <label>Ürün kodu<input value={productForm.sku} onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })} /></label>
            <label>Barkod<input value={productForm.barcode} onChange={(e) => setProductForm({ ...productForm, barcode: e.target.value })} /></label>
            <label>Kategori<input value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} /></label>
            <label>Birim<select value={productForm.unit} onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}><option>adet</option><option>ml</option><option>gram</option><option>paket</option><option>kutu</option></select></label>
            <label>Alış fiyatı<input type="number" min="0" step="0.01" value={productForm.purchase_price} onChange={(e) => setProductForm({ ...productForm, purchase_price: e.target.value })} /></label>
            <label>Satış fiyatı<input type="number" min="0" step="0.01" value={productForm.sale_price} onChange={(e) => setProductForm({ ...productForm, sale_price: e.target.value })} /></label>
            <label>Başlangıç stoku<input type="number" min="0" step="0.01" value={productForm.stock_quantity} onChange={(e) => setProductForm({ ...productForm, stock_quantity: e.target.value })} /></label>
            <label>Kritik seviye<input type="number" min="0" step="0.01" value={productForm.critical_level} onChange={(e) => setProductForm({ ...productForm, critical_level: e.target.value })} /></label>
            <label>Raf konumu<input value={productForm.shelf_location} onChange={(e) => setProductForm({ ...productForm, shelf_location: e.target.value })} /></label>
            <label>Son kullanma tarihi<input type="date" value={productForm.expiry_date} onChange={(e) => setProductForm({ ...productForm, expiry_date: e.target.value })} /></label>
            <label className={styles.full}>Tedarikçi<select value={productForm.supplier_id} onChange={(e) => setProductForm({ ...productForm, supplier_id: e.target.value })}><option value="">Tedarikçi seçilmedi</option>{suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}</select></label>
          </div><button className={styles.submit} disabled={saving}>{saving ? <LoaderCircle className={styles.spin} size={17} /> : <CirclePlus size={17} />} Ürünü Kaydet</button></form>}

          {modal === "movement" && <form onSubmit={createMovement}><h2>Stok Hareketi</h2><p>Giriş, çıkış, fire, iade veya sayım farkı kaydedin.</p><div className={styles.formGrid}>
            <label className={styles.full}>Ürün<select required value={movementForm.product_id} onChange={(e) => setMovementForm({ ...movementForm, product_id: e.target.value })}><option value="">Ürün seçin</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name} ({Number(product.stock_quantity)} {product.unit})</option>)}</select></label>
            <label>Hareket<select value={movementForm.movement_type} onChange={(e) => setMovementForm({ ...movementForm, movement_type: e.target.value as MovementType })}>{Object.entries(movementLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label>Miktar<input required type="number" min="0.01" step="0.01" value={movementForm.quantity} onChange={(e) => setMovementForm({ ...movementForm, quantity: e.target.value })} /></label>
            <label>Birim maliyet<input type="number" min="0" step="0.01" value={movementForm.unit_cost} onChange={(e) => setMovementForm({ ...movementForm, unit_cost: e.target.value })} /></label>
            <label>Fatura / Referans<input value={movementForm.reference} onChange={(e) => setMovementForm({ ...movementForm, reference: e.target.value })} /></label>
            <label className={styles.full}>Not<textarea rows={3} value={movementForm.notes} onChange={(e) => setMovementForm({ ...movementForm, notes: e.target.value })} /></label>
          </div><button className={styles.submit} disabled={saving}>{saving ? <LoaderCircle className={styles.spin} size={17} /> : movementForm.movement_type === "in" ? <PackagePlus size={17} /> : <PackageMinus size={17} />} Hareketi Kaydet</button></form>}

          {modal === "supplier" && <form onSubmit={createSupplier}><h2>Yeni Tedarikçi</h2><p>Ürün aldığınız firma veya kişiyi ekleyin.</p><div className={styles.formGrid}>
            <label className={styles.full}>Firma adı<input required value={supplierForm.name} onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })} /></label>
            <label>Yetkili<input value={supplierForm.contact_name} onChange={(e) => setSupplierForm({ ...supplierForm, contact_name: e.target.value })} /></label>
            <label>Telefon<input value={supplierForm.phone} onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })} /></label>
            <label className={styles.full}>E-posta<input type="email" value={supplierForm.email} onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })} /></label>
          </div><button className={styles.submit} disabled={saving}>{saving ? <LoaderCircle className={styles.spin} size={17} /> : <Building2 size={17} />} Tedarikçiyi Kaydet</button></form>}
        </div></div>}
      </main>
    </PlatformShell>
  );
}
