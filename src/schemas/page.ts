import { z } from 'zod';
import { SectionEntrySchema, ImageSchema } from './sections';

// Re-export ImageSchema for convenience
const Image = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

// SEO metadata
export const SEOSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
  image: Image.optional(),
  noIndex: z.boolean().default(false),
  canonicalUrl: z.string().optional(),
});

// Open Graph metadata
export const OpenGraphSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: Image.optional(),
  type: z.enum(['website', 'article', 'profile']).default('website'),
});

// Page schema
export const PageSchema = z.object({
  // Identification
  slug: z.string(),
  locale: z.enum(['de', 'en']).default('de'),

  // SEO
  seo: SEOSchema,
  og: OpenGraphSchema.optional(),

  // Content
  sections: z.array(SectionEntrySchema),

  // Page settings
  layout: z.enum(['default', 'blog', 'landing']).default('default'),
  showHeader: z.boolean().default(true),
  showFooter: z.boolean().default(true),

  // Metadata
  publishedAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

// Blog post schema (extends page with additional fields)
export const BlogPostSchema = z.object({
  // Identification
  slug: z.string(),
  locale: z.enum(['de', 'en']).default('de'),

  // SEO
  seo: SEOSchema,
  og: OpenGraphSchema.optional(),

  // Blog-specific
  title: z.string(),
  excerpt: z.string().max(300),
  featuredImage: Image.optional(),
  categories: z.array(z.string()),
  author: z.object({
    name: z.string(),
    image: Image.optional(),
    bio: z.string().optional(),
    href: z.string().optional(),
  }),

  // Content
  content: z.string(), // Markdown content
  sections: z.array(SectionEntrySchema).optional(), // Optional structured sections

  // Related content
  relatedPosts: z.array(z.string()).optional(), // Slugs

  // Metadata
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  readingTime: z.number().optional(), // Minutes
});

// Type exports
export type SEO = z.infer<typeof SEOSchema>;
export type OpenGraph = z.infer<typeof OpenGraphSchema>;
export type Page = z.infer<typeof PageSchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;
