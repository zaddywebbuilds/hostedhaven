/**
 * WordPress blog post generator for Hosted Havens.
 *
 * Picks the next unprocessed keyword from scripts/wp-queue.json,
 * calls the Claude API to write a 1,200-1,800 word article, then
 * publishes it to hostedhavens.co via WordPress XML-RPC with:
 *   - Full post content (HTML)
 *   - Featured image (lifestyle stock photo, uploaded to media library)
 *   - Categories and tags
 *   - Yoast SEO meta title, meta description, focus keyphrase
 *
 * Required env vars:
 *   DEEPSEEK_API_KEY    Your DeepSeek API key (platform.deepseek.com)
 *   WP_USER             WordPress username (e.g. Gmboptimizepro)
 *   WP_PASS             WordPress password for that user
 *
 * Usage: node scripts/wp-post.mjs
 */

// DeepSeek uses the OpenAI-compatible chat completions API -- no extra dependency needed.
import xmlrpc from 'xmlrpc';
import { readFileSync, writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');

const QUEUE_PATH = resolve(__dir, 'wp-queue.json');

const WP_HOST = 'hostedhavens.co';
const WP_PATH = '/xmlrpc.php';

// Stock hero images mapped by content cluster
const HERO_IMAGES = {
  'Management':     'owner-checking-phone.jpg',
  'Revenue':        'revenue-analytics-laptop.jpg',
  'San Antonio':    'owner-checking-phone.jpg',
  'Property Setup': 'listing-photography-tripod.jpg',
  'Our Story':      'property-care-making-bed.jpg',
};

const CTA_OPTIONS = [
  { label: 'Get a Free Property Analysis', href: '/property-intake/' },
  { label: 'See How Co-Hosting Works', href: '/airbnb-co-host-san-antonio/' },
  { label: 'Learn About Our Management Services', href: '/airbnb-management-san-antonio/' },
  { label: 'Explore Our San Antonio Stays', href: '/stays/' },
];

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
- Practical figures where appropriate (e.g. typical San Antonio STR occupancy 60-70%, median nightly rate around $140-160, AirDNA tracks around 9,600+ active listings in SA)
- A natural editorial voice -- direct, confident, owner-focused. Use "you" and "your property". No corporate hedging.

HARD RULES:
- No em dashes anywhere. Use commas or periods instead.
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
  "tags": ["...", "..."],
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
TAGS (field "tags"): Array of 4-6 relevant tags (e.g. ["San Antonio", "Airbnb Management", "Short-Term Rental", "Property Management"]).
CTA: Pick the most relevant from these options and return it as-is:
${CTA_OPTIONS.map(c => JSON.stringify(c)).join('\n')}

Important: the body must be genuine, substantive, and earn the reader's trust. Assume they have read other management company content and can tell immediately if this is shallow.`;
}

// --- XML-RPC helpers ---

function makeClient() {
  return xmlrpc.createSecureClient({ host: WP_HOST, path: WP_PATH, port: 443 });
}

function call(client, method, params) {
  return new Promise((resolve, reject) => {
    client.methodCall(method, params, (err, val) => {
      if (err) reject(new Error(`XML-RPC ${method} failed: ${err.message || err}`));
      else resolve(val);
    });
  });
}

async function uploadImage(client, wpUser, wpPass, slug, cluster) {
  const filename = HERO_IMAGES[cluster] ?? 'owner-checking-phone.jpg';
  const imgPath = resolve(root, 'public/images/blog', filename);
  const imgData = await readFile(imgPath);

  const uniqueName = `${slug}-hero.jpg`;

  console.log(`Uploading featured image: ${uniqueName}`);
  const result = await call(client, 'wp.uploadFile', [
    0,
    wpUser,
    wpPass,
    {
      name: uniqueName,
      type: 'image/jpeg',
      bits: imgData,
      overwrite: true,
    },
  ]);

  return result.id; // WordPress attachment ID
}

