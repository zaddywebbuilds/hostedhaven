# 301 Redirect Map (launch)

Old WordPress URLs on hostedhavens.co map to new URLs. Implement these as permanent (301) redirects on the production host at launch. For Hostinger/Apache, use `.htaccess` `Redirect 301` lines.

| Old URL | New URL |
|---|---|
| `/full-service-str-co-hosting/` | `/airbnb-management-san-antonio/` |
| `/full-service-airbnb-management/` | `/airbnb-management-san-antonio/` |
| `/bespoke-san-antonio-str-management-agency/` | `/about/` |
| `/contact-hosted-havens/` | `/contact/` |
| `/frequently-asked-questions/` | `/airbnb-management-san-antonio/` (owner FAQ) |
| `/property-intake-form/` | `/property-analysis/` |
| `/insights-and-updates/` | `/resources/` |
| `/article/why-book-direct/` | `/why-book-direct/` |
| `/article/why-choose-hosted-havens/` | `/resources/why-choose-hosted-havens/` |
| `/article/the-diy-trap/` | `/resources/the-diy-trap/` |
| `/article/the-difference-between-a-furnished-home-and-an-optimized-short-term-rental/` | `/resources/the-difference-between-a-furnished-home-and-an-optimized-short-term-rental/` |
| `/article/from-one-house-to-hosted-havens-how-a-missed-move-abroad-sparked-my-dream-business/` | `/resources/from-one-house-to-hosted-havens-how-a-missed-move-abroad-sparked-my-dream-business/` |
| `/article/san-antonio-homeowners-dont-miss-out-on-the-90-billion-airbnb-boom/` | `/resources/san-antonio-homeowners-dont-miss-out-on-the-90-billion-airbnb-boom/` |
| `/article/the-future-of-getaways-top-vacation-rental-trends-for-2025-and-what-they-mean-for-san-antonio/` | `/resources/the-future-of-getaways-top-vacation-rental-trends-for-2025-and-what-they-mean-for-san-antonio/` |
| `/terms-conditions/` | `/terms/` |
| `/privacy-policy/` | `/privacy/` |
| `/property/<slug>/` (all 22) | `/stays/<slug>/` |
| `/stays/?e-page-*` | `/stays/` |

## Needs a decision
- `/training-video/` (owner training video): no equivalent page yet. Keep it on WordPress/owner portal or rebuild it.
- `/sign-in`: owner login. Point to the owner portal URL.
- Any other WordPress pages found in a Search Console "Pages" export before launch.

## Apache example
```apache
Redirect 301 /full-service-str-co-hosting/ https://hostedhavens.co/airbnb-management-san-antonio/
RedirectMatch 301 ^/property/([a-z0-9-]+)/?$ https://hostedhavens.co/stays/$1/
RedirectMatch 301 ^/article/why-book-direct/?$ https://hostedhavens.co/why-book-direct/
RedirectMatch 301 ^/article/([a-z0-9-]+)/?$ https://hostedhavens.co/resources/$1/
```
