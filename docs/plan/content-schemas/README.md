# Content Schemas

Zod schemas for JSON-based content architecture and Tina CMS configuration.

## Architecture Principles

This content architecture follows the principles defined in `architecture-strategy-checklist.md`:

- **Pages are data, not files** - All pages are JSON objects defining metadata and an ordered array of sections
- **Schemas are the contract** - Every content type is validated by strict Zod schemas; builds fail on invalid data
- **Components are pure renderers** - They map typed data to HTML; they never define structure
- **Markdown is only for rich text fields** - Used inside string fields for formatting, never for page composition
- **CMS reflects schemas** - Tina is a UI layer over Git; it mirrors Zod schemas exactly

> See `docs/architecture/content-model.md` for the complete architecture specification.

## Overview

All content is managed through:
1. **JSON files** - Structured data validated by Zod schemas
2. **Astro Content Collections** - Type-safe content loading
3. **Tina CMS** - Visual editing interface over Git

---

## Content Structure

### Directory Structure

```
src/
├── content/
│   ├── pages/               # Page JSON files
│   │   ├── home.de.json
│   │   ├── home.en.json
│   │   ├── squarespace-agentur.de.json
│   │   └── ...
│   ├── sections/            # Reusable global sections
│   │   ├── cta-contact.json
│   │   ├── testimonials-featured.json
│   │   └── ...
│   ├── blog/                # Blog post JSON files
│   │   ├── cms-check-schweiz.de.json
│   │   └── ...
│   ├── testimonials/        # Customer testimonials
│   │   └── client-name.json
│   ├── navigation.json      # Site navigation
│   └── settings.json        # Global site settings
├── schemas/                 # Zod schema definitions
│   ├── page.ts
│   ├── sections/
│   │   ├── index.ts         # Discriminated union of all sections
│   │   ├── hero.ts
│   │   ├── feature-list.ts
│   │   └── ...
│   ├── blog.ts
│   ├── navigation.ts
│   └── settings.ts
└── ...
```

> **Note**: Schema implementations live in `src/schemas/`, not in the content config file.

---

## Page Schema

A page is a JSON object with metadata and an ordered array of sections:

```typescript
// src/schemas/page.ts
import { z } from 'zod';
import { SectionSchema } from './sections';

export const PageSchema = z.object({
  // Identification
  slug: z.string(),
  locale: z.enum(['de', 'en']),

  // Metadata
  title: z.string(),
  description: z.string().max(160),

  // SEO (optional overrides)
  seo: z.object({
    title: z.string().optional(),
    description: z.string().max(160).optional(),
    ogImage: z.string().optional(),
    noIndex: z.boolean().default(false),
  }).optional(),

  // Layout
  layout: z.enum(['default', 'wide', 'landing']).default('default'),

  // Sections - the core content
  sections: z.array(SectionSchema),
});

export type Page = z.infer<typeof PageSchema>;
```

---

## Section Schema (Discriminated Union)

Each section type has its own schema. The union discriminates by `type`:

```typescript
// src/schemas/sections/index.ts
import { z } from 'zod';
import { HeroSchema } from './hero';
import { FeatureListSchema } from './feature-list';
import { CardsSchema } from './cards';
// ... more section imports

// Reference to a global section
const SectionRefSchema = z.object({
  type: z.literal('ref'),
  ref: z.string(), // path to global section, e.g., "cta-contact"
});

// Discriminated union of all inline sections
const InlineSectionSchema = z.discriminatedUnion('type', [
  HeroSchema,
  FeatureListSchema,
  CardsSchema,
  // ... all section types
]);

// A section is either inline or a reference
export const SectionSchema = z.union([
  InlineSectionSchema,
  SectionRefSchema,
]);

export type Section = z.infer<typeof SectionSchema>;
```

---

## Blog Post Schema

Blog posts are JSON files with structured metadata and a `content` field for rich text:

```typescript
// src/schemas/blog.ts
import { z } from 'zod';

export const BlogPostSchema = z.object({
  // Identification
  slug: z.string(),
  locale: z.enum(['de', 'en']),

  // Required fields
  title: z.string(),
  description: z.string().max(160),
  publishDate: z.coerce.date(),

  // Optional fields
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),

  // Author
  author: z.string().default('Noel Bossart'),

  // Featured image
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),

  // Categorization
  tag: z.enum(['Portfolio', 'Artikel', 'Anleitung']),
  categories: z.array(z.string()).default([]),

  // Portfolio-specific (optional)
  client: z.object({
    name: z.string(),
    industry: z.string(),
    website: z.string().url().optional(),
  }).optional(),

  // Content - markdown string for rich text
  content: z.string(), // Markdown for rendering

  // Content enhancements
  quickSummary: z.array(z.string()).optional(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(), // Can include markdown
  })).optional(),

  // SEO overrides
  seoTitle: z.string().optional(),
  seoDescription: z.string().max(160).optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().default(false),

  // Related content
  relatedPosts: z.array(z.string()).optional(), // slugs
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
```

