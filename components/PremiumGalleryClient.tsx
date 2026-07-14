"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

type GalleryItem = {
  src: string;
  title: string;
  category: string;
  alt: string;
};

const filters = ["Tümü", "Salon", "Lazer", "Cilt", "Kalıcı Makyaj", "Vücut", "Kaş & Kirpik"];

export default function PremiumGalleryClient({ items }: { items: GalleryItem[] }) {
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () => activeFilter === "Tümü" ? items : items.filter((item) => item.category === activeFilter),
    [activeFilter, items]
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => current === null ? 0 : (current + 1) % filteredItems.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => current === null ? 0 : (current - 1 + filteredItems.length) % filteredItems.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, filteredItems.length]);

  const showPrevious = () => {
    setActiveIndex((current) => current === null ? 0 : (current - 1 + filteredItems.length) % filteredItems.length);
  };

  const showNext = () => {
    setActiveIndex((current) => current === null ? 0 : (current + 1) % filteredItems.length);
  };

  return (
    <>
      <div className="premium-gallery-filters" aria-label="Galeri filtreleri">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setActiveFilter(filter);
              setActiveIndex(null);
            }}
            className={activeFilter === filter ? "is-active" : ""}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="premium-gallery-masonry">
        {filteredItems.map((item, index) => (
          <button
            key={`${item.title}-${item.src}`}
            type="button"
            className={`premium-gallery-tile premium-gallery-tile-${(index % 6) + 1}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`${item.title} görselini büyüt`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
            />
            <span className="premium-gallery-tile-overlay" />
            <span className="premium-gallery-tile-copy">
              <span>{item.category}</span>
              <strong>{item.title}</strong>
            </span>
            <span className="premium-gallery-expand"><Expand size={18} /></span>
          </button>
        ))}
      </div>

      {activeIndex !== null && filteredItems[activeIndex] && (
        <div className="premium-gallery-lightbox" role="dialog" aria-modal="true" aria-label={filteredItems[activeIndex].title}>
          <button type="button" className="premium-gallery-close" onClick={() => setActiveIndex(null)} aria-label="Galeriyi kapat">
            <X size={24} />
          </button>

          <button type="button" className="premium-gallery-nav premium-gallery-nav-prev" onClick={showPrevious} aria-label="Önceki görsel">
            <ChevronLeft size={28} />
          </button>

          <div className="premium-gallery-lightbox-media">
            <Image
              src={filteredItems[activeIndex].src}
              alt={filteredItems[activeIndex].alt}
              fill
              priority
              sizes="100vw"
            />
            <div className="premium-gallery-lightbox-caption">
              <span>{filteredItems[activeIndex].category}</span>
              <h3>{filteredItems[activeIndex].title}</h3>
            </div>
          </div>

          <button type="button" className="premium-gallery-nav premium-gallery-nav-next" onClick={showNext} aria-label="Sonraki görsel">
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </>
  );
}
