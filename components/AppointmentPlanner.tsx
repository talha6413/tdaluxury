"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  LogIn,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";
import { site, waUrl } from "@/lib/site";
import { dispatchConversion } from "@/lib/analytics";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

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

const timeOptions = ["Sabah", "Öğleden sonra", "Akşamüstü", "Fark etmez"];

type Service = {
  id: string;
  title: string;
  duration: string | null;
};

function localDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function minimumDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return localDateValue(date);
}

function maximumDate() {
  const date = new Date();
  date.setDate(date.getDate() + 90);
  return localDateValue(date);
}

function buildTimes() {
  const times: string[] = [];
  for (let hour = 9; hour < 19; hour += 1) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
    times.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return times;
}

export default function AppointmentPlanner() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [onlineNote, setOnlineNote] = useState("");
  const [onlineConsent, setOnlineConsent] = useState(false);
  const [onlineBusy, setOnlineBusy] = useState(false);
  const [onlineMessage, setOnlineMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [gender, setGender] = useState("");
  const [service, setService] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState("");

  const times = useMemo(() => buildTimes(), []);
  const progress = useMemo(() => {
    return [gender, service, preferredTime, name.trim(), phone.trim()].filter(Boolean).length;
  }, [gender, service, preferredTime, name, phone]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    async function boot() {
      const { data: sessionData } = await supabase.auth.getSession();
      const hasSession = Boolean(sessionData.session);
      setSignedIn(hasSession);

      if (hasSession) {
        const { data, error: serviceError } = await supabase
          .from("services")
          .select("id, title, duration")
          .eq("published", true)
          .order("sort_order", { ascending: true });

        if (serviceError) setOnlineMessage("Hizmetler yüklenemedi: " + serviceError.message);
        else setServices((data || []) as Service[]);
      }

      setSessionChecked(true);
    }

    void boot();
  }, []);

  async function submitOnlineRequest() {
    setOnlineMessage("");
    setSuccess(false);

    if (!serviceId || !date || !time) {
      setOnlineMessage("Hizmet, tarih ve saat alanlarını tamamlayın.");
      return;
    }

    if (!onlineConsent) {
      setOnlineMessage("Randevu talebi ve iletişim onayını işaretleyin.");
      return;
    }

    const selectedDate = new Date(`${date}T${time}:00`);
    if (selectedDate.getDay() === 0) {
      setOnlineMessage("Pazar günleri kapalıyız. Lütfen başka bir gün seçin.");
      return;
    }

    setOnlineBusy(true);

    const { error: requestError } = await getSupabaseBrowserClient().rpc(
      "create_customer_appointment_request",
      {
        requested_service_id: serviceId,
        requested_starts_at: selectedDate.toISOString(),
        customer_note: onlineNote.trim(),
      } as never
    );

    setOnlineBusy(false);

    if (requestError) {
      setOnlineMessage(requestError.message);
      return;
    }

    setSuccess(true);
    setOnlineMessage(
      "Randevu talebiniz alındı. Ekibimiz kontrol ettikten sonra müşteri panelinizde onay durumunu görebilirsiniz."
    );
    setDate("");
    setTime("");
    setOnlineNote("");
    setOnlineConsent(false);

    dispatchConversion({
      event_name: "online_appointment_request",
      source: "customer_portal",
      service: services.find((item) => item.id === serviceId)?.title || "",
      page_path: window.location.pathname,
    });
  }

  const submitPublicRequest = () => {
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

  if (!sessionChecked) {
    return (
      <section className="appointment-planner">
        <div className="appointment-planner-head">
          <LoaderCircle size={24} />
          <h2>Randevu ekranı hazırlanıyor…</h2>
        </div>
      </section>
    );
  }

  if (signedIn) {
    return (
      <section className="appointment-planner" aria-labelledby="online-appointment-title">
        <div className="appointment-planner-head">
          <span>GÜVENLİ MÜŞTERİ RANDEVUSU</span>
          <h2 id="online-appointment-title">Uygun gün ve saati seçerek talebinizi gönderin.</h2>
          <p>Talebiniz doğrudan TDA Luxury sistemine ulaşır. Onaylandığında müşteri panelinizde görünür.</p>
        </div>

        <div className="appointment-form-grid">
          <label className="appointment-input appointment-input-wide">
            <span>Hizmet</span>
            <select value={serviceId} onChange={(event) => setServiceId(event.target.value)}>
              <option value="">Hizmet seçin</option>
              {services.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.title}{item.duration ? ` · ${item.duration}` : ""}
                </option>
              ))}
            </select>
          </label>

          <label className="appointment-input">
            <span>Tarih</span>
            <input
              type="date"
              value={date}
              min={minimumDate()}
              max={maximumDate()}
              onChange={(event) => {
                setDate(event.target.value);
                setOnlineMessage("");
              }}
            />
          </label>

          <label className="appointment-input">
            <span>Saat</span>
            <select value={time} onChange={(event) => setTime(event.target.value)}>
              <option value="">Saat seçin</option>
              {times.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="appointment-input appointment-input-wide">
            <span>Notunuz (isteğe bağlı)</span>
            <textarea
              value={onlineNote}
              onChange={(event) => setOnlineNote(event.target.value)}
              placeholder="İşlem bölgesi veya özellikle belirtmek istediğiniz bir konu…"
              rows={4}
              maxLength={500}
            />
          </label>
        </div>

        <label className="appointment-privacy">
          <input
            type="checkbox"
            checked={onlineConsent}
            onChange={(event) => setOnlineConsent(event.target.checked)}
          />
          <span>
            Randevu talebimin işlenmesini ve onay durumu hakkında benimle iletişime geçilmesini kabul ediyorum.
          </span>
        </label>

        {onlineMessage ? (
          <p className={success ? "appointment-success" : "appointment-error"} role="status">
            {success ? <CheckCircle2 size={18} /> : null} {onlineMessage}
          </p>
        ) : null}

        <div className="appointment-actions">
          <button
            type="button"
            onClick={() => void submitOnlineRequest()}
            className="appointment-primary"
            disabled={onlineBusy}
          >
            {onlineBusy ? <LoaderCircle size={20} /> : <CalendarDays size={20} />}
            {onlineBusy ? "Talep gönderiliyor…" : "Randevu Talebini Gönder"}
            <ArrowRight size={18} />
          </button>
          <Link href="/musteri-paneli" className="appointment-secondary">
            Müşteri panelime dön
          </Link>
        </div>

        <p className="appointment-note">
          Talep oluşturmak kesin rezervasyon anlamına gelmez. Salon onayından sonra randevunuz kesinleşir.
        </p>
      </section>
    );
  }

  return (
    <section className="appointment-planner" aria-labelledby="appointment-title">
      <div className="appointment-progress" aria-label={`Randevu formu ${progress} / 5 tamamlandı`}>
        <span style={{ width: `${(progress / 5) * 100}%` }} />
      </div>

      <div className="appointment-planner-head">
        <span>ÜCRETSİZ ÖN GÖRÜŞME</span>
        <h2 id="appointment-title">Randevu talebinizi 1 dakikada hazırlayın.</h2>
        <p>Kesin tarih ve saat seçmek için müşteri hesabınıza giriş yapabilir veya WhatsApp üzerinden talep bırakabilirsiniz.</p>
      </div>

      <div className="appointment-actions">
        <Link href="/musteri-paneli" className="appointment-secondary">
          <LogIn size={18} /> Müşteri hesabına giriş yap
        </Link>
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
            {publicServices.map((item) => (
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
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Adınızı ve soyadınızı yazın" autoComplete="name" />
        </label>

        <label className="appointment-input">
          <span>Telefon</span>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="05__ ___ __ __" inputMode="tel" autoComplete="tel" />
        </label>

        <label className="appointment-input appointment-input-wide">
          <span>Notunuz (isteğe bağlı)</span>
          <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Özellikle belirtmek istediğiniz bir konu varsa yazabilirsiniz." rows={4} />
        </label>
      </div>

      <label className="appointment-privacy">
        <input type="checkbox" checked={privacyAccepted} onChange={(event) => setPrivacyAccepted(event.target.checked)} />
        <span>
          Bilgilerimin yalnızca randevu iletişimi amacıyla kullanılmasını ve
          <a href="/kvkk-aydinlatma-metni"> KVKK Aydınlatma Metni</a> kapsamında işlenmesini kabul ediyorum.
        </span>
      </label>

      {error ? <p className="appointment-error" role="alert">{error}</p> : null}

      <div className="appointment-actions">
        <button type="button" onClick={submitPublicRequest} className="appointment-primary">
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
