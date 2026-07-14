"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HeroVideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="stage15-video-modal"
      role="dialog"
      aria-modal="true"
      aria-label="TDA Luxury tanıtım videosu"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className="stage15-video-shell">
        <button
          ref={closeButtonRef}
          type="button"
          className="stage15-video-close"
          onClick={onClose}
          aria-label="Videoyu kapat"
        >
          <X size={22} />
        </button>

        <video
          className="stage15-video-player"
          controls
          autoPlay
          playsInline
          preload="metadata"
          poster="/images/real/dis-cephe-gece.jpg"
        >
          <source src="/videos/tda-tanitim.mp4" type="video/mp4" />
          Tarayıcınız video oynatmayı desteklemiyor.
        </video>
      </div>
    </div>
  );
}
