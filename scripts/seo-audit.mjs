import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const fail = (message) => {
  console.error(`SEO AUDIT FAILED: ${message}`);
  process.exitCode = 1;
};

const servicesSource = read("data/services.ts");
const blogSource = read("data/blog.ts");
const serviceSlugs = [...servicesSource.matchAll(/"slug"\s*:\s*"([^"]+)"/g)].map((m) => m[1]);
const blogSlugs = [...blogSource.matchAll(/\bslug:\s*"([^"]+)"/g)].map((m) => m[1]);
const blogTitles = [...blogSource.matchAll(/\btitle:\s*"([^"]+)"/g)].map((m) => m[1]);

const duplicates = (items) => [...new Set(items.filter((item, index) => items.indexOf(item) !== index))];

for (const slug of duplicates(serviceSlugs)) fail(`Duplicate service slug: ${slug}`);
for (const slug of duplicates(blogSlugs)) fail(`Duplicate blog slug: ${slug}`);
for (const title of duplicates(blogTitles)) fail(`Duplicate blog title: ${title}`);

for (const slug of serviceSlugs) {
  const route = slug === "/" ? "app/page.tsx" : `app${slug}/page.tsx`;
  if (!fs.existsSync(path.join(root, route))) fail(`Missing service route file: ${route}`);
}

const requiredFiles = [
  "app/layout.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/manifest.ts",
  "lib/seo.ts",
  "lib/schema.tsx",
  "public/og/home.jpg",
];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) fail(`Missing required SEO file: ${file}`);
}

const layout = read("app/layout.tsx");
if (!layout.includes('lang="tr"')) fail('Root html language must be "tr".');
if (!layout.includes("metadataBase")) fail("metadataBase is missing from root metadata.");

const seo = read("lib/seo.ts");
if (!seo.includes("alternates: { canonical")) fail("Canonical metadata builder is missing.");

if (!process.exitCode) {
  console.log(`SEO audit passed: ${serviceSlugs.length} services, ${blogSlugs.length} blog posts.`);
}
