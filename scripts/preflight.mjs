import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const envPath = path.join(root, ".env.local");
const errors = [];
const warnings = [];

const requiredFiles = [
  "app/layout.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/manifest.ts",
  "public/favicon.ico",
  "public/og/home.jpg",
  "lib/site.ts",
  "lib/seo.ts",
  "lib/schema.tsx",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Eksik dosya: ${file}`);
}

if (!fs.existsSync(envPath)) {
  warnings.push(".env.local bulunamadı. Canlı yayından önce .env.example dosyasını kopyalayıp gerçek bilgilerle doldurun.");
} else {
  const raw = fs.readFileSync(envPath, "utf8");
  const env = Object.fromEntries(
    raw
      .split(/\r?\n/)
      .filter((line) => line && !line.trim().startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
      })
  );

  const requiredValues = [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_WHATSAPP_NUMBER",
    "NEXT_PUBLIC_INSTAGRAM_URL",
    "NEXT_PUBLIC_LEGAL_NAME",
    "NEXT_PUBLIC_ADDRESS_LABEL",
    "NEXT_PUBLIC_STREET_ADDRESS",
    "NEXT_PUBLIC_MAPS_URL",
    "NEXT_PUBLIC_MAPS_EMBED_URL",
  ];

  for (const key of requiredValues) {
    if (!env[key]) errors.push(`.env.local içinde eksik değer: ${key}`);
  }

  if (env.NEXT_PUBLIC_SITE_URL && env.NEXT_PUBLIC_SITE_URL !== "https://www.tdaluxury.com.tr") {
    warnings.push(`SITE_URL beklenen adresten farklı: ${env.NEXT_PUBLIC_SITE_URL}`);
  }

  if (!env.NEXT_PUBLIC_GA_ID) warnings.push("GA4 kimliği boş. Ölçüm yapılmayacak.");
  if (!env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) warnings.push("Search Console doğrulama kodu boş.");
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
if (!packageJson.scripts?.["seo:audit"]) errors.push("package.json içinde seo:audit komutu yok.");
if (!packageJson.scripts?.typecheck) errors.push("package.json içinde typecheck komutu yok.");
if (!packageJson.scripts?.lint) errors.push("package.json içinde lint komutu yok.");

if (warnings.length) {
  console.warn("\nYAYIN ÖNCESİ UYARILAR:");
  for (const item of warnings) console.warn(`- ${item}`);
}

if (errors.length) {
  console.error("\nYAYIN ÖNCESİ HATALAR:");
  for (const item of errors) console.error(`- ${item}`);
  process.exit(1);
}

console.log("\nPreflight kontrolü geçti. Kritik yayın engeli bulunamadı.");
