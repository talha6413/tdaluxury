"use client";

import {
  Bot,
  CalendarClock,
  CircleDollarSign,
  LoaderCircle,
  MessageCircleQuestion,
  RefreshCw,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import PlatformShell from "./PlatformShell";
import styles from "./BusinessAssistant.module.css";

type Payment = { amount: number | string; paid_at: string };
type Expense = { amount: number | string; paid_at: string; category: string; title: string };
type Appointment = {
  id: string;
  starts_at: string;
  status: string;
  customers: { full_name: string; phone: string } | null;
};
type Customer = { id: string; full_name: string; phone: string; created_at: string; active: boolean };
type Package = {
  customer_id: string;
  title: string;
  total_amount: number | string;
  paid_amount: number | string;
  active: boolean;
};
type StaffPerformance = {
  service_revenue: number | string;
  product_revenue: number | string;
  completed_services: number;
  staff_members: { display_name: string; title: string } | null;
};

type Snapshot = {
  payments: Payment[];
  expenses: Expense[];
  appointments: Appointment[];
  customers: Customer[];
  packages: Package[];
  staff: StaffPerformance[];
};

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  createdAt: string;
};

const QUICK_QUESTIONS = [
  "Bu ay net kazancım ne kadar?",
  "Bugünkü randevuları özetle",
  "En çok ciro yapan personel kim?",
  "Toplam müşteri borcu ne kadar?",
  "Son 30 günde kaç yeni müşteri geldi?",
  "Bu ay en yüksek gider kategorisi hangisi?",
];

function monthStart() {
  const value = new Date();
  value.setDate(1);
  value.setHours(0, 0, 0, 0);
  return value;
}

function todayStart() {
  const value = new Date();
  value.setHours(0, 0, 0, 0);
  return value;
}

function tomorrowStart() {
  const value = todayStart();
  value.setDate(value.getDate() + 1);
  return value;
}

function daysAgo(days: number) {
  const value = new Date();
  value.setDate(value.getDate() - days);
  return value;
}

function money(value: number | string | null | undefined) {
  const numericValue = Number(value ?? 0);

  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(numericValue) ? numericValue : 0);
}

function dateTime(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").replace(/[?.!,]/g, "").trim();
}

function sum(values: Array<number | string | null | undefined>): number {
  return values.reduce<number>((total, item) => {
    const numericValue = Number(item ?? 0);
    return total + (Number.isFinite(numericValue) ? numericValue : 0);
  }, 0);
}

