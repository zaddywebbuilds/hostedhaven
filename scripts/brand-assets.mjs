// Generates favicons and the 1200×630 social share image from client assets.
//   node scripts/brand-assets.mjs
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');
const manifest = JSON.parse(await fs.readFile(path.join(root, 'src', 'data', 'images.json'), 'utf8'));

// Favicon: the Hosted Havens roof + HH mark, drawn in brand colors.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#FDF4E8"/>
  <path d="M8 31 32 8l24 23h-6L32 13.5 14 31z" fill="#C0573A"/>
  <path d="M44 15h5v10l-5-4.8z" fill="#C0573A"/>
  <path d="M19 33l4-4v7h8V20l-2 2v0l2-2v35h-4V40h-4v15h-4z" fill="#D4A373"/>
  <path d="M33 20l4 4v12h6v-7l4 4v22h-4V40h-6v15h-4z" fill="#676136"/>
</svg>`;
await fs.writeFile(path.join(pub, 'favicon.svg'), favicon);
await sharp(Buffer.from(favicon)).resize(32, 32).png().toFile(path.join(pub, 'favicon-32.png'));
await sharp(Buffer.from(favicon)).resize(180, 180).flatten({ background: '#FDF4E8' }).png().toFile(path.join(pub, 'apple-touch-icon.png'));

// Social share image
const cover = manifest.properties['the-harding-place'][0];
const photo = await sharp(path.join(pub, 'images', `${cover.base}-1280.webp`)).resize(1200, 630, { fit: 'cover' }).toBuffer();
const logo = await sharp(path.join(pub, 'images', 'brand', 'hosted-havens-logo-stacked-640.webp')).resize({ width: 220 }).toBuffer();
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FDF4E8" stop-opacity=".97"/>
      <stop offset=".52" stop-color="#FBE0CF" stop-opacity=".9"/>
      <stop offset=".75" stop-color="#FBE0CF" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="70" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="58" fill="#2A1F1A">San Antonio STR</text>
  <text x="70" y="400" font-family="Georgia, 'Times New Roman', serif" font-size="58" fill="#2A1F1A">Co-Hosting &amp;</text>
  <text x="70" y="470" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-style="italic" fill="#E5664A">Vacation Rentals</text>
  <text x="72" y="545" font-family="Arial, sans-serif" font-size="22" letter-spacing="3" fill="#5C4A3F">HOSTEDHAVENS.CO</text>
</svg>`;
await fs.mkdir(path.join(pub, 'images', 'og'), { recursive: true });
await sharp(photo)
  .composite([{ input: Buffer.from(overlay) }, { input: logo, top: 60, left: 70 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(pub, 'images', 'og', 'hosted-havens-og.jpg'));
console.log('favicons + og image written');
