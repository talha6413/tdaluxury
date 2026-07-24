"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  CheckCircle2,
  FileSignature,
  LoaderCircle,
  Mail,
  PackageCheck,
  Phone,
  RefreshCw,
  UserRound,
  WalletCards,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import PlatformShell from "./PlatformShell";
import styles from "./CustomerDetail.module.css";

type Customer = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  birth_date: string | null;
  notes: string;
  marketing_consent: boolean;
  active: boolean;
  created_at: string;
};

type Appointment = {
  id: string;
  starts_at: string;
  ends_at: string;
  status: string;
  notes: string;
  services: { title: string } | null;
};

type PackageRow = {
  id: string;
  title: string;
  total_sessions: number;
  used_sessions: number;
  total_amount: number | string;
  paid_amount: number | string;
  active: boolean;
};

type Payment = {
  id: string;
  amount: number | string;
  method: string;
  paid_at: string;
  reference: string;
};

type Consent = {
  id: string;
  document_title: string;
  document_version: string;
  granted: boolean;
  recorded_at: string;
};

type Photo = {
  id: string;
  category: string;
  taken_at: string;
  storage_path: string;
  visible_to_customer: boolean;
};

type DetailData = {
  customer: Customer;
  appointments: Appointment[];
  packages: PackageRow[];
  payments: Payment[];
  consents: Consent[];
  photos: Photo[];
};

