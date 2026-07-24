"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
  Banknote,
  CirclePlus,
  CreditCard,
  Landmark,
  LoaderCircle,
  RefreshCw,
  Search,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import PlatformShell from "./PlatformShell";
import styles from "./FinanceManagement.module.css";

type PaymentMethod = "cash" | "card" | "transfer" | "other";

type Customer = {
  id: string;
  full_name: string;
  phone: string;
};

type CustomerPackage = {
  id: string;
  customer_id: string;
  title: string;
  total_amount: number | string;
  paid_amount: number | string;
  active: boolean;
};

type Payment = {
  id: string;
  customer_id: string;
  package_id: string | null;
  amount: number | string;
  method: PaymentMethod;
  paid_at: string;
  reference: string;
  notes: string;
  customers: { full_name: string; phone: string } | null;
  customer_packages: { title: string } | null;
};

type Expense = {
  id: string;
  title: string;
  amount: number | string;
  category: string;
  paid_at: string;
  notes: string;
};

const methodLabels: Record<PaymentMethod, string> = {
  cash: "Nakit",
  card: "Kart / POS",
  transfer: "Havale / EFT",
  other: "Diğer",
};

function localDateTimeInput() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 16);
}

function monthStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

function nextMonthStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1);
}

function todayStart() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

function tomorrowStart() {
  const value = todayStart();
  value.setDate(value.getDate() + 1);
  return value;
}

