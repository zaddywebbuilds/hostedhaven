// Builds optimized, descriptively named WebP copies of the client imagery.
// Source folders are read-only inputs — originals are never modified.
//   node scripts/prepare-images.mjs
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CLIENT = 'C:/Users/Johno/OneDrive/WEBSITE BUILDS/Hosted Havens LLC';
const SITE_IMAGES = process.env.SITE_IMAGES || path.join(CLIENT, 'site-images');
const BRAND = process.env.BRAND_ASSETS || path.join(CLIENT, 'brand-assets');
const OUT = path.join(root, 'public', 'images');
const DATA = path.join(root, 'src', 'data', 'images.json');
const PER_PROPERTY = Infinity;
const WIDTHS = [640, 1280];

const citySlug = {
  'halliday-fig-trees': 'san-antonio', 'liberty-bell': 'san-antonio', 'de-soto-lighthouse': 'universal-city',
  'coastal-run': 'san-antonio', 'the-harding-place': 'san-antonio', 'grass-hollow': 'live-oak',
  'la-maison-blount': 'san-antonio', 'legislation-4br': 'converse', 'discovery-mill-crash-pad': 'converse',
  'ccp-1': 'converse', 'ccp-2': 'converse', 'ccp-3': 'converse', 'ccp-4': 'converse', 'ccp-5': 'converse',
  's-park-1a': 'san-antonio', 's-park-1b': 'san-antonio', 's-park-1c': 'san-antonio', 's-park-1d': 'san-antonio',
  's-park-2a': 'san-antonio', 's-park-2b': 'san-antonio', 's-park-2c': 'san-antonio', 's-park-2d': 'san-antonio',
};

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

// 64-bit difference hash: visually identical photos (resized/re-encoded copies) land within a few bits.
async function dhash(file) {
  const px = await sharp(file, { failOn: 'none' }).rotate().greyscale().resize(9, 8, { fit: 'fill' }).raw().toBuffer();
  let bits = '';
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits += px[y * 9 + x] > px[y * 9 + x + 1] ? '1' : '0';
  return bits;
}
const hamming = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d; };

async function emit(input, outBase, widths = WIDTHS, opts = {}) {
  const meta = await sharp(input, { failOn: 'none' }).rotate().metadata();
  const ratio = (meta.height || 1) / (meta.width || 1);
  const result = { base: outBase.replace(/\\/g, '/'), ratio: Number(ratio.toFixed(4)), widths: [] };
  for (const w of widths) {
    const width = Math.min(w, meta.width || w);
    const file = path.join(OUT, `${outBase}-${w}.webp`);
    if (!(await exists(file))) {
      await fs.mkdir(path.dirname(file), { recursive: true });
      await sharp(input, { failOn: 'none' }).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: opts.quality ?? 78, effort: 5 }).toFile(file);
    }
    result.widths.push(w);
  }
  return result;
}

const manifest = { properties: {}, brand: {} };

