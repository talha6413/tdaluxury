"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";

const PHONE = "905366651064";

type Gender = "Kadın" | "Erkek" | "Fark etmez";
type Service =
  | "Lazer Epilasyon"
  | "Cilt Bakımı"
  | "Kalıcı Makyaj"
  | "Kaş & Kirpik"
  | "Bölgesel İncelme"
  | "Tırnak Bakımı";

const services: Service[] = [
  "Lazer Epilasyon",
  "Cilt Bakımı",
  "Kalıcı Makyaj",
  "Kaş & Kirpik",
  "Bölgesel İncelme",
  "Tırnak Bakımı",
];

const goals: Record<Service, string[]> = {
  "Lazer Epilasyon": [
    "Tüm vücut uygulaması",
    "Belirli bir bölge",
    "Erkek lazer epilasyon",
    "İğneli epilasyon",
  ],
  "Cilt Bakımı": [
    "Nem ve canlılık",
    "Akne odaklı bakım",
    "Leke görünümü",
    "Anti-aging bakım",
  ],
  "Kalıcı Makyaj": [
    "Microblading",
    "Pudralama kaş",
    "Dipliner / eyeliner",
    "Dudak renklendirme",
  ],
  "Kaş & Kirpik": [
    "Kirpik lifting",
    "Kaş laminasyonu",
    "İpek kirpik",
    "Altın oran kaş",
  ],
  "Bölgesel İncelme": [
    "G5 masajı",
    "Lenf drenaj",
    "Bölgesel bakım planı",
    "Ön görüşme istiyorum",
  ],
  "Tırnak Bakımı": [
    "Protez tırnak",
    "Kalıcı oje",
    "Manikür",
    "Pedikür",
  ],
};

