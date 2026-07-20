"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import type { ManagedResult } from "@/lib/managed-content";

export const fallbackResults: ManagedResult[] = [
  {
    title: "Dudak renklendirme", description: "Kişiye özel planlanan dudak renklendirme görünümü.",
    category: "Kalıcı Makyaj",
    image: "url(/images/real/dudak-oncesi-sonrasi.webp)",
  },
];

export default function PremiumResultsGallery({ items = fallbackResults }: { items?: ManagedResult[] }) {
  const filters = useMemo(() => ["Tümü", ...new Set(items.map((item) => item.category))], [items]);
  const [active, setActive] = useState("Tümü");

  const visibleItems = useMemo(
    () => (active === "Tümü" ? items : items.filter((item) => item.category === active)),
    [active, items],
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
            <article key={`${result.category}-${result.title}`} className="stage19-result-item">
              <BeforeAfterSlider image={result.image} label={result.title} />
              <div className="stage19-result-meta">
                <span>{result.category}</span>
                <h3>{result.title}</h3>
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
