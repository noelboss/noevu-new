import { z } from 'zod';

// Base schemas for common patterns
const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const LinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'secondary', 'text']).default('primary'),
  external: z.boolean().default(false),
});

const RichTextSchema = z.string(); // Markdown content in string field

// Section: Hero
export const HeroSectionSchema = z.object({
  type: z.literal('hero'),
  headline: z.string(),
  subheadline: z.string().optional(),
  description: RichTextSchema.optional(),
  image: ImageSchema.optional(),
  backgroundImage: ImageSchema.optional(),
  ctas: z.array(LinkSchema).max(2).default([]),
  rating: z.object({
    score: z.number().min(0).max(5),
    count: z.number(),
    label: z.string().optional(),
  }).optional(),
  alignment: z.enum(['left', 'center', 'right']).default('left'),
});

// Section: Logo Gallery (Client logos)
export const LogoGallerySectionSchema = z.object({
  type: z.literal('logoGallery'),
  title: z.string().optional(),
  logos: z.array(z.object({
    name: z.string(),
    image: ImageSchema,
    href: z.string().optional(),
  })),
});

// Section: Split Content (Two columns - image + content)
export const SplitContentSectionSchema = z.object({
  type: z.literal('splitContent'),
  layout: z.enum(['imageLeft', 'imageRight']).default('imageLeft'),
  image: ImageSchema.optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  content: RichTextSchema,
  cta: LinkSchema.optional(),
  backgroundColor: z.enum(['beige', 'white', 'green', 'orange']).default('beige'),
});

// Section: Value Proposition (Three column cards)
export const ValuePropositionSectionSchema = z.object({
  type: z.literal('valueProposition'),
  title: z.string().optional(),
  items: z.array(z.object({
    icon: z.string().optional(),
    title: z.string(),
    description: RichTextSchema,
  })).min(1).max(4),
});

// Section: Services Grid
export const ServicesGridSectionSchema = z.object({
  type: z.literal('servicesGrid'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  services: z.array(z.object({
    icon: z.string().optional(),
    title: z.string(),
    description: RichTextSchema,
    cta: LinkSchema.optional(),
  })),
  columns: z.enum(['2', '3', '4']).default('4'),
});

// Section: Comparison Table
export const ComparisonTableSectionSchema = z.object({
  type: z.literal('comparisonTable'),
  title: z.string().optional(),
  leftColumn: z.object({
    header: z.string(),
    items: z.array(z.string()),
    highlighted: z.boolean().default(false),
  }),
  rightColumn: z.object({
    header: z.string(),
    items: z.array(z.string()),
    highlighted: z.boolean().default(true),
  }),
});

// Section: Process Steps
export const ProcessSectionSchema = z.object({
  type: z.literal('process'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  steps: z.array(z.object({
    number: z.number().optional(),
    title: z.string(),
    description: RichTextSchema,
    image: ImageSchema.optional(),
  })),
  layout: z.enum(['horizontal', 'vertical', 'alternating']).default('alternating'),
});

// Section: Features List
export const FeaturesListSectionSchema = z.object({
  type: z.literal('featuresList'),
  title: z.string().optional(),
  features: z.array(z.object({
    icon: z.string().optional(),
    title: z.string(),
    description: RichTextSchema.optional(),
  })),
  columns: z.enum(['2', '3']).default('2'),
});

// Section: Testimonials
export const TestimonialsSectionSchema = z.object({
  type: z.literal('testimonials'),
  title: z.string().optional(),
  rating: z.object({
    average: z.number(),
    count: z.number(),
    source: z.string().optional(),
  }).optional(),
  testimonials: z.array(z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    image: ImageSchema.optional(),
    rating: z.number().min(1).max(5).optional(),
  })),
});

// Section: CTA Banner
export const CTASectionSchema = z.object({
  type: z.literal('cta'),
  title: z.string(),
  description: RichTextSchema.optional(),
  ctas: z.array(LinkSchema).min(1).max(2),
  backgroundColor: z.enum(['green', 'orange', 'beige']).default('green'),
  image: ImageSchema.optional(),
});

// Section: Text Content
export const TextContentSectionSchema = z.object({
  type: z.literal('textContent'),
  title: z.string().optional(),
  content: RichTextSchema,
  alignment: z.enum(['left', 'center', 'right']).default('left'),
  maxWidth: z.enum(['narrow', 'medium', 'wide']).default('medium'),
});