> **Important**: The `content` field contains Markdown as a string. Markdown is rendered at display time, not used for structural composition.

---

## Example Section Schema (Hero)

```typescript
// src/schemas/sections/hero.ts
import { z } from 'zod';

export const HeroSchema = z.object({
  type: z.literal('hero'),

  // Theme
  theme: z.enum(['white', 'light', 'dark', 'bright']).default('dark'),

  // Content
  badge: z.string().optional(),
  headline: z.string(),
  subheadline: z.string().optional(),

  // Background
  background: z.object({
    image: z.string().optional(),
    overlay: z.enum(['dark', 'light', 'gradient', 'none']).default('dark'),
    focalPoint: z.object({
      x: z.number().min(0).max(1).default(0.5),
      y: z.number().min(0).max(1).default(0.5),
    }).optional(),
  }).optional(),

  // CTAs
  primaryCta: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),
  secondaryCta: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),

  // Layout
  alignment: z.enum(['left', 'center']).default('left'),
  height: z.enum(['full', 'large', 'medium']).default('full'),
});

export type Hero = z.infer<typeof HeroSchema>;
```

---

## Testimonial Schema

```typescript
// src/schemas/testimonial.ts
import { z } from 'zod';

export const TestimonialSchema = z.object({
  // Required
  name: z.string(),
  quote: z.string(), // Can include markdown for emphasis

  // Optional details
  position: z.string().optional(),
  company: z.string().optional(),
  image: z.string().optional(),

  // Rating
  rating: z.number().min(1).max(5).default(5),

  // Display options
  featured: z.boolean().default(false),
  date: z.coerce.date().optional(),

  // Source
  source: z.enum(['google', 'linkedin', 'direct']).optional(),
  sourceUrl: z.string().url().optional(),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;
```

---

## FAQ Schema

```typescript
// src/schemas/faq.ts
import { z } from 'zod';

export const FAQSchema = z.object({
  question: z.string(),
  answer: z.string(), // Can include markdown for rich text formatting

  // Organization
  category: z.string().optional(),
  order: z.number().default(0),

  // Display
  featured: z.boolean().default(false),
});

export type FAQ = z.infer<typeof FAQSchema>;
```

> **Note on Markdown**: The `answer` field can contain Markdown for formatting (bold, links, lists). This is the only approved use of Markdown - inside string fields for rich text, not for page composition.

---

## Navigation Schema

```typescript
// src/schemas/navigation.ts
import { z } from 'zod';

export const NavigationSchema = z.object({
  header: z.array(z.object({
    label: z.string(),
    href: z.string(),
    highlight: z.boolean().default(false),
    children: z.array(z.object({
      label: z.string(),
      href: z.string(),
      description: z.string().optional(),
      icon: z.string().optional(),
    })).optional(),
  })),

  footer: z.object({
    columns: z.array(z.object({
      title: z.string(),
      links: z.array(z.object({
        label: z.string(),
        href: z.string(),
        external: z.boolean().default(false),
      })),
    })),

    legal: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),

    social: z.array(z.object({
      platform: z.enum(['linkedin', 'facebook', 'instagram', 'twitter']),
      href: z.string().url(),
    })),
  }),
});

export type Navigation = z.infer<typeof NavigationSchema>;
```

---

## Global Settings Schema

```typescript
// src/schemas/settings.ts
import { z } from 'zod';

export const SettingsSchema = z.object({
  // Site info
  siteName: z.string(),
  siteUrl: z.string().url(),

  // Business info
  company: z.object({
    name: z.string(),
    legalName: z.string(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      zip: z.string(),
      country: z.string(),
    }),
    email: z.string().email(),
    phone: z.string(),
  }),

  // Social links
  social: z.object({
    linkedin: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
  }),

  // Business hours
  hours: z.object({
    weekdays: z.string(),
    weekend: z.string(),
  }),

  // Default SEO
  defaultSeo: z.object({
    titleTemplate: z.string(), // e.g., "%s | Noevu"
    defaultDescription: z.string(),
    ogImage: z.string(),
  }),

  // Analytics
  analytics: z.object({
    googleAnalyticsId: z.string().optional(),
    googleTagManagerId: z.string().optional(),
  }).optional(),
});

export type Settings = z.infer<typeof SettingsSchema>;
```

