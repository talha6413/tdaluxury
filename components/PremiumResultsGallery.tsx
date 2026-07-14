"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type ResultItem = {
  label: string;
  category: "Lazer" | "Kalıcı Makyaj" | "Cilt Bakımı" | "Vücut";
  image: string;
};

const items: ResultItem[] = [
  {
    label: "Dudak renklendirme",
    category: "Kalıcı Makyaj",
    image: "url(/images/real/dudak-oncesi-sonrasi.webp)",
  },
  {
    label: "Lazer epilasyon",
    category: "Lazer",
    image: "url(/images/result-lazer.svg)",
  },
  {
    label: "Bacak lazer epilasyon",
    category: "Lazer",
    image: "url(/images/result-leg.svg)",
  },
  {
    label: "Bölgesel bakım",
    category: "Vücut",
    image: "url(/images/result-belly.svg)",
  },
  {
    label: "Cilt görünümü",
    category: "Cilt Bakımı",
    image: "url(/images/result-leg.svg)",
  },
  {
    label: "Bakım sonrası görünüm",
    category: "Cilt Bakımı",
    image: "url(/images/result-belly.svg)",
  },
];

const filters = ["Tümü", "Lazer", "Kalıcı Makyaj", "Cilt Bakımı", "Vücut"] as const;

export default function PremiumResultsGallery() {
  const [active, setActive] = useState<(typeof filters)[number]>("Tümü");

  const visibleItems = useMemo(
    () => (active === "Tümü" ? items : items.filter((item) => item.category === active)),
    [active],
  );

  return (
    <section className="stage19-results" id="sonuclar">
      <div className="container">
        <div className="stage19-results-head">
          <div>
            <p className="section-label">ÖNCESİ &amp; SONRASI</p>
            <h2>Seçili Uygulama Sonuçları</h2>
          </div>
          <div className="stage19-results-note">
            <ShieldCheck size={22} />
            <span>
              Sonuçlar kişiden kişiye değişebilir. Görseller danışan onayıyla ve bilgilendirme amacıyla sunulur.
            </span>
          </div>
        </div>

        <div className="stage19-result-filters" role="tablist" aria-label="Sonuç kategorileri">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={active === filter}
              className={active === filter ? "active" : ""}
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="stage19-result-grid">
          {visibleItems.map((result) => (
            <article key={`${result.category}-${result.label}`} className="stage19-result-item">
              <BeforeAfterSlider image={result.image} label={result.label} />
              <div className="stage19-result-meta">
                <span>{result.category}</span>
                <h3>{result.label}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="stage19-results-actions">
          <Link className="stage15-outline-button" href="/galeri">
            Tüm Sonuçları Gör <ArrowRight size={15} />
          </Link>
          <Link className="stage15-gold-button" href="/iletisim">
            Ücretsiz Ön Görüşme <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
