// Per-stay social share images (1200×630 JPG) so shared stay links preview with that home.
// WebP previews are unreliable on WhatsApp, LinkedIn and iMessage, so these are JPG.
//   node scripts/og-stays.mjs
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');
const manifest = JSON.parse(await fs.readFile(path.join(root, 'src', 'data', 'images.json'), 'utf8'));
const propsSrc = await fs.readFile(path.join(root, 'src', 'data', 'properties.ts'), 'utf8');

// Same cover choice as src/lib/images.ts (first photo is a collage for these two).
const coverIndex = { 'the-harding-place': 1, 'grass-hollow': 4 };

// City per stay (matches the listings; mirrors citySlug in prepare-images.mjs).
const cityFor = (slug) => (/^ccp-|^legislation|^discovery-mill/.test(slug) ? 'Converse' : slug === 'grass-hollow' ? 'Live Oak' : slug === 'de-soto-lighthouse' ? 'Universal City' : 'San Antonio');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pairs = [...propsSrc.matchAll(/slug: '([^']+)', name: '([^']+)'/g)].map((m) => ({ slug: m[1], name: m[2] }));

const logo = await sharp(path.join(pub, 'images', 'brand', 'hosted-havens-logo-stacked-640.webp')).resize({ width: 150 }).toBuffer();
const logoMeta = await sharp(logo).metadata();
const outDir = path.join(pub, 'images', 'og', 'stays');
await fs.mkdir(outDir, { recursive: true });

let made = 0;
for (const { slug, name } of pairs) {
  const list = manifest.properties[slug];
  if (!list?.length) { console.warn('no photos for', slug); continue; }
  const cover = list[coverIndex[slug] ?? 0] ?? list[0];
  const photo = await sharp(path.join(pub, 'images', `${cover.base}-1280.webp`)).resize(1200, 630, { fit: 'cover', position: 'attention' }).toBuffer();

  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset=".42" stop-color="#2E2C16" stop-opacity="0"/>
      <stop offset="1" stop-color="#2E2C16" stop-opacity=".88"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="48" y="40" width="${logoMeta.width + 36}" height="${logoMeta.height + 28}" rx="18" fill="#FAF3E0" fill-opacity=".94"/>
  <text x="60" y="540" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="62" fill="#FAF3E0">${esc(name)}</text>
  <text x="62" y="588" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#E7CBA7" letter-spacing="1">Book direct with Hosted Havens · ${cityFor(slug)}, TX</text>
</svg>`;

  await sharp(photo)
    .composite([{ input: Buffer.from(overlay) }, { input: logo, top: 54, left: 66 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(outDir, `${slug}.jpg`));
  made++;
}
console.log(`og images written: ${made}/${pairs.length}`);