---

## Tina CMS Configuration

Tina CMS provides a visual editing interface over Git. **Important**: Tina reflects the Zod schemas - it is a UI layer, not the source of truth.

### tina/config.ts

```typescript
import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: process.env.TINA_BRANCH || 'main',
  clientId: process.env.TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      // Pages - JSON with sections array
      {
        name: 'pages',
        label: 'Pages',
        path: 'src/content/pages',
        format: 'json',
        fields: [
          { type: 'string', name: 'slug', label: 'Slug', required: true },
          { type: 'string', name: 'locale', label: 'Locale', options: ['de', 'en'], required: true },
          { type: 'string', name: 'title', label: 'Title', required: true },
          { type: 'string', name: 'description', label: 'Description', required: true },
          {
            type: 'string',
            name: 'layout',
            label: 'Layout',
            options: ['default', 'wide', 'landing'],
          },
          {
            type: 'object',
            name: 'sections',
            label: 'Sections',
            list: true,
            templates: [
              // Hero section template
              {
                name: 'hero',
                label: 'Hero',
                fields: [
                  { type: 'string', name: 'theme', label: 'Theme', options: ['white', 'light', 'dark', 'bright'] },
                  { type: 'string', name: 'headline', label: 'Headline', required: true },
                  { type: 'string', name: 'subheadline', label: 'Subheadline' },
                  {
                    type: 'object',
                    name: 'background',
                    label: 'Background',
                    fields: [
                      { type: 'image', name: 'image', label: 'Image' },
                      { type: 'string', name: 'overlay', label: 'Overlay', options: ['dark', 'light', 'gradient', 'none'] },
                    ],
                  },
                  {
                    type: 'object',
                    name: 'primaryCta',
                    label: 'Primary CTA',
                    fields: [
                      { type: 'string', name: 'label', label: 'Label' },
                      { type: 'string', name: 'href', label: 'URL' },
                    ],
                  },
                ],
              },
              // Section reference template
              {
                name: 'ref',
                label: 'Section Reference',
                fields: [
                  { type: 'string', name: 'ref', label: 'Section ID', required: true },
                ],
              },
              // ... additional section templates
            ],
          },
        ],
      },

      // Global sections - reusable across pages
      {
        name: 'sections',
        label: 'Global Sections',
        path: 'src/content/sections',
        format: 'json',
        templates: [
          {
            name: 'cta',
            label: 'CTA Section',
            fields: [
              { type: 'string', name: 'theme', label: 'Theme', options: ['white', 'light', 'dark', 'bright'] },
              { type: 'string', name: 'headline', label: 'Headline', required: true },
              { type: 'string', name: 'subheadline', label: 'Subheadline' },
              {
                type: 'object',
                name: 'primaryCta',
                label: 'Primary CTA',
                fields: [
                  { type: 'string', name: 'label', label: 'Label' },
                  { type: 'string', name: 'href', label: 'URL' },
                ],
              },
            ],
          },
          // ... additional section templates
        ],
      },

      // Blog posts - JSON with content field
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'json',
        fields: [
          { type: 'string', name: 'slug', label: 'Slug', required: true },
          { type: 'string', name: 'locale', label: 'Locale', options: ['de', 'en'], required: true },
          { type: 'string', name: 'title', label: 'Title', required: true },
          { type: 'string', name: 'description', label: 'Description', required: true },
          { type: 'datetime', name: 'publishDate', label: 'Publish Date', required: true },
          { type: 'datetime', name: 'updatedDate', label: 'Updated Date' },
          { type: 'boolean', name: 'draft', label: 'Draft' },
          { type: 'string', name: 'author', label: 'Author' },
          {
            type: 'object',
            name: 'image',
            label: 'Featured Image',
            fields: [
              { type: 'image', name: 'src', label: 'Image' },
              { type: 'string', name: 'alt', label: 'Alt Text' },
            ],
          },
          {
            type: 'string',
            name: 'tag',
            label: 'Post Type',
            options: ['Portfolio', 'Artikel', 'Anleitung'],
          },
          {
            type: 'string',
            name: 'categories',
            label: 'Categories',
            list: true,
          },
          {
            type: 'string',
            name: 'quickSummary',
            label: 'Quick Summary Points',
            list: true,
          },
          {
            type: 'object',
            name: 'faqs',
            label: 'FAQs',
            list: true,
            fields: [
              { type: 'string', name: 'question', label: 'Question' },
              { type: 'string', name: 'answer', label: 'Answer', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'string',
            name: 'content',
            label: 'Content (Markdown)',
            ui: { component: 'textarea' },
          },
        ],
      },

      // Testimonials
      {
        name: 'testimonials',
        label: 'Testimonials',
        path: 'src/content/testimonials',
        format: 'json',
        fields: [
          { type: 'string', name: 'name', label: 'Name', required: true },
          { type: 'string', name: 'quote', label: 'Quote', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'position', label: 'Position' },
          { type: 'string', name: 'company', label: 'Company' },
          { type: 'image', name: 'image', label: 'Photo' },
          { type: 'number', name: 'rating', label: 'Rating (1-5)' },
          { type: 'boolean', name: 'featured', label: 'Featured' },
        ],
      },

      // Navigation
      {
        name: 'navigation',
        label: 'Navigation',
        path: 'src/content',
        format: 'json',
        match: {
          include: 'navigation',
        },
        fields: [
          {
            type: 'object',
            name: 'header',
            label: 'Header Navigation',
            list: true,
            fields: [
              { type: 'string', name: 'label', label: 'Label' },
              { type: 'string', name: 'href', label: 'URL' },
              { type: 'boolean', name: 'highlight', label: 'Highlight' },
              {
                type: 'object',
                name: 'children',
                label: 'Dropdown Items',
                list: true,
                fields: [
                  { type: 'string', name: 'label', label: 'Label' },
                  { type: 'string', name: 'href', label: 'URL' },
                  { type: 'string', name: 'description', label: 'Description' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'footer',
            label: 'Footer',
            fields: [
              {
                type: 'object',
                name: 'columns',
                label: 'Link Columns',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Column Title' },
                  {
                    type: 'object',
                    name: 'links',
                    label: 'Links',
                    list: true,
                    fields: [
                      { type: 'string', name: 'label', label: 'Label' },
                      { type: 'string', name: 'href', label: 'URL' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Global Settings
      {
        name: 'settings',
        label: 'Site Settings',
        path: 'src/content',
        format: 'json',
        match: {
          include: 'settings',
        },
        fields: [
          { type: 'string', name: 'siteName', label: 'Site Name' },
          { type: 'string', name: 'siteUrl', label: 'Site URL' },
          {
            type: 'object',
            name: 'company',
            label: 'Company Info',
            fields: [
              { type: 'string', name: 'name', label: 'Company Name' },
              { type: 'string', name: 'email', label: 'Email' },
              { type: 'string', name: 'phone', label: 'Phone' },
            ],
          },
          {
            type: 'object',
            name: 'social',
            label: 'Social Links',
            fields: [
              { type: 'string', name: 'linkedin', label: 'LinkedIn URL' },
              { type: 'string', name: 'facebook', label: 'Facebook URL' },
            ],
          },
        ],
      },
    ],
  },
});
```

