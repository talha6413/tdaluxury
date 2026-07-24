"use client";

import Link from "next/link";
import {
  Bell, CalendarDays, Camera, ChevronRight, CircleUserRound,
  FileSignature, Gift, LoaderCircle, LockKeyhole, LogIn,
  LogOut, PackageCheck, ShieldCheck, WalletCards
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import styles from "./RealCustomerPortal.module.css";

type Customer = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  birth_date: string | null;
};

type Appointment = {
  id: string;
  starts_at: string;
  ends_at: string;
  status: string;
  notes: string;
  services: { title: string } | null;
};

type CustomerPackage = {
  id: string;
  title: string;
  total_sessions: number;
  used_sessions: number;
  total_amount: number;
  paid_amount: number;
  active: boolean;
};

type Payment = {
  id: string;
  amount: number;
  paid_at: string;
  reference: string;
};

type Consent = {
  id: string;
  document_title: string;
  granted: boolean;
  recorded_at: string;
};

type Photo = {
  id: string;
  category: string;
  taken_at: string;
  storage_path: string;
};

type PortalData = {
  customer: Customer;
  appointments: Appointment[];
  packages: CustomerPackage[];
  payments: Payment[];
  consents: Consent[];
  photos: Photo[];
};

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^90/, "").replace(/^0/, "").slice(0, 10);
  return digits ? `+90${digits}` : "";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function money(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function CustomerPortal() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<PortalData | null>(null);

  const normalizedPhone = useMemo(() => formatPhone(phone), [phone]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    async function boot() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) await loadPortal();
      setLoading(false);
    }

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) await loadPortal();
      else setData(null);
    });

    void boot();
    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadPortal() {
    const supabase = getSupabaseBrowserClient();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setData(null);
      return;
    }

    const { data: customerRow, error: customerError } = await supabase
      .from("customers")
      .select("id, full_name, phone, email, birth_date")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    const customer = customerRow as Customer | null;

    if (customerError) {
      setMessage("Müşteri kartı okunamadı.");
      return;
    }

    if (!customer) {
      setMessage("Bu hesapla eşleşen müşteri kaydı bulunamadı. Salonla iletişime geçin.");
      return;
    }

    const [appointmentsResult, packagesResult, paymentsResult, consentsResult, photosResult] =
      await Promise.all([
        supabase
          .from("appointments")
          .select("id, starts_at, ends_at, status, notes, services(title)")
          .eq("customer_id", customer.id)
          .order("starts_at", { ascending: false })
          .limit(20),
        supabase
          .from("customer_packages")
          .select("id, title, total_sessions, used_sessions, total_amount, paid_amount, active")
          .eq("customer_id", customer.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("payments")
          .select("id, amount, paid_at, reference")
          .eq("customer_id", customer.id)
          .order("paid_at", { ascending: false })
          .limit(20),
        supabase
          .from("customer_consents")
          .select("id, document_title, granted, recorded_at")
          .eq("customer_id", customer.id)
          .order("recorded_at", { ascending: false }),
        supabase
          .from("customer_photos")
          .select("id, category, taken_at, storage_path")
          .eq("customer_id", customer.id)
          .eq("visible_to_customer", true)
          .order("taken_at", { ascending: false }),
      ]);

    setData({
      customer,
      appointments: (appointmentsResult.data || []) as Appointment[],
      packages: (packagesResult.data || []) as CustomerPackage[],
      payments: (paymentsResult.data || []) as Payment[],
      consents: (consentsResult.data || []) as Consent[],
      photos: (photosResult.data || []) as Photo[],
    });
    setMessage("");
  }

  async function sendOtp(event: FormEvent) {
    event.preventDefault();
    if (normalizedPhone.length !== 13) {
      setMessage("Telefon numarasını 5XX XXX XX XX biçiminde girin.");
      return;
    }

    setBusy(true);
    setMessage("");
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      phone: normalizedPhone,
      options: { shouldCreateUser: false },
    });

    setBusy(false);
    if (error) {
      setMessage(
        error.message.toLowerCase().includes("provider")
          ? "Telefon doğrulaması Supabase tarafında henüz etkin değil."
          : error.message
      );
      return;
    }

    setOtpSent(true);
    setMessage("Doğrulama kodu gönderildi.");
  }

  async function verifyOtp(event: FormEvent) {
    event.preventDefault();
    if (otp.replace(/\D/g, "").length < 6) {
      setMessage("6 haneli doğrulama kodunu girin.");
      return;
    }

    setBusy(true);
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.verifyOtp({
      phone: normalizedPhone,
      token: otp.replace(/\D/g, ""),
      type: "sms",
    });
    setBusy(false);

    if (error) {
      setMessage("Kod doğrulanamadı. Kodu kontrol edip yeniden deneyin.");
      return;
    }

    await loadPortal();
  }

  async function logout() {
    await getSupabaseBrowserClient().auth.signOut();
    setData(null);
    setOtpSent(false);
    setOtp("");
  }

  if (loading) {
    return <main className={styles.loading}><LoaderCircle className={styles.spin}/><span>Hesap kontrol ediliyor…</span></main>;
  }

  if (!data) {
    return (
      <main className={styles.page}>
        <section className={styles.hero}>
          <span>TDA LUXURY MÜŞTERİ DENEYİMİ</span>
          <h1>Güzellik yolculuğunuz<br/><em>tek bir panelde.</em></h1>
          <p>Randevu, paket, ödeme, fotoğraf ve belgelerinizi güvenli hesabınızdan takip edin.</p>
        </section>

        <section className={styles.loginWrap}>
          <form onSubmit={otpSent ? verifyOtp : sendOtp} className={styles.loginCard}>
            <div className={styles.loginIcon}><CircleUserRound size={30}/></div>
            <small>MÜŞTERİ GİRİŞİ</small>
            <h2>{otpSent ? "Doğrulama kodu" : "Telefon numaranızla giriş"}</h2>

            {!otpSent ? (
              <label>
                Telefon numarası
                <div className={styles.phoneInput}>
                  <span>+90</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="5XX XXX XX XX"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </label>
            ) : (
              <label>
                SMS doğrulama kodu
                <input
                  className={styles.otp}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                />
              </label>
            )}

            <button disabled={busy}>
              {busy ? <LoaderCircle className={styles.spin} size={18}/> : <LogIn size={18}/>}
              {otpSent ? "Kodu doğrula" : "Doğrulama kodu gönder"}
            </button>

            {otpSent && (
              <button
                type="button"
                className={styles.secondary}
                onClick={() => { setOtpSent(false); setMessage(""); }}
              >
                Telefon numarasını değiştir
              </button>
            )}

            {message && <div className={styles.message}>{message}</div>}
            <div className={styles.security}><LockKeyhole size={16}/> Oturumunuz güvenli olarak saklanır.</div>
            <Link href="/iletisim">Giriş desteği <ChevronRight size={15}/></Link>
          </form>
        </section>
      </main>
    );
  }

  const remainingSessions = data.packages.reduce(
    (sum, item) => sum + Math.max(0, item.total_sessions - item.used_sessions), 0
  );
  const packageDebt = data.packages.reduce(
    (sum, item) => sum + Math.max(0, Number(item.total_amount) - Number(item.paid_amount)), 0
  );
  const upcoming = data.appointments.filter((item) => new Date(item.starts_at) > new Date());

  return (
    <main className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <div>
          <span>TDA LUXURY ÖZEL HESAP</span>
          <h1>Hoş geldiniz, {data.customer.full_name}</h1>
          <p>{data.customer.phone}</p>
        </div>
        <button onClick={logout}><LogOut size={17}/> Çıkış</button>
      </header>

      <section className={styles.stats}>
        <article><CalendarDays/><span>Yaklaşan randevu</span><b>{upcoming.length}</b></article>
        <article><PackageCheck/><span>Kalan seans</span><b>{remainingSessions}</b></article>
        <article><WalletCards/><span>Kalan paket borcu</span><b>{money(packageDebt)}</b></article>
        <article><FileSignature/><span>Onam belgesi</span><b>{data.consents.length}</b></article>
      </section>

      <section className={styles.grid}>
        <article className={styles.panel}>
          <header><div><span>RANDEVULAR</span><h2>Son randevularınız</h2></div><CalendarDays/></header>
          {data.appointments.length ? data.appointments.slice(0, 6).map((item) => (
            <div className={styles.row} key={item.id}>
              <div><b>{item.services?.title || "Güzellik işlemi"}</b><small>{formatDate(item.starts_at)}</small></div>
              <em>{item.status}</em>
            </div>
          )) : <p className={styles.empty}>Henüz randevu kaydı yok.</p>}
          <Link href="/randevu">Yeni randevu talebi oluştur <ChevronRight size={15}/></Link>
        </article>

        <article className={styles.panel}>
          <header><div><span>PAKETLER</span><h2>Aktif paketleriniz</h2></div><PackageCheck/></header>
          {data.packages.length ? data.packages.map((item) => {
            const remaining = Math.max(0, item.total_sessions - item.used_sessions);
            return <div className={styles.package} key={item.id}>
              <div><b>{item.title}</b><small>{remaining} / {item.total_sessions} seans kaldı</small></div>
              <progress max={item.total_sessions} value={remaining}/>
            </div>
          }) : <p className={styles.empty}>Aktif paket bulunmuyor.</p>}
        </article>

        <article className={styles.panel}>
          <header><div><span>ÖDEMELER</span><h2>Ödeme hareketleri</h2></div><WalletCards/></header>
          {data.payments.length ? data.payments.slice(0, 6).map((item) => (
            <div className={styles.row} key={item.id}>
              <div><b>{money(Number(item.amount))}</b><small>{formatDate(item.paid_at)}</small></div>
              <em>{item.reference || "Ödeme"}</em>
            </div>
          )) : <p className={styles.empty}>Ödeme kaydı bulunmuyor.</p>}
        </article>

        <article className={styles.panel}>
          <header><div><span>BELGELER & FOTOĞRAFLAR</span><h2>Güvenli arşiviniz</h2></div><ShieldCheck/></header>
          <div className={styles.archive}>
            <div><FileSignature/><b>{data.consents.length}</b><span>Onam belgesi</span></div>
            <div><Camera/><b>{data.photos.length}</b><span>Paylaşılan fotoğraf</span></div>
            <div><Gift/><b>—</b><span>Sadakat puanı</span></div>
            <div><Bell/><b>—</b><span>Bildirim</span></div>
          </div>
        </article>
      </section>
    </main>
  );
}
