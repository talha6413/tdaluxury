import Link from "next/link";
import {
  ArrowRight,
  Coffee,
  Crown,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { HomeSection } from "@/lib/home-sections";

const features = [
  { label: "LÜKS & KONFOR", icon: Crown },
  { label: "ÜST DÜZEY\nHİJYEN", icon: ShieldCheck },
  { label: "KAHVE & İKRAM", icon: Coffee },
  { label: "VIP BAKIM\nODALARI", icon: Sparkles },
];

export default function AboutStrip({ section }: { section?: HomeSection }) {
  const eyebrow = section?.eyebrow?.trim() || "SALONUMUZ";
  const title = section?.title?.trim() || "KUSURSUZ BİR DENEYİM";
  const description =
    section?.description?.trim() ||
    "TDA Luxury’de güzellik bir ayrıcalıktır. Size özel tasarlanmış alanlarımız, hijyenik ortamımız ve uzman kadromuz ile en iyi sonucu almanız için buradayız.";
  const buttonText = section?.button_text?.trim() || "SALONUMUZU KEŞFET";
  const buttonUrl = section?.button_url?.trim() || "/hakkimizda";
  const imageUrl = section?.image_url?.trim();

  return (
    <section className="about-strip">
      <div className="container about-grid">
        <div
          className="video-card"
          style={
            imageUrl
              ? {
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: section?.image_position || "center center",
                }
              : undefined
          }
        >
          <button
            type="button"
            className="play-circle"
            aria-label="Salon tanıtım videosunu izle"
          >
            <Play size={24} fill="white" />
          </button>
        </div>

        <div className="about-copy">
          <p className="section-label">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>

          <div className="feature-row">
            {features.map(({ label, icon: Icon }) => (
              <div className="feature" key={label}>
                <div className="feature-icon">
                  <Icon size={29} strokeWidth={1.35} />
                </div>
                {label.split("\n").map((line, index) => (
                  <span key={line}>
                    {line}
                    {index === 0 && label.includes("\n") ? <br /> : null}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <Link href={buttonUrl} className="dark-btn">
            {buttonText} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