---

## Example Page JSON

```json
// src/content/pages/home.de.json
{
  "slug": "",
  "locale": "de",
  "title": "Webdesign und Marketing Agentur in Zurich",
  "description": "Noevu GmbH - Ihre Squarespace Agentur fur modernes Webdesign und AI-gestutzte Marketing-Losungen in der Schweiz.",
  "layout": "landing",
  "sections": [
    {
      "type": "hero",
      "theme": "dark",
      "headline": "Webseiten, die uberzeugen",
      "subheadline": "Wir gestalten moderne Webseiten mit Squarespace und AI-gestutztem Marketing fur Schweizer KMU.",
      "background": {
        "image": "/images/hero-home.jpg",
        "overlay": "dark"
      },
      "primaryCta": {
        "label": "Termin buchen",
        "href": "/termin"
      },
      "secondaryCta": {
        "label": "Projekte ansehen",
        "href": "/webseiten-projekte"
      }
    },
    {
      "type": "feature-list",
      "theme": "white",
      "headline": "Warum Noevu?",
      "items": [
        "Squarespace Circle Gold Partner",
        "10+ Jahre Erfahrung",
        "Schweizer Qualitat"
      ]
    },
    {
      "type": "ref",
      "ref": "cta-contact"
    }
  ]
}
```

