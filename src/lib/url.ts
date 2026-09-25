export const SITE = 'https://hostedhavens.co';

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

/** Internal link that respects the deploy base path (GitHub Pages preview). */
export function u(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}`;
}

/** Canonical URL: always the production domain, never the preview host. */
export function canonical(path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE}${p}`;
}

/** Prefix root-relative href/src attributes inside an HTML string with the deploy base. */
export function fixLinks(html: string): string {
  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`);
}

export function img(path: string): string {
  return u(`/images/${path.replace(/^\//, '')}`);
}
