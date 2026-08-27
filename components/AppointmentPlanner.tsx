"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";
import { site, waUrl } from "@/lib/site";
import { dispatchConversion } from "@/lib/analytics";
import styles from "./AppointmentPlanner.module.css";

const publicServices = [
  "Lazer Epilasyon",
  "Erkek Lazer Epilasyon",
  "Cilt Bakımı",
  "Kalıcı Makyaj",
  "Kaş & Kirpik",
  "Bölgesel İncelme",
  "Tırnak",
  "Diğer",
];

type AppointmentDay = {
  value: string;
  dayName: string;
  dateLabel: string;
  fullLabel: string;
};

function localDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildUpcomingDays(count = 12): AppointmentDay[] {
  const days: AppointmentDay[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);

    // Pazar kapalı.
    if (cursor.getDay() === 0) continue;

    const dayName = new Intl.DateTimeFormat("tr-TR", {
      weekday: "long",
    }).format(cursor);

    const dateLabel = new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
    }).format(cursor);

    days.push({
      value: localDateValue(cursor),
      dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      dateLabel,
      fullLabel: `${dateLabel} ${dayName}`,
    });
  }

  return days;
}

function buildTimes() {
  const times: string[] = ["08:30"];

  for (let hour = 9; hour <= 19; hour += 1) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
    times.push(`${String(hour).padStart(2, "0")}:30`);
  }

  return times;
}