function money(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function date(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function CustomerDetail({ customerId }: { customerId: string }) {
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (silent = false) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError("");

    try {
      const supabase = getSupabaseBrowserClient();

      const [
        customerResult,
        appointmentsResult,
        packagesResult,
        paymentsResult,
        consentsResult,
        photosResult,
      ] = await Promise.all([
        supabase
          .from("customers")
          .select("id, full_name, phone, email, birth_date, notes, marketing_consent, active, created_at")
          .eq("id", customerId)
          .single(),
        supabase
          .from("appointments")
          .select("id, starts_at, ends_at, status, notes, services(title)")
          .eq("customer_id", customerId)
          .order("starts_at", { ascending: false }),
        supabase
          .from("customer_packages")
          .select("id, title, total_sessions, used_sessions, total_amount, paid_amount, active")
          .eq("customer_id", customerId)
          .order("created_at", { ascending: false }),
        supabase
          .from("payments")
          .select("id, amount, method, paid_at, reference")
          .eq("customer_id", customerId)
          .order("paid_at", { ascending: false }),
        supabase
          .from("customer_consents")
          .select("id, document_title, document_version, granted, recorded_at")
          .eq("customer_id", customerId)
          .order("recorded_at", { ascending: false }),
        supabase
          .from("customer_photos")
          .select("id, category, taken_at, storage_path, visible_to_customer")
          .eq("customer_id", customerId)
          .order("taken_at", { ascending: false }),
      ]);

      const firstError =
        customerResult.error ||
        appointmentsResult.error ||
        packagesResult.error ||
        paymentsResult.error ||
        consentsResult.error ||
        photosResult.error;

      if (firstError) throw firstError;

      setData({
        customer: customerResult.data as Customer,
        appointments: (appointmentsResult.data || []) as Appointment[],
        packages: (packagesResult.data || []) as PackageRow[],
        payments: (paymentsResult.data || []) as Payment[],
        consents: (consentsResult.data || []) as Consent[],
        photos: (photosResult.data || []) as Photo[],
      });
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Müşteri kartı yüklenemedi."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [customerId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [load]);

  const totals = useMemo(() => {
    if (!data) return { debt: 0, remainingSessions: 0, paid: 0 };

    return {
      debt: data.packages.reduce(
        (sum, item) =>
          sum + Math.max(0, Number(item.total_amount) - Number(item.paid_amount)),
        0
      ),
      remainingSessions: data.packages.reduce(
        (sum, item) =>
          sum + Math.max(0, item.total_sessions - item.used_sessions),
        0
      ),
      paid: data.payments.reduce((sum, item) => sum + Number(item.amount), 0),
    };
  }, [data]);

  if (loading) {
    return (
      <PlatformShell title="Müşteri Kartı">
        <div className={styles.loading}>
          <LoaderCircle className={styles.spin} />
          <span>Müşteri kartı yükleniyor…</span>
        </div>
      </PlatformShell>
    );
  }

  if (error || !data) {
    return (
      <PlatformShell title="Müşteri Kartı">
        <div className={styles.error}>{error || "Müşteri bulunamadı."}</div>
        <Link className={styles.back} href="/yonetim-v2/musteriler">
          <ArrowLeft size={17} /> Müşteri listesine dön
        </Link>
      </PlatformShell>
    );
  }

  return (
    <PlatformShell title={data.customer.full_name} eyebrow="MÜŞTERİ KARTI">
      <div className={styles.topbar}>
        <Link href="/yonetim-v2/musteriler">
          <ArrowLeft size={17} /> Müşteri listesi
        </Link>
        <button onClick={() => void load(true)} disabled={refreshing}>
          <RefreshCw className={refreshing ? styles.spin : ""} size={17} />
          Yenile
        </button>
      </div>

      <section className={styles.profile}>
        <div className={styles.avatar}>
          {data.customer.full_name.slice(0, 1).toLocaleUpperCase("tr-TR")}
        </div>
        <div className={styles.identity}>
          <h2>{data.customer.full_name}</h2>
          <span><Phone size={15} /> {data.customer.phone || "Telefon yok"}</span>
          <span><Mail size={15} /> {data.customer.email || "E-posta yok"}</span>
        </div>
        <div className={styles.profileMeta}>
          <span className={data.customer.active ? styles.active : styles.inactive}>
            {data.customer.active ? "Aktif müşteri" : "Pasif müşteri"}
          </span>
          <small>
            Kayıt: {new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" }).format(
              new Date(data.customer.created_at)
            )}
          </small>
        </div>
      </section>

      <section className={styles.stats}>
        <article><CalendarDays /><span>Toplam randevu</span><b>{data.appointments.length}</b></article>
        <article><PackageCheck /><span>Kalan seans</span><b>{totals.remainingSessions}</b></article>
        <article><WalletCards /><span>Toplam ödeme</span><b>{money(totals.paid)}</b></article>
        <article><FileSignature /><span>Kalan borç</span><b>{money(totals.debt)}</b></article>
      </section>

      <section className={styles.grid}>
        <article className={styles.panel}>
          <header><div><span>RANDEVULAR</span><h3>İşlem geçmişi</h3></div><CalendarDays /></header>
          {data.appointments.length ? data.appointments.map((item) => (
            <div className={styles.row} key={item.id}>
              <div>
                <b>{item.services?.title || "Güzellik işlemi"}</b>
                <small>{date(item.starts_at)}</small>
              </div>
              <em>{item.status}</em>
            </div>
          )) : <p className={styles.empty}>Randevu kaydı bulunmuyor.</p>}
        </article>

        <article className={styles.panel}>
          <header><div><span>PAKETLER</span><h3>Seans ve borç takibi</h3></div><PackageCheck /></header>
          {data.packages.length ? data.packages.map((item) => {
            const remaining = Math.max(0, item.total_sessions - item.used_sessions);
            const debt = Math.max(0, Number(item.total_amount) - Number(item.paid_amount));
            return (
              <div className={styles.package} key={item.id}>
                <div>
                  <b>{item.title}</b>
                  <small>{remaining} / {item.total_sessions} seans kaldı</small>
                </div>
                <strong>{money(debt)}</strong>
                <progress max={item.total_sessions || 1} value={remaining} />
              </div>
            );
          }) : <p className={styles.empty}>Paket kaydı bulunmuyor.</p>}
        </article>

        <article className={styles.panel}>
          <header><div><span>ÖDEMELER</span><h3>Tahsilat hareketleri</h3></div><WalletCards /></header>
          {data.payments.length ? data.payments.map((item) => (
            <div className={styles.row} key={item.id}>
              <div>
                <b>{money(Number(item.amount))}</b>
                <small>{date(item.paid_at)} · {item.method}</small>
              </div>
              <em>{item.reference || "Ödeme"}</em>
            </div>
          )) : <p className={styles.empty}>Ödeme kaydı bulunmuyor.</p>}
        </article>

        <article className={styles.panel}>
          <header><div><span>BELGELER</span><h3>Onam ve sözleşmeler</h3></div><FileSignature /></header>
          {data.consents.length ? data.consents.map((item) => (
            <div className={styles.row} key={item.id}>
              <div>
                <b>{item.document_title}</b>
                <small>{date(item.recorded_at)} · v{item.document_version}</small>
              </div>
              <em>{item.granted ? "Onaylandı" : "Reddedildi"}</em>
            </div>
          )) : <p className={styles.empty}>Belge kaydı bulunmuyor.</p>}
        </article>

        <article className={styles.panel}>
          <header><div><span>FOTOĞRAFLAR</span><h3>Öncesi / sonrası arşivi</h3></div><Camera /></header>
          <div className={styles.photoGrid}>
            {data.photos.length ? data.photos.map((item) => (
              <div className={styles.photoCard} key={item.id}>
                <Camera />
                <b>{item.category || "İşlem fotoğrafı"}</b>
                <small>{date(item.taken_at)}</small>
                <span>{item.visible_to_customer ? "Müşteriye açık" : "Sadece personel"}</span>
              </div>
            )) : <p className={styles.empty}>Fotoğraf kaydı bulunmuyor.</p>}
          </div>
        </article>

        <article className={styles.panel}>
          <header><div><span>PROFİL</span><h3>Müşteri bilgileri</h3></div><UserRound /></header>
          <dl className={styles.details}>
            <div><dt>Doğum tarihi</dt><dd>{data.customer.birth_date || "Belirtilmedi"}</dd></div>
            <div><dt>Pazarlama izni</dt><dd>{data.customer.marketing_consent ? "Var" : "Yok"}</dd></div>
            <div><dt>Durum</dt><dd>{data.customer.active ? "Aktif" : "Pasif"}</dd></div>
          </dl>
          <div className={styles.notes}>
            <CheckCircle2 size={18} />
            <div>
              <b>Personel notu</b>
              <p>{data.customer.notes || "Bu müşteri için not eklenmemiş."}</p>
            </div>
          </div>
        </article>
      </section>
    </PlatformShell>
  );
}
