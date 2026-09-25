import manifest from '../data/images.json';

export type ImgEntry = { base: string; ratio: number; widths: number[] };

const m = manifest as unknown as { properties: Record<string, ImgEntry[]>; brand: Record<string, ImgEntry> };

export function propertyImages(slug: string): ImgEntry[] {
  return m.properties?.[slug] ?? [];
}

export function coverImage(slug: string): ImgEntry | undefined {
  return propertyImages(slug)[0];
}

export function brandImage(key: string): ImgEntry | undefined {
  return m.brand?.[key];
}