// Property galleries — first N photos in on-site gallery order, deduplicated by file size.
for (const slug of Object.keys(citySlug)) {
  const dir = path.join(SITE_IMAGES, slug);
  if (!(await exists(dir))) { console.warn(`missing ${slug}`); continue; }
  // Full gallery in live-site order. Files are named NNN-original.ext by gallery position.
  const files = (await fs.readdir(dir)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort();
  const seen = new Set();
  const picked = [];
  for (const f of files) {
    const st = await fs.stat(path.join(dir, f));
    if (st.size < 20_000 || seen.has(st.size)) continue;
    seen.add(st.size);
    picked.push(f);
    if (picked.length >= PER_PROPERTY) break;
  }
  manifest.properties[slug] = [];
  let n = 0;
  const pickedHashes = [];
  for (const f of picked) {
    n++;
    const base = `properties/${slug}/${slug}-${citySlug[slug]}-tx-rental-${String(n).padStart(2, '0')}`;
    try {
      manifest.properties[slug].push(await emit(path.join(dir, f), base));
      pickedHashes.push(await dhash(path.join(dir, f)));
    } catch (e) { console.warn(`skip ${slug}/${f}: ${e.message}`); }
  }
  // Second pass: small-but-real photos (AVIF squeezes a full 720px photo under 20 KB).
  // Keep any that are photo-sized and visually different from everything already picked.
  // Appended after the existing sequence so current photo numbers never shift.
  let added = 0;
  for (const f of files) {
    if (picked.includes(f)) continue;
    const abs = path.join(dir, f);
    try {
      const meta = await sharp(abs, { failOn: 'none' }).metadata();
      if ((meta.width || 0) < 600) continue;
      const h = await dhash(abs);
      if (pickedHashes.some((p) => hamming(p, h) <= 10)) continue;
      n++;
      const base = `properties/${slug}/${slug}-${citySlug[slug]}-tx-rental-${String(n).padStart(2, '0')}`;
      manifest.properties[slug].push(await emit(abs, base));
      pickedHashes.push(h);
      added++;
    } catch (e) { console.warn(`skip ${slug}/${f}: ${e.message}`); }
  }
  console.log(`${slug}: ${manifest.properties[slug].length} images (${added} small AVIF photos added)`);
}

// Brand + people
const brandJobs = [
  ['Megan.png', 'team/megan-blount-hosted-havens-founder', [480, 960]],
  ['San-Antonio-Road-Map.jpg', 'brand/san-antonio-map', [960, 1600]],
  ['House.jpg', 'brand/san-antonio-rental-home-exterior', [640, 1280]],
  ['Hero-Green-Orange-Bedroom.jpg', 'brand/san-antonio-vacation-rental-bedroom', [640, 1280]],
  ['VERTICAL-COLOR-GUESTS.png', 'brand/hosted-havens-logo-stacked', [320, 640]],
  ['VERTICAL-COLOR-OWNERS.png', 'brand/hosted-havens-logo-stacked-owners', [320, 640]],
];
// Images that sat on specific live pages (homepage review avatars, owner page photo).
brandJobs.push(
  [path.join(SITE_IMAGES, '_owners-cohosting-page', '005-happy-smiling-mature-older-family-couple-new-home-owners-standing-outside-house-.jpg'), 'brand/happy-homeowners-outside-house', [640, 1280]],
  [path.join(SITE_IMAGES, '_homepage', '011-05267295-9b85-451c-b6e1-744cb9f0936c.avif'), 'reviews/guest-stephanie', [96, 192]],
  [path.join(SITE_IMAGES, '_homepage', '012-00af2627-cef4-45e7-9022-54dba5755da7.avif'), 'reviews/guest-melanie', [96, 192]],
  [path.join(SITE_IMAGES, '_homepage', '013-f8107259-8dff-4181-bfe0-5bb969f398d9-1.avif'), 'reviews/guest-chance', [96, 192]],
  [path.join(SITE_IMAGES, '_homepage', '014-0276c772-ee39-4402-bdad-b9dfeffbe3b6.avif'), 'reviews/guest-abel', [96, 192]],
);
// Licensed stock (Unsplash License) illustrating services the client photos don't show.
for (const name of ['property-care-making-bed', 'listing-photography-tripod', 'revenue-analytics-laptop', 'owner-checking-phone', 'extended-stay-suitcase']) {
  brandJobs.push([path.join(BRAND, 'stock', `${name}.jpg`), `stock/${name}`, [640, 1280]]);
}
for (const [file, base, widths] of brandJobs) {
  const p = path.isAbsolute(file) ? file : path.join(BRAND, file);
  if (await exists(p)) manifest.brand[base.split('/')[1]] = await emit(p, base, widths, { quality: 85 });
}
for (const [file, out] of [['Ks.svg', 'team/ks.svg'], ['CR.png', 'team/cr.png'], ['PN.png', 'team/pn.png'], ['2.png', 'team/mm.png'], ['Cs-Outsourcing.png', 'team/cs-outsourcing.png'], ['HH-HORIZONTAL-LOGO-WITH-TAG.png', 'brand/hosted-havens-logo-horizontal-white.png'], ['HOSTED-HAVENS-SQUARE-LOGO-ICON-WHITE-TRANSPARENT.png', 'brand/hosted-havens-icon-white.png']]) {
  const p = path.join(BRAND, file);
  if (await exists(p)) { await fs.mkdir(path.dirname(path.join(OUT, out)), { recursive: true }); await fs.copyFile(p, path.join(OUT, out)); }
}

await fs.writeFile(DATA, JSON.stringify(manifest, null, 1));
console.log('manifest written');
