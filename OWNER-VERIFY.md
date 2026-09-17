# Owner Verification Checklist

Everything below needs confirmation from Hosted Havens (Megan) before launch. Nothing marked **hidden** renders publicly until it's verified in `src/data/business.ts`.

## Brand + owner feedback (Megan, 2026-09-15 email)
Applied from the Feb 2025 Brand Guidelines PDF and Megan's email:
- Palette is now tan #D4A374 (primary), olive #656134 (secondary), rust #C0573B (accent), cream #FAF3E0. All pink/coral tones removed.
- Typography is now Montserrat (headings, semibold/bold only) and Source Sans 3 (body), per the guide.
- No "free property analysis" anywhere. The owner path is: property form -> overview video -> paid property tour ($150, includes extensive prep and a detailed analysis report).
- Email is the primary contact. The phone number now appears only in the footer and on the Contact page; all Call buttons elsewhere are now email.
- [ ] Send the logo files (Google Drive folder) including the white-trimmed version, so the header/footer logos use the current artwork
- [ ] Supply the owner overview video (link or file) used between the form and the tour
- [ ] Confirm the tour booking link (Calendly "property-analysis-tour") and whether payment is collected up front
- [ ] Confirm the $150 tour fee is public-facing and whether it is credited toward setup if the owner signs
- [ ] Confirm the one-time listing setup fee ($150-$500) still applies alongside the tour fee
- [x] **Property form delivery:** Web3Forms access key added (form "Hosted Havens Property Form"). [ ] Send one test submission and confirm it arrives in the inbox the key was registered to
- [ ] **Coastal Run video tour** (stay page) uses an AI-generated presenter built from the listing photos. It is labelled on the page as "Video created with AI from this home's listing photos". Confirm Megan is happy to publish it and keep the label

## Credentials & status — hidden until confirmed
- [ ] Airbnb Promoted Co-Host status is current
- [ ] Volunteer Airbnb San Antonio Community Leader status is current
- [ ] Member, Short Term Rental Association of San Antonio
- [ ] Permission to use any Airbnb or STRA logos/badges (none are used yet)

## Performance claims — hidden until confirmed
- [ ] "Typically 75%+ occupancy" (from current owner FAQ): source data?
- [ ] "About $15,000 more per year" (from current owner FAQ): methodology?
- [ ] Current Airbnb average rating (an April 2025 article said 4.95; not displayed)
- [ ] Review count and number of properties hosted
- [ ] Any real before/after numbers for case studies (Results page currently uses qualitative showcases only)

## Pricing — displayed
- [ ] Management fee still 18%–22% per booking
- [ ] One-time listing setup fee still $150–$500
- [ ] How cleaning fees are charged (pricing FAQ says "outlined in your proposal")

## Operations wording — displayed, please confirm
- [ ] Support team available 7 days a week
- [ ] Complimentary professional photography at onboarding
- [ ] Tax collection and remittance support
- [ ] No long-term contracts
- [ ] Direct-booking perks (early check-in/late checkout, promotions) and "flexible changes"
- [ ] Moderate cancellation policy (5 days) as the default
- [ ] Removed from migrated articles pending confirmation: "24/7 guest communication", "detailed monthly performance reports", "dozens of owners", "AI-powered guest support"

## Team — displayed
- [ ] Megan (Founder), Kemi (Guest Services), Christina (Maintenance Coordinator), Pretty (Creative), CS Outsourcing (Revenue Management), Mark (Photographer) are all current
- [ ] Team photos for Kemi, Christina, Pretty and Mark (monogram marks are used today)
- [ ] Megan's surname "Blount" is used publicly (taken from her LinkedIn URL)

## Service areas — displayed as the stay locations only
- [ ] Confirm owner-management coverage: San Antonio, Converse, Universal City, Live Oak (and Leon Valley?)
- [ ] No city-specific management landing pages exist yet; add them only for confirmed areas

