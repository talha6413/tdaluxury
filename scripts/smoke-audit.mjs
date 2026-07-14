import { spawn } from "node:child_process";

const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const routes = [
  "/",
  "/hizmetler",
  "/lazer-epilasyon",
  "/cilt-bakimi",
  "/kalici-makyaj",
  "/blog",
  "/galeri",
  "/sonuclar",
  "/iletisim",
  "/randevu",
  "/usak-guzellik-salonu",
  "/gizlilik-politikasi",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
  "/api/health",
];

const errors = [];
const warnings = [];

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)],
  {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "production" },
  }
);

let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk.toString();
});

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`${BASE}/api/health`, {
        signal: AbortSignal.timeout(1500),
      });
      if (response.ok) return;
    } catch {}
    await timeout(500);
  }
  throw new Error(`Production sunucusu başlatılamadı.\n${serverOutput}`);
}

try {
  await waitForServer();

  for (const route of routes) {
    try {
      const response = await fetch(`${BASE}${route}`, {
        redirect: "manual",
        signal: AbortSignal.timeout(8000),
      });

      if (response.status < 200 || response.status >= 400) {
        errors.push(`${route}: HTTP ${response.status}`);
        continue;
      }

      if (route === "/") {
        const headers = response.headers;
        const requiredHeaders = [
          "x-content-type-options",
          "referrer-policy",
          "x-frame-options",
          "permissions-policy",
        ];
        for (const header of requiredHeaders) {
          if (!headers.get(header)) errors.push(`Eksik güvenlik başlığı: ${header}`);
        }
        if (headers.get("x-powered-by")) {
          warnings.push("X-Powered-By başlığı halen görünüyor.");
        }

        const html = await response.text();
        if (!html.includes("TDA Luxury")) errors.push("Ana sayfa HTML içinde TDA Luxury bulunamadı.");
        if (!/<title>[^<]+<\/title>/i.test(html)) errors.push("Ana sayfada title etiketi bulunamadı.");
        if (!/rel=["']canonical["']/i.test(html)) errors.push("Ana sayfada canonical bağlantısı bulunamadı.");
      }
    } catch (error) {
      errors.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const redirectResponse = await fetch(`${BASE}/microblading`, {
    redirect: "manual",
    signal: AbortSignal.timeout(8000),
  });
  if (![301, 302, 307, 308].includes(redirectResponse.status)) {
    errors.push(`/microblading yönlendirmesi beklenen 3xx yerine ${redirectResponse.status} döndürdü.`);
  }

  if (warnings.length) {
    console.warn("\nSMOKE TEST UYARILARI:");
    for (const item of warnings) console.warn(`- ${item}`);
  }

  if (errors.length) {
    console.error("\nSMOKE TEST HATALARI:");
    for (const item of errors) console.error(`- ${item}`);
    process.exitCode = 1;
  } else {
    console.log(`\nSmoke audit geçti: ${routes.length} rota ve temel güvenlik/SEO kontrolleri doğrulandı.`);
  }
} finally {
  server.kill("SIGTERM");
  await timeout(300);
  if (!server.killed) server.kill("SIGKILL");
}
