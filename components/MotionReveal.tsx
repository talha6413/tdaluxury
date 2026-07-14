"use client";

import { memo, useEffect, useRef, type ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

function MotionReveal({
  children,
  className = "",
  delay = 0,
  y = 26,
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        element.dataset.visible = "true";
        observer.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-reveal ${className}`}
      style={
        {
          "--motion-delay": `${delay}ms`,
          "--motion-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export default memo(MotionReveal);
