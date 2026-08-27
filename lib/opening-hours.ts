export type DayHours = {
  open: string;
  close: string;
  closed?: boolean;
  note?: string;
};

export type OpeningHours = Record<string, DayHours>;

export const defaultOpeningHours: OpeningHours = {
  monday: { open: "08:30", close: "19:30" },
  tuesday: { open: "08:30", close: "19:30" },
  wednesday: { open: "08:30", close: "19:30" },
  thursday: { open: "08:30", close: "19:30" },
  friday: { open: "08:30", close: "19:30" },
  saturday: { open: "08:30", close: "19:30" },
  sunday: { open: "", close: "", closed: true, note: "Kapalı" },
};

export const dayLabels: Record<string, string> = {
  monday: "Pazartesi",
  tuesday: "Salı",
  wednesday: "Çarşamba",
  thursday: "Perşembe",
  friday: "Cuma",
  saturday: "Cumartesi",
  sunday: "Pazar",
};

export function normalizeOpeningHours(value: unknown): OpeningHours {
  const raw = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const next: OpeningHours = {};

  for (const key of Object.keys(defaultOpeningHours)) {
    const fallback = defaultOpeningHours[key];
    const item = raw[key] && typeof raw[key] === "object" ? raw[key] as Record<string, unknown> : {};
    next[key] = {
      open: String(item.open ?? fallback.open ?? ""),
      close: String(item.close ?? fallback.close ?? ""),
      closed: Boolean(item.closed ?? fallback.closed ?? false),
      note: String(item.note ?? fallback.note ?? ""),
    };
  }

  return next;
}

export function formatDayHours(day: DayHours) {
  if (day.closed) return day.note || "Kapalı";
  if (day.note && (!day.open || !day.close)) return day.note;
  if (!day.open || !day.close) return day.note || "Randevu ile";
  return `${day.open} – ${day.close}`;
}

export function compactOpeningHours(hours: OpeningHours) {
  const weekdays = ["monday","tuesday","wednesday","thursday","friday","saturday"];
  const same = weekdays.every((key) =>
    !hours[key]?.closed &&
    hours[key]?.open === hours.monday?.open &&
    hours[key]?.close === hours.monday?.close
  );

  if (same) return `Pzt–Cmt ${hours.monday.open}–${hours.monday.close}`;
  return "Çalışma saatlerini görüntüleyin";
}
