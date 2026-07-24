"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarClock,
  CircleDollarSign,
  LoaderCircle,
  PackageCheck,
  RefreshCw,
  TrendingUp,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import PlatformShell from "./PlatformShell";
import styles from "./Dashboard.module.css";

type PaymentRow = { amount: number | string; paid_at: string };
type ExpenseRow = { amount: number | string; paid_at: string };
type AppointmentRow = {
  id: string;
  starts_at: string;
  status: string;
  customer_id: string;
};
type CustomerRow = {
  id: string;
  full_name: string;
  created_at: string;
  active: boolean;
};
type PackageRow = {
  id: string;
  total_amount: number | string;
  paid_amount: number | string;
  active: boolean;
};
type DailyPoint = { label: string; income: number; expense: number };

type DashboardData = {
  todayIncome: number;
  monthIncome: number;
  monthExpense: number;
  todayAppointments: number;
  pendingAppointments: number;
  activeCustomers: number;
  newCustomers: number;
  activePackages: number;
  receivables: number;
  daily: DailyPoint[];
  recentCustomers: CustomerRow[];
};

const emptyData: DashboardData = {
  todayIncome: 0,
  monthIncome: 0,
  monthExpense: 0,
  todayAppointments: 0,
  pendingAppointments: 0,
  activeCustomers: 0,
  newCustomers: 0,
  activePackages: 0,
  receivables: 0,
  daily: [],
  recentCustomers: [],
};

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function money(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function number(value: number | string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sameDay(left: string, right: Date) {
  const d = new Date(left);
  return (
    d.getFullYear() === right.getFullYear() &&
    d.getMonth() === right.getMonth() &&
    d.getDate() === right.getDate()
  );
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (silent = false) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError("");

    try {
      const supabase = getSupabaseBrowserClient();
      const now = new Date();
      const todayStart = startOfDay(now);
      const todayEnd = endOfDay(now);
      const monthStart = startOfMonth(now);
      const sevenDaysAgo = startOfDay(new Date(now.getTime() - 6 * 86400000));

      const [
        paymentsResult,
        expensesResult,
        appointmentsResult,
        customersResult,
        packagesResult,
      ] = await Promise.all([
        supabase
          .from("payments")
          .select("amount, paid_at")
          .gte("paid_at", sevenDaysAgo.toISOString())
          .order("paid_at", { ascending: true }),
        supabase
          .from("expenses")
          .select("amount, paid_at")
          .gte("paid_at", sevenDaysAgo.toISOString())
          .order("paid_at", { ascending: true }),
        supabase
          .from("appointments")
          .select("id, starts_at, status, customer_id")
          .gte("starts_at", monthStart.toISOString())
          .lte("starts_at", todayEnd.toISOString()),
        supabase
          .from("customers")
          .select("id, full_name, created_at, active")
          .order("created_at", { ascending: false }),
        supabase
          .from("customer_packages")
          .select("id, total_amount, paid_amount, active"),
      ]);

      const firstError =
        paymentsResult.error ||
        expensesResult.error ||
        appointmentsResult.error ||
        customersResult.error ||
        packagesResult.error;

      if (firstError) throw firstError;

      const payments = (paymentsResult.data || []) as PaymentRow[];
      const expenses = (expensesResult.data || []) as ExpenseRow[];
      const appointments = (appointmentsResult.data || []) as AppointmentRow[];
      const customers = (customersResult.data || []) as CustomerRow[];
      const packages = (packagesResult.data || []) as PackageRow[];

      const todayIncome = payments
        .filter((row) => sameDay(row.paid_at, now))
        .reduce((sum, row) => sum + number(row.amount), 0);

      const monthIncome = payments
        .filter((row) => new Date(row.paid_at) >= monthStart)
        .reduce((sum, row) => sum + number(row.amount), 0);

      const monthExpense = expenses
        .filter((row) => new Date(row.paid_at) >= monthStart)
        .reduce((sum, row) => sum + number(row.amount), 0);

      const daily = Array.from({ length: 7 }, (_, index) => {
        const day = new Date(sevenDaysAgo.getTime() + index * 86400000);
        return {
          label: new Intl.DateTimeFormat("tr-TR", { weekday: "short" }).format(day),
          income: payments
            .filter((row) => sameDay(row.paid_at, day))
            .reduce((sum, row) => sum + number(row.amount), 0),
          expense: expenses
            .filter((row) => sameDay(row.paid_at, day))
            .reduce((sum, row) => sum + number(row.amount), 0),
        };
      });

      setData({
        todayIncome,
        monthIncome,
        monthExpense,
        todayAppointments: appointments.filter((row) => sameDay(row.starts_at, now)).length,
        pendingAppointments: appointments.filter((row) =>
          ["pending", "bekliyor", "requested"].includes(String(row.status).toLowerCase())
        ).length,
        activeCustomers: customers.filter((row) => row.active).length,
        newCustomers: customers.filter((row) => new Date(row.created_at) >= monthStart).length,
        activePackages: packages.filter((row) => row.active).length,
        receivables: packages.reduce(
          (sum, row) => sum + Math.max(0, number(row.total_amount) - number(row.paid_amount)),
          0
        ),
        daily,
        recentCustomers: customers.slice(0, 5),
      });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Dashboard verileri alınamadı.";
      setError(
        message.toLowerCase().includes("permission")
          ? "Bu ekran için yönetici oturumu veya Supabase RLS yetkisi gerekiyor."
          : message
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

  const maxChartValue = useMemo(
    () => Math.max(1, ...data.daily.flatMap((item) => [item.income, item.expense])),
    [data.daily]
  );

  const netProfit = data.monthIncome - data.monthExpense;

  if (loading) {
    return (
      <PlatformShell title="İşletme Kontrol Merkezi">
        <div className={styles.loading}>
          <LoaderCircle className={styles.spin} />
          <span>Canlı işletme verileri yükleniyor…</span>
        </div>
      </PlatformShell>
    );
  }

  return (
    <PlatformShell title="İşletme Kontrol Merkezi">
      <div className={styles.toolbar}>
        <div>
          <span>CANLI SUPABASE VERİLERİ</span>
          <p>Rakamlar ödeme, randevu, müşteri ve paket kayıtlarından hesaplanır.</p>
        </div>
        <button onClick={() => void load(true)} disabled={refreshing}>
          <RefreshCw className={refreshing ? styles.spin : ""} size={17} />
          Yenile
        </button>
      </div>

      {error ? (
        <div className={styles.error}>
          <AlertTriangle size={19} />
          <span>{error}</span>
        </div>
      ) : null}

      <section className={styles.stats}>
        <article>
          <div><CircleDollarSign /><span>BUGÜN</span></div>
          <small>Bugünkü ciro</small>
          <strong>{money(data.todayIncome)}</strong>
        </article>
        <article>
          <div><CalendarClock /><span>CANLI</span></div>
          <small>Bugünkü randevu</small>
          <strong>{data.todayAppointments}</strong>
        </article>
        <article>
          <div><Users /><span>AKTİF</span></div>
          <small>Aktif müşteri</small>
          <strong>{data.activeCustomers}</strong>
        </article>
        <article>
          <div><UserPlus /><span>BU AY</span></div>
          <small>Yeni müşteri</small>
          <strong>{data.newCustomers}</strong>
        </article>
      </section>

      <section className={styles.finance}>
        <article>
          <WalletCards />
          <div><small>Aylık tahsilat</small><b>{money(data.monthIncome)}</b></div>
        </article>
        <article>
          <TrendingUp />
          <div><small>Aylık net sonuç</small><b>{money(netProfit)}</b></div>
        </article>
        <article>
          <PackageCheck />
          <div><small>Aktif paket</small><b>{data.activePackages}</b></div>
        </article>
        <article>
          <AlertTriangle />
          <div><small>Bekleyen alacak</small><b>{money(data.receivables)}</b></div>
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.chartCard}>
          <header>
            <div>
              <span>SON 7 GÜN</span>
              <h2>Gelir ve gider hareketi</h2>
            </div>
            <small>Gider: {money(data.monthExpense)}</small>
          </header>

          <div className={styles.chart}>
            {data.daily.map((point) => (
              <div className={styles.chartDay} key={point.label}>
                <div className={styles.bars}>
                  <i
                    className={styles.incomeBar}
                    style={{ height: `${Math.max(4, (point.income / maxChartValue) * 100)}%` }}
                    title={`Gelir: ${money(point.income)}`}
                  />
                  <i
                    className={styles.expenseBar}
                    style={{ height: `${Math.max(4, (point.expense / maxChartValue) * 100)}%` }}
                    title={`Gider: ${money(point.expense)}`}
                  />
                </div>
                <span>{point.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.legend}>
            <span><i className={styles.incomeDot} /> Gelir</span>
            <span><i className={styles.expenseDot} /> Gider</span>
          </div>
        </article>

        <article className={styles.quick}>
          <span>HIZLI İŞLEMLER</span>
          <Link href="/yonetim-v2/randevular">Randevuları yönet <ArrowUpRight /></Link>
          <Link href="/yonetim-v2/musteriler">Müşteri kartları <ArrowUpRight /></Link>
          <Link href="/yonetim-v2/finans">Finans ve cari <ArrowUpRight /></Link>
          <Link href="/dijital-onam">Onam formu aç <ArrowUpRight /></Link>
        </article>
      </section>

      <section className={styles.bottom}>
        <article className={styles.recent}>
          <header>
            <div><span>SON KAYITLAR</span><h2>Yeni müşteriler</h2></div>
            <UserPlus />
          </header>
          {data.recentCustomers.length ? (
            data.recentCustomers.map((customer) => (
              <div className={styles.customerRow} key={customer.id}>
                <div>
                  <b>{customer.full_name}</b>
                  <small>
                    {new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" }).format(
                      new Date(customer.created_at)
                    )}
                  </small>
                </div>
                <em>{customer.active ? "Aktif" : "Pasif"}</em>
              </div>
            ))
          ) : (
            <p className={styles.empty}>Henüz müşteri kaydı bulunmuyor.</p>
          )}
        </article>

        <article className={styles.summary}>
          <span>YÖNETİCİ ÖZETİ</span>
          <h2>Bugünkü görünüm</h2>
          <p><b>{data.todayAppointments}</b> randevu bulunuyor.</p>
          <p><b>{data.pendingAppointments}</b> randevu onay bekliyor.</p>
          <p><b>{data.activePackages}</b> aktif paket takip ediliyor.</p>
          <p><b>{money(data.receivables)}</b> paket alacağı bulunuyor.</p>
        </article>
      </section>
    </PlatformShell>
  );
}
