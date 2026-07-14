"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Info, MessageCircle, ShieldCheck } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type Category = "Tümü" | "Lazer" | "Kalıcı Makyaj" | "Cilt Bakımı" | "Vücut";

type ResultItem = {
  title: string;
  category: Exclude<Category, "Tümü">;
  image: string;
  description: string;
  note?: string;
};

const filters: Category[] = ["Tümü", "Lazer", "Kalıcı Makyaj", "Cilt Bakımı", "Vücut"];

const results: ResultItem[] = [
  {
    title: "Dudak Renklendirme",
    category: "Kalıcı Makyaj",
    image: "url(/images/real/dudak-oncesi-sonrasi.webp)",
    description: "Dudak tonu ve formu için kişiye özel planlanan uygulama görünümü.",
    note: "Gerçek danışan görseli",
  },
  {
    title: "Lazer Epilasyon",
    category: "Lazer",
    image: "url(/images/result-lazer.svg)",
    description: "Seans planına ve kişisel özelliklere göre değişebilen bakım görünümü.",
    note: "Temsilî karşılaştırma",
  },
  {
    title: "Bacak Lazer Epilasyon",
    category: "Lazer",
    image: "url(/images/result-leg.svg)",
    description: "Bölge, kıl yapısı ve seans düzenine bağlı olarak farklılaşan sonuç görünümü.",
    note: "Temsilî karşılaştırma",
  },
  {
    title: "Bölgesel Bakım",
    category: "Vücut",
    image: "url(/images/result-belly.svg)",
    description: "Vücut yapısı, yaşam alışkanlıkları ve uygulama planına göre değişen görünüm.",
    note: "Temsilî karşılaştırma",
  },
  {
    title: "Cilt Görünümü",
    category: "Cilt Bakımı",
    image: "url(/images/result-leg.svg)",
    description: "Nem, doku ve canlılık görünümüne yönelik bakım sürecinin örnek karşılaştırması.",
    note: "Temsilî karşılaştırma",
  },
  {
    title: "Bakım Sonrası Görünüm",
    category: "Cilt Bakımı",
    image: "url(/images/result-belly.svg)",
    description: "Cilt ihtiyacına göre planlanan bakımın örnek görünüm karşılaştırması.",
    note: "Temsilî karşılaştırma",
  },
];

export default function PremiumResultsPageClient() {
  const [active, setActive] = useState<Category>("Tümü");

  const visibleResults = useMemo(
    () => (active === "Tümü" ? results : results.filter((item) => item.category === active)),
    [active],
  );

  return (
    <>
      <div className="results-v20-filters" role="tablist" aria-label="Öncesi sonrası kategorileri">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={active === filter}
            className={active === filter ? "is-active" : ""}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="results-v20-grid">
        {visibleResults.map((result) => (
          <article key={`${result.category}-${result.title}`} className="results-v20-card">
            <BeforeAfterSlider image={result.image} label={result.title} />
            <div className="results-v20-card-copy">
              <div className="results-v20-card-topline">
                <span>{result.category}</span>
                {result.note ? <small>{result.note}</small> : null}
              </div>
              <h2>{result.title}</h2>
              <p>{result.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="results-v20-disclaimer">
        <ShieldCheck size={24} />
        <div>
          <strong>Şeffaf bilgilendirme</strong>
          <p>
            Sonuçlar kişiden kişiye değişebilir. Gerçek danışan görselleri yalnızca açık onayla yayınlanır.
            Temsilî görseller sonuç garantisi anlamına gelmez.
          </p>
        </div>
      </div>

      <div className="results-v20-actions">
        <a
          href="https://wa.me/905366651064?text=Merhaba%2C%20%C3%B6ncesi%20ve%20sonras%C4%B1%20sonu%C3%A7lar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
          target="_blank"
          rel="noreferrer"
          className="btn-gold"
        >
          <MessageCircle size={20} /> ÜCRETSİZ ÖN GÖRÜŞME
        </a>
        <Link href="/hizmetler" className="results-v20-outline">
          HİZMETLERİ İNCELE <ArrowRight size={18} />
        </Link>
      </div>

      <div className="results-v20-info">
        <Info size={20} />
        <span>
          Profesyonel çekimler tamamlandığında bu sayfa gerçek lazer, cilt bakımı, kaş, kirpik ve kalıcı makyaj sonuçlarıyla güncellenecek.
        </span>
      </div>
    </>
  );
}
