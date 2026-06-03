import sharp from "sharp";
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else results.push(full);
  }
  return results;
}

const images = walk("public").filter(f => /\.(png|jpg|jpeg)$/i.test(f));

for (const file of images) {
  const ext = extname(file);
  const output = file.slice(0, -ext.length) + ".webp";
  const before = statSync(file).size;
  const img = sharp(file);
  const info = await img.webp({ quality: 80 }).toFile(output);
  console.log(`${file} (${(before/1024).toFixed(1)}KB) → ${output} (${(info.size/1024).toFixed(1)}KB)`);
}
console.log(`\n✅ ${images.length} imágenes convertidas`);
