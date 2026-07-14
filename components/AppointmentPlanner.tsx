"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Check, Clock3, MessageCircle, Phone, UserRound } from "lucide-react";
import { site, waUrl } from "@/lib/site";
import { dispatchConversion } from "@/lib/analytics";

const services = [
  "Lazer Epilasyon",
  "Erkek Lazer Epilasyon",
  "Cilt Bakımı",
  "Kalıcı Makyaj",
  "Kaş & Kirpik",
  "Bölgesel İncelme",
  "Tırnak",
  "Diğer",
];

const timeOptions = ["Sabah", "Öğleden sonra", "Akşamüstü", "Fark etmez"];

export default function AppointmentPlanner() {
  const [gender, setGender] = useState("");
  const [service, setService] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState("");

  const progress = useMemo(() => {
    return [gender, service, preferredTime, name.trim(), phone.trim()].filter(Boolean).length;
  }, [gender, service, preferredTime, name, phone]);

  const submit = () => {
    if (!gender || !service || !preferredTime || !name.trim() || !phone.trim()) {
      setError("Lütfen danışan, hizmet, saat tercihi, ad soyad ve telefon alanlarını tamamlayın.");
      return;
    }

    const normalizedPhone = phone.replace(/\D/g, "");
    if (normalizedPhone.length < 10 || normalizedPhone.length > 12) {
      setError("Telefon numarasını kontrol edin.");
      return;
    }

    if (!privacyAccepted) {
      setError("Randevu iletişimi için KVKK bilgilendirme onayını işaretleyin.");
      return;
    }

    setError("");
    const message = [
      "Merhaba, TDA Luxury web sitesinden randevu talebi oluşturuyorum.",
      `Ad Soyad: ${name.trim()}`,
      `Telefon: ${phone.trim()}`,
      `Danışan: ${gender}`,
      `Hizmet: ${service}`,
      `Saat tercihi: ${preferredTime}`,
      note.trim() ? `Not: ${note.trim()}` : "",
      "Uygun gün ve saatleri paylaşabilir misiniz?",
    ]
      .filter(Boolean)
      .join("\n");

    dispatchConversion({
      event_name: "appointment_form_submit",
      source: "appointment_planner",
      service,
      page_path: window.location.pathname,
    });

    window.open(waUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="appointment-planner" aria-labelledby="appointment-title">
      <div className="appointment-progress" aria-label={`Randevu formu ${progress} / 5 tamamlandı`}>
        <span style={{ width: `${(progress / 5) * 100}%` }} />
      </div>

      <div className="appointment-planner-head">
        <span>ÜCRETSİZ ÖN GÖRÜŞME</span>
        <h2 id="appointment-title">Randevu talebinizi 1 dakikada hazırlayın.</h2>
        <p>Seçimlerinizi tamamlayın; bilgileriniz hazır mesaj olarak WhatsApp’a aktarılsın.</p>
      </div>

      <div className="appointment-form-grid">
        <fieldset className="appointment-fieldset">
          <legend><UserRound size={18} /> Danışan</legend>
          <div className="appointment-choice-grid two">
            {["Kadın", "Erkek"].map((item) => (
              <button key={item} type="button" className={gender === item ? "selected" : ""} onClick={() => setGender(item)}>
                {gender === item ? <Check size={17} /> : null}{item}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="appointment-fieldset appointment-fieldset-wide">
          <legend><CalendarDays size={18} /> Hizmet</legend>
          <div className="appointment-choice-grid services">
            {services.map((item) => (
              <button key={item} type="button" className={service === item ? "selected" : ""} onClick={() => setService(item)}>
                {service === item ? <Check size={16} /> : null}{item}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="appointment-fieldset appointment-fieldset-wide">
          <legend><Clock3 size={18} /> Saat tercihi</legend>
          <div className="appointment-choice-grid four">
            {timeOptions.map((item) => (
              <button key={item} type="button" className={preferredTime === item ? "selected" : ""} onClick={() => setPreferredTime(item)}>
                {preferredTime === item ? <Check size={16} /> : null}{item}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="appointment-input">
          <span>Ad Soyad</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Adınızı ve soyadınızı yazın" autoComplete="name" />
        </label>

        <label className="appointment-input">
          <span>Telefon</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="05__ ___ __ __" inputMode="tel" autoComplete="tel" />
        </label>

        <label className="appointment-input appointment-input-wide">
          <span>Notunuz (isteğe bağlı)</span>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Özellikle belirtmek istediğiniz bir konu varsa yazabilirsiniz." rows={4} />
        </label>
      </div>

      <label className="appointment-privacy">
        <input
          type="checkbox"
          checked={privacyAccepted}
          onChange={(event) => setPrivacyAccepted(event.target.checked)}
        />
        <span>
          Bilgilerimin yalnızca randevu iletişimi amacıyla kullanılmasını ve
          <a href="/kvkk-aydinlatma-metni"> KVKK Aydınlatma Metni</a> kapsamında
          işlenmesini kabul ediyorum.
        </span>
      </label>

      {error ? <p className="appointment-error" role="alert">{error}</p> : null}

      <div className="appointment-actions">
        <button type="button" onClick={submit} className="appointment-primary">
          <MessageCircle size={20} /> WhatsApp’ta Randevu Talebi Oluştur <ArrowRight size={18} />
        </button>
        <a href={`tel:+${site.whatsapp}`} className="appointment-secondary">
          <Phone size={18} /> {site.phoneDisplay}
        </a>
      </div>

      <p className="appointment-note">Bu form doğrudan rezervasyon oluşturmaz. Ekibimiz uygun gün ve saat için WhatsApp üzerinden dönüş yapar.</p>
    </section>
  );
}
