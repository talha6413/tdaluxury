import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const candidates = [".env.local", ".env.production", ".env.production.example"];
const envFile = candidates.find((name) => fs.existsSync(path.join(root, name)));
const errors = [];
const warnings = [];

if (!envFile) {
  errors.push("Hiçbir ortam değişkeni dosyası bulunamadı.");
} else {
  const raw = fs.readFileSync(path.join(root, envFile), "utf8");
  const env = Object.fromEntries(
    raw
      .split(/\r?\n/)
      .filter((line) => line && !line.trim().startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
      })
  );

  const required = [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_WHATSAPP_NUMBER",
    "NEXT_PUBLIC_INSTAGRAM_URL",
    "NEXT_PUBLIC_LEGAL_NAME",
    "NEXT_PUBLIC_ADDRESS_LABEL",
    "NEXT_PUBLIC_STREET_ADDRESS",
    "NEXT_PUBLIC_POSTAL_CODE",
    "NEXT_PUBLIC_MAPS_URL",
    "NEXT_PUBLIC_MAPS_EMBED_URL",
  ];

  for (const key of required) {
    if (!env[key]) errors.push(`${envFile} içinde eksik değer: ${key}`);
  }

  const placeholderPattern = /(GERCEK_|XXXXXXXXXX|example\.com|localhost)/i;
  for (const [key, value] of Object.entries(env)) {
    if (value && placeholderPattern.test(value)) {
      errors.push(`${key} içinde yer tutucu değer var: ${value}`);
    }
  }

  if (env.NEXT_PUBLIC_SITE_URL !== "https://www.tdaluxury.com.tr") {
    errors.push(`SITE_URL yanlış: ${env.NEXT_PUBLIC_SITE_URL || "boş"}`);
  }
  if (!/^905\d{9}$/.test(env.NEXT_PUBLIC_WHATSAPP_NUMBER || "")) {
    errors.push("WhatsApp numarası 90 ile başlayan 12 haneli biçimde olmalı.");
  }
  if (!env.NEXT_PUBLIC_GA_ID) warnings.push("GA4 kimliği henüz eklenmedi.");
  if (!env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) {
    warnings.push("Google Search Console doğrulama kodu henüz eklenmedi.");
  }
}

for (const file of ["app/sitemap.ts", "app/robots.ts", "app/manifest.ts", "app/api/health/route.ts"]) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Yayın için eksik dosya: ${file}`);
}

if (warnings.length) {
  console.warn("\nYAYIN UYARILARI:");
  warnings.forEach((item) => console.warn(`- ${item}`));
}
if (errors.length) {
  console.error("\nYAYIN HATALARI:");
  errors.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`\nDeployment audit geçti. Kontrol edilen ortam dosyası: ${envFile}`);
