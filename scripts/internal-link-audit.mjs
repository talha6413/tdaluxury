import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceRoots = ["app", "components", "data", "lib"];
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx"]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function routeFromPage(file) {
  const relative = path.relative(path.join(root, "app"), path.dirname(file));
  if (!relative || relative === ".") return "/";
  if (relative.split(path.sep).some((segment) => segment.startsWith("["))) return null;
  return `/${relative.split(path.sep).join("/")}`;
}

const validRoutes = new Set(
  walk(path.join(root, "app"))
    .filter((file) => path.basename(file) === "page.tsx" || path.basename(file) === "page.js")
    .map(routeFromPage)
    .filter(Boolean),
);

const blogSource = fs.readFileSync(path.join(root, "data/blog.ts"), "utf8");
for (const match of blogSource.matchAll(/slug:\s*["']([^"']+)["']/g)) {
  validRoutes.add(`/blog/${match[1]}`);
}

const serviceSource = fs.readFileSync(path.join(root, "data/services.ts"), "utf8");
for (const match of serviceSource.matchAll(/"slug"\s*:\s*"([^"]+)"/g)) {
  validRoutes.add(match[1]);
}

const ignoredPrefixes = ["http://", "https://", "tel:", "mailto:", "sms:", "#", "javascript:"];
const broken = [];
const checked = new Set();

for (const base of sourceRoots) {
  for (const file of walk(path.join(root, base))) {
    if (!sourceExtensions.has(path.extname(file))) continue;
    const source = fs.readFileSync(file, "utf8");
    const patterns = [
      /href\s*=\s*["']([^"']+)["']/g,
      /href\s*:\s*["']([^"']+)["']/g,
    ];

    for (const pattern of patterns) {
      for (const match of source.matchAll(pattern)) {
        const href = match[1].trim();
        if (!href || ignoredPrefixes.some((prefix) => href.startsWith(prefix))) continue;
        if (!href.startsWith("/") || href.includes("${")) continue;

        const target = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
        const key = `${file}:${target}`;
        if (checked.has(key)) continue;
        checked.add(key);

        if (!validRoutes.has(target)) {
          broken.push({ file: path.relative(root, file), href, target });
        }
      }
    }
  }
}

if (broken.length) {
  console.error("Internal link audit failed:\n");
  for (const item of broken) console.error(`- ${item.file}: ${item.href}`);
  process.exit(1);
}

console.log(`Internal link audit passed: ${checked.size} references, ${validRoutes.size} valid routes.`);
