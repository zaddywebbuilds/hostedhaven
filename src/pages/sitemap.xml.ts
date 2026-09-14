import type { APIRoute } from 'astro';
import { services } from '../data/services';
import { properties } from '../data/properties';
import { articles } from '../data/articles';

const SITE = 'https://hostedhavens.co';

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const pages: { path: string; priority: string }[] = [
    { path: '/', priority: '1.0' },
    ...services.map((s) => ({ path: `/${s.slug}/`, priority: s.slug === 'airbnb-management-san-antonio' ? '0.95' : '0.8' })),
    { path: '/pricing/', priority: '0.8' },
    { path: '/property-analysis/', priority: '0.9' },
    { path: '/results/', priority: '0.7' },
    { path: '/stays/', priority: '0.9' },
    { path: '/monthly-rentals-san-antonio/', priority: '0.7' },
    { path: '/pet-friendly-vacation-rentals-san-antonio/', priority: '0.7' },
    { path: '/furnished-rentals-near-randolph-afb/', priority: '0.7' },
    { path: '/why-book-direct/', priority: '0.6' },
    ...properties.map((p) => ({ path: `/stays/${p.slug}/`, priority: '0.6' })),
    { path: '/about/', priority: '0.6' },
    { path: '/contact/', priority: '0.6' },
    { path: '/resources/', priority: '0.6' },
    { path: '/resources/san-antonio-str-rules/', priority: '0.7' },
    ...articles.map((a) => ({ path: `/resources/${a.slug}/`, priority: '0.5' })),
    { path: '/privacy/', priority: '0.2' },
    { path: '/terms/', priority: '0.2' },
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
