/**
 * Legacy URL map for the WordPress -> Astro migration.
 *
 * Every address on the old site changed shape, so without these the existing
 * Google rankings and any inbound links would 404 on launch. Each entry is
 * rendered as a static stub by src/pages/[...oldpath].astro (canonical tag plus
 * an immediate refresh), which is the best a static host can do.
 *
 * public/_redirects carries the same mapping as real 301s for Netlify or
 * Cloudflare Pages. Keep the two in sync if this list changes.
 */
export type Redirect = { from: string; to: string };

const propertySlugs = [
  'halliday-fig-trees', 's-park-1a', 's-park-1b', 's-park-1c', 's-park-1d',
  's-park-2a', 's-park-2b', 's-park-2c', 's-park-2d', 'la-maison-blount',
  'grass-hollow', 'liberty-bell', 'the-harding-place',
  'ccp-1', 'ccp-2', 'ccp-3', 'ccp-4', 'ccp-5',
  'discovery-mill-crash-pad', 'de-soto-lighthouse', 'coastal-run',
];

const carriedOverArticles = [
  'the-diy-trap',
  'the-difference-between-a-furnished-home-and-an-optimized-short-term-rental',
  'why-choose-hosted-havens',
  'from-one-house-to-hosted-havens-how-a-missed-move-abroad-sparked-my-dream-business',
  'san-antonio-homeowners-dont-miss-out-on-the-90-billion-airbnb-boom',
  'the-future-of-getaways-top-vacation-rental-trends-for-2025-and-what-they-mean-for-san-antonio',
  // Carried over 2026-10-01 after Megan confirmed both are live and should stay.
  'get-airbnb-management-in-san-antonio',
  'san-antonio-realtors-earn-referral-income-without-managing-rentals',
];

export const redirects: Redirect[] = [
  // Pages
  { from: '/bespoke-san-antonio-str-management-agency/', to: '/airbnb-management-san-antonio/' },
  { from: '/full-service-str-co-hosting/', to: '/airbnb-co-host-san-antonio/' },
  { from: '/contact-hosted-havens/', to: '/contact/' },
  { from: '/insights-and-updates/', to: '/resources/' },
  { from: '/property-intake-form/', to: '/property-analysis/' },
  { from: '/properties-search-results/', to: '/stays/' },
  { from: '/privacy-policy/', to: '/privacy/' },
  { from: '/terms-conditions/', to: '/terms/' },
  // The old FAQ page has no single equivalent: owner FAQs now sit on the
  // management page, which is the closest match for what it ranked for.
  { from: '/frequently-asked-questions/', to: '/airbnb-management-san-antonio/' },

  // Articles that moved from /article/ to /resources/
  ...carriedOverArticles.map((slug) => ({ from: `/article/${slug}/`, to: `/resources/${slug}/` })),

  // Articles that became pages
  { from: '/article/why-book-direct/', to: '/why-book-direct/' },

  // Legislation was deleted in Hospitable (2026-10), so its old property URL
  // goes to the stays index rather than a page that no longer exists.
  { from: '/property/legislation-4br/', to: '/stays/' },

  // Renamed at Megan's request (2026-10-01): "service video" rather than "training video".
  { from: '/training-video/', to: '/service-video/' },

  // Properties moved from /property/ to /stays/
  ...propertySlugs.map((slug) => ({ from: `/property/${slug}/`, to: `/stays/${slug}/` })),
];
