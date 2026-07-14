import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public");
const warnings = [];
const files = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else files.push(full);
  }
}

await walk(root);

for (const file of files) {
  const size = (await stat(file)).size;
  const relative = path.relative(process.cwd(), file).replaceAll("\\\\", "/");
  const ext = path.extname(file).toLowerCase();
  const isImage = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"].includes(ext);
  if (isImage && size > 600_000) warnings.push(`${relative} ${(size / 1024).toFixed(0)} KB`);
}

if (warnings.length) {
  console.warn("Büyük görsel uyarıları:");
  for (const item of warnings) console.warn(`- ${item}`);
} else {
  console.log("Asset audit geçti: 600 KB üzeri görsel bulunamadı.");
}

const videoBytes = (await Promise.all(files.filter((f) => /\.(mp4|webm)$/i.test(f)).map(async (f) => (await stat(f)).size))).reduce((a,b)=>a+b,0);
console.log(`Toplam video boyutu: ${(videoBytes / 1024 / 1024).toFixed(2)} MB`);
