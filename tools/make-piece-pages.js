// Builds one small page per piece in p/ (e.g. p/cc-012.html).
// When a piece link is sent on WhatsApp, WhatsApp shows that piece's photo as a preview.
// Run after adding or editing pieces:  node tools/make-piece-pages.js
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const SITE = "https://shopcustomgift-tech.github.io/carbon-collection/";
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const first = html.slice(html.indexOf("var ITEMS=[") + 10, html.indexOf("\n];", html.indexOf("var ITEMS=[")) + 2);
const items = JSON.parse(first);
const more = fs.readFileSync(path.join(ROOT, "pieces.js"), "utf8");
items.push(...JSON.parse(more.slice(more.indexOf("["), more.lastIndexOf("]") + 1)));
const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const dir = path.join(ROOT, "p");
fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir);
for (const it of items) {
  if (!it.img) continue;
  const id = it.id.toLowerCase(), back = "../#" + id;
  const details = [it.cat, (it.metal || []).join(" & "), (it.stones || []).join(", ")].filter(Boolean).join(" · ");
  const desc = details + ". Price on request. View in person in Brooklyn, NY or Lakewood, NJ.";
  fs.writeFileSync(path.join(dir, id + ".html"), `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(it.name)} (${it.id}) – Carbon Collection</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="product"><meta property="og:site_name" content="Carbon Collection">
<meta property="og:title" content="${esc(it.name)} · ${it.id}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${SITE}p/${id}.html">
<meta property="og:image" content="${SITE}${esc(it.img)}">
<meta property="og:image:width" content="${it.w || 700}"><meta property="og:image:height" content="${it.h || 933}">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0; url=${back}">
</head><body style="font-family:Helvetica,Arial,sans-serif;text-align:center;padding:40px 16px">
<p><img src="../${esc(it.img)}" alt="${esc(it.name)}" style="max-width:100%;max-height:70vh"></p>
<p>${esc(it.name)} (${it.id})</p><p><a href="${back}">View in the Carbon Collection</a></p>
<script>location.replace(${JSON.stringify(back)})</script></body></html>
`);
}
console.log("Wrote", fs.readdirSync(dir).length, "piece pages");
