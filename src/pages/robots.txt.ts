import type { APIRoute } from 'astro';

// Preview builds (BASE_PATH set) are blocked from indexing; production allows crawling.
export const GET: APIRoute = () => {
  const isPreview = Boolean(process.env.BASE_PATH && process.env.BASE_PATH !== '/');
  const body = isPreview
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\n\nSitemap: https://hostedhavens.co/sitemap.xml\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
