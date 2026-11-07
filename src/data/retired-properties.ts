/**
 * Properties that were on the site and have since been removed.
 *
 * Two things outlive a deletion. Astro stops generating the property page, but
 * the copy already uploaded to Hostinger stays put, because the deploy uploads
 * files and never removes them; the old URL keeps serving a stale listing.
 * Articles that linked to the property are also left pointing at it.
 *
 * Naming a slug here republishes its URL as a redirect to the stays index. That
 * overwrites the stale file on the server and keeps old inbound links working.
 *
 * Slugs an article still links to are picked up automatically (see
 * missingPropertyRefs in articles.ts), so this list is only needed for
 * properties nothing links to, which would otherwise be missed.
 */
export const retiredPropertySlugs: string[] = [
  // Removed by Megan from the admin, 2026-11-06.
  'grass-hollow',
  'evergreen-1',
  'evergreen-2',
];
