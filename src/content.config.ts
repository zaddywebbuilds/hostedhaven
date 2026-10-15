import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string(),
    description: z.string(),
    cluster: z.enum(['Management', 'Revenue', 'San Antonio', 'Property Setup', 'Our Story']),
    published: z.string(),
    heroImage: z.string().optional(),
    ctaLabel: z.string().default('Get a Free Property Analysis'),
    ctaHref: z.string().default('/property-intake/'),
  }),
});

export const collections = { blog };
