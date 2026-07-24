"use client";

import {
  Award,
  Banknote,
  CalendarDays,
  CirclePlus,
  LoaderCircle,
  RefreshCw,
  Search,
  Target,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import PlatformShell from "./PlatformShell";
import styles from "./StaffManagement.module.css";

type StaffMember = {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  role: string;
  monthly_salary: number | string;
  commission_rate: number | string;
  monthly_target: number | string;
  hire_date: string | null;
  active: boolean;
};

type StaffPerformance = {
  id: string;
  staff_id: string;
  period: string;
  service_revenue: number | string;
  product_revenue: number | string;
  completed_services: number;
  bonus_amount: number | string;
  notes: string | null;
};

type Payroll = {
  id: string;
  staff_id: string;
  period: string;
  base_salary: number | string;
  commission_amount: number | string;
  bonus_amount: number | string;
  deduction_amount: number | string;
  net_amount: number | string;
  status: "draft" | "approved" | "paid";
  paid_at: string | null;
};

function money(value: number | string | null | undefined) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function monthLabel(value: string) {
  if (!value) return "—";
  const [year, month] = value.split("-");
  return new Intl.DateTimeFormat("tr-TR", { month: "long", year: "numeric" }).format(
    new Date(Number(year), Number(month) - 1, 1)
  );
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [performance, setPerformance] = useState<StaffPerformance[]>([]);
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [tab, setTab] = useState<"staff" | "performance" | "payroll">("staff");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<"staff" | "performance" | "payroll" | null>(null);

  const [staffForm, setStaffForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    role: "Güzellik Uzmanı",
    monthly_salary: "",
    commission_rate: "0",
    monthly_target: "0",
    hire_date: "",
  });
  const [performanceForm, setPerformanceForm] = useState({
    staff_id: "",
    period: new Date().toISOString().slice(0, 7),
    service_revenue: "",
    product_revenue: "",
    completed_services: "",
    bonus_amount: "0",
    notes: "",
  });
  const [payrollForm, setPayrollForm] = useState({
    staff_id: "",
    period: new Date().toISOString().slice(0, 7),
    deduction_amount: "0",
  });

  const load = useCallback(async (silent = false) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const [staffResult, performanceResult, payrollResult] = await Promise.all([
        supabase.from("staff_members").select("*").eq("active", true).order("full_name"),
        supabase.from("staff_performance").select("*").order("period", { ascending: false }).limit(100),
        supabase.from("staff_payrolls").select("*").order("period", { ascending: false }).limit(100),
      ]);
      const firstError = staffResult.error || performanceResult.error || payrollResult.error;
      if (firstError) throw firstError;
      setStaff((staffResult.data || []) as StaffMember[]);
      setPerformance((performanceResult.data || []) as StaffPerformance[]);
      setPayrolls((payrollResult.data || []) as Payroll[]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Personel kayıtları yüklenemedi.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const staffById = useMemo(() => new Map(staff.map((item) => [item.id, item])), [staff]);

  const stats = useMemo(() => {
    const totalSalary = staff.reduce((sum, item) => sum + Number(item.monthly_salary || 0), 0);
    const totalRevenue = performance.reduce(
      (sum, item) => sum + Number(item.service_revenue || 0) + Number(item.product_revenue || 0),
      0
    );
    const totalCommission = payrolls.reduce((sum, item) => sum + Number(item.commission_amount || 0), 0);
    const top = [...performance].sort((a, b) => {
      const ar = Number(a.service_revenue) + Number(a.product_revenue);
      const br = Number(b.service_revenue) + Number(b.product_revenue);
      return br - ar;
    })[0];
    return { totalSalary, totalRevenue, totalCommission, topName: top ? staffById.get(top.staff_id)?.full_name || "—" : "—" };
  }, [staff, performance, payrolls, staffById]);

  const filteredStaff = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("tr-TR");
    if (!needle) return staff;
    return staff.filter((item) => [item.full_name, item.role, item.phone, item.email].filter(Boolean).some((v) => String(v).toLocaleLowerCase("tr-TR").includes(needle)));
  }, [staff, query]);

  async function createStaff(event: FormEvent) {
    event.preventDefault();
    if (!staffForm.full_name.trim()) return;
    setSaving(true); setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: insertError } = await supabase.from("staff_members").insert({
        full_name: staffForm.full_name.trim(), phone: staffForm.phone.trim() || null,
        email: staffForm.email.trim() || null, role: staffForm.role,
        monthly_salary: Number(staffForm.monthly_salary || 0), commission_rate: Number(staffForm.commission_rate || 0),
        monthly_target: Number(staffForm.monthly_target || 0), hire_date: staffForm.hire_date || null,
      } as never);
      if (insertError) throw insertError;
      setModal(null); setStaffForm({ full_name: "", phone: "", email: "", role: "Güzellik Uzmanı", monthly_salary: "", commission_rate: "0", monthly_target: "0", hire_date: "" });
      await load(true);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Personel kaydedilemedi."); }
    finally { setSaving(false); }
  }

  async function createPerformance(event: FormEvent) {
    event.preventDefault();
    if (!performanceForm.staff_id || !performanceForm.period) return;
    setSaving(true); setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: insertError } = await supabase.from("staff_performance").upsert({
        staff_id: performanceForm.staff_id, period: performanceForm.period,
        service_revenue: Number(performanceForm.service_revenue || 0), product_revenue: Number(performanceForm.product_revenue || 0),
        completed_services: Number(performanceForm.completed_services || 0), bonus_amount: Number(performanceForm.bonus_amount || 0),
        notes: performanceForm.notes.trim() || null,
      } as never, { onConflict: "staff_id,period" });
      if (insertError) throw insertError;
      setModal(null); await load(true);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Performans kaydı kaydedilemedi."); }
    finally { setSaving(false); }
  }

  async function createPayroll(event: FormEvent) {
    event.preventDefault();
    const member = staffById.get(payrollForm.staff_id);
    if (!member) return;
    const perf = performance.find((item) => item.staff_id === member.id && item.period === payrollForm.period);
    const revenue = Number(perf?.service_revenue || 0) + Number(perf?.product_revenue || 0);
    const commission = revenue * (Number(member.commission_rate || 0) / 100);
    const bonus = Number(perf?.bonus_amount || 0);
    const deduction = Number(payrollForm.deduction_amount || 0);
    const net = Number(member.monthly_salary || 0) + commission + bonus - deduction;
    setSaving(true); setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: insertError } = await supabase.from("staff_payrolls").upsert({
        staff_id: member.id, period: payrollForm.period, base_salary: Number(member.monthly_salary || 0),
        commission_amount: commission, bonus_amount: bonus, deduction_amount: deduction, net_amount: net, status: "draft",
      } as never, { onConflict: "staff_id,period" });
      if (insertError) throw insertError;
      setModal(null); await load(true);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Bordro oluşturulamadı."); }
    finally { setSaving(false); }
  }

  async function markPaid(id: string) {
    setSaving(true); setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: updateError } = await supabase.from("staff_payrolls").update({ status: "paid", paid_at: new Date().toISOString() } as never).eq("id", id);
      if (updateError) throw updateError;
      await load(true);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Bordro güncellenemedi."); }
    finally { setSaving(false); }
  }

  return (
    <PlatformShell title="Personel ve Prim Yönetimi">
      <main className={styles.page}>
        <header className={styles.header}>
          <div><p className={styles.eyebrow}>TDA LUXURY · EKİP YÖNETİMİ</p><h1>Personel, performans ve prim</h1><p>Maaşları, hedefleri, işlem cirolarını ve bordroları tek ekrandan yönetin.</p></div>
          <div className={styles.actions}><button className={styles.secondaryButton} onClick={() => void load(true)} disabled={refreshing}>{refreshing ? <LoaderCircle className={styles.spin} size={17}/> : <RefreshCw size={17}/>} Yenile</button><button className={styles.primaryButton} onClick={() => setModal("staff")}><CirclePlus size={17}/> Personel Ekle</button></div>
        </header>
        {error && <div className={styles.error}>{error}</div>}
        <section className={styles.stats}>
          <article><span><UsersRound/></span><div><small>Aktif Personel</small><strong>{staff.length}</strong></div></article>
          <article><span><Banknote/></span><div><small>Aylık Sabit Maaş</small><strong>{money(stats.totalSalary)}</strong></div></article>
          <article><span><WalletCards/></span><div><small>Kaydedilen Ciro</small><strong>{money(stats.totalRevenue)}</strong></div></article>
          <article><span><Award/></span><div><small>En Yüksek Performans</small><strong>{stats.topName}</strong></div></article>
        </section>
        <section className={styles.toolbar}>
          <div className={styles.tabs}><button className={tab === "staff" ? styles.activeTab : ""} onClick={() => setTab("staff")}>Personeller</button><button className={tab === "performance" ? styles.activeTab : ""} onClick={() => setTab("performance")}>Performans</button><button className={tab === "payroll" ? styles.activeTab : ""} onClick={() => setTab("payroll")}>Bordrolar</button></div>
          <div className={styles.quickActions}>{tab === "performance" && <button onClick={() => setModal("performance")}><Target size={16}/> Performans Gir</button>}{tab === "payroll" && <button onClick={() => setModal("payroll")}><CalendarDays size={16}/> Bordro Oluştur</button>}</div>
          <label className={styles.search}><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Personel ara..."/></label>
        </section>
        <section className={styles.card}>
          {loading ? <div className={styles.loading}><LoaderCircle className={styles.spin}/> Yükleniyor...</div> : tab === "staff" ? (
            <div className={styles.tableWrap}><table><thead><tr><th>Personel</th><th>Görev</th><th>Maaş</th><th>Prim</th><th>Hedef</th><th>İletişim</th></tr></thead><tbody>{filteredStaff.map((item) => <tr key={item.id}><td><strong>{item.full_name}</strong><small>{item.hire_date || "Başlangıç tarihi yok"}</small></td><td>{item.role}</td><td>{money(item.monthly_salary)}</td><td>%{Number(item.commission_rate)}</td><td>{money(item.monthly_target)}</td><td>{item.phone || item.email || "—"}</td></tr>)}</tbody></table>{filteredStaff.length === 0 && <div className={styles.empty}>Personel bulunamadı.</div>}</div>
          ) : tab === "performance" ? (
            <div className={styles.tableWrap}><table><thead><tr><th>Dönem</th><th>Personel</th><th>Hizmet Cirosu</th><th>Ürün Cirosu</th><th>İşlem</th><th>Bonus</th></tr></thead><tbody>{performance.map((item) => <tr key={item.id}><td>{monthLabel(item.period)}</td><td>{staffById.get(item.staff_id)?.full_name || "—"}</td><td>{money(item.service_revenue)}</td><td>{money(item.product_revenue)}</td><td>{item.completed_services}</td><td>{money(item.bonus_amount)}</td></tr>)}</tbody></table>{performance.length === 0 && <div className={styles.empty}>Performans kaydı yok.</div>}</div>
          ) : (
            <div className={styles.tableWrap}><table><thead><tr><th>Dönem</th><th>Personel</th><th>Maaş</th><th>Prim</th><th>Bonus</th><th>Kesinti</th><th>Net</th><th>Durum</th></tr></thead><tbody>{payrolls.map((item) => <tr key={item.id}><td>{monthLabel(item.period)}</td><td>{staffById.get(item.staff_id)?.full_name || "—"}</td><td>{money(item.base_salary)}</td><td>{money(item.commission_amount)}</td><td>{money(item.bonus_amount)}</td><td>{money(item.deduction_amount)}</td><td><strong>{money(item.net_amount)}</strong></td><td>{item.status === "paid" ? <span className={styles.paidBadge}>Ödendi</span> : <button className={styles.payButton} onClick={() => void markPaid(item.id)} disabled={saving}>Ödendi Yap</button>}</td></tr>)}</tbody></table>{payrolls.length === 0 && <div className={styles.empty}>Bordro kaydı yok.</div>}</div>
          )}
        </section>

        {modal && <div className={styles.modalBackdrop}><div className={styles.modal}><button className={styles.close} onClick={() => setModal(null)}><X/></button>
          {modal === "staff" && <form onSubmit={createStaff}><h2>Yeni personel</h2><p>Personel kartı ve prim ayarlarını oluşturun.</p><div className={styles.formGrid}><label>Ad soyad<input required value={staffForm.full_name} onChange={(e) => setStaffForm({...staffForm, full_name:e.target.value})}/></label><label>Görev<input value={staffForm.role} onChange={(e) => setStaffForm({...staffForm, role:e.target.value})}/></label><label>Telefon<input value={staffForm.phone} onChange={(e) => setStaffForm({...staffForm, phone:e.target.value})}/></label><label>E-posta<input type="email" value={staffForm.email} onChange={(e) => setStaffForm({...staffForm, email:e.target.value})}/></label><label>Aylık maaş<input type="number" min="0" value={staffForm.monthly_salary} onChange={(e) => setStaffForm({...staffForm, monthly_salary:e.target.value})}/></label><label>Prim oranı (%)<input type="number" min="0" step="0.01" value={staffForm.commission_rate} onChange={(e) => setStaffForm({...staffForm, commission_rate:e.target.value})}/></label><label>Aylık hedef<input type="number" min="0" value={staffForm.monthly_target} onChange={(e) => setStaffForm({...staffForm, monthly_target:e.target.value})}/></label><label>İşe giriş<input type="date" value={staffForm.hire_date} onChange={(e) => setStaffForm({...staffForm, hire_date:e.target.value})}/></label></div><button className={styles.submit} disabled={saving}>{saving ? "Kaydediliyor..." : "Personeli Kaydet"}</button></form>}
          {modal === "performance" && <form onSubmit={createPerformance}><h2>Performans kaydı</h2><p>Dönemsel ciro ve işlem bilgisini girin.</p><div className={styles.formGrid}><label>Personel<select required value={performanceForm.staff_id} onChange={(e) => setPerformanceForm({...performanceForm, staff_id:e.target.value})}><option value="">Seçin</option>{staff.map((item) => <option key={item.id} value={item.id}>{item.full_name}</option>)}</select></label><label>Dönem<input required type="month" value={performanceForm.period} onChange={(e) => setPerformanceForm({...performanceForm, period:e.target.value})}/></label><label>Hizmet cirosu<input type="number" min="0" value={performanceForm.service_revenue} onChange={(e) => setPerformanceForm({...performanceForm, service_revenue:e.target.value})}/></label><label>Ürün cirosu<input type="number" min="0" value={performanceForm.product_revenue} onChange={(e) => setPerformanceForm({...performanceForm, product_revenue:e.target.value})}/></label><label>Tamamlanan işlem<input type="number" min="0" value={performanceForm.completed_services} onChange={(e) => setPerformanceForm({...performanceForm, completed_services:e.target.value})}/></label><label>Ek bonus<input type="number" min="0" value={performanceForm.bonus_amount} onChange={(e) => setPerformanceForm({...performanceForm, bonus_amount:e.target.value})}/></label><label className={styles.full}>Not<textarea rows={3} value={performanceForm.notes} onChange={(e) => setPerformanceForm({...performanceForm, notes:e.target.value})}/></label></div><button className={styles.submit} disabled={saving}>{saving ? "Kaydediliyor..." : "Performansı Kaydet"}</button></form>}
          {modal === "payroll" && <form onSubmit={createPayroll}><h2>Bordro oluştur</h2><p>Maaş, prim ve bonus otomatik hesaplanır.</p><div className={styles.formGrid}><label>Personel<select required value={payrollForm.staff_id} onChange={(e) => setPayrollForm({...payrollForm, staff_id:e.target.value})}><option value="">Seçin</option>{staff.map((item) => <option key={item.id} value={item.id}>{item.full_name}</option>)}</select></label><label>Dönem<input required type="month" value={payrollForm.period} onChange={(e) => setPayrollForm({...payrollForm, period:e.target.value})}/></label><label className={styles.full}>Kesinti<input type="number" min="0" value={payrollForm.deduction_amount} onChange={(e) => setPayrollForm({...payrollForm, deduction_amount:e.target.value})}/></label></div><button className={styles.submit} disabled={saving}>{saving ? "Oluşturuluyor..." : "Bordro Oluştur"}</button></form>}
        </div></div>}
      </main>
    </PlatformShell>
  );
}
