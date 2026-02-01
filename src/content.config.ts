/**
 * Astro Content Collections Configuration
 *
 * Architecture: Schema-driven content collections.
 * All content types are defined with Zod schemas for validation.
 */
import { defineCollection, z } from 'astro:content';

// Blog post collection
const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string().optional(),
    excerpt: z.string(),
    featuredImage: z.string().optional(),
    categories: z.array(z.string()).default([]),
    author: z.object({
      name: z.string(),
      image: z.string().optional(),
      bio: z.string().optional(),
      href: z.string().optional(),
    }),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

export const collections = { blog };
