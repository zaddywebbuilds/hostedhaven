# SEO Checklist

Run through this list for every new or edited indexable page.

## Per page
- [ ] Unique `<title>` of about 50–60 characters, with the primary keyword near the front
- [ ] Unique meta description of about 140–160 characters
- [ ] Exactly one H1, with a logical H2/H3 hierarchy
- [ ] Self-referencing canonical on `https://hostedhavens.co` (handled by `BaseLayout`)
- [ ] Open Graph and Twitter tags (handled by `BaseLayout`; pass `ogImage` for page-specific images)
- [ ] Descriptive alt text on meaningful images; decorative images use `alt=""`
- [ ] Breadcrumbs (visible and `BreadcrumbList` schema) on interior pages
- [ ] Appropriate structured data (Service, VacationRental, Article, ItemList)
- [ ] Two or more contextual internal links with descriptive anchors
- [ ] One clear primary CTA, tracked with `data-track`
- [ ] Local relevance (San Antonio, TX, and nearby demand drivers) without keyword stuffing

## Site-wide
- [ ] `/sitemap.xml` lists only canonical, finished, indexable pages (update `src/pages/sitemap.xml.ts`)
- [ ] `/robots.txt` allows crawling in production and disallows preview builds
- [ ] 301 redirects from `redirects.md` are live at launch
- [ ] No placeholder text, fake reviews or unverified statistics
- [ ] Lighthouse: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100
- [ ] Google Search Console and Bing Webmaster verified; sitemap submitted
- [ ] GA4 conversion events: `owner_analysis_submit`, `phone_click`, `calendly_click`, `book_now_click`, `direct_booking_click`

## Keyword ownership (avoid cannibalization)
| URL | Primary intent |
|---|---|
| `/` | Hosted Havens brand + San Antonio Airbnb management and vacation rentals |
| `/airbnb-management-san-antonio/` | Airbnb / STR / vacation rental management San Antonio |
| `/airbnb-co-host-san-antonio/` | Airbnb co-host San Antonio |
| `/mid-term-rental-management-san-antonio/` | Mid-term / furnished rental management |
| `/airbnb-revenue-management-san-antonio/` | Airbnb revenue management / dynamic pricing |
| `/airbnb-listing-optimization-san-antonio/` | Airbnb listing optimization |
| `/airbnb-setup-san-antonio/` | Launching an Airbnb in San Antonio |
| `/str-property-care-san-antonio/` | STR cleaning & maintenance |
| `/pricing/` | Airbnb co-hosting cost San Antonio |
| `/stays/` | San Antonio vacation rentals / furnished stays |
| `/monthly-rentals-san-antonio/` | Monthly rentals San Antonio |
| `/pet-friendly-vacation-rentals-san-antonio/` | Pet-friendly vacation rentals |
| `/furnished-rentals-near-randolph-afb/` | Rentals near Randolph AFB |
| `/resources/san-antonio-str-rules/` | San Antonio STR rules & permits |
