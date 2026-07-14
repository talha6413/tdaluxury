"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Service } from "@/data/services";
import { getServiceImage } from "@/lib/service-media";

type Category = "Tümü" | "Lazer" | "Cilt" | "Kalıcı Makyaj" | "Kaş & Kirpik" | "Vücut" | "Tırnak";

const categories: Category[] = ["Tümü", "Lazer", "Cilt", "Kalıcı Makyaj", "Kaş & Kirpik", "Vücut", "Tırnak"];

function getCategory(slug: string): Category {
  if (slug.includes("lazer") || slug.includes("igneli")) return "Lazer";
  if (slug.includes("cilt-bakimi")) return "Cilt";
  if (slug.includes("kalici-makyaj")) return "Kalıcı Makyaj";
  if (slug.includes("kas-kirpik")) return "Kaş & Kirpik";
  if (slug.includes("bolgesel-incelme")) return "Vücut";
  return "Tırnak";
}

export default function ServicesCatalog({ services }: { services: Service[] }) {
  const [active, setActive] = useState<Category>("Tümü");
  const filtered = useMemo(() => active === "Tümü" ? services : services.filter((service) => getCategory(service.slug) === active), [active, services]);

  return (
    <div className="services-catalog-wrap">
      <div className="services-filter" role="tablist" aria-label="Hizmet kategorileri">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={active === category}
            className={active === category ? "is-active" : ""}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="premium-service-grid">
        {filtered.map((service) => (
          <Link key={service.slug} href={service.slug} className="premium-service-card">
            <Image src={getServiceImage(service.slug)} alt={service.title} fill sizes="(max-width: 520px) 100vw, (max-width: 800px) 50vw, (max-width: 1150px) 33vw, 25vw" />
            <div className="premium-service-overlay" />
            <div className="premium-service-content">
              <span className="premium-service-icon">✦</span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <span className="premium-service-link">DETAYLI BİLGİ <b>→</b></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
