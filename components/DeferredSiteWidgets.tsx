"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BeautyAssistant = dynamic(() => import("@/components/BeautyAssistant"), { ssr: false });

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function DeferredSiteWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idleWindow = window as IdleWindow;

    if (idleWindow.requestIdleCallback) {
      const id = idleWindow.requestIdleCallback(() => setReady(true), { timeout: 1800 });
      return () => idleWindow.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <BeautyAssistant />
  );
}
