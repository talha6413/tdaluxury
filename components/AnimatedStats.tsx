"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
  { target: 7, suffix: " YIL+", label: "Tecrübe", icon: <Award /> },
  { staticValue: "FDA Onaylı", label: "Cihazlar", icon: <BadgeCheck /> },
];

function Counter({ stat, start }: { stat: Stat; start: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start || stat.target === undefined) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setValue(stat.target!));
      return () => cancelAnimationFrame(frame);
    }

    const duration = 1300;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setValue(stat.target! * eased);
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, stat.target]);

  if (stat.staticValue) return stat.staticValue;
  const decimals = stat.decimals ?? 0;
  const formatted = value.toLocaleString("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${formatted}${stat.suffix ?? ""}`;
}

export default function AnimatedStats() {
  const ref = useRef<HTMLElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref}>
      <div className="container stats-grid">
        {stats.map((stat, index) => (
          <div className="stat" key={stat.label} style={{ "--stat-delay": `${index * 90}ms` } as React.CSSProperties}>
            <div className="stat-icon">{stat.icon}</div>
            <div>
              <div className="stat-value"><Counter stat={stat} start={start} /></div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
