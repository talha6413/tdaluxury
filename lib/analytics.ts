export type ConversionEventName =
  | "whatsapp_click"
  | "phone_click"
  | "map_click"
  | "instagram_click"
  | "appointment_form_submit"
  | "assistant_whatsapp_click"
  | "video_open"
  | "appointment_click";

type EventPayload = {
  event_name: ConversionEventName;
  source?: string;
  service?: string;
  page_path?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackConversion({
  event_name,
  source = "website",
  service,
  page_path,
}: EventPayload) {
  if (typeof window === "undefined") return;

  const consent = window.localStorage.getItem("tda-cookie-consent");
  if (consent !== "accepted" || typeof window.gtag !== "function") return;

  window.gtag("event", event_name, {
    source,
    service: service || undefined,
    page_path: page_path || window.location.pathname,
    transport_type: "beacon",
  });
}

export function dispatchConversion(detail: EventPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("tda:conversion", { detail }));
}