async function publishPost(client, wpUser, wpPass, { slug, title, body, metaTitle, description, cluster, tags, cta, thumbnailId }) {
  // Append a CTA block at the end of the body
  const ctaHtml = `\n<p style="margin-top:2em"><strong>${cta.label}:</strong> Visit our <a href="https://hostedhavens.co${cta.href}">property intake page</a> to get started with Hosted Havens.</p>`;
  const fullBody = body + ctaHtml;

  const postData = {
    post_title: title,
    post_content: fullBody,
    post_status: 'publish',
    post_type: 'post',
    post_name: slug, // URL slug
    post_thumbnail: thumbnailId,
    terms_names: {
      category: [cluster, 'Owner Resources'],
      post_tag: tags,
    },
    custom_fields: [
      { key: '_yoast_wpseo_title',       value: metaTitle },
      { key: '_yoast_wpseo_metadesc',    value: description },
      { key: '_yoast_wpseo_focuskw',     value: title },
    ],
  };

  const postId = await call(client, 'wp.newPost', [0, wpUser, wpPass, postData]);
  return postId;
}

// --- Main ---

async function main() {
  const apiKey  = process.env.DEEPSEEK_API_KEY;
  const wpUser  = process.env.WP_USER;
  const wpPass  = process.env.WP_PASS;

  if (!apiKey)  throw new Error('DEEPSEEK_API_KEY env var is required');
  if (!wpUser)  throw new Error('WP_USER env var is required');
  if (!wpPass)  throw new Error('WP_PASS env var is required');

  const queue = JSON.parse(readFileSync(QUEUE_PATH, 'utf8'));
  const next  = queue.find((e) => !e.done);
  if (!next) {
    console.log('Queue is empty -- all articles generated.');
    process.exit(0);
  }

  console.log(`Generating: "${next.keyword}" (${next.slug})`);

  // 1. Generate content via DeepSeek API (OpenAI-compatible)
  const dsRes = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      max_tokens: 4096,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: buildUserPrompt(next) },
      ],
    }),
  });

  if (!dsRes.ok) {
    const err = await dsRes.text();
    throw new Error(`DeepSeek API error ${dsRes.status}: ${err}`);
  }

  const dsJson = await dsRes.json();
  const raw = dsJson.choices[0].message.content.trim();
  let article;
  try {
    article = JSON.parse(raw);
  } catch {
    const match = raw.match(/```(?:json)?\s*([\s\S]+?)```/);
    if (!match) throw new Error('Could not parse JSON from model response:\n' + raw.slice(0, 500));
    article = JSON.parse(match[1]);
  }

  // Validate
  for (const f of ['title', 'metaTitle', 'description', 'cluster', 'tags', 'cta', 'body']) {
    if (!article[f]) throw new Error(`Missing field: ${f}`);
  }

  // Strip em dashes if the model slipped any in
  if (article.body.includes('—') || article.body.includes(' -- ')) {
    article.body = article.body.replace(/—/g, ',').replace(/ -- /g, ', ');
    console.warn('Em dashes found and replaced.');
  }

  // 2. Upload featured image to WordPress media library
  const wpClient   = makeClient();
  const thumbnailId = await uploadImage(wpClient, wpUser, wpPass, next.slug, article.cluster);
  console.log(`Featured image uploaded, attachment ID: ${thumbnailId}`);

  // 3. Publish the post
  const postId = await publishPost(wpClient, wpUser, wpPass, {
    slug:        next.slug,
    title:       article.title,
    body:        article.body,
    metaTitle:   article.metaTitle,
    description: article.description,
    cluster:     article.cluster,
    tags:        article.tags,
    cta:         article.cta,
    thumbnailId,
  });

  console.log(`Published! WordPress post ID: ${postId}`);
  console.log(`URL: https://hostedhavens.co/?p=${postId}`);

  // 4. Mark done in queue
  next.done = true;
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + '\n');
  console.log(`Queue entry marked done: ${next.slug}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
