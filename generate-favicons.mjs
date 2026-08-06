import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const cwd = process.cwd();
const src = join(cwd, 'public', 'favicon.png');
const out = join(cwd, 'public');

const sizes = [
  { name: 'favicon-16x16.png',       size: 16 },
  { name: 'favicon-32x32.png',       size: 32 },
  { name: 'favicon-48x48.png',       size: 48 },
  { name: 'apple-touch-icon.png',    size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'icon-96x96.png',          size: 96 },
  { name: 'icon-128x128.png',        size: 128 },
  { name: 'icon-256x256.png',        size: 256 },
  { name: 'mstile-150x150.png',      size: 150 },
];

console.log('Generating favicon sizes...');

for (const { name, size } of sizes) {
  await sharp(src)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(out, name));
  console.log(`✓ ${name} (${size}x${size})`);
}

// (favicon.png is the source - skip regenerating it)
console.log('✓ favicon.png (source, kept as-is)');

// favicon.ico as 32x32 PNG copy (skip if same file issues)
await sharp(src)
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()
  .then(buf => { writeFileSync(join(out, 'favicon.ico'), buf); });
console.log('✓ favicon.ico (32x32)');

// site.webmanifest
const manifest = {
  name: "Pudin - Production Studio",
  short_name: "Pudin",
  description: "De la idea al contenido viral a la velocidad del contenido.",
  start_url: "/",
  display: "standalone",
  background_color: "#fbf9f4",
  theme_color: "#ea460a",
  icons: [
    { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    { src: "/favicon.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
  ]
};

writeFileSync(join(out, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
console.log('✓ site.webmanifest');

// browserconfig.xml for Windows tiles
const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>#ea460a</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;

writeFileSync(join(out, 'browserconfig.xml'), browserconfig);
console.log('✓ browserconfig.xml');

console.log('\nAll done! ✅');