## Properties
- [ ] All 22 listings are still active
- [ ] City for **Halliday** and **Liberty Bell** (set to San Antonio)
- [ ] **Coastal Run**: listed as San Antonio; description says Leon Valley. Baths 2 vs. 2.5
- [ ] **Discovery Mill** and **Crashpad Room 1**: the live pages returned database errors while scraping; details come from the stays list (confirm highlights, and whether it's the whole-house version of The Crashpad)
- [ ] Pet policy for Liberty Bell, De Soto, Legislation and the Crashpad rooms (set to not pet friendly)
- [ ] **La Maison Blount**: is this Megan's first home from the founder story? It would be a great story detail to add

## Photo rights
- [ ] **Legislation** photos (live-site gallery) carry a "Copyright 2024 San Antonio Board of Realtors" MLS watermark. They are shown unaltered on its stay page only, and are kept out of heroes and featured spots. Replace them with owner-owned photography before launch. Do not crop out watermarks.
- [ ] Spot-check the other galleries for MLS watermarks before launch.

## Videos
- [ ] `house-tour.mp4` came from the live site (homepage + co-hosting page). It's now used in the homepage hero and the Airbnb Management hero.
- [ ] The tour reel (homepage) uses `hosted-havens-showcase.mp4` and `scene1–8.mp4` from `SHORT VIDEO CONTENTS/Hosted Havens LLC/VIDEOS`. These clips aren't on the live site. Confirm Hosted Havens approves them for the website, and that the presenter has signed a talent/likeness release.
- [ ] Clip labels (Living Room, Arched Entry, Studio Kitchen, Accent Wall, Chef’s Kitchen, Bedroom Suite, Dining Room, Outdoors) were inferred from the footage. Rename them to the actual properties if preferred.

## About page · "How we work" scenes
Each value card shows an illustrative operations scene over a real listing photo (`src/components/ValuesSystem.astro`). The scenes are labelled as examples ("A typical arrival", "Illustrative pricing"). They use no guest or owner names and make no revenue claims.
- [ ] Confirm the example wording reads true to how Hosted Havens works: check-in message, the turnover checklist items, the warm-house maintenance example, and the owner update timeline
- [ ] Illustrative nightly rates ($142–$229) are not Hosted Havens pricing data. Keep or change them
- [ ] The Join the Team strip now reads "If hospitality, attention to detail and solving problems sound like you…". Confirm the wording and that `hello@` is the right inbox for resumes

## Service card scenes (homepage + every service page)
Service cards now use Hosted Havens' own listing photos, set in `src/components/ServiceScene.astro`. Each has an illustrative app-style overlay: guest chat, rate bars, checklist, calendar and so on. The overlays show the workflow only. They contain no real guest data and make no performance claims.
- [ ] Confirm the overlay wording (e.g. "Your home is ready at 1 PM", "Owner calendar", team roles) reads accurately
- [ ] The Unsplash stock photos are no longer shown. They remain in `brand-assets/stock/` and can be deleted

## Review photos
- [ ] The guest review avatars (Melanie, Chance, Abel, Stéphanie) are the photos shown beside those reviews on the live homepage. The avatar-to-name matching was inferred from the live slider order, so please confirm.

## Booking & links
- [ ] All 22 Hospitable widget URLs work (taken from live property pages)
- [ ] Calendly: property-analysis-tour, property-review-meeting, co-hosting-intake
- [ ] Typeform intake `e4sXEear` still active (used as the fallback)
- [ ] Owner portal: owners.hostedhavens.co / sign-in link

## Integrations to supply
- [ ] Form endpoint for `/property-analysis/` (Formspree, Make, Zapier, Hospitable, CRM). Until then, submissions show a mailto + Typeform fallback
- [ ] GA4 measurement ID
- [ ] Meta Pixel ID (not implemented; add only if wanted)
- [ ] Google Search Console and Bing verification codes

## Testimonials & reviews
- [ ] Permission to publish Kyle's owner quote with first name
- [ ] Permission to show guest reviews (Melanie, Chance, Abel, Stéphanie)
- [ ] Any additional owner testimonials

## Legal
- [ ] Privacy and Terms migrated verbatim, except: the "registered property management company" wording was changed to "hospitality company", and the Virtuoso Digital vendor mention became generic website providers. Confirm with counsel
- [ ] Regulations page facts reviewed 2026-09-14 against sa.gov. Re-check before launch