---

## Example Global Section (Referenced)

```json
// src/content/sections/cta-contact.json
{
  "type": "cta",
  "theme": "bright",
  "headline": "Bereit fur Ihre neue Webseite?",
  "subheadline": "Lassen Sie uns uber Ihr Projekt sprechen.",
  "primaryCta": {
    "label": "Termin buchen",
    "href": "/termin"
  },
  "secondaryCta": {
    "label": "Kontakt",
    "href": "/kontakt"
  }
}
```

---

## Usage Examples

### Load and Validate Page

```typescript
// src/lib/pages.ts
import { PageSchema } from '@/schemas/page';
import type { Page } from '@/schemas/page';

export async function getPage(slug: string, locale: string): Promise<Page> {
  const pageSlug = slug || 'home';
  const pageData = await import(`../content/pages/${pageSlug}.${locale}.json`);
  return PageSchema.parse(pageData.default);
}
```

### Resolve Section References

```typescript
// src/lib/sections.ts
import type { Section } from '@/schemas/sections';

export async function resolveSection(section: Section): Promise<Section> {
  if (section.type === 'ref') {
    const sectionData = await import(`../content/sections/${section.ref}.json`);
    return sectionData.default;
  }
  return section;
}
```

### Page Renderer (Orchestration)

```astro
---
// src/pages/[...slug].astro
import { PageSchema } from '@/schemas/page';
import { resolveSection } from '@/lib/sections';
import SectionRenderer from '@/components/SectionRenderer.astro';
import BaseLayout from '@/layouts/BaseLayout.astro';

const { slug } = Astro.params;
const pageSlug = slug || 'home';

// Load and validate page JSON
const pageData = await import(`../content/pages/${pageSlug}.de.json`);
const page = PageSchema.parse(pageData.default);

// Resolve any section references
const sections = await Promise.all(
  page.sections.map(section => resolveSection(section))
);
---

<BaseLayout title={page.title} description={page.description}>
  {sections.map((section) => (
    <SectionRenderer section={section} />
  ))}
</BaseLayout>
```

### Section Renderer (Component Mapping)

```astro
---
// src/components/SectionRenderer.astro
import type { Section } from '@/schemas/sections';
import Hero from './sections/Hero.astro';
import FeatureList from './sections/FeatureList.astro';
import Cards from './sections/Cards.astro';
import CTA from './sections/CTA.astro';

interface Props {
  section: Section;
}

const { section } = Astro.props;

const componentMap = {
  hero: Hero,
  'feature-list': FeatureList,
  cards: Cards,
  cta: CTA,
  // ... all section types
};

const Component = componentMap[section.type];
---

{Component && <Component {...section} />}
```

### Query Blog Posts

```typescript
// src/lib/blog.ts
import { BlogPostSchema } from '@/schemas/blog';
import type { BlogPost } from '@/schemas/blog';

export async function getAllPosts(locale: string): Promise<BlogPost[]> {
  // Load all blog JSON files for locale
  const modules = import.meta.glob('../content/blog/*.json');
  const posts: BlogPost[] = [];

  for (const [path, loader] of Object.entries(modules)) {
    if (path.includes(`.${locale}.json`)) {
      const data = await loader();
      const post = BlogPostSchema.parse(data.default);
      if (!post.draft && new Date(post.publishDate) <= new Date()) {
        posts.push(post);
      }
    }
  }

  return posts.sort((a, b) =>
    new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf()
  );
}
```

### Render Markdown Content

```astro
---
// In blog post template
import { marked } from 'marked';

const { post } = Astro.props;
const htmlContent = marked(post.content);
---

<article>
  <h1>{post.title}</h1>
  <div set:html={htmlContent} />
</article>
```

---

## Validation Flow

1. **Build time**: Astro loads JSON files
2. **Parse**: Zod validates against schema
3. **Fail fast**: Invalid data = build failure
4. **Render**: Valid data flows to components

No runtime validation needed. No invalid state possible.

---

## Compliance Checklist

| Principle | How Satisfied |
|-----------|---------------|
| Pages are data | JSON files, not MDX |
| Sections are typed data | Discriminated union schema |
| Markdown only in fields | Rich text inside string fields |
| Schemas are contract | Zod validates all content |
| Components are renderers | No logic, just props to HTML |
| CMS reflects schema | Tina config mirrors Zod |
| AI can traverse | Clear graph: Page to Sections to Fields |
