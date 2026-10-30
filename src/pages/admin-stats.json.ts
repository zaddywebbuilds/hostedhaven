// Counts for the admin dashboard, emitted at build time.
// The dashboard used to read these from the GitHub contents API, which reports
// whatever is on the default branch rather than what is actually published.
// Building them here means the numbers always match the live site.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { articles } from '../data/articles';
import { properties } from '../data/properties';

export const prerender = true;

export const GET: APIRoute = async () => {
  const cms = await getCollection('blog');

  // cms marks the ones that open in the editor. The rest are authored in code,
  // so the dashboard links those to the live article instead of a dead edit URL.
  const posts = [
    ...articles.map((a) => ({ slug: a.slug, title: a.title, cluster: a.cluster, published: a.published, cms: false })),
    ...cms.map((e) => ({ slug: e.id, title: e.data.title, cluster: e.data.cluster, published: e.data.published, cms: true })),
  ].sort((a, b) => b.published.localeCompare(a.published));

  return new Response(
    JSON.stringify({
      posts: posts.length,
      properties: properties.length,
      recent: posts.slice(0, 6),
      builtAt: new Date().toISOString(),
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
};
