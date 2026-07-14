"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { dispatchConversion } from "@/lib/analytics";

const services = [
  "Lazer Epilasyon",
  "Erkek Lazer Epilasyon",
  "Cilt Bakımı",
  "Kalıcı Makyaj",
  "Bölgesel İncelme",
  "Kaş & Kirpik",
  "Tırnak Hizmetleri",
  "Diğer",
];

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const privacyAccepted = formData.get("privacy") === "on";
    const normalizedPhone = normalizePhone(phone);

    if (name.length < 2) {
      setError("Lütfen adınızı ve soyadınızı kontrol edin.");
      return;
    }

    if (normalizedPhone.length < 10 || normalizedPhone.length > 12) {
      setError("Lütfen geçerli bir telefon numarası girin.");
      return;
    }

    if (!service) {
      setError("Lütfen ilgilendiğiniz hizmeti seçin.");
      return;
    }

    if (!privacyAccepted) {
      setError("Randevu iletişimi için bilgilendirme onayını işaretleyin.");
      return;
    }

    const text = [
      "Merhaba, TDA Luxury web sitesi üzerinden randevu oluşturmak istiyorum.",
      `Ad Soyad: ${name}`,
      `Telefon: ${phone}`,
      `İlgilendiğim hizmet: ${service}`,
      message ? `Not: ${message}` : "",
      `Kaynak sayfa: ${window.location.pathname}`,
    ]
      .filter(Boolean)
      .join("\n");

    dispatchConversion({
      event_name: "appointment_form_submit",
      source: "contact_form",
      service,
      page_path: window.location.pathname,
    });

    setSubmitted(true);
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-head">
        <p className="section-label">RANDEVU TALEBİ</p>
        <h2>Size Uygun Zamanı Birlikte Planlayalım</h2>
        <p>
          Bilgilerinizi girin; form WhatsApp üzerinden düzenli bir randevu
          mesajı oluşturur.
        </p>
      </div>

      <div className="contact-form-grid">
        <label>
          <span>Ad Soyad</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Adınız ve soyadınız"
            required
          />
        </label>
        <label>
          <span>Telefon</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="05__ ___ __ __"
            required
          />
        </label>
        <label className="contact-form-full">
          <span>İlgilendiğiniz Hizmet</span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>
              Hizmet seçin
            </option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>
        <label className="contact-form-full">
          <span>Mesajınız</span>
          <textarea
            name="message"
            rows={5}
            placeholder="Size nasıl yardımcı olabiliriz?"
          />
        </label>
      </div>

      <label className="contact-privacy-consent">
        <input name="privacy" type="checkbox" required />
        <span>
          Bilgilerimin yalnızca randevu iletişimi amacıyla kullanılmasını ve
          <a href="/kvkk-aydinlatma-metni"> KVKK Aydınlatma Metni</a> kapsamında
          işlenmesini kabul ediyorum.
        </span>
      </label>

      {error && (
        <p className="contact-form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="contact-submit">
        WhatsApp&apos;ta Randevu Oluştur
        <ArrowRight size={18} />
      </button>

      <p className="contact-form-note">
        <ShieldCheck size={16} />
        Kart bilgisi veya ödeme talep edilmez. Mesaj doğrudan WhatsApp&apos;ta açılır.
      </p>

      {submitted && (
        <p className="contact-form-success" aria-live="polite">
          <CheckCircle2 size={17} />
          WhatsApp mesajınız hazırlandı. Yeni sekme açılmadıysa tarayıcı pop-up
          iznini kontrol edin.
        </p>
      )}
    </form>
  );
}