export default function BusinessAssistant() {
  const [snapshot, setSnapshot] = useState<Snapshot>({
    payments: [],
    expenses: [],
    appointments: [],
    customers: [],
    packages: [],
    staff: [],
  });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Merhaba Talha. TDA Luxury verilerini analiz etmeye hazırım. Ciro, gider, randevu, müşteri borcu veya personel performansı hakkında soru sorabilirsin.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (silent = false) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError("");

    try {
      const supabase = getSupabaseBrowserClient();
      const fromMonth = monthStart().toISOString();
      const today = todayStart().toISOString();
      const tomorrow = tomorrowStart().toISOString();
      const thirtyDays = daysAgo(30).toISOString();
      const period = new Date().toISOString().slice(0, 7);

      const [payments, expenses, appointments, customers, packages, staff] =
        await Promise.all([
          supabase.from("payments").select("amount, paid_at").gte("paid_at", fromMonth),
          supabase
            .from("expenses")
            .select("amount, paid_at, category, title")
            .gte("paid_at", fromMonth),
          supabase
            .from("appointments")
            .select("id, starts_at, status, customers(full_name, phone)")
            .gte("starts_at", today)
            .lt("starts_at", tomorrow)
            .order("starts_at"),
          supabase
            .from("customers")
            .select("id, full_name, phone, created_at, active")
            .gte("created_at", thirtyDays),
          supabase
            .from("customer_packages")
            .select("customer_id, title, total_amount, paid_amount, active")
            .eq("active", true),
          supabase
            .from("staff_performance")
            .select(
              "service_revenue, product_revenue, completed_services, staff_members(display_name, title)"
            )
            .eq("period", period),
        ]);

      const firstError =
        payments.error ||
        expenses.error ||
        appointments.error ||
        customers.error ||
        packages.error ||
        staff.error;

      if (firstError) throw firstError;

      setSnapshot({
        payments: (payments.data || []) as Payment[],
        expenses: (expenses.data || []) as Expense[],
        appointments: (appointments.data || []) as Appointment[],
        customers: (customers.data || []) as Customer[],
        packages: (packages.data || []) as Package[],
        staff: (staff.data || []) as StaffPerformance[],
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Veriler yüklenemedi.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const metrics = useMemo(() => {
    const income = sum(snapshot.payments.map((item) => item.amount));
    const expense = sum(snapshot.expenses.map((item) => item.amount));
    const debt = snapshot.packages.reduce<number>((total, item) => {
      const totalAmount = Number(item.total_amount ?? 0);
      const paidAmount = Number(item.paid_amount ?? 0);
      const safeTotal = Number.isFinite(totalAmount) ? totalAmount : 0;
      const safePaid = Number.isFinite(paidAmount) ? paidAmount : 0;

      return total + Math.max(0, safeTotal - safePaid);
    }, 0);
    const activeAppointments = snapshot.appointments.filter(
      (item) => !["cancelled", "no_show"].includes(item.status)
    ).length;

    return {
      income,
      expense,
      net: income - expense,
      debt,
      activeAppointments,
      newCustomers: snapshot.customers.length,
    };
  }, [snapshot]);

  function answerQuestion(rawQuestion: string) {
    const q = normalize(rawQuestion);

    if ((q.includes("net") || q.includes("kazanç") || q.includes("kar")) && q.includes("ay")) {
      return `Bu ay toplam tahsilat ${money(metrics.income)}, toplam gider ${money(
        metrics.expense
      )}. Şu anki net sonuç ${money(metrics.net)}.`;
    }

    if (q.includes("ciro") && (q.includes("personel") || q.includes("çalışan") || q.includes("kim"))) {
      const ranked = snapshot.staff
        .map((item) => {
          const serviceRevenue = Number(item.service_revenue ?? 0);
          const productRevenue = Number(item.product_revenue ?? 0);

          return {
            name: item.staff_members?.display_name || "İsimsiz personel",
            revenue:
              (Number.isFinite(serviceRevenue) ? serviceRevenue : 0) +
              (Number.isFinite(productRevenue) ? productRevenue : 0),
            services: Number(item.completed_services || 0),
          };
        })
        .sort((a, b) => b.revenue - a.revenue);

      if (!ranked.length) return "Bu ay için personel performans kaydı bulunamadı.";
      const best = ranked[0];
      return `Bu ay en yüksek ciro ${best.name} tarafından üretildi: ${money(
        best.revenue
      )}. Tamamlanan işlem sayısı ${best.services}.`;
    }

    if (q.includes("randevu") && (q.includes("bugün") || q.includes("bugunku") || q.includes("özet"))) {
      if (!snapshot.appointments.length) return "Bugün için kayıtlı randevu bulunmuyor.";
      const rows = snapshot.appointments
        .slice(0, 8)
        .map(
          (item) =>
            `${dateTime(item.starts_at)} — ${
              item.customers?.full_name || "Müşteri"
            } (${item.status})`
        )
        .join("\n");
      return `Bugün toplam ${snapshot.appointments.length} randevu var. Aktif görünen randevu sayısı ${metrics.activeAppointments}.\n\n${rows}`;
    }

    if (q.includes("borç") || q.includes("alacak")) {
      const debtors = snapshot.packages.filter((item) => {
        const totalAmount = Number(item.total_amount ?? 0);
        const paidAmount = Number(item.paid_amount ?? 0);
        return (
          (Number.isFinite(totalAmount) ? totalAmount : 0) >
          (Number.isFinite(paidAmount) ? paidAmount : 0)
        );
      }).length;
      return `Aktif paketlerde toplam müşteri borcu ${money(
        metrics.debt
      )}. Borç bakiyesi bulunan paket sayısı ${debtors}.`;
    }

    if (q.includes("yeni müşteri") || (q.includes("müşteri") && q.includes("30"))) {
      return `Son 30 günde sisteme ${metrics.newCustomers} yeni müşteri kaydı eklendi.`;
    }

    if (q.includes("gider") && (q.includes("kategori") || q.includes("yüksek") || q.includes("en çok"))) {
      const grouped = new Map<string, number>();
      snapshot.expenses.forEach((item) => {
        const key = item.category || "Genel";
        const amount = Number(item.amount ?? 0);
        grouped.set(
          key,
          (grouped.get(key) || 0) + (Number.isFinite(amount) ? amount : 0)
        );
      });
      const ranked = [...grouped.entries()].sort((a, b) => b[1] - a[1]);
      if (!ranked.length) return "Bu ay için gider kaydı bulunamadı.";
      return `Bu ay en yüksek gider kategorisi ${ranked[0][0]}: ${money(
        ranked[0][1]
      )}.`;
    }

    if (q.includes("tahsilat") || q.includes("gelir") || q.includes("ciro")) {
      return `Bu ay kaydedilen toplam tahsilat ${money(
        metrics.income
      )}. Aynı dönemde gider ${money(metrics.expense)}, net sonuç ${money(metrics.net)}.`;
    }

    return `Bu soruyu henüz doğrudan yorumlayamadım. Şunlardan birini sorabilirsin:\n• Bu ay net kazancım ne kadar?\n• Bugünkü randevuları özetle\n• En çok ciro yapan personel kim?\n• Toplam müşteri borcu ne kadar?\n• Son 30 günde kaç yeni müşteri geldi?\n• Bu ay en yüksek gider kategorisi hangisi?`;
  }

  async function ask(rawQuestion: string) {
    const clean = rawQuestion.trim();
    if (!clean || thinking) return;

    setMessages((current) => [
      ...current,
      {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
        role: "user",
        text: clean,
        createdAt: new Date().toISOString(),
      },
    ]);
    setQuestion("");
    setThinking(true);

    await new Promise((resolve) => window.setTimeout(resolve, 350));
    const response = answerQuestion(clean);

    setMessages((current) => [
      ...current,
      {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
        role: "assistant",
        text: response,
        createdAt: new Date().toISOString(),
      },
    ]);
    setThinking(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(question);
  }

  return (
    <PlatformShell title="Yapay Zekâ İşletme Asistanı">
      <div className={styles.page}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>
              <Sparkles size={15} />
              TDA Intelligence
            </span>
            <h1>İşletmeni konuşarak analiz et</h1>
            <p>
              Salon verilerinden güvenli ve anlık özetler üretir. Finansal kayıt
              oluşturmaz, yalnızca mevcut bilgileri analiz eder.
            </p>
          </div>
          <button
            className={styles.refresh}
            type="button"
            onClick={() => void load(true)}
            disabled={refreshing}
          >
            <RefreshCw size={17} className={refreshing ? styles.spin : ""} />
            Verileri yenile
          </button>
        </section>

        {error ? <div className={styles.error}>{error}</div> : null}

        <section className={styles.metrics}>
          <article>
            <CircleDollarSign size={20} />
            <span>Bu ay tahsilat</span>
            <strong>{loading ? "—" : money(metrics.income)}</strong>
          </article>
          <article>
            <WalletCards size={20} />
            <span>Bu ay net</span>
            <strong>{loading ? "—" : money(metrics.net)}</strong>
          </article>
          <article>
            <CalendarClock size={20} />
            <span>Bugünkü randevu</span>
            <strong>{loading ? "—" : metrics.activeAppointments}</strong>
          </article>
          <article>
            <Users size={20} />
            <span>30 günlük yeni müşteri</span>
            <strong>{loading ? "—" : metrics.newCustomers}</strong>
          </article>
        </section>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sideTitle}>
              <MessageCircleQuestion size={18} />
              Hazır sorular
            </div>
            <div className={styles.quickList}>
              {QUICK_QUESTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => void ask(item)}
                  disabled={loading || thinking}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className={styles.insight}>
              <TrendingUp size={19} />
              <div>
                <b>Anlık görünüm</b>
                <span>
                  Müşteri alacağı: {loading ? "—" : money(metrics.debt)}
                </span>
              </div>
            </div>
          </aside>

          <section className={styles.chat}>
            <div className={styles.chatHeader}>
              <div className={styles.botIcon}>
                <Bot size={23} />
              </div>
              <div>
                <b>TDA İşletme Asistanı</b>
                <span>{loading ? "Veriler hazırlanıyor..." : "Çevrimiçi"}</span>
              </div>
            </div>

            <div className={styles.messages}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "user"
                      ? styles.userMessage
                      : styles.assistantMessage
                  }
                >
                  <p>{message.text}</p>
                </div>
              ))}
              {thinking ? (
                <div className={styles.assistantMessage}>
                  <p className={styles.thinking}>
                    <LoaderCircle size={16} className={styles.spin} />
                    Veriler analiz ediliyor...
                  </p>
                </div>
              ) : null}
            </div>

            <form className={styles.composer} onSubmit={submit}>
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Örn: Bu ay net kazancım ne kadar?"
                disabled={loading || thinking}
              />
              <button
                type="submit"
                disabled={!question.trim() || loading || thinking}
                aria-label="Soruyu gönder"
              >
                <Send size={18} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </PlatformShell>
  );
}
