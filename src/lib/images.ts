import manifest from '../data/images.json';

export type ImgEntry = { base: string; ratio: number; widths: number[] };
export type CmsPhoto  = { url: string };
export type AnyImage  = ImgEntry | CmsPhoto;

export function isCmsPhoto(im: AnyImage): im is CmsPhoto {
  return 'url' in im;
}
export function imgUrl(im: AnyImage): string {
  return isCmsPhoto(im) ? im.url : `/images/${im.base}-1280.webp`;
}
export function imgThumbUrl(im: AnyImage): string {
  return isCmsPhoto(im) ? im.url : `/images/${im.base}-640.webp`;
}

const m = manifest as unknown as { properties: Record<string, ImgEntry[]>; brand: Record<string, ImgEntry> };

export function propertyImages(slug: string): ImgEntry[] {
  return m.properties?.[slug] ?? [];
}

/** Returns CMS-uploaded photos when present, otherwise falls back to the processed WebP manifest. */
export function resolveImages(slug: string, cmsPhotos?: string[]): AnyImage[] {
  if (cmsPhotos && cmsPhotos.length > 0) return cmsPhotos.map((url) => ({ url }));
  return propertyImages(slug);
}

export function coverImage(slug: string): ImgEntry | undefined {
  return propertyImages(slug)[0];
}

export function brandImage(key: string): ImgEntry | undefined {
  return m.brand?.[key];
}
