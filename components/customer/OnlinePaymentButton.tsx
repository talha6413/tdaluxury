"use client";

import { CreditCard, LoaderCircle, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import styles from "./OnlinePaymentButton.module.css";

type Props = {
  packageId: string;
  packageTitle: string;
  debt: number;
  onPaid?: () => void;
};

function money(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function OnlinePaymentButton({
  packageId,
  packageTitle,
  debt,
}: Props) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(debt.toFixed(2));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");

  async function startPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const numericAmount = Number(amount.replace(",", "."));

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      numericAmount > debt
    ) {
      setMessage(`Ödeme tutarı 0 TL ile ${money(debt)} arasında olmalıdır.`);
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      const supabase = getSupabaseBrowserClient();
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        throw new Error("Oturum süresi dolmuş. Tekrar giriş yapın.");
      }

      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          packageId,
          amount: numericAmount,
        }),
      });

      const result = (await response.json()) as {
        iframeUrl?: string;
        message?: string;
      };

      if (!response.ok || !result.iframeUrl) {
        throw new Error(result.message || "Ödeme ekranı başlatılamadı.");
      }

      setIframeUrl(result.iframeUrl);
    } catch (caught) {
      setMessage(
        caught instanceof Error ? caught.message : "Ödeme başlatılamadı."
      );
    } finally {
      setBusy(false);
    }
  }

  function closeModal() {
    setOpen(false);
    setIframeUrl("");
    setMessage("");
  }

  return (
    <>
      <button
        className={styles.payButton}
        type="button"
        onClick={() => setOpen(true)}
      >
        <CreditCard size={17} /> Online öde
      </button>

      {open ? (
        <div className={styles.backdrop} role="dialog" aria-modal="true">
          <section className={styles.modal}>
            <header>
              <div>
                <small>GÜVENLİ ONLINE ÖDEME</small>
                <h3>{packageTitle}</h3>
              </div>
              <button type="button" onClick={closeModal} aria-label="Kapat">
                <X />
              </button>
            </header>

            {iframeUrl ? (
              <iframe
                title="PayTR güvenli ödeme"
                src={iframeUrl}
                className={styles.iframe}
              />
            ) : (
              <form onSubmit={startPayment}>
                <p>
                  Kalan borç: <b>{money(debt)}</b>
                </p>

                <label>
                  Ödenecek tutar
                  <div className={styles.amount}>
                    <span>₺</span>
                    <input
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      inputMode="decimal"
                    />
                  </div>
                </label>

                <button className={styles.submit} disabled={busy}>
                  {busy ? (
                    <LoaderCircle className={styles.spin} size={18} />
                  ) : (
                    <CreditCard size={18} />
                  )}
                  Güvenli ödeme ekranını aç
                </button>

                {message ? (
                  <div className={styles.message}>{message}</div>
                ) : null}

                <small className={styles.note}>
                  Kart bilgileriniz TDA Luxury sunucularında tutulmaz.
                </small>
              </form>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
