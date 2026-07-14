"use client";

import { useState, type CSSProperties } from "react";
import { MoveHorizontal } from "lucide-react";

type BeforeAfterSliderProps = {
  image: string;
  label: string;
};

export default function BeforeAfterSlider({ image, label }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div
      className="result-card result-card-interactive"
      style={{ "--img": image, "--position": `${position}%` } as CSSProperties}
      aria-label={`${label} önce ve sonra karşılaştırması`}
    >
      <div className="result-before" aria-hidden="true" />
      <div className="result-after" aria-hidden="true" />
      <div className="result-divider" aria-hidden="true">
        <span><MoveHorizontal size={17} /></span>
      </div>
      <span className="ba-label left">ÖNCE</span>
      <span className="ba-label right">SONRA</span>
      <input
        className="result-range"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`${label} karşılaştırma çizgisini hareket ettir`}
      />
    </div>
  );
}