export default function BeautyConcierge() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [gender, setGender] = useState<Gender | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [goal, setGoal] = useState<string | null>(null);

  const whatsappUrl = useMemo(() => {
    const message = [
      "Merhaba, TDA Luxury web sitesindeki güzellik danışmanından ulaşıyorum.",
      gender ? `Danışan: ${gender}` : null,
      service ? `İlgilendiğim hizmet: ${service}` : null,
      goal ? `İhtiyacım: ${goal}` : null,
      "Uygun hizmet ve randevu hakkında bilgi alabilir miyim?",
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  }, [gender, service, goal]);

  const reset = () => {
    setStep(1);
    setGender(null);
    setService(null);
    setGoal(null);
  };

  const goBack = () => {
    if (step === 4) setStep(3);
    else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  return (
    <div className="fixed bottom-[92px] left-4 z-[9997] md:bottom-7 md:left-7">
      {open && (
        <section
          role="dialog"
          aria-modal="false"
          aria-label="TDA Beauty Asistanı"
          className="mb-3 w-[calc(100vw-32px)] max-w-[390px] overflow-hidden rounded-[24px] border border-[#cda35b]/30 bg-[#0a0908]/95 text-white shadow-[0_28px_90px_rgba(0,0,0,.58)] backdrop-blur-2xl"
        >
          <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cda35b]/40 bg-[#cda35b]/10 text-[#dfbb7d]">
                <Sparkles size={19} />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#dfbb7d]">
                  TDA Beauty Asistanı
                </p>
                <p className="mt-0.5 text-[13px] text-white/65">
                  Size uygun hizmeti birlikte belirleyelim
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Asistanı kapat"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:border-[#cda35b]/50 hover:text-white"
            >
              <X size={18} />
            </button>
          </header>

          <div className="p-5">
            <div className="mb-5 flex items-center gap-2" aria-label={`Adım ${step} / 4`}>
              {[1, 2, 3, 4].map((item) => (
                <span
                  key={item}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    item <= step ? "bg-[#cda35b]" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            {step === 1 && (
              <Step title="Kimin için bilgi almak istiyorsunuz?">
                {(["Kadın", "Erkek", "Fark etmez"] as Gender[]).map((item) => (
                  <ChoiceButton
                    key={item}
                    label={item}
                    onClick={() => {
                      setGender(item);
                      setStep(2);
                    }}
                  />
                ))}
              </Step>
            )}

            {step === 2 && (
              <Step title="Hangi hizmetle ilgileniyorsunuz?">
                {services.map((item) => (
                  <ChoiceButton
                    key={item}
                    label={item}
                    onClick={() => {
                      setService(item);
                      setGoal(null);
                      setStep(3);
                    }}
                  />
                ))}
              </Step>
            )}

            {step === 3 && service && (
              <Step title="Öncelikli ihtiyacınız hangisi?">
                {goals[service].map((item) => (
                  <ChoiceButton
                    key={item}
                    label={item}
                    onClick={() => {
                      setGoal(item);
                      setStep(4);
                    }}
                  />
                ))}
              </Step>
            )}

            {step === 4 && (
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#cda35b] text-black">
                  <Check size={23} strokeWidth={2.3} />
                </div>
                <h2 className="mt-4 font-serif text-[28px] leading-tight">
                  Ön görüşme talebiniz hazır.
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-white/68">
                  Seçimlerinizi WhatsApp mesajına ekledik. Uzman ekibimiz uygun uygulama ve randevu süreci hakkında bilgi verebilir.
                </p>

                <div className="mt-5 rounded-[16px] border border-white/10 bg-white/[.04] p-4 text-[13px] leading-6 text-white/75">
                  <p><strong className="text-white">Danışan:</strong> {gender}</p>
                  <p><strong className="text-white">Hizmet:</strong> {service}</p>
                  <p><strong className="text-white">İhtiyaç:</strong> {goal}</p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex min-h-13 w-full items-center justify-center gap-3 rounded-[14px] bg-gradient-to-r from-[#bd8d47] to-[#dfbb7d] px-5 py-4 text-[14px] font-extrabold text-black shadow-[0_16px_40px_rgba(205,163,91,.22)] transition hover:brightness-110"
                >
                  <MessageCircle size={20} />
                  WhatsApp’tan Devam Et
                </a>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-[12px] border border-white/10 px-4 py-3 text-[13px] font-semibold text-white/70 transition hover:border-white/25 hover:text-white"
                >
                  <RotateCcw size={16} />
                  Baştan Başla
                </button>
              </div>
            )}

            {step > 1 && step < 4 && (
              <button
                type="button"
                onClick={goBack}
                className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.12em] text-white/55 transition hover:text-[#dfbb7d]"
              >
                <ArrowLeft size={15} />
                Geri
              </button>
            )}
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="TDA Beauty Asistanını aç"
        className="group flex items-center gap-3 rounded-full border border-[#cda35b]/40 bg-black/90 p-2 pr-4 text-white shadow-[0_18px_50px_rgba(0,0,0,.45)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#dfbb7d]"
      >
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#c18f47] to-[#e2bd79] text-black">
          <Sparkles size={21} />
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#cda35b]/30" />
        </span>
        <span className="text-left">
          <span className="block text-[10px] font-bold uppercase tracking-[.16em] text-[#dfbb7d]">
            Akıllı Danışman
          </span>
          <span className="mt-0.5 block text-[13px] font-semibold">
            Size uygun hizmeti bulun
          </span>
        </span>
      </button>
    </div>
  );
}

function Step({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-serif text-[25px] leading-tight">{title}</h2>
      <div className="mt-4 grid gap-2.5">{children}</div>
    </div>
  );
}

function ChoiceButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-12 items-center justify-between rounded-[13px] border border-white/10 bg-white/[.035] px-4 py-3 text-left text-[14px] font-semibold text-white/82 transition hover:border-[#cda35b]/55 hover:bg-[#cda35b]/10 hover:text-white"
    >
      <span>{label}</span>
      <span className="text-[#dfbb7d] transition-transform group-hover:translate-x-1">→</span>
    </button>
  );
}