function formatMoney(value: number | string | null | undefined) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function FinanceManagement() {
  const [period, setPeriod] = useState<"today" | "month">("month");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [packages, setPackages] = useState<CustomerPackage[]>([]);
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState<"all" | PaymentMethod>("all");
  const [tab, setTab] = useState<"movements" | "receivables">("movements");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<"payment" | "expense" | null>(null);
  const [error, setError] = useState("");

  const [paymentForm, setPaymentForm] = useState({
    customer_id: "",
    package_id: "",
    amount: "",
    method: "cash" as PaymentMethod,
    paid_at: localDateTimeInput(),
    reference: "",
    notes: "",
  });

  const [expenseForm, setExpenseForm] = useState({
    title: "",
    amount: "",
    category: "Genel",
    paid_at: localDateTimeInput(),
    notes: "",
  });

  const load = useCallback(async (silent = false) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError("");

    try {
      const from = period === "today" ? todayStart() : monthStart();
      const to = period === "today" ? tomorrowStart() : nextMonthStart();
      const supabase = getSupabaseBrowserClient();

      const [paymentResult, expenseResult, customerResult, packageResult] =
        await Promise.all([
          supabase
            .from("payments")
            .select(
              "id, customer_id, package_id, amount, method, paid_at, reference, notes, customers(full_name, phone), customer_packages(title)"
            )
            .gte("paid_at", from.toISOString())
            .lt("paid_at", to.toISOString())
            .order("paid_at", { ascending: false }),
          supabase
            .from("expenses")
            .select("id, title, amount, category, paid_at, notes")
            .gte("paid_at", from.toISOString())
            .lt("paid_at", to.toISOString())
            .order("paid_at", { ascending: false }),
          supabase
            .from("customers")
            .select("id, full_name, phone")
            .eq("active", true)
            .order("full_name"),
          supabase
            .from("customer_packages")
            .select("id, customer_id, title, total_amount, paid_amount, active")
            .eq("active", true)
            .order("created_at", { ascending: false }),
        ]);

      const firstError =
        paymentResult.error ||
        expenseResult.error ||
        customerResult.error ||
        packageResult.error;

      if (firstError) throw firstError;

      setPayments((paymentResult.data || []) as Payment[]);
      setExpenses((expenseResult.data || []) as Expense[]);
      setCustomers((customerResult.data || []) as Customer[]);
      setPackages((packageResult.data || []) as CustomerPackage[]);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Finans kayıtları yüklenemedi."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [period]);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const totals = useMemo(() => {
    const income = payments.reduce(
      (total, item) => total + Number(item.amount || 0),
      0
    );
    const expense = expenses.reduce(
      (total, item) => total + Number(item.amount || 0),
      0
    );

    const byMethod = (target: PaymentMethod) =>
      payments
        .filter((item) => item.method === target)
        .reduce((total, item) => total + Number(item.amount || 0), 0);

    return {
      income,
      expense,
      net: income - expense,
      cash: byMethod("cash"),
      card: byMethod("card"),
      transfer: byMethod("transfer"),
    };
  }, [payments, expenses]);

  const receivables = useMemo(
    () =>
      packages
        .map((item) => {
          const customer = customers.find(
            (customerItem) => customerItem.id === item.customer_id
          );
          const debt = Math.max(
            0,
            Number(item.total_amount || 0) - Number(item.paid_amount || 0)
          );

          return { ...item, customer, debt };
        })
        .filter((item) => item.debt > 0)
        .sort((a, b) => b.debt - a.debt),
    [packages, customers]
  );

  const totalReceivable = useMemo(
    () => receivables.reduce((total, item) => total + item.debt, 0),
    [receivables]
  );

  const movements = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");

    const incomeRows = payments
      .filter((item) => method === "all" || item.method === method)
      .map((item) => ({
        id: `payment-${item.id}`,
        type: "income" as const,
        title: item.customers?.full_name || "Müşteri ödemesi",
        subtitle:
          item.customer_packages?.title ||
          item.reference ||
          methodLabels[item.method],
        amount: Number(item.amount),
        date: item.paid_at,
      }));

    const expenseRows = expenses.map((item) => ({
      id: `expense-${item.id}`,
      type: "expense" as const,
      title: item.title,
      subtitle: item.category,
      amount: Number(item.amount),
      date: item.paid_at,
    }));

    return [...incomeRows, ...expenseRows]
      .filter((item) => {
        const haystack = `${item.title} ${item.subtitle}`.toLocaleLowerCase(
          "tr-TR"
        );
        return !normalized || haystack.includes(normalized);
      })
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }, [payments, expenses, query, method]);

  const availablePackages = useMemo(
    () =>
      packages.filter(
        (item) =>
          item.customer_id === paymentForm.customer_id &&
          Number(item.total_amount || 0) > Number(item.paid_amount || 0)
      ),
    [packages, paymentForm.customer_id]
  );

  function openPayment(customerId = "", packageId = "", amount = "") {
    setPaymentForm({
      customer_id: customerId,
      package_id: packageId,
      amount,
      method: "cash",
      paid_at: localDateTimeInput(),
      reference: "",
      notes: "",
    });
    setError("");
    setModal("payment");
  }

  function openExpense() {
    setExpenseForm({
      title: "",
      amount: "",
      category: "Genel",
      paid_at: localDateTimeInput(),
      notes: "",
    });
    setError("");
    setModal("expense");
  }

  async function savePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(paymentForm.amount);

    if (!paymentForm.customer_id || !Number.isFinite(amount) || amount <= 0) {
      setError("Müşteri ve geçerli ödeme tutarı zorunludur.");
      return;
    }

    const selectedPackage = packages.find(
      (item) => item.id === paymentForm.package_id
    );

    if (selectedPackage) {
      const remaining =
        Number(selectedPackage.total_amount || 0) -
        Number(selectedPackage.paid_amount || 0);

      if (amount > remaining) {
        setError(`Bu paket için kalan borç ${formatMoney(remaining)}.`);
        return;
      }
    }

    setSaving(true);
    setError("");
    const supabase = getSupabaseBrowserClient();

    const row = {
      customer_id: paymentForm.customer_id,
      package_id: paymentForm.package_id || null,
      amount,
      method: paymentForm.method,
      paid_at: new Date(paymentForm.paid_at).toISOString(),
      reference: paymentForm.reference.trim(),
      notes: paymentForm.notes.trim(),
    };

    const { error: paymentError } = await supabase
      .from("payments")
      .insert([row] as never[]);

    if (paymentError) {
      setSaving(false);
      setError(paymentError.message);
      return;
    }

    if (selectedPackage) {
      const nextPaid = Number(selectedPackage.paid_amount || 0) + amount;
      const { error: packageError } = await supabase
        .from("customer_packages")
        .update({
          paid_amount: nextPaid,
          updated_at: new Date().toISOString(),
        } as never)
        .eq("id", selectedPackage.id);

      if (packageError) {
        setSaving(false);
        setError(
          `Ödeme kaydedildi ancak paket bakiyesi güncellenemedi: ${packageError.message}`
        );
        await load(true);
        return;
      }
    }

    setSaving(false);
    setModal(null);
    await load(true);
  }

  async function saveExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(expenseForm.amount);

    if (!expenseForm.title.trim() || !Number.isFinite(amount) || amount <= 0) {
      setError("Gider adı ve geçerli tutar zorunludur.");
      return;
    }

    setSaving(true);
    setError("");
    const supabase = getSupabaseBrowserClient();

    const row = {
      title: expenseForm.title.trim(),
      amount,
      category: expenseForm.category.trim() || "Genel",
      paid_at: new Date(expenseForm.paid_at).toISOString(),
      notes: expenseForm.notes.trim(),
    };

    const { error: expenseError } = await supabase
      .from("expenses")
      .insert([row] as never[]);

    setSaving(false);

    if (expenseError) {
      setError(expenseError.message);
      return;
    }

    setModal(null);
    await load(true);
  }

  if (loading) {
    return (
      <PlatformShell title="Finans ve Kasa">
        <div className={styles.loading}>
          <LoaderCircle className={styles.spin} />
          <span>Finans kayıtları yükleniyor…</span>
        </div>
      </PlatformShell>
    );
  }

  return (
    <PlatformShell title="Finans ve Kasa" eyebrow="GELİR · GİDER · CARİ">
      <div className={styles.toolbar}>
        <div className={styles.period}>
          <button
            className={period === "today" ? styles.active : ""}
            onClick={() => setPeriod("today")}
          >
            Bugün
          </button>
          <button
            className={period === "month" ? styles.active : ""}
            onClick={() => setPeriod("month")}
          >
            Bu ay
          </button>
        </div>

        <button
          className={styles.refresh}
          onClick={() => void load(true)}
          disabled={refreshing}
        >
          <RefreshCw className={refreshing ? styles.spin : ""} size={17} />
          Yenile
        </button>
        <button className={styles.expenseButton} onClick={openExpense}>
          <ArrowDownCircle size={18} />
          Gider ekle
        </button>
        <button className={styles.paymentButton} onClick={() => openPayment()}>
          <CirclePlus size={18} />
          Ödeme al
        </button>
      </div>

      {error ? <div className={styles.error}>{error}</div> : null}

      <section className={styles.summary}>
        <article>
          <ArrowUpCircle />
          <span>Toplam gelir</span>
          <b>{formatMoney(totals.income)}</b>
        </article>
        <article>
          <ArrowDownCircle />
          <span>Toplam gider</span>
          <b>{formatMoney(totals.expense)}</b>
        </article>
        <article>
          <TrendingUp />
          <span>Net kasa</span>
          <b className={totals.net < 0 ? styles.negative : ""}>
            {formatMoney(totals.net)}
          </b>
        </article>
        <article>
          <DollarSign />
          <span>Bekleyen alacak</span>
          <b>{formatMoney(totalReceivable)}</b>
        </article>
      </section>

      <section className={styles.methods}>
        <article><Banknote /><span>Nakit</span><b>{formatMoney(totals.cash)}</b></article>
        <article><CreditCard /><span>Kart / POS</span><b>{formatMoney(totals.card)}</b></article>
        <article><Landmark /><span>Havale / EFT</span><b>{formatMoney(totals.transfer)}</b></article>
      </section>

      <div className={styles.tabs}>
        <button
          className={tab === "movements" ? styles.active : ""}
          onClick={() => setTab("movements")}
        >
          Kasa hareketleri
        </button>
        <button
          className={tab === "receivables" ? styles.active : ""}
          onClick={() => setTab("receivables")}
        >
          Cari ve alacaklar
          {receivables.length ? <em>{receivables.length}</em> : null}
        </button>
      </div>

      {tab === "movements" ? (
        <>
          <div className={styles.filters}>
            <div className={styles.search}>
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Müşteri, gider veya kategori ara"
              />
            </div>
            <select
              value={method}
              onChange={(event) =>
                setMethod(event.target.value as "all" | PaymentMethod)
              }
            >
              <option value="all">Tüm yöntemler</option>
              <option value="cash">Nakit</option>
              <option value="card">Kart / POS</option>
              <option value="transfer">Havale / EFT</option>
              <option value="other">Diğer</option>
            </select>
          </div>

          <section className={styles.list}>
            {movements.length ? (
              movements.map((item) => (
                <article key={item.id}>
                  <div
                    className={`${styles.movementIcon} ${
                      item.type === "income"
                        ? styles.incomeIcon
                        : styles.expenseIcon
                    }`}
                  >
                    {item.type === "income" ? (
                      <ArrowUpCircle size={20} />
                    ) : (
                      <ArrowDownCircle size={20} />
                    )}
                  </div>
                  <div className={styles.movementMain}>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                  <time>{formatDate(item.date)}</time>
                  <strong
                    className={
                      item.type === "income"
                        ? styles.incomeAmount
                        : styles.expenseAmount
                    }
                  >
                    {item.type === "income" ? "+" : "-"}
                    {formatMoney(item.amount)}
                  </strong>
                </article>
              ))
            ) : (
              <div className={styles.empty}>
                <Wallet size={34} />
                <b>Bu dönemde kasa hareketi bulunmuyor.</b>
                <span>Ödeme veya gider eklediğinizde burada görünecek.</span>
              </div>
            )}
          </section>
        </>
      ) : (
        <section className={styles.list}>
          {receivables.length ? (
            receivables.map((item) => (
              <article key={item.id}>
                <div className={`${styles.movementIcon} ${styles.debtIcon}`}>
                  <DollarSign size={20} />
                </div>
                <div className={styles.movementMain}>
                  <h3>{item.customer?.full_name || "Müşteri"}</h3>
                  <p>{item.title}</p>
                </div>
                <span className={styles.paidInfo}>
                  Ödenen {formatMoney(item.paid_amount)} /{" "}
                  {formatMoney(item.total_amount)}
                </span>
                <strong className={styles.debtAmount}>
                  {formatMoney(item.debt)}
                </strong>
                <button
                  className={styles.collect}
                  onClick={() =>
                    openPayment(item.customer_id, item.id, String(item.debt))
                  }
                >
                  Tahsil et
                </button>
              </article>
            ))
          ) : (
            <div className={styles.empty}>
              <DollarSign size={34} />
              <b>Bekleyen müşteri borcu bulunmuyor.</b>
              <span>Aktif paketlerin tahsilatları tamamlanmış.</span>
            </div>
          )}
        </section>
      )}

      {modal ? (
        <div className={styles.overlay} onMouseDown={() => setModal(null)}>
          <form
            className={styles.modal}
            onSubmit={modal === "payment" ? savePayment : saveExpense}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>{modal === "payment" ? "TAHSİLAT" : "GİDER"}</span>
                <h2>{modal === "payment" ? "Yeni ödeme al" : "Yeni gider ekle"}</h2>
              </div>
              <button type="button" onClick={() => setModal(null)}>
                <X size={20} />
              </button>
            </header>

            {modal === "payment" ? (
              <>
                <label>
                  Müşteri
                  <select
                    value={paymentForm.customer_id}
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        customer_id: event.target.value,
                        package_id: "",
                      })
                    }
                    required
                  >
                    <option value="">Müşteri seçin</option>
                    {customers.map((customer) => (
                      <option value={customer.id} key={customer.id}>
                        {customer.full_name} · {customer.phone}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Paket / borç
                  <select
                    value={paymentForm.package_id}
                    onChange={(event) => {
                      const selected = packages.find(
                        (item) => item.id === event.target.value
                      );
                      const debt = selected
                        ? Number(selected.total_amount || 0) -
                          Number(selected.paid_amount || 0)
                        : 0;

                      setPaymentForm({
                        ...paymentForm,
                        package_id: event.target.value,
                        amount: selected ? String(debt) : paymentForm.amount,
                      });
                    }}
                  >
                    <option value="">Paketsiz ödeme</option>
                    {availablePackages.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.title} · Kalan{" "}
                        {formatMoney(
                          Number(item.total_amount || 0) -
                            Number(item.paid_amount || 0)
                        )}
                      </option>
                    ))}
                  </select>
                </label>

                <div className={styles.formGrid}>
                  <label>
                    Tutar
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={paymentForm.amount}
                      onChange={(event) =>
                        setPaymentForm({
                          ...paymentForm,
                          amount: event.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    Ödeme yöntemi
                    <select
                      value={paymentForm.method}
                      onChange={(event) =>
                        setPaymentForm({
                          ...paymentForm,
                          method: event.target.value as PaymentMethod,
                        })
                      }
                    >
                      <option value="cash">Nakit</option>
                      <option value="card">Kart / POS</option>
                      <option value="transfer">Havale / EFT</option>
                      <option value="other">Diğer</option>
                    </select>
                  </label>
                </div>

                <label>
                  Tarih ve saat
                  <input
                    type="datetime-local"
                    value={paymentForm.paid_at}
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        paid_at: event.target.value,
                      })
                    }
                    required
                  />
                </label>

                <label>
                  Referans
                  <input
                    value={paymentForm.reference}
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        reference: event.target.value,
                      })
                    }
                    placeholder="POS slip no veya EFT açıklaması"
                  />
                </label>

                <label>
                  Not
                  <textarea
                    value={paymentForm.notes}
                    onChange={(event) =>
                      setPaymentForm({
                        ...paymentForm,
                        notes: event.target.value,
                      })
                    }
                  />
                </label>
              </>
            ) : (
              <>
                <label>
                  Gider adı
                  <input
                    value={expenseForm.title}
                    onChange={(event) =>
                      setExpenseForm({
                        ...expenseForm,
                        title: event.target.value,
                      })
                    }
                    placeholder="Kira, reklam, sarf malzeme…"
                    required
                  />
                </label>

                <div className={styles.formGrid}>
                  <label>
                    Tutar
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={expenseForm.amount}
                      onChange={(event) =>
                        setExpenseForm({
                          ...expenseForm,
                          amount: event.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    Kategori
                    <input
                      value={expenseForm.category}
                      onChange={(event) =>
                        setExpenseForm({
                          ...expenseForm,
                          category: event.target.value,
                        })
                      }
                    />
                  </label>
                </div>

                <label>
                  Tarih ve saat
                  <input
                    type="datetime-local"
                    value={expenseForm.paid_at}
                    onChange={(event) =>
                      setExpenseForm({
                        ...expenseForm,
                        paid_at: event.target.value,
                      })
                    }
                    required
                  />
                </label>

                <label>
                  Not
                  <textarea
                    value={expenseForm.notes}
                    onChange={(event) =>
                      setExpenseForm({
                        ...expenseForm,
                        notes: event.target.value,
                      })
                    }
                  />
                </label>
              </>
            )}

            <button className={styles.save} disabled={saving}>
              {saving ? (
                <LoaderCircle className={styles.spin} size={18} />
              ) : modal === "payment" ? (
                <DollarSign size={18} />
              ) : (
                <ArrowDownCircle size={18} />
              )}
              {modal === "payment" ? "Ödemeyi kaydet" : "Gideri kaydet"}
            </button>
          </form>
        </div>
      ) : null}
    </PlatformShell>
  );
}
