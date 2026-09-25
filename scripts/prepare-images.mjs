// Builds optimized, descriptively named WebP copies of the client imagery.
// Source folders are read-only inputs — originals are never modified.
//   node scripts/prepare-images.mjs
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_IMAGES = process.env.SITE_IMAGES || path.resolve(root, '..', 'site-images');
const BRAND = process.env.BRAND_ASSETS || path.resolve(root, '..', 'brand-assets');
const OUT = path.join(root, 'public', 'images');
const DATA = path.join(root, 'src', 'data', 'images.json');
const PER_PROPERTY = 14;
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
  for (const f of picked) {
    n++;
    const base = `properties/${slug}/${slug}-${citySlug[slug]}-tx-rental-${String(n).padStart(2, '0')}`;
    try { manifest.properties[slug].push(await emit(path.join(dir, f), base)); }
    catch (e) { console.warn(`skip ${slug}/${f}: ${e.message}`); }
  }
  console.log(`${slug}: ${manifest.properties[slug].length} images`);
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
for (const [file, base, widths] of brandJobs) {
  const p = path.join(BRAND, file);
  if (await exists(p)) manifest.brand[base.split('/')[1]] = await emit(p, base, widths, { quality: 85 });
}
for (const [file, out] of [['Ks.svg', 'team/ks.svg'], ['CR.png', 'team/cr.png'], ['PN.png', 'team/pn.png'], ['2.png', 'team/mm.png'], ['Cs-Outsourcing.png', 'team/cs-outsourcing.png'], ['HH-HORIZONTAL-LOGO-WITH-TAG.png', 'brand/hosted-havens-logo-horizontal-white.png'], ['HOSTED-HAVENS-SQUARE-LOGO-ICON-WHITE-TRANSPARENT.png', 'brand/hosted-havens-icon-white.png']]) {
  const p = path.join(BRAND, file);
  if (await exists(p)) { await fs.mkdir(path.dirname(path.join(OUT, out)), { recursive: true }); await fs.copyFile(p, path.join(OUT, out)); }
}

await fs.writeFile(DATA, JSON.stringify(manifest, null, 1));
console.log('manifest written');
