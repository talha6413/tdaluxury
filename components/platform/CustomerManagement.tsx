"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  CirclePlus,
  LoaderCircle,
  Mail,
  Phone,
  RefreshCw,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import PlatformShell from "./PlatformShell";
import styles from "./CustomerManagement.module.css";

type Customer = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  birth_date: string | null;
  notes: string;
  active: boolean;
  created_at: string;
};

type Appointment = {
  customer_id: string;
  starts_at: string;
};

type PackageRow = {
  customer_id: string;
  total_sessions: number;
  used_sessions: number;
  total_amount: number | string;
  paid_amount: number | string;
  active: boolean;
};

type CustomerSummary = Customer & {
  lastAppointment: string | null;
  remainingSessions: number;
  debt: number;
};

const initialForm = {
  full_name: "",
  phone: "",
  email: "",
  birth_date: "",
  notes: "",
};

function money(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatDate(value: string | null) {
  if (!value) return "Randevu yok";
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" }).format(new Date(value));
}

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "").slice(0, 16);
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  const load = useCallback(async (silent = false) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError("");

    try {
      const supabase = getSupabaseBrowserClient();

      const [customersResult, appointmentsResult, packagesResult] = await Promise.all([
        supabase
          .from("customers")
          .select("id, full_name, phone, email, birth_date, notes, active, created_at")
          .order("created_at", { ascending: false }),
        supabase
          .from("appointments")
          .select("customer_id, starts_at")
          .order("starts_at", { ascending: false }),
        supabase
          .from("customer_packages")
          .select("customer_id, total_sessions, used_sessions, total_amount, paid_amount, active"),
      ]);

      const firstError =
        customersResult.error || appointmentsResult.error || packagesResult.error;
      if (firstError) throw firstError;

      const customerRows = (customersResult.data || []) as Customer[];
      const appointmentRows = (appointmentsResult.data || []) as Appointment[];
      const packageRows = (packagesResult.data || []) as PackageRow[];

      const mapped = customerRows.map((customer) => {
        const customerAppointments = appointmentRows.filter(
          (item) => item.customer_id === customer.id
        );
        const customerPackages = packageRows.filter(
          (item) => item.customer_id === customer.id
        );

        return {
          ...customer,
          lastAppointment: customerAppointments[0]?.starts_at || null,
          remainingSessions: customerPackages.reduce(
            (sum, item) =>
              sum + Math.max(0, Number(item.total_sessions) - Number(item.used_sessions)),
            0
          ),
          debt: customerPackages.reduce(
            (sum, item) =>
              sum + Math.max(0, Number(item.total_amount) - Number(item.paid_amount)),
            0
          ),
        };
      });

      setCustomers(mapped);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Müşteri kayıtları yüklenemedi."
      );
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

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");

    return customers.filter((customer) => {
      const statusMatches =
        status === "all" ||
        (status === "active" && customer.active) ||
        (status === "inactive" && !customer.active);

      const queryMatches =
        !normalized ||
        customer.full_name.toLocaleLowerCase("tr-TR").includes(normalized) ||
        customer.phone.toLocaleLowerCase("tr-TR").includes(normalized) ||
        customer.email.toLocaleLowerCase("tr-TR").includes(normalized);

      return statusMatches && queryMatches;
    });
  }, [customers, query, status]);

  async function createCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.full_name.trim() || !form.phone.trim()) {
      setError("Ad soyad ve telefon alanları zorunludur.");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = getSupabaseBrowserClient();
    const newCustomer = {
      full_name: form.full_name.trim(),
      phone: normalizePhone(form.phone),
      email: form.email.trim(),
      birth_date: form.birth_date || null,
      notes: form.notes.trim(),
      marketing_consent: false,
      active: true,
    };

    const { error: insertError } = await supabase
      .from("customers")
      .insert([newCustomer] as never[]);

    setSaving(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setForm(initialForm);
    setShowForm(false);
    await load(true);
  }

  if (loading) {
    return (
      <PlatformShell title="Müşteri Yönetimi">
        <div className={styles.loading}>
          <LoaderCircle className={styles.spin} />
          <span>Müşteri kartları yükleniyor…</span>
        </div>
      </PlatformShell>
    );
  }

  return (
    <PlatformShell title="Müşteri Yönetimi" eyebrow="CRM">
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ad, telefon veya e-posta ara"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as "all" | "active" | "inactive")
          }
        >
          <option value="all">Tüm müşteriler</option>
          <option value="active">Aktif müşteriler</option>
          <option value="inactive">Pasif müşteriler</option>
        </select>

        <button
          className={styles.refresh}
          onClick={() => void load(true)}
          disabled={refreshing}
        >
          <RefreshCw className={refreshing ? styles.spin : ""} size={17} />
          Yenile
        </button>

        <button className={styles.add} onClick={() => setShowForm(true)}>
          <CirclePlus size={18} />
          Yeni müşteri
        </button>
      </div>

      {error ? <div className={styles.error}>{error}</div> : null}

      <section className={styles.stats}>
        <article><Users /><span>Toplam müşteri</span><b>{customers.length}</b></article>
        <article><UserRound /><span>Aktif müşteri</span><b>{customers.filter((x) => x.active).length}</b></article>
        <article><CalendarDays /><span>Seansı kalan</span><b>{customers.filter((x) => x.remainingSessions > 0).length}</b></article>
        <article><Phone /><span>Takipte alacak</span><b>{money(customers.reduce((s, x) => s + x.debt, 0))}</b></article>
      </section>

      <section className={styles.list}>
        <header>
          <span>{filtered.length} kayıt gösteriliyor</span>
        </header>

        {filtered.length ? (
          filtered.map((customer) => (
            <Link
              href={`/yonetim-v2/musteriler/${customer.id}`}
              className={styles.row}
              key={customer.id}
            >
              <div className={styles.avatar}>
                {customer.full_name.slice(0, 1).toLocaleUpperCase("tr-TR")}
              </div>

              <div className={styles.identity}>
                <b>{customer.full_name}</b>
                <span><Phone size={13} /> {customer.phone || "Telefon yok"}</span>
                <span><Mail size={13} /> {customer.email || "E-posta yok"}</span>
              </div>

              <div className={styles.metric}>
                <small>Son randevu</small>
                <b>{formatDate(customer.lastAppointment)}</b>
              </div>

              <div className={styles.metric}>
                <small>Kalan seans</small>
                <b>{customer.remainingSessions}</b>
              </div>

              <div className={styles.metric}>
                <small>Paket borcu</small>
                <b>{money(customer.debt)}</b>
              </div>

              <em className={customer.active ? styles.active : styles.inactive}>
                {customer.active ? "Aktif" : "Pasif"}
              </em>

              <ChevronRight size={18} />
            </Link>
          ))
        ) : (
          <div className={styles.empty}>Arama ölçütlerine uygun müşteri bulunamadı.</div>
        )}
      </section>

      {showForm ? (
        <div className={styles.overlay} onMouseDown={() => setShowForm(false)}>
          <form
            className={styles.modal}
            onSubmit={createCustomer}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>YENİ MÜŞTERİ</span>
                <h2>Müşteri kartı oluştur</h2>
              </div>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </header>

            <label>
              Ad soyad
              <input
                value={form.full_name}
                onChange={(event) =>
                  setForm({ ...form, full_name: event.target.value })
                }
                required
              />
            </label>

            <div className={styles.formGrid}>
              <label>
                Telefon
                <input
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                  required
                />
              </label>

              <label>
                E-posta
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                />
              </label>
            </div>

            <label>
              Doğum tarihi
              <input
                type="date"
                value={form.birth_date}
                onChange={(event) =>
                  setForm({ ...form, birth_date: event.target.value })
                }
              />
            </label>

            <label>
              Not
              <textarea
                value={form.notes}
                onChange={(event) =>
                  setForm({ ...form, notes: event.target.value })
                }
              />
            </label>

            <button className={styles.save} disabled={saving}>
              {saving ? <LoaderCircle className={styles.spin} size={18} /> : <CirclePlus size={18} />}
              Müşteri kartını kaydet
            </button>
          </form>
        </div>
      ) : null}
    </PlatformShell>
  );
}
