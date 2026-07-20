import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";
import { getServiceImage } from "@/lib/service-media";

const mainServiceSlugs = new Set(["/lazer-epilasyon", "/cilt-bakimi", "/kalici-makyaj"]);

export default function ServicesCatalog({ services }: { services: Service[] }) {
  const mainServices = services.filter((service) => mainServiceSlugs.has(service.slug));

  return (
    <div className="services-catalog-wrap">
      <div className="premium-service-grid">
        {mainServices.map((service) => (
          <Link key={service.slug} href={service.slug} className="premium-service-card">
            <Image src={getServiceImage(service.slug)} alt={service.title} fill sizes="(max-width: 520px) 100vw, (max-width: 800px) 50vw, (max-width: 1150px) 33vw, 25vw" />
            <div className="premium-service-overlay" />
            <div className="premium-service-content">
              <span className="premium-service-icon">✦</span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <span className="premium-service-link">ALT HİZMETLERİ GÖR <b>→</b></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
