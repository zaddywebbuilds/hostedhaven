/**
 * Blog post generator for Hosted Havens.
 *
 * Reads the next unprocessed keyword from scripts/blog-queue.json,
 * calls the Claude API to produce a high-quality 1,200-1,800 word article,
 * then appends it to src/data/articles-auto.json.
 *
 * Required env: ANTHROPIC_API_KEY
 * Usage: node scripts/generate-post.mjs
 */

// Uses DeepSeek API (OpenAI-compatible) -- no extra dependency needed.
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');

const QUEUE_PATH = resolve(__dir, 'blog-queue.json');
const AUTO_PATH = resolve(root, 'src/data/articles-auto.json');

// Blog hero images by cluster. These are lifestyle stock photos in public/images/blog/.
const BLOG_IMAGES = {
  Management:      '/images/blog/owner-checking-phone.jpg',
  Revenue:         '/images/blog/revenue-analytics-laptop.jpg',
  'San Antonio':   '/images/blog/owner-checking-phone.jpg',
  'Property Setup':'/images/blog/listing-photography-tripod.jpg',
  'Our Story':     '/images/blog/property-care-making-bed.jpg',
};

const CTA_OPTIONS = [
  { label: 'Get a Free Property Analysis', href: '/property-intake/' },
  { label: 'See How Co-Hosting Works', href: '/airbnb-co-host-san-antonio/' },
  { label: 'Learn About Our Management Services', href: '/airbnb-management-san-antonio/' },
  { label: 'Explore Our San Antonio Stays', href: '/stays/' },
];

// Keywords the top 3 ranked competitors (Surge, HomeTeam, One Fine BnB) target
const COMPETITOR_KEYWORDS = [
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

const SYSTEM_PROMPT = `You are a senior content writer for Hosted Havens, a boutique Airbnb and short-term rental co-hosting company in San Antonio, TX. Hosted Havens is run by Megan Blount, manages properties across San Antonio, Converse, Universal City, and Live Oak TX, charges 18-22% management fee, and specialises in full-service hosting: dynamic pricing, guest communication, cleaning coordination, listing optimisation, and compliance.

Your job is to write genuinely useful, expert-level blog articles that help San Antonio property owners make informed decisions about short-term rental management. You are NOT producing generic AI content. Every article must contain:

- Real San Antonio context: specific neighbourhoods, landmarks, local events (Fiesta, Spurs, Alamo, River Walk, Pearl District), military bases (Lackland, Randolph AFB), local regulations and STR permit facts
- Honest, specific advice that an experienced property manager would give, not platitudes
- Practical figures where appropriate (e.g. typical San Antonio STR occupancy 60-70%, median nightly rate around $140-160, AirDNA tracks ~9,600+ active listings in SA)
- A natural editorial voice -- direct, confident, owner-focused. Use "you" and "your property". No corporate hedging.

HARD RULES:
- No em dashes (--) anywhere. Use commas or periods instead.
- No phrases: "dive in", "delve into", "in conclusion", "furthermore", "moreover", "it's worth noting", "at the end of the day", "game-changer", "game changer", "make no mistake", "look no further"
- No thin padding paragraphs. Every paragraph must add information the reader can act on.
- No keyword stuffing. Use the primary keyword naturally 3-5 times, secondary terms as they fit.
- HTML body only: use <p>, <h2>, <h3>, <ul>, <li>, <ol>, <strong>, <em> tags only. No divs, no classes, no inline styles.

OUTPUT: Return only a valid JSON object (no markdown fences, no preamble) with these exact fields:
{
  "title": "...",
  "metaTitle": "...",
  "description": "...",
  "cluster": "...",
  "cta": { "label": "...", "href": "..." },
  "body": "..."
}`;

function buildUserPrompt(entry) {
  const today = new Date().toISOString().slice(0, 10);
  return `Write a complete blog article for Hosted Havens targeting this primary keyword: "${entry.keyword}"

Article slug (for your reference, do not include in output): ${entry.slug}
Content cluster: ${entry.cluster}
Today's date: ${today}

STRUCTURE REQUIREMENTS:
- Opening paragraph (no H2): hook the owner with a real-world scenario or surprising fact. 2-3 sentences.
- 5 to 6 H2 sections. Each H2 section must have 2-3 H3 subsections with substantive content.
- Final H2: "Work With a San Antonio STR Team That Handles Everything" -- transition naturally into a Hosted Havens CTA. Mention the property intake form, the 18-22% fee structure, and that Megan's team handles compliance, pricing, and guest communication.
- Total body word count: 1,200 to 1,800 words.

SECONDARY KEYWORDS to weave in naturally (use each at most twice):
${COMPETITOR_KEYWORDS.join(', ')}

TITLE (field "title"): Clear, benefit-driven, max 65 characters, no clickbait.
META TITLE (field "metaTitle"): SEO title ending with " | Hosted Havens", max 65 characters total.
DESCRIPTION (field "description"): Compelling meta description, 145-160 characters, includes primary keyword.
CLUSTER (field "cluster"): Pick the single best fit from: Management, Revenue, San Antonio, Property Setup, Our Story.
CTA: Pick the most relevant from these options and return it as-is:
${CTA_OPTIONS.map(c => JSON.stringify(c)).join('\n')}

Important: the body must be genuine, substantive, and earn the reader's trust. Assume they have read other management company content and can tell immediately if this is shallow.`;
}

async function main() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY env var is required');

  const queue = JSON.parse(readFileSync(QUEUE_PATH, 'utf8'));
  const next = queue.find((e) => !e.done);
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
      max_tokens: 4096,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(next) },
      ],
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek API error ${res.status}: ${await res.text()}`);
  const data = await res.json();

  const raw = data.choices[0].message.content.trim();

  let article;
  try {
    article = JSON.parse(raw);
  } catch {
    // Strip markdown fences if model added them
    const match = raw.match(/```(?:json)?\s*([\s\S]+?)```/);
    if (!match) throw new Error('Could not parse JSON from model response:\n' + raw.slice(0, 500));
    article = JSON.parse(match[1]);
  }

  // Validate required fields
  const required = ['title', 'metaTitle', 'description', 'cluster', 'cta', 'body'];
  for (const f of required) {
    if (!article[f]) throw new Error(`Missing field: ${f}`);
  }

  // Enforce no em dashes
  if (article.body.includes('—') || article.body.includes(' -- ')) {
    article.body = article.body.replace(/—/g, ',').replace(/ -- /g, ', ');
    console.warn('Em dashes found and replaced.');
  }

  const today = new Date().toISOString().slice(0, 10);
  const heroImage = BLOG_IMAGES[article.cluster] ?? '/images/blog/owner-checking-phone.jpg';
  const fullArticle = {
    slug: next.slug,
    title: article.title,
    metaTitle: article.metaTitle,
    description: article.description,
    cluster: article.cluster,
    published: today,
    heroImage,
    cta: article.cta,
    body: article.body,
  };

  // Append to articles-auto.json
  const existing = JSON.parse(readFileSync(AUTO_PATH, 'utf8'));
  existing.push(fullArticle);
  writeFileSync(AUTO_PATH, JSON.stringify(existing, null, 2) + '\n');

  // Mark as done in queue
  next.done = true;
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + '\n');

  console.log(`Done: "${article.title}" -> ${next.slug}`);
  console.log(`Total auto articles: ${existing.length}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
