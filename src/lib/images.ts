import manifest from '../data/images.json';

export type ImgEntry = { base: string; ratio: number; widths: number[] };

const m = manifest as unknown as { properties: Record<string, ImgEntry[]>; brand: Record<string, ImgEntry> };

export function propertyImages(slug: string): ImgEntry[] {
  return m.properties?.[slug] ?? [];
}

// Some first gallery photos are collages; use a single strong photo as the cover instead.
const coverIndex: Record<string, number> = { 'the-harding-place': 1, 'grass-hollow': 4 };

export function coverImage(slug: string): ImgEntry | undefined {
  const imgs = propertyImages(slug);
  return imgs[coverIndex[slug] ?? 0] ?? imgs[0];
}

export function brandImage(key: string): ImgEntry | undefined {
  return m.brand?.[key];
}