export default function AppointmentPlanner() {
  const [gender, setGender] = useState("");
  const [service, setService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState("");

  const days = useMemo(() => buildUpcomingDays(12), []);
  const times = useMemo(() => buildTimes(), []);

  const selectedDay = useMemo(
    () => days.find((item) => item.value === selectedDate),
    [days, selectedDate]
  );

  const progress = useMemo(() => {
    return [
      gender,
      service,
      selectedDate,
      selectedTime,
      name.trim(),
      phone.trim(),
    ].filter(Boolean).length;
  }, [gender, service, selectedDate, selectedTime, name, phone]);

  const submitPublicRequest = () => {
    if (
      !gender ||
      !service ||
      !selectedDate ||
      !selectedTime ||
      !name.trim() ||
      !phone.trim()
    ) {
      setError(
        "Lütfen danışan, hizmet, gün, saat, ad soyad ve telefon alanlarını tamamlayın."
      );
      return;
    }

    const normalizedPhone = phone.replace(/\D/g, "");
    if (normalizedPhone.length < 10 || normalizedPhone.length > 12) {
      setError("Telefon numarasını kontrol edin.");
      return;
    }

    if (!privacyAccepted) {
      setError(
        "Randevu iletişimi için KVKK bilgilendirme onayını işaretleyin."
      );
      return;
    }

    setError("");

    const message = [
      "Merhaba, TDA Luxury web sitesinden randevu talebi oluşturuyorum.",
      `Ad Soyad: ${name.trim()}`,
      `Telefon: ${phone.trim()}`,
      `Danışan: ${gender}`,
      `Hizmet: ${service}`,
      `Gün: ${selectedDay?.fullLabel ?? selectedDate}`,
      `Saat: ${selectedTime}`,
      note.trim() ? `Not: ${note.trim()}` : "",
      "Bu gün ve saat için uygunluk durumunu paylaşabilir misiniz?",
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
      <div
        className="appointment-progress"
        aria-label={`Randevu formu ${progress} / 6 tamamlandı`}
      >
        <span style={{ width: `${(progress / 6) * 100}%` }} />
      </div>

      <div className="appointment-planner-head">
        <span>ÜCRETSİZ ÖN GÖRÜŞME</span>
        <h2 id="appointment-title">Randevu talebinizi 1 dakikada hazırlayın.</h2>
        <p>
          Hizmetinizi, tercih ettiğiniz günü ve saati seçin. Talebiniz
          WhatsApp üzerinden doğrudan TDA Luxury ekibine ulaşsın.
        </p>
      </div>

      <div className="appointment-form-grid">
        <fieldset className="appointment-fieldset">
          <legend>
            <UserRound size={18} /> Danışan
          </legend>
          <div className="appointment-choice-grid two">
            {["Kadın", "Erkek"].map((item) => (
              <button
                key={item}
                type="button"
                className={gender === item ? "selected" : ""}
                onClick={() => setGender(item)}
              >
                {gender === item ? <Check size={17} /> : null}
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="appointment-fieldset appointment-fieldset-wide">
          <legend>
            <CalendarDays size={18} /> Hizmet
          </legend>
          <div className="appointment-choice-grid services">
            {publicServices.map((item) => (
              <button
                key={item}
                type="button"
                className={service === item ? "selected" : ""}
                onClick={() => setService(item)}
              >
                {service === item ? <Check size={16} /> : null}
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="appointment-fieldset appointment-fieldset-wide">
          <legend>
            <CalendarDays size={18} /> Gün ve Saat
          </legend>

          <div className={styles.scheduleGrid}>
            <div className={styles.scheduleColumn}>
              <div className={styles.scheduleTitle}>Gün seçin</div>
              <div className={styles.dayGrid}>
                {days.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    className={`${styles.dayButton} ${
                      selectedDate === day.value ? styles.selected : ""
                    }`}
                    onClick={() => {
                      setSelectedDate(day.value);
                      setSelectedTime("");
                    }}
                  >
                    <span>{day.dayName}</span>
                    <strong>{day.dateLabel}</strong>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.scheduleColumn}>
              <div className={styles.scheduleTitle}>
                <Clock3 size={16} /> Saat seçin
              </div>

              {selectedDate ? (
                <div className={styles.timeGrid}>
                  {times.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`${styles.timeButton} ${
                        selectedTime === item ? styles.selected : ""
                      }`}
                      onClick={() => setSelectedTime(item)}
                    >
                      {selectedTime === item ? <Check size={15} /> : null}
                      {item}
                    </button>
                  ))}
                </div>
              ) : (
                <div className={styles.timePlaceholder}>
                  Önce soldan bir gün seçin.
                </div>
              )}
            </div>
          </div>

          <p className={styles.scheduleNote}>
            Pazar günleri kapalıyız. Saatler 08:30–19:30 arasındadır. Seçilen
            saat kesin rezervasyon değildir; ekip uygunluğu WhatsApp üzerinden
            teyit eder.
          </p>
        </fieldset>

        <label className="appointment-input">
          <span>Ad Soyad</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Adınızı ve soyadınızı yazın"
            autoComplete="name"
          />
        </label>

        <label className="appointment-input">
          <span>Telefon</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="05__ ___ __ __"
            inputMode="tel"
            autoComplete="tel"
          />
        </label>

        <label className="appointment-input appointment-input-wide">
          <span>Notunuz (isteğe bağlı)</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Özellikle belirtmek istediğiniz bir konu varsa yazabilirsiniz."
            rows={4}
          />
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
          <a href="/kvkk-aydinlatma-metni"> KVKK Aydınlatma Metni</a>{" "}
          kapsamında işlenmesini kabul ediyorum.
        </span>
      </label>

      {error ? (
        <p className="appointment-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="appointment-actions">
        <button
          type="button"
          onClick={submitPublicRequest}
          className="appointment-primary"
        >
          <MessageCircle size={20} /> WhatsApp’ta Randevu Talebi Oluştur
          <ArrowRight size={18} />
        </button>

        <a href={`tel:+${site.whatsapp}`} className="appointment-secondary">
          <Phone size={18} /> {site.phoneDisplay}
        </a>
      </div>

      <p className="appointment-note">
        Talep oluşturmak kesin rezervasyon anlamına gelmez. Ekibimiz seçtiğiniz
        gün ve saatin uygunluğunu WhatsApp üzerinden teyit eder.
      </p>
    </section>
  );
}
