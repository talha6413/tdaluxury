"use client";

import {
  ArrowLeft,
  Check,
  MessageCircle,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { site } from "@/lib/site";

type Profile = "Kadın" | "Erkek";
type Step = 1 | 2 | 3 | 4;

const serviceGroups = {
  Kadın: [
    "Lazer Epilasyon",
    "Cilt Bakımı",
    "Kalıcı Makyaj",
    "Kaş & Kirpik",
    "Bölgesel İncelme",
    "Tırnak",
  ],
  Erkek: [
    "Erkek Lazer Epilasyon",
    "Erkek Cilt Bakımı",
    "Kaş Tasarımı",
    "Bölgesel İncelme",
  ],
} satisfies Record<Profile, string[]>;

const needOptions: Record<string, string[]> = {
  "Lazer Epilasyon": ["Tüm vücut", "Yüz bölgesi", "Tek bölge", "Paket bilgisi"],
  "Erkek Lazer Epilasyon": ["Sırt & omuz", "Göğüs & karın", "Sakal üstü", "Tüm vücut"],
  "Cilt Bakımı": ["Akne eğilimi", "Leke görünümü", "Nem & canlılık", "Anti-aging"],
  "Erkek Cilt Bakımı": ["Yağlanma", "Tıraş hassasiyeti", "Gözenek", "Nem bakımı"],
  "Kalıcı Makyaj": ["Microblading", "Pudralama kaş", "Dipliner", "Dudak renklendirme"],
  "Kaş & Kirpik": ["Kirpik lifting", "Kaş laminasyonu", "İpek kirpik", "Altın oran kaş"],
  "Kaş Tasarımı": ["Altın oran kaş", "Kaş laminasyonu", "Normal kaş alımı"],
  "Bölgesel İncelme": ["Karın", "Basen", "Bacak", "Genel bilgi"],
  Tırnak: ["Protez tırnak", "Kalıcı oje", "Manikür", "Pedikür"],
};

export default function BeautyAssistant() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [need, setNeed] = useState<string | null>(null);

  const services = profile ? serviceGroups[profile] : [];
  const needs = service ? needOptions[service] ?? ["Genel bilgi", "Randevu", "Fiyat bilgisi"] : [];

  const whatsappHref = useMemo(() => {
    const parts = [
      "Merhaba, TDA Luxury web sitenizdeki akıllı danışman üzerinden ulaşıyorum.",
      profile ? `Danışan: ${profile}.` : "",
      service ? `İlgilendiğim hizmet: ${service}.` : "",
      need ? `İhtiyacım: ${need}.` : "",
      "Uygun işlem ve randevu hakkında bilgi almak istiyorum.",
    ].filter(Boolean);

    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(parts.join(" "))}`;
  }, [profile, service, need]);

  const reset = () => {
    setStep(1);
    setProfile(null);
    setService(null);
    setNeed(null);
  };

  const goBack = () => {
    if (step === 4) setStep(3);
    else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  return (
    <div className="beauty-assistant" data-assistant>
      {open && (
        <aside className="beauty-assistant-panel" aria-label="TDA Beauty Asistanı">
          <header className="beauty-assistant-head">
            <div className="beauty-assistant-brand">
              <span><Sparkles size={18} /></span>
              <div>
                <strong>TDA Beauty Asistanı</strong>
                <small>Size uygun hizmeti birlikte bulalım</small>
              </div>
            </div>
            <button
              type="button"
              className="beauty-assistant-close"
              onClick={() => setOpen(false)}
              aria-label="Asistanı kapat"
            >
              <X size={17} />
            </button>
          </header>

          <div className="beauty-assistant-progress" aria-label={`Adım ${step} / 4`}>
            {[1, 2, 3, 4].map((item) => (
              <span key={item} className={item <= step ? "active" : ""} />
            ))}
          </div>

          <div className="beauty-assistant-body">
            {step === 1 && (
              <div className="beauty-assistant-step">
                <span className="beauty-assistant-kicker">1 / 4 · BAŞLANGIÇ</span>
                <h3>Sizi nasıl yönlendirelim?</h3>
                <p>Kişiye özel seçenekleri göstermek için danışan profilini seçin.</p>
                <div className="beauty-assistant-options beauty-assistant-options-two">
                  {(["Kadın", "Erkek"] as Profile[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setProfile(item);
                        setService(null);
                        setNeed(null);
                        setStep(2);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="beauty-assistant-step">
                <span className="beauty-assistant-kicker">2 / 4 · HİZMET</span>
                <h3>Hangi hizmetle ilgileniyorsunuz?</h3>
                <div className="beauty-assistant-options">
                  {services.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setService(item);
                        setNeed(null);
                        setStep(3);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="beauty-assistant-step">
                <span className="beauty-assistant-kicker">3 / 4 · İHTİYAÇ</span>
                <h3>Önceliğiniz hangisi?</h3>
                <div className="beauty-assistant-options">
                  {needs.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setNeed(item);
                        setStep(4);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="beauty-assistant-step">
                <span className="beauty-assistant-kicker">4 / 4 · SONUÇ</span>
                <div className="beauty-assistant-result-icon"><Check size={22} /></div>
                <h3>Bilgileriniz hazır.</h3>
                <p>Seçimlerinizi WhatsApp mesajına dönüştürdük. Ekibimiz uygun seçenekleri netleştirsin.</p>
                <div className="beauty-assistant-summary">
                  {profile && <span>{profile}</span>}
                  {service && <span>{service}</span>}
                  {need && <span>{need}</span>}
                </div>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="beauty-assistant-whatsapp"
                  data-conversion-source="global_beauty_assistant"
                  data-conversion-service={service ?? undefined}
                >
                  <MessageCircle size={18} /> WhatsApp’tan Devam Et
                </a>
              </div>
            )}
          </div>

          <footer className="beauty-assistant-foot">
            <button type="button" onClick={goBack} disabled={step === 1}>
              <ArrowLeft size={14} /> Geri
            </button>
            <button type="button" onClick={reset}>
              <RotateCcw size={14} /> Baştan Başla
            </button>
          </footer>
        </aside>
      )}

      <button
        type="button"
        className="beauty-assistant-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="TDA Beauty Asistanını aç"
      >
        <span className="beauty-assistant-trigger-icon"><Sparkles size={19} /></span>
        <span>
          <small>Size yardımcı olalım</small>
          <strong>Akıllı Danışman</strong>
        </span>
      </button>
    </div>
  );
}
