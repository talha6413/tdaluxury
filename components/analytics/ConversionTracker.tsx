"use client";

import { useEffect } from "react";
import {
  ConversionEventName,
  trackConversion,
} from "@/lib/analytics";

type ConversionDetail = {
  event_name: ConversionEventName;
  source?: string;
  service?: string;
  page_path?: string;
};

function classifyLink(anchor: HTMLAnchorElement): ConversionDetail | null {
  const href = anchor.href.toLowerCase();
  const explicitEvent = anchor.dataset.conversionEvent as
    | ConversionEventName
    | undefined;

  if (explicitEvent) {
    return {
      event_name: explicitEvent,
      source: anchor.dataset.conversionSource || "explicit_cta",
      service: anchor.dataset.conversionService,
    };
  }

  if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) {
    return {
      event_name: anchor.closest("[data-assistant]")
        ? "assistant_whatsapp_click"
        : "whatsapp_click",
      source: anchor.dataset.conversionSource || "whatsapp_link",
      service: anchor.dataset.conversionService,
    };
  }

  if (href.startsWith("tel:")) {
    return {
      event_name: "phone_click",
      source: anchor.dataset.conversionSource || "phone_link",
    };
  }

  if (href.includes("google.com/maps") || href.includes("maps.app.goo.gl")) {
    return {
      event_name: "map_click",
      source: anchor.dataset.conversionSource || "map_link",
    };
  }

  if (href.includes("instagram.com")) {
    return {
      event_name: "instagram_click",
      source: anchor.dataset.conversionSource || "instagram_link",
    };
  }

  return null;
}

export default function ConversionTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const conversion = classifyLink(anchor);
      if (!conversion) return;

      trackConversion({
        ...conversion,
        page_path: window.location.pathname,
      });
    };

    const handleCustomConversion = (event: Event) => {
      const customEvent = event as CustomEvent<ConversionDetail>;
      if (!customEvent.detail?.event_name) return;
      trackConversion(customEvent.detail);
    };

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener(
      "tda:conversion",
      handleCustomConversion as EventListener,
    );

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener(
        "tda:conversion",
        handleCustomConversion as EventListener,
      );
    };
  }, []);

  return null;
}