// Section: FAQ Accordion
export const FAQSectionSchema = z.object({
  type: z.literal('faq'),
  title: z.string().optional(),
  items: z.array(z.object({
    question: z.string(),
    answer: RichTextSchema,
  })),
});

// Section: Blog Grid
export const BlogGridSectionSchema = z.object({
  type: z.literal('blogGrid'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  posts: z.array(z.string()).optional(), // References to blog post slugs, or omit for latest
  limit: z.number().default(6),
  showCategories: z.boolean().default(true),
});

// Section: Wave Divider
export const WaveDividerSectionSchema = z.object({
  type: z.literal('waveDivider'),
  topColor: z.enum(['beige', 'white', 'green']).default('beige'),
  bottomColor: z.enum(['beige', 'white', 'green']).default('green'),
  height: z.enum(['small', 'medium', 'large']).default('medium'),
});

// Section: Contact Form
export const ContactFormSectionSchema = z.object({
  type: z.literal('contactForm'),
  title: z.string().optional(),
  description: RichTextSchema.optional(),
  fields: z.array(z.object({
    name: z.string(),
    label: z.string(),
    type: z.enum(['text', 'email', 'phone', 'textarea', 'select']),
    required: z.boolean().default(false),
    options: z.array(z.string()).optional(), // For select type
  })),
  submitLabel: z.string().default('Absenden'),
  successMessage: z.string(),
});

// Section: Newsletter Signup
export const NewsletterSectionSchema = z.object({
  type: z.literal('newsletter'),
  title: z.string().optional(),
  description: z.string().optional(),
  buttonText: z.string().default('Jetzt anmelden'),
  placeholderText: z.string().default('Eure E-Mail-Adresse'),
  privacyText: z.string().optional(),
  backgroundColor: z.enum(['green', 'beige', 'orange']).default('green'),
});

// Discriminated union of all section types
export const SectionSchema = z.discriminatedUnion('type', [
  HeroSectionSchema,
  LogoGallerySectionSchema,
  SplitContentSectionSchema,
  ValuePropositionSectionSchema,
  ServicesGridSectionSchema,
  ComparisonTableSectionSchema,
  ProcessSectionSchema,
  FeaturesListSectionSchema,
  TestimonialsSectionSchema,
  CTASectionSchema,
  TextContentSectionSchema,
  FAQSectionSchema,
  BlogGridSectionSchema,
  WaveDividerSectionSchema,
  ContactFormSectionSchema,
  NewsletterSectionSchema,
]);

// Section reference (for shared/global sections)
export const SectionRefSchema = z.object({
  ref: z.string(), // Reference to shared section by ID
});

// Section entry can be inline or reference
export const SectionEntrySchema = z.union([SectionSchema, SectionRefSchema]);

// Type exports
export type Image = z.infer<typeof ImageSchema>;
export type Link = z.infer<typeof LinkSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type SectionEntry = z.infer<typeof SectionEntrySchema>;
export type HeroSection = z.infer<typeof HeroSectionSchema>;
export type LogoGallerySection = z.infer<typeof LogoGallerySectionSchema>;
export type SplitContentSection = z.infer<typeof SplitContentSectionSchema>;
export type ValuePropositionSection = z.infer<typeof ValuePropositionSectionSchema>;
export type ServicesGridSection = z.infer<typeof ServicesGridSectionSchema>;
export type ComparisonTableSection = z.infer<typeof ComparisonTableSectionSchema>;
export type ProcessSection = z.infer<typeof ProcessSectionSchema>;
export type FeaturesListSection = z.infer<typeof FeaturesListSectionSchema>;
export type TestimonialsSection = z.infer<typeof TestimonialsSectionSchema>;
export type CTASection = z.infer<typeof CTASectionSchema>;
export type TextContentSection = z.infer<typeof TextContentSectionSchema>;
export type FAQSection = z.infer<typeof FAQSectionSchema>;
export type BlogGridSection = z.infer<typeof BlogGridSectionSchema>;
export type WaveDividerSection = z.infer<typeof WaveDividerSectionSchema>;
export type ContactFormSection = z.infer<typeof ContactFormSectionSchema>;
export type NewsletterSection = z.infer<typeof NewsletterSectionSchema>;
