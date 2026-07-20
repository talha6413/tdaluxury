"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Info, MessageCircle, ShieldCheck } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import type { ManagedResult } from "@/lib/managed-content";

type Category = "Tümü" | "Lazer" | "Kalıcı Makyaj" | "Cilt Bakımı" | "Vücut";

type ResultItem = {
  title: string;
  category: Exclude<Category, "Tümü">;
  image: string;
  description: string;
  note?: string;
};

export const fallbackPageResults: ResultItem[] = [
  {
    title: "Dudak Renklendirme",
    category: "Kalıcı Makyaj",
    image: "url(/images/real/dudak-oncesi-sonrasi.webp)",
    description: "Dudak tonu ve formu için kişiye özel planlanan uygulama görünümü.",
    note: "Gerçek danışan görseli",
  },
];

export default function PremiumResultsPageClient({ results = fallbackPageResults }: { results?: ManagedResult[] }) {
  const filters = useMemo(() => ["Tümü", ...new Set(results.map((item) => item.category))], [results]);
  const [active, setActive] = useState("Tümü");

  const visibleResults = useMemo(
    () => (active === "Tümü" ? results : results.filter((item) => item.category === active)),
    [active, results],
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
            Yayımlanan görseller sonuç garantisi anlamına gelmez.
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
