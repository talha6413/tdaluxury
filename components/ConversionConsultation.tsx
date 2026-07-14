"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { site, waUrl } from "@/lib/site";

const serviceOptions = [
  "Lazer Epilasyon",
  "Cilt Bakımı",
  "Kalıcı Makyaj",
  "Kaş & Kirpik",
  "Bölgesel İncelme",
  "Tırnak Bakımı",
];

const profileOptions = ["Kadın", "Erkek", "Belirtmek istemiyorum"];

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=TDA%20Luxury%20U%C5%9Fak";

export default function ConversionConsultation() {
  const [profile, setProfile] = useState(profileOptions[0]);
  const [service, setService] = useState(serviceOptions[0]);

  const whatsappUrl = useMemo(
    () =>
      waUrl(
        `Merhaba, TDA Luxury web siteniz üzerinden ulaşıyorum. ${profile} danışan için ${service} hizmeti hakkında bilgi almak ve uygun randevu zamanlarını öğrenmek istiyorum.`
      ),
    [profile, service]
  );

  return (
    <section className="conversion-section" aria-labelledby="conversion-title">
      <div className="conversion-photo" aria-hidden="true" />
      <div className="conversion-shade" aria-hidden="true" />

      <div className="container conversion-layout">
        <div className="conversion-copy">
          <p className="section-label">KİŞİYE ÖZEL DANIŞMANLIK</p>
          <h2 id="conversion-title">Size uygun hizmeti birlikte belirleyelim.</h2>
          <p className="conversion-lead">
            İhtiyacınızı seçin; WhatsApp&apos;ta hazır mesajla uzman ekibimize doğrudan ulaşın.
            Fiyat ve seans planı, kısa değerlendirme sonrasında kişiye özel olarak netleştirilir.
          </p>

          <div className="conversion-trust-list">
            <span><ShieldCheck size={19} /> Hijyen ve mahremiyet odaklı süreç</span>
            <span><Sparkles size={19} /> Kişiye özel bakım planlaması</span>
            <span><Check size={19} /> Hızlı WhatsApp geri dönüşü</span>
          </div>

          <div className="conversion-contact-row">
            <a href={`tel:+${site.whatsapp}`}>
              <Phone size={19} /> {site.phoneDisplay}
            </a>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={19} /> Yol Tarifi
            </a>
          </div>
        </div>

        <div className="conversion-panel">
          <div className="conversion-panel-head">
            <span>01</span>
            <div>
              <b>Kısa ön görüşme</b>
              <p>İki seçim yapın, hazır mesajla bize ulaşın.</p>
            </div>
          </div>

          <fieldset className="conversion-fieldset">
            <legend>Danışan</legend>
            <div className="conversion-choice-grid conversion-choice-grid-profile">
              {profileOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={profile === item}
                  onClick={() => setProfile(item)}
                  className={profile === item ? "is-selected" : ""}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="conversion-fieldset">
            <legend>İlgilendiğiniz hizmet</legend>
            <div className="conversion-choice-grid">
              {serviceOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={service === item}
                  onClick={() => setService(item)}
                  className={service === item ? "is-selected" : ""}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <a
            className="conversion-submit"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span><MessageCircle size={21} /> WhatsApp&apos;tan Danışmanlık Al</span>
            <ArrowRight size={20} />
          </a>

          <p className="conversion-disclaimer">
            Bu form tıbbi değerlendirme yerine geçmez; hizmet uygunluğu ön görüşmede belirlenir.
          </p>
        </div>
      </div>

      <div className="container conversion-review-strip">
        <div className="conversion-stars" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={17} fill="currentColor" />
          ))}
        </div>
        <div>
          <b>Karar vermeden önce gerçek müşteri deneyimlerini inceleyin.</b>
          <span>Google üzerindeki güncel TDA Luxury değerlendirmelerine ulaşın.</span>
        </div>
        <a href={mapUrl} target="_blank" rel="noopener noreferrer">
          Google Yorumlarını Gör <ArrowRight size={17} />
        </a>
      </div>
    </section>
  );
}
