"use client";

import dynamic from "next/dynamic";
import { PlayCircle } from "lucide-react";
import { useState } from "react";

const HeroVideoModal = dynamic(() => import("@/components/HeroVideoModal"), {
  ssr: false,
  loading: () => null,
});

export default function HeroVideoButton() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="stage15-video-btn"
        aria-label="Tanıtım videosunu izle"
        onClick={() => setVideoOpen(true)}
      >
        TANITIM VİDEOSUNU İZLE <PlayCircle size={21} />
      </button>

      {videoOpen ? (
        <HeroVideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      ) : null}
    </>
  );
}
