import Link from "next/link";
import { ArrowRight, Coffee, Crown, Play, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  { label: "LÜKS & KONFOR", icon: Crown },
  { label: "ÜST DÜZEY\nHİJYEN", icon: ShieldCheck },
  { label: "KAHVE & İKRAM", icon: Coffee },
  { label: "VIP BAKIM\nODALARI", icon: Sparkles },
];

export default function AboutStrip() {
  return (
    <section className="about-strip">
      <div className="container about-grid">
        <div className="video-card">
          <button type="button" className="play-circle" aria-label="Salon tanıtım videosunu izle">
            <Play size={24} fill="white" />
          </button>
        </div>
        <div className="about-copy">
          <p className="section-label">SALONUMUZ</p>
          <h2>KUSURSUZ BİR DENEYİM</h2>
          <p>
            TDA Luxury’de güzellik bir ayrıcalıktır. Size özel tasarlanmış alanlarımız,
            hijyenik ortamımız ve uzman kadromuz ile en iyi sonucu almanız için buradayız.
          </p>
          <div className="feature-row">
            {features.map(({ label, icon: Icon }) => (
              <div className="feature" key={label}>
                <div className="feature-icon"><Icon size={29} strokeWidth={1.35} /></div>
                {label.split("\n").map((line, index) => (
                  <span key={line}>{line}{index === 0 && label.includes("\n") ? <br /> : null}</span>
                ))}
              </div>
            ))}
          </div>
          <Link href="/hakkimizda" className="dark-btn">SALONUMUZU KEŞFET <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}
