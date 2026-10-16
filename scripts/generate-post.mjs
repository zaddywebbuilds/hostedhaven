/**
 * Blog post generator for Hosted Havens.
 * Reads the next keyword from scripts/blog-queue.json,
 * calls the DeepSeek API, appends to src/data/articles-auto.json.
 *
 * Required env: DEEPSEEK_API_KEY
 * Usage: node scripts/generate-post.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');

const QUEUE_PATH = resolve(__dir, 'blog-queue.json');
const AUTO_PATH  = resolve(root, 'src/data/articles-auto.json');

// Diverse image pool — rotates by article index so no two consecutive posts share an image.
// Mix of lifestyle shots and real property photos already deployed on the site.
const BLOG_IMAGES = [
  '/images/blog/owners-happy-couple.jpg',
  '/images/properties/grass-hollow/grass-hollow-live-oak-tx-rental-01-1280.webp',
  '/images/blog/revenue-analytics-laptop.jpg',
  '/images/properties/coastal-run/coastal-run-san-antonio-tx-rental-01-1280.webp',
  '/images/blog/listing-photography-tripod.jpg',
  '/images/properties/la-maison-blount/la-maison-blount-san-antonio-tx-rental-01-1280.webp',
  '/images/blog/owner-checking-phone.jpg',
  '/images/properties/liberty-bell/liberty-bell-san-antonio-tx-rental-01-1280.webp',
  '/images/blog/property-care-making-bed.jpg',
  '/images/properties/de-soto-lighthouse/de-soto-lighthouse-universal-city-tx-rental-01-1280.webp',
  '/images/blog/owners-house.jpg',
  '/images/properties/halliday-fig-trees/halliday-fig-trees-san-antonio-tx-rental-01-1280.webp',
  '/images/blog/hero-bedroom.jpg',
  '/images/properties/retama-hollow/retama-hollow-live-oak-tx-rental-01-1280.webp',
  '/images/blog/extended-stay-suitcase.jpg',
];

const CTA_OPTIONS = [
  { label: 'Get a Free Property Analysis', href: '/property-intake/' },
  { label: 'See How Co-Hosting Works', href: '/airbnb-co-host-san-antonio/' },
  { label: 'Learn About Our Management Services', href: '/airbnb-management-san-antonio/' },
  { label: 'Explore Our San Antonio Stays', href: '/stays/' },
];

// Internal pages to link to — the model picks the 2-3 most relevant per article.
const INTERNAL_LINKS = `
SITE PAGES FOR INTERNAL LINKS (include 3 that are most relevant to this article — use natural anchor text, never keyword-stuffed):
- /airbnb-management-san-antonio/ — Airbnb management services, full-service co-hosting
- /airbnb-co-host-san-antonio/ — Airbnb co-hosting, co-host services
- /airbnb-revenue-management-san-antonio/ — Dynamic pricing, revenue management, occupancy
- /airbnb-listing-optimization-san-antonio/ — Listing optimization, listing photography, listing quality
- /str-property-care-san-antonio/ — Property care, cleaning, maintenance
- /airbnb-setup-san-antonio/ — New host setup, getting started on Airbnb
- /mid-term-rental-management-san-antonio/ — Mid-term rentals, furnished rentals, 30+ day stays
- /pricing/ — Management fee, 18-22% fee, cost of hiring a manager
- /results/ — Track record, owner results, occupancy rates achieved
- /property-intake/ — Free property analysis, property intake form, see if you qualify
- /resources/san-antonio-str-rules/ — San Antonio STR permit, HOT tax, STR rules and compliance
- /stays/ — Browse Hosted Havens properties, guest perspective
Each link must be a full <a href="/page-path/">natural anchor text</a> tag embedded inside a sentence. Never list them separately.`.trim();

const SYSTEM_PROMPT = `You are a senior content writer for Hosted Havens, a boutique Airbnb and short-term rental co-hosting company in San Antonio, TX. Hosted Havens is run by Megan Blount, manages properties across San Antonio, Converse, Universal City, and Live Oak TX, charges 18-22% management fee, and specialises in full-service hosting: dynamic pricing, guest communication, cleaning coordination, listing optimisation, and compliance.

Your job is to write complete, expert-level blog articles that rank on page 1 of Google in San Antonio for property owners searching for STR management help. These articles must outperform shallow competitor content by being specific, local, and genuinely useful.

HARD SEO RULES (non-negotiable):
1. Primary keyword must appear in the opening paragraph within the first 100 words.
2. Primary keyword must appear in at least one H2 heading.
3. Body must contain exactly 3 internal links to other pages on the site (provided per article).
4. Each internal link must be a proper <a href="..."> tag with natural anchor text inside a sentence — never bare URLs.
5. Include a final H2 section titled "Frequently Asked Questions" with exactly 4 Q&A pairs formatted as <h3>Question?</h3><p>Answer.</p> — this targets featured snippets.
6. Article body: 1,400 to 1,900 words. Thin content does not rank.
7. Primary keyword used naturally 4-6 times total (title + body). Secondary terms woven in where they fit.

CONTENT RULES:
- Real San Antonio context in every article: specific neighbourhoods, local events (Fiesta, Spurs, Alamo, River Walk, Pearl District), military bases (Lackland, Fort Sam Houston, Randolph AFB), local STR statistics.
- Specific figures where appropriate: San Antonio STR occupancy 60-70%, median nightly rate ~$140-160, ~9,600 active SA listings on AirDNA.
- Direct, confident owner-focused voice. Use "you" and "your property". No corporate hedging.
- Every paragraph must deliver actionable information. No padding.

HARD FORMAT RULES:
- No em dashes anywhere. Use commas or periods instead.
- Banned phrases: "dive in", "delve into", "in conclusion", "furthermore", "moreover", "it's worth noting", "at the end of the day", "game-changer", "make no mistake", "look no further", "let's explore", "navigating the", "the world of".
- HTML body only: use <p>, <h2>, <h3>, <ul>, <li>, <ol>, <strong>, <em>, <a> tags only. No divs, no classes, no inline styles.
- The final H2 section must be "Frequently Asked Questions" with the exact format described above.

FINAL H2 SECTION — always include this exact block before the FAQ section:
<h2>Work With a San Antonio STR Team That Handles Everything</h2>
<p>Hosted Havens manages short-term and mid-term rentals across San Antonio, Converse, Universal City, and Live Oak. Megan Blount and her team handle dynamic pricing, guest communication, cleaning coordination, listing optimisation, and local compliance so you earn more with less effort. The management fee runs 18-22% of revenue — straightforward, no hidden costs. <a href="/property-intake/">Fill out the property intake form</a> to see if your property qualifies and get a personalised revenue estimate.</p>

OUTPUT: Return only a valid JSON object (no markdown fences, no preamble) with these exact fields:
{
  "title": "...",
  "metaTitle": "...",
  "description": "...",
  "cluster": "...",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "cta": { "label": "...", "href": "..." },
  "body": "..."
}`;

function buildUserPrompt(entry, existingCount) {
  const today = new Date().toISOString().slice(0, 10);

  const lsiKeywords = [
    'Airbnb management San Antonio',
    'short-term rental management San Antonio',
    'vacation rental management San Antonio TX',
    'San Antonio STR management',
    'Airbnb property manager San Antonio',
    'full-service Airbnb management Texas',
    'dynamic pricing San Antonio rental',
    'San Antonio STR permit',
    'San Antonio rental income',
    'co-hosting San Antonio',
  ];

  return `Write a complete, SEO-optimised blog article for Hosted Havens targeting this primary keyword: "${entry.keyword}"

Article slug (reference only, do not include in output): ${entry.slug}
Content cluster: ${entry.cluster}
Today's date: ${today}

${INTERNAL_LINKS}

STRUCTURE:
- Opening paragraph (no H2): hook the property owner immediately. Include the primary keyword within the first 100 words. 2-3 sentences.
- 4 to 5 H2 sections, each with 2-3 H3 subsections. Each H2 section: 2-4 substantive paragraphs.
- One H2 must contain the primary keyword verbatim or a close variant.
- The 3 required internal links should appear naturally inside the body paragraphs of these sections.
- Second-to-last H2: "Work With a San Antonio STR Team That Handles Everything" (use the exact block from the system prompt — keep the internal link to /property-intake/).
- Final H2: "Frequently Asked Questions" — 4 Q&As as <h3>Q?</h3><p>A.</p> pairs. Questions should be real queries property owners type into Google.

LSI KEYWORDS to weave in naturally (use each at most twice):
${lsiKeywords.join(', ')}

TITLE: Clear, benefit-driven, includes primary keyword, max 65 chars.
META TITLE: SEO title ending with " | Hosted Havens", max 65 characters total.
DESCRIPTION: Compelling meta description, 145-160 characters, includes primary keyword.
CLUSTER: Pick exactly one: Management, Revenue, San Antonio, Property Setup, Our Story.
KEYWORDS: Array of 3-5 keyword strings this article targets (primary + secondary).
CTA: Pick the most relevant option:
${CTA_OPTIONS.map(c => JSON.stringify(c)).join('\n')}

Write as if competing directly against the top 3 Airbnb management companies in San Antonio. Every sentence must earn its place.`;
}

async function main() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY env var is required');

  const queue    = JSON.parse(readFileSync(QUEUE_PATH, 'utf8'));
  const existing = JSON.parse(readFileSync(AUTO_PATH, 'utf8'));
  const next     = queue.find((e) => !e.done);

  if (!next) {
    console.log('Queue is empty -- all articles generated.');
    process.exit(0);
  }

  console.log(`Generating: "${next.keyword}" (${next.slug})`);

  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'deepseek-chat',
      max_tokens: 6000,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(next, existing.length) },
      ],
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const raw  = data.choices[0].message.content.trim();

  let article;
  try {
    article = JSON.parse(raw);
  } catch {
    const match = raw.match(/```(?:json)?\s*([\s\S]+?)```/);
    if (!match) throw new Error('Could not parse JSON from model response:\n' + raw.slice(0, 500));
    article = JSON.parse(match[1]);
  }

  const required = ['title', 'metaTitle', 'description', 'cluster', 'cta', 'body'];
  for (const f of required) {
    if (!article[f]) throw new Error(`Missing field: ${f}`);
  }

  // Strip em dashes
  if (article.body.includes('—') || article.body.includes(' -- ')) {
    article.body = article.body.replace(/—/g, ',').replace(/ -- /g, ', ');
    console.warn('Em dashes found and replaced.');
  }

  // Rotate through the image pool — no two consecutive posts share an image
  const heroImage = BLOG_IMAGES[existing.length % BLOG_IMAGES.length];

  const today = new Date().toISOString().slice(0, 10);
  const fullArticle = {
    slug:        next.slug,
    title:       article.title,
    metaTitle:   article.metaTitle,
    description: article.description,
    cluster:     article.cluster,
    keywords:    Array.isArray(article.keywords) ? article.keywords : [],
    published:   today,
    heroImage,
    cta:         article.cta,
    body:        article.body,
  };

  existing.push(fullArticle);
  writeFileSync(AUTO_PATH, JSON.stringify(existing, null, 2) + '\n');

  next.done = true;
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + '\n');

  console.log(`Done: "${article.title}" -> ${next.slug}`);
  console.log(`Image: ${heroImage}`);
  console.log(`Total auto articles: ${existing.length}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
