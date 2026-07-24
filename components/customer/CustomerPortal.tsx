"use client";

import Link from "next/link";
import {
  Bell,
  CalendarDays,
  Camera,
  ChevronRight,
  CircleUserRound,
  FileSignature,
  Gift,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  LogOut,
  Mail,
  PackageCheck,
  ShieldCheck,
  UserPlus,
  WalletCards,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import styles from "./RealCustomerPortal.module.css";

type AuthMode = "login" | "register" | "forgot" | "reset";

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
  total_amount: number | string;
  paid_amount: number | string;
  active: boolean;
};

type Payment = {
  id: string;
  amount: number | string;
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

function normalizePhone(value: string) {
  return value.replace(/\D/g, "").replace(/^90/, "").replace(/^0/, "").slice(-10);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function money(value: number | string | null | undefined) {
  const numeric = Number(value ?? 0);
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(numeric) ? numeric : 0);
}

export default function CustomerPortal() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [claimPhone, setClaimPhone] = useState("");
  const [needsClaim, setNeedsClaim] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<PortalData | null>(null);

  const normalizedPhone = useMemo(() => normalizePhone(phone), [phone]);
  const normalizedClaimPhone = useMemo(
    () => normalizePhone(claimPhone),
    [claimPhone]
  );

  const loadPortal = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setData(null);
      setNeedsClaim(false);
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
      setData(null);
      setNeedsClaim(true);
      setMessage(
        "Hesabınız açıldı ancak müşteri kartınız henüz bağlanmadı. Salonda kayıtlı telefon numaranızı girin."
      );
      return;
    }

    const [
      appointmentsResult,
      packagesResult,
      paymentsResult,
      consentsResult,
      photosResult,
    ] = await Promise.all([
      supabase
        .from("appointments")
        .select("id, starts_at, ends_at, status, notes, services(title)")
        .eq("customer_id", customer.id)
        .order("starts_at", { ascending: false })
        .limit(20),
      supabase
        .from("customer_packages")
        .select(
          "id, title, total_sessions, used_sessions, total_amount, paid_amount, active"
        )
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

    const firstError =
      appointmentsResult.error ||
      packagesResult.error ||
      paymentsResult.error ||
      consentsResult.error ||
      photosResult.error;

    if (firstError) {
      setMessage(firstError.message);
      return;
    }

    setData({
      customer,
      appointments: (appointmentsResult.data || []) as Appointment[],
      packages: (packagesResult.data || []) as CustomerPackage[],
      payments: (paymentsResult.data || []) as Payment[],
      consents: (consentsResult.data || []) as Consent[],
      photos: (photosResult.data || []) as Photo[],
    });
    setNeedsClaim(false);
    setMessage("");
  }, []);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    async function boot() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) await loadPortal();
      setLoading(false);
    }

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          setMode("reset");
          setData(null);
          setNeedsClaim(false);
          setMessage("Yeni şifrenizi belirleyin.");
        } else if (session) {
          await loadPortal();
        } else {
          setData(null);
          setNeedsClaim(false);
        }
      }
    );

    const timer = window.setTimeout(() => void boot(), 0);

    return () => {
      window.clearTimeout(timer);
      listener.subscription.unsubscribe();
    };
  }, [loadPortal]);

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (mode === "forgot") {
      if (!email.trim()) {
        setMessage("E-posta adresinizi girin.");
        return;
      }

      setBusy(true);
      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/musteri-paneli`
          : undefined;

      const { error } = await getSupabaseBrowserClient().auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        { redirectTo }
      );
      setBusy(false);

      setMessage(
        error
          ? error.message
          : "Şifre yenileme bağlantısı e-posta adresinize gönderildi."
      );
      return;
    }

    if (mode === "reset") {
      if (newPassword.length < 8) {
        setMessage("Yeni şifre en az 8 karakter olmalıdır.");
        return;
      }

      setBusy(true);
      const { error } = await getSupabaseBrowserClient().auth.updateUser({
        password: newPassword,
      });
      setBusy(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      setNewPassword("");
      setMode("login");
      setMessage("Şifreniz güncellendi. Hesabınıza giriş yapabilirsiniz.");
      return;
    }

    if (!email.trim() || password.length < 8) {
      setMessage("Geçerli e-posta ve en az 8 karakterlik şifre girin.");
      return;
    }

    setBusy(true);
    const supabase = getSupabaseBrowserClient();

    if (mode === "register") {
      if (normalizedPhone.length !== 10) {
        setBusy(false);
        setMessage("Salonda kayıtlı 10 haneli telefon numaranızı girin.");
        return;
      }

      const emailRedirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/musteri-paneli`
          : undefined;

      const { data: signUpData, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo,
          data: {
            customer_phone: normalizedPhone,
          },
        },
      });

      setBusy(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      if (signUpData.session) {
        await loadPortal();
      } else {
        setMode("login");
        setMessage(
          "Hesabınız oluşturuldu. E-posta doğrulaması açıksa gelen kutunuzdaki bağlantıya tıklayın."
        );
      }
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    setBusy(false);

    if (error) {
      setMessage(
        error.message.toLowerCase().includes("invalid login")
          ? "E-posta veya şifre hatalı."
          : error.message
      );
      return;
    }

    await loadPortal();
  }

  async function claimAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (normalizedClaimPhone.length !== 10) {
      setMessage("Salonda kayıtlı 10 haneli telefon numaranızı girin.");
      return;
    }

    setBusy(true);
    setMessage("");

    const supabase = getSupabaseBrowserClient();
    const { data: claimed, error } = await supabase.rpc(
      "claim_customer_account",
      {
        customer_phone: normalizedClaimPhone,
      } as never
    );

    setBusy(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (!claimed) {
      setMessage(
        "Bu telefon numarasıyla eşleşen uygun müşteri kaydı bulunamadı. E-posta bilgileriniz farklı olabilir; salonla iletişime geçin."
      );
      return;
    }

    await loadPortal();
  }

  async function logout() {
    await getSupabaseBrowserClient().auth.signOut();
    setData(null);
    setNeedsClaim(false);
    setMode("login");
    setPassword("");
    setMessage("");
  }

  if (loading) {
    return (
      <main className={styles.loading}>
        <LoaderCircle className={styles.spin} />
        <span>Hesap kontrol ediliyor…</span>
      </main>
    );
  }

  if (!data) {
    return (
      <main className={styles.page}>
        <section className={styles.hero}>
          <span>TDA LUXURY MÜŞTERİ DENEYİMİ</span>
          <h1>
            Güzellik yolculuğunuz
            <br />
            <em>tek bir panelde.</em>
          </h1>
          <p>
            Randevu, paket, ödeme, fotoğraf ve belgelerinizi güvenli hesabınızdan
            takip edin.
          </p>
        </section>

        <section className={styles.loginWrap}>
          {needsClaim ? (
            <form onSubmit={claimAccount} className={styles.loginCard}>
              <div className={styles.loginIcon}>
                <CircleUserRound size={30} />
              </div>
              <small>HESAP EŞLEŞTİRME</small>
              <h2>Müşteri kartınızı bağlayın</h2>

              <label>
                Salonda kayıtlı telefon
                <div className={styles.phoneInput}>
                  <span>+90</span>
                  <input
                    value={claimPhone}
                    onChange={(event) => setClaimPhone(event.target.value)}
                    placeholder="5XX XXX XX XX"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </label>

              <button disabled={busy}>
                {busy ? (
                  <LoaderCircle className={styles.spin} size={18} />
                ) : (
                  <ShieldCheck size={18} />
                )}
                Hesabımı müşteri kartına bağla
              </button>

              <button
                type="button"
                className={styles.secondary}
                onClick={() => void logout()}
              >
                Farklı hesapla giriş yap
              </button>

              {message ? <div className={styles.message}>{message}</div> : null}
            </form>
          ) : (
            <form onSubmit={submitAuth} className={styles.loginCard}>
              <div className={styles.loginIcon}>
                {mode === "register" ? (
                  <UserPlus size={30} />
                ) : (
                  <CircleUserRound size={30} />
                )}
              </div>

              <small>MÜŞTERİ GİRİŞİ</small>
              <h2>
                {mode === "login" && "Hesabınıza giriş yapın"}
                {mode === "register" && "Müşteri hesabı oluşturun"}
                {mode === "forgot" && "Şifrenizi yenileyin"}
                {mode === "reset" && "Yeni şifre belirleyin"}
              </h2>

              {mode !== "reset" ? (
                <label>
                  E-posta adresi
                  <div className={styles.phoneInput}>
                    <span>
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="ornek@email.com"
                      autoComplete="email"
                    />
                  </div>
                </label>
              ) : null}

              {mode === "register" ? (
                <label>
                  Salonda kayıtlı telefon
                  <div className={styles.phoneInput}>
                    <span>+90</span>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="5XX XXX XX XX"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                </label>
              ) : null}

              {mode === "login" || mode === "register" ? (
                <label>
                  Şifre
                  <input
                    className={styles.otp}
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="En az 8 karakter"
                    autoComplete={
                      mode === "register" ? "new-password" : "current-password"
                    }
                  />
                </label>
              ) : null}

              {mode === "reset" ? (
                <label>
                  Yeni şifre
                  <input
                    className={styles.otp}
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="En az 8 karakter"
                    autoComplete="new-password"
                  />
                </label>
              ) : null}

              <button disabled={busy}>
                {busy ? (
                  <LoaderCircle className={styles.spin} size={18} />
                ) : mode === "register" ? (
                  <UserPlus size={18} />
                ) : (
                  <LogIn size={18} />
                )}
                {mode === "login" && "Giriş yap"}
                {mode === "register" && "Hesap oluştur"}
                {mode === "forgot" && "Yenileme bağlantısı gönder"}
                {mode === "reset" && "Yeni şifreyi kaydet"}
              </button>

              {mode === "login" ? (
                <>
                  <button
                    type="button"
                    className={styles.secondary}
                    onClick={() => {
                      setMode("register");
                      setMessage("");
                    }}
                  >
                    İlk kez giriş yapıyorum
                  </button>
                  <button
                    type="button"
                    className={styles.secondary}
                    onClick={() => {
                      setMode("forgot");
                      setMessage("");
                    }}
                  >
                    Şifremi unuttum
                  </button>
                </>
              ) : null}

              {mode === "register" || mode === "forgot" ? (
                <button
                  type="button"
                  className={styles.secondary}
                  onClick={() => {
                    setMode("login");
                    setMessage("");
                  }}
                >
                  Giriş ekranına dön
                </button>
              ) : null}

              {message ? <div className={styles.message}>{message}</div> : null}

              <div className={styles.security}>
                <LockKeyhole size={16} /> Oturumunuz güvenli olarak saklanır.
              </div>
              <Link href="/iletisim">
                Giriş desteği <ChevronRight size={15} />
              </Link>
            </form>
          )}
        </section>
      </main>
    );
  }

  const remainingSessions = data.packages.reduce<number>(
    (sum, item) =>
      sum + Math.max(0, Number(item.total_sessions) - Number(item.used_sessions)),
    0
  );
  const packageDebt = data.packages.reduce<number>(
    (sum, item) =>
      sum +
      Math.max(0, Number(item.total_amount || 0) - Number(item.paid_amount || 0)),
    0
  );
  const upcoming = data.appointments.filter(
    (item) => new Date(item.starts_at) > new Date()
  );

  return (
    <main className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <div>
          <span>TDA LUXURY ÖZEL HESAP</span>
          <h1>Hoş geldiniz, {data.customer.full_name}</h1>
          <p className={styles.accountMeta}>
            <span>{data.customer.phone}</span>
            <span>Güvenli müşteri hesabı</span>
          </p>
        </div>
        <button onClick={() => void logout()}>
          <LogOut size={17} /> Çıkış
        </button>
      </header>

      <section className={styles.stats}>
        <article>
          <CalendarDays />
          <span>Yaklaşan randevu</span>
          <b>{upcoming.length}</b>
        </article>
        <article>
          <PackageCheck />
          <span>Kalan seans</span>
          <b>{remainingSessions}</b>
        </article>
        <article>
          <WalletCards />
          <span>Kalan paket borcu</span>
          <b>{money(packageDebt)}</b>
        </article>
        <article>
          <FileSignature />
          <span>Onam belgesi</span>
          <b>{data.consents.length}</b>
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.panel}>
          <header>
            <div>
              <span>RANDEVULAR</span>
              <h2>Son randevularınız</h2>
            </div>
            <CalendarDays />
          </header>
          {data.appointments.length ? (
            data.appointments.slice(0, 6).map((item) => (
              <div className={styles.row} key={item.id}>
                <div>
                  <b>{item.services?.title || "Güzellik işlemi"}</b>
                  <small>{formatDate(item.starts_at)}</small>
                </div>
                <em>{item.status}</em>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <CalendarDays size={24} />
              <b>Henüz randevunuz bulunmuyor</b>
              <p>Yeni randevu talebinizi birkaç adımda oluşturabilirsiniz.</p>
            </div>
          )}
          <Link href="/randevu">
            Yeni randevu talebi oluştur <ChevronRight size={15} />
          </Link>
        </article>

        <article className={styles.panel}>
          <header>
            <div>
              <span>PAKETLER</span>
              <h2>Aktif paketleriniz</h2>
            </div>
            <PackageCheck />
          </header>
          {data.packages.length ? (
            data.packages.map((item) => {
              const totalSessions = Math.max(1, Number(item.total_sessions));
              const usedSessions = Math.max(0, Number(item.used_sessions));
              const remaining = Math.max(0, totalSessions - usedSessions);
              const progress = Math.min(
                100,
                Math.round((usedSessions / totalSessions) * 100)
              );
              const debt = Math.max(
                0,
                Number(item.total_amount || 0) - Number(item.paid_amount || 0)
              );

              return (
                <div className={styles.package} key={item.id}>
                  <div className={styles.packageTop}>
                    <div>
                      <b>{item.title}</b>
                      <small>
                        {remaining} / {totalSessions} seans kaldı
                      </small>
                    </div>
                    <strong>{progress}%</strong>
                  </div>
                  <progress max={100} value={progress} />
                  <div className={styles.packageMeta}>
                    <span>{usedSessions} seans tamamlandı</span>
                    <span>
                      {debt > 0 ? `Kalan borç: ${money(debt)}` : "Ödeme tamamlandı"}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              <PackageCheck size={24} />
              <b>Aktif paketiniz bulunmuyor</b>
              <p>Satın aldığınız paketler ve seans ilerlemeniz burada görünür.</p>
            </div>
          )}
        </article>

        <article className={styles.panel}>
          <header>
            <div>
              <span>ÖDEMELER</span>
              <h2>Ödeme hareketleri</h2>
            </div>
            <WalletCards />
          </header>
          {data.payments.length ? (
            data.payments.slice(0, 6).map((item) => (
              <div className={styles.row} key={item.id}>
                <div>
                  <b>{money(item.amount)}</b>
                  <small>{formatDate(item.paid_at)}</small>
                </div>
                <em>{item.reference || "Ödeme"}</em>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <WalletCards size={24} />
              <b>Henüz ödeme hareketi yok</b>
              <p>Ödemeleriniz tarih ve referans bilgileriyle burada listelenir.</p>
            </div>
          )}
        </article>

        <article className={styles.panel}>
          <header>
            <div>
              <span>BELGELER & FOTOĞRAFLAR</span>
              <h2>Güvenli arşiviniz</h2>
            </div>
            <ShieldCheck />
          </header>
          <div className={styles.archive}>
            <div>
              <FileSignature />
              <b>{data.consents.length}</b>
              <span>Onam belgesi</span>
            </div>
            <div>
              <Camera />
              <b>{data.photos.length}</b>
              <span>Paylaşılan fotoğraf</span>
            </div>
            <div>
              <Gift />
              <b>—</b>
              <span>Sadakat puanı</span>
            </div>
            <div>
              <Bell />
              <b>—</b>
              <span>Bildirim</span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
