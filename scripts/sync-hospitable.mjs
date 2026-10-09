// Pulls listing content from Hospitable into a committed snapshot so the site
// shows what is actually in the PMS rather than hand-written summaries.
//
//   npm run sync
//
// Why a snapshot rather than a live fetch at build time: the API key lives in
// .env and is deliberately not in CI, so the deployed build must not need it.
// Re-run this whenever listings change in Hospitable, then commit the result.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, 'src', 'data', 'hospitable.json');
const API = 'https://public.api.hospitable.com/v2';

const token = process.env.HOSPITABLE_API_KEY;
if (!token) {
  console.error('HOSPITABLE_API_KEY missing. Add it to .env (it is gitignored).');
  process.exit(1);
}

const get = async (p) => {
  const r = await fetch(`${API}${p}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });
  if (!r.ok) throw new Error(`${p} -> HTTP ${r.status}`);
  return (await r.json()).data;
};

// Hospitable names map to our slugs. Anything unmatched is reported rather than
// silently skipped, so a rename in the PMS surfaces here instead of going stale.
const slugFor = {
  'Harding Place': 'the-harding-place', 'Grass Hollow': 'grass-hollow',
  'De Soto': 'de-soto-lighthouse', 'La Maison Blount': 'la-maison-blount',
  'Coastal Run': 'coastal-run', 'Halliday': 'halliday-fig-trees',
  'Liberty Bell': 'liberty-bell', 'Discovery Mill Crash Pad': 'discovery-mill-crash-pad',
  'CCP 1': 'ccp-1', 'CCP 2': 'ccp-2', 'CCP 3': 'ccp-3', 'CCP 4': 'ccp-4', 'CCP 5': 'ccp-5',
  'S Park 1A': 's-park-1a', 'S Park 1B': 's-park-1b', 'S Park 1C': 's-park-1c',
  'S Park 1D': 's-park-1d', 'S Park 2A': 's-park-2a', 'S Park 2B': 's-park-2b',
  'S Park 2C': 's-park-2c', 'S Park 2D': 's-park-2d',
  'Quiet Fox': 'quiet-fox', 'Retama Hollow': 'retama-hollow',
  'Evergreen 1': 'evergreen-1', 'Evergreen 2': 'evergreen-2',
  'Santa Anna main': 'santa-anna-main', 'Santa Anna casita': 'santa-anna-casita',
  'Santa Anna combo': 'santa-anna-combo',
};

// Hospitable amenity keys are snake_case; render them as readable labels.
const label = (k) => k
  .replace(/_/g, ' ')
  .replace(/\b(tv|ac|wifi|bbq|ev)\b/gi, (m) => m.toUpperCase())
  .replace(/^./, (c) => c.toUpperCase());

const props = await get('/properties?per_page=60');
const live = props.filter((p) => p.listed);

const out = {};
const unmatched = [];
for (const p of live) {
  const slug = slugFor[p.name];
  if (!slug) { unmatched.push(p.name); continue; }
  out[slug] = {
    publicName: p.public_name || '',
    // the PMS description is the long-form copy guests see on the platforms
    description: (p.description || '').trim(),
    amenities: (p.amenities || []).map(label).sort(),
    checkin: p.checkin || '',
    checkout: p.checkout || '',
    houseRules: p.house_rules || {},
    syncedAt: new Date().toISOString().slice(0, 10),
  };
}

await fs.writeFile(OUT, JSON.stringify(out, null, 1) + '\n', 'utf8');
console.log(`synced ${Object.keys(out).length} listings -> src/data/hospitable.json`);
if (unmatched.length) {
  console.log(`\nlisted in Hospitable but not mapped to a slug (add them to slugFor):`);
  for (const n of unmatched) console.log('  ' + n);
}
const missing = Object.values(slugFor).filter((s) => !out[s]);
if (missing.length) {
  console.log(`\non the site but no longer listed in Hospitable:`);
  for (const s of missing) console.log('  ' + s);
}
