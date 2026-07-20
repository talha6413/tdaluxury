import type { CSSProperties, ReactNode } from "react";
import { Award, BadgeCheck, Star, UserRoundCheck } from "lucide-react";

type Stat = {
  target?: number;
  decimals?: number;
  suffix?: string;
  staticValue?: string;
  label: string;
  icon: ReactNode;
};

const stats: Stat[] = [
  { target: 5000, suffix: "+", label: "Mutlu Müşteri", icon: <UserRoundCheck /> },
  { target: 4.9, decimals: 1, suffix: " / 5", label: "Google Puanı", icon: <Star /> },
  { target: 6, suffix: " YIL+", label: "Tecrübe", icon: <Award /> },
  { staticValue: "FDA Onaylı", label: "Cihazlar", icon: <BadgeCheck /> },
];

function Counter({ stat }: { stat: Stat }) {
  if (stat.staticValue) return stat.staticValue;
  const decimals = stat.decimals ?? 0;
  const formatted = (stat.target ?? 0).toLocaleString("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${formatted}${stat.suffix ?? ""}`;
}

export default function AnimatedStats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {stats.map((stat, index) => (
          <div className="stat" key={stat.label} style={{ "--stat-delay": `${index * 90}ms` } as CSSProperties}>
            <div className="stat-icon">{stat.icon}</div>
            <div>
              <div className="stat-value"><Counter stat={stat} /></div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
