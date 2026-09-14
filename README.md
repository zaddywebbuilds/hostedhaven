# Hosted Havens — Website

This is the premium, conversion-focused website for **Hosted Havens LLC**, which offers full-service short-term rental co-hosting and direct-booking stays in San Antonio, Texas.

- **Production domain:** https://hostedhavens.co. Canonical URLs always use this domain.
- **Preview:** GitHub Pages at `https://zaddywebbuilds.github.io/hostedhaven/`. The preview is built with `BASE_PATH=/hostedhaven` and blocked from indexing by its robots.txt.

## Stack
- [Astro](https://astro.build) static site: every page ships as pre-rendered HTML with minimal JavaScript
- Hand-written CSS design system in `src/styles/global.css` (warm cream canvas, glass surfaces, CSS 3D depth)
- `sharp` for image optimization scripts
- No UI framework, no React

## Local setup
```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview
```
Preview-path build (GitHub Pages):
```bash
BASE_PATH=/hostedhaven npm run build
```

## Project structure
```
src/
  data/         business.ts, properties.ts, services.ts, articles.ts, images.json (generated)
  components/   Header, Footer, InteriorHero, PropertyCard, FAQ, OwnerCTA, GuestLanding, Img, Icon, LegalPage
  layouts/      BaseLayout.astro (SEO meta, schema, header/footer, site JS)
  lib/          url.ts (base-aware links, canonicals), images.ts (image manifest helpers)
  pages/        all routes (see "Pages")
  styles/       global.css
scripts/
  prepare-images.mjs   builds WebP property/brand images from ../site-images and ../brand-assets
  brand-assets.mjs     favicons + 1200×630 social image
public/images/  generated, optimized imagery (originals are never modified)
```

## Editing business data
All phone numbers, emails, links, pricing, team, testimonials and claims live in **`src/data/business.ts`**.
- Stats in `businessStats` only display when `verified: true` **and** a value is set.
- Put the GA4 ID and verification codes in `analytics`. Nothing loads while they're empty.
- Set `formEndpoint` to a form service URL (Formspree, Make, Zapier or a CRM webhook) that accepts a JSON POST.

## Adding a property
1. Add the photos to `../site-images/<slug>/` (numbered in gallery order).
2. Add an entry to `src/data/properties.ts` with the verified details and the Hospitable widget URL.
3. Add the slug and city to `citySlug` in `scripts/prepare-images.mjs`, then run `npm run images`.
4. The stay page, stays grid, filters, sitemap and guest landing pages update automatically.

## Adding a service area page
Only create one for a **confirmed** management area, with unique local content. Build it from `[service].astro` or a new page, then add it to `sitemap.xml.ts`.

## Image workflow
- Source photos live in `WEBSITE BUILDS/Hosted Havens LLC/site-images` (live-site backup) and `brand-assets`.
- `npm run images` writes descriptive WebP files at 640/1280 widths plus `src/data/images.json` (widths and aspect ratios for CLS-free `<img>`).
- `src/components/Img.astro` renders `srcset`, explicit dimensions and lazy loading; the hero uses `fetchpriority="high"`.

## SEO architecture
- Owner money page: `/airbnb-management-san-antonio/`, plus supporting service pages
- Guest hub: `/stays/`, plus intent pages (monthly, pet-friendly, Randolph AFB) and 22 stay pages
- Resources: `/resources/`, including the San Antonio STR rules guide and migrated articles
- Structured data: Organization (every page), BreadcrumbList, Service, VacationRental, ItemList, Article. No self-serving AggregateRating.
- See `SEO-CHECKLIST.md` and `redirects.md`.

## Analytics events
`owner_analysis_start`, `owner_analysis_submit`, `property_tour_click`, `phone_click`, `owner_email_click`, `guest_email_click`, `stays_view`, `property_view`, `availability_search`, `book_now_click`, `direct_booking_click`, `calendly_click`. Add `data-track="event_name"` to any link to track it.

## Deployment
- `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on pushes to `main` and `claude/hosted-havens-revamp`.
- **Production (Hostinger):** run `npm run build`, upload `dist/` to `public_html`, add the redirects from `redirects.md`, and keep a WordPress backup first. Do not change DNS without owner approval.

## Launch checklist
- [ ] Every item in `OWNER-VERIFY.md` resolved
- [ ] Form endpoint connected and tested end-to-end
- [ ] GA4 and Search Console configured
- [ ] 301 redirects live; spot-check old URLs
- [ ] Hospitable booking widgets tested on every stay page
- [ ] Lighthouse and accessibility pass on mobile and desktop
- [ ] Sitemap submitted
