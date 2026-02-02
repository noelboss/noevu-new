import { z } from 'zod';

// Theme system - 10 variants from original noevu.ch site
export const ThemeSchema = z.enum([
  'dark',           // Primary content sections (most common)
  'white',          // Light content areas
  'white-bold',     // Emphasis with white background
  'bright-inverse', // Inverted color scheme (orange bg)
  'bright',         // Accent/highlight sections
  'light-bold',     // Light background with bold elements
  'black-bold',     // Hero sections, strong contrast
  'black',          // Dark sections
  'light',          // Light backgrounds
  'dark-bold',      // Bold dark sections
]);

export type Theme = z.infer<typeof ThemeSchema>;

// Base schemas for common patterns
export const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const LinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'secondary', 'text']).default('primary'),
  external: z.boolean().default(false),
});

export const RichTextSchema = z.string(); // Markdown content in string field

// Section: Hero
export const HeroSectionSchema = z.object({
  type: z.literal('hero'),
  theme: ThemeSchema.optional(),
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
  theme: ThemeSchema.optional(),
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
  theme: ThemeSchema.optional(),
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
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(z.object({
    icon: z.string().optional(),
    image: ImageSchema.optional(),
    title: z.string(),
    description: RichTextSchema,
  })).min(1).max(4),
});

// Section: Services Grid
export const ServicesGridSectionSchema = z.object({
  type: z.literal('servicesGrid'),
  theme: ThemeSchema.optional(),
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
  theme: ThemeSchema.optional(),
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
  theme: ThemeSchema.optional(),
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
  theme: ThemeSchema.optional(),
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
  theme: ThemeSchema.optional(),
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
  theme: ThemeSchema.optional(),
  title: z.string(),
  description: RichTextSchema.optional(),
  ctas: z.array(LinkSchema).min(1).max(2),
  backgroundColor: z.enum(['green', 'orange', 'beige']).default('green'),
  image: ImageSchema.optional(),
});

// Section: Text Content
export const TextContentSectionSchema = z.object({
  type: z.literal('textContent'),
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  content: RichTextSchema,
  alignment: z.enum(['left', 'center', 'right']).default('left'),
  maxWidth: z.enum(['narrow', 'medium', 'wide']).default('medium'),
});

// Section: FAQ Accordion
export const FAQSectionSchema = z.object({
  type: z.literal('faq'),
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  items: z.array(z.object({
    question: z.string(),
    answer: RichTextSchema,
  })),
});

// Section: Blog Grid
export const BlogGridSectionSchema = z.object({
  type: z.literal('blogGrid'),
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  posts: z.array(z.string()).optional(), // References to blog post slugs, or omit for latest
  limit: z.number().default(6),
  showCategories: z.boolean().default(true),
});

// Section: Wave Divider
export const WaveDividerSectionSchema = z.object({
  type: z.literal('waveDivider'),
  topTheme: ThemeSchema.optional(),
  bottomTheme: ThemeSchema.optional(),
  topColor: z.enum(['beige', 'white', 'green']).default('beige'),
  bottomColor: z.enum(['beige', 'white', 'green']).default('green'),
  height: z.enum(['small', 'medium', 'large']).default('medium'),
});

// Section: Contact Form
export const ContactFormSectionSchema = z.object({
  type: z.literal('contactForm'),
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  description: RichTextSchema.optional(),
  formTitle: z.string().optional(), // Title displayed above the form fields
  image: ImageSchema.optional(), // Optional image alongside the form
  imagePosition: z.enum(['left', 'right']).default('left'),
  fields: z.array(z.object({
    name: z.string(),
    label: z.string(),
    type: z.enum(['text', 'email', 'phone', 'tel', 'textarea', 'select', 'checkbox']),
    required: z.boolean().default(false),
    options: z.array(z.string()).optional(), // For select type
    width: z.enum(['full', 'half']).default('full'), // For side-by-side fields
  })),
  submitLabel: z.string().default('Absenden'),
  submitIcon: z.string().optional(), // Material icon name for submit button
  successMessage: z.string(),
});

// Section: Newsletter Signup
export const NewsletterSectionSchema = z.object({
  type: z.literal('newsletter'),
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  buttonText: z.string().default('Jetzt anmelden'),
  placeholderText: z.string().default('Eure E-Mail-Adresse'),
  privacyText: z.string().optional(),
  backgroundColor: z.enum(['green', 'beige', 'orange']).default('green'),
});

/**
 * TEAM GRID
 * Displays team member profiles with photos, roles, bios, and social links.
 * Used on: webdesign-agentur, ueber-uns, schweizer-squarespace-experte
 */
export const TeamGridSectionSchema = z.object({
  type: z.literal('teamGrid'),
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  members: z.array(z.object({
    name: z.string(),
    role: z.string(),
    image: ImageSchema,
    bio: RichTextSchema,
    linkedin: z.string().optional(), // LinkedIn profile URL
    email: z.string().optional(),
  })),
  layout: z.enum(['2-column', '3-column', '4-column']).default('4-column'),
});

/**
 * BENTO GRID
 * Modern bento-box style feature grid with icons, varied sizing, visual hierarchy.
 * Different from featuresList - supports Material Icons, asymmetric layouts.
 * Used on: squarespace-agentur (6 features), ai-beratung (AI services)
 */
export const BentoGridSectionSchema = z.object({
  type: z.literal('bentoGrid'),
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(z.object({
    icon: z.string().optional(), // Material Icons name (e.g., 'web_traffic', 'ads_click')
    iconDisplay: z.enum(['icon', 'emoji', 'none']).default('icon'),
    title: z.string(),
    subtitle: z.string().optional(),
    description: RichTextSchema,
    size: z.enum(['small', 'medium', 'large']).default('medium'), // Card size in grid
  })),
  columns: z.enum(['2', '3', '4']).default('3'),
});

/**
 * IMAGE TEXT ALTERNATING
 * Full-width alternating image/text sections for process steps or features.
 * Different from process section - has full images, more detailed descriptions.
 * Used on: webdesign-agentur (4 steps), ai-beratung (AI transformation), squarespace-agentur
 */
export const ImageTextAlternatingSectionSchema = z.object({
  type: z.literal('imageTextAlternating'),
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(z.object({
    eyebrow: z.string().optional(), // Small text above title
    title: z.string(),
    description: RichTextSchema,
    image: ImageSchema,
    imagePosition: z.enum(['left', 'right', 'auto']).default('auto'), // 'auto' alternates
    cta: LinkSchema.optional(),
  })),
});

/**
 * SOCIAL RESPONSIBILITY
 * Showcase company's social responsibility initiatives and values.
 * Used on: webdesign-agentur, ueber-uns (familyboss.art project)
 */
export const SocialResponsibilitySectionSchema = z.object({
  type: z.literal('socialResponsibility'),
  theme: ThemeSchema.optional(),
  eyebrow: z.string().optional(),
  title: z.string(),
  description: RichTextSchema,
  image: ImageSchema,
  cta: LinkSchema.optional(),
});

/**
 * STATS BANNER
 * Display key statistics/numbers with labels as trust signals.
 * Examples: '4.9 stars on Google', '25+ years experience', '100% satisfaction'
 */
export const StatsBannerSectionSchema = z.object({
  type: z.literal('statsBanner'),
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  backgroundColor: z.enum(['green', 'orange', 'beige', 'white']).default('green'),
  stats: z.array(z.object({
    value: z.string(), // e.g., '4.9', '25+', '100%'
    label: z.string(),
    icon: z.string().optional(), // Material Icons name
  })),
  layout: z.enum(['horizontal', 'grid']).default('horizontal'),
});

/**
 * RATING DISPLAY
 * Display rating/review score with source as trust signal.
 * Used in hero sections and throughout site.
 * Example: '4.9 Sterne Bewertungen auf Google'
 */
export const RatingDisplaySectionSchema = z.object({
  type: z.literal('ratingDisplay'),
  theme: ThemeSchema.optional(),
  score: z.number().min(0).max(5),
  maxScore: z.number().default(5),
  reviewCount: z.number(),
  source: z.string(), // e.g., 'Google', 'Trustpilot'
  label: z.string(),
  cta: LinkSchema.optional(), // Link to reviews
});

/**
 * CERTIFICATION BADGE
 * Display certification or partner badges (e.g., Squarespace Gold Partner).
 * Can be inline with content or standalone section.
 */
export const CertificationBadgeSectionSchema = z.object({
  type: z.literal('certificationBadge'),
  theme: ThemeSchema.optional(),
  badge: ImageSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  link: z.string().optional(), // URL to certification details
  inline: z.boolean().default(false), // Display inline vs standalone section
});

/**
 * TIMELINE PROCESS
 * Numbered timeline showing process steps with detailed descriptions.
 * Different from process section - explicitly numbered, more detailed.
 * Used on: webdesign-agentur, squarespace-agentur (4 numbered steps)
 */
export const TimelineProcessSectionSchema = z.object({
  type: z.literal('timelineProcess'),
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  steps: z.array(z.object({
    number: z.union([z.number(), z.string()]), // Allows '01', '02' or 1, 2
    eyebrow: z.string().optional(),
    title: z.string(),
    description: RichTextSchema,
    image: ImageSchema.optional(),
  })),
  layout: z.enum(['vertical', 'horizontal']).default('vertical'),
});

/**
 * ICON GRID
 * Simple grid of icons with short labels (checkmarks, features).
 * Simpler version of featuresList - just icon + short text.
 */
export const IconGridSectionSchema = z.object({
  type: z.literal('iconGrid'),
  theme: ThemeSchema.optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  columns: z.enum(['2', '3', '4']).default('3'),
  items: z.array(z.object({
    icon: z.string(), // Material Icons name or 'check'
    label: z.string(),
  })),
});

/**
 * CONTENT SHOWCASE
 * Showcase content with large background image and overlay text.
 * Similar to hero but for mid-page content highlights.
 */
export const ContentShowcaseSectionSchema = z.object({
  type: z.literal('contentShowcase'),
  theme: ThemeSchema.optional(),
  backgroundImage: ImageSchema,
  eyebrow: z.string().optional(),
  title: z.string(),
  description: RichTextSchema.optional(),
  ctas: z.array(LinkSchema).max(2).default([]),
  overlay: z.boolean().default(true), // Dark overlay over background image
  textPosition: z.enum(['left', 'center', 'right']).default('center'),
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
  TeamGridSectionSchema,
  BentoGridSectionSchema,
  ImageTextAlternatingSectionSchema,
  SocialResponsibilitySectionSchema,
  StatsBannerSectionSchema,
  RatingDisplaySectionSchema,
  CertificationBadgeSectionSchema,
  TimelineProcessSectionSchema,
  IconGridSectionSchema,
  ContentShowcaseSectionSchema,
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
export type TeamGridSection = z.infer<typeof TeamGridSectionSchema>;
export type BentoGridSection = z.infer<typeof BentoGridSectionSchema>;
export type ImageTextAlternatingSection = z.infer<typeof ImageTextAlternatingSectionSchema>;
export type SocialResponsibilitySection = z.infer<typeof SocialResponsibilitySectionSchema>;
export type StatsBannerSection = z.infer<typeof StatsBannerSectionSchema>;
export type RatingDisplaySection = z.infer<typeof RatingDisplaySectionSchema>;
export type CertificationBadgeSection = z.infer<typeof CertificationBadgeSectionSchema>;
export type TimelineProcessSection = z.infer<typeof TimelineProcessSectionSchema>;
export type IconGridSection = z.infer<typeof IconGridSectionSchema>;
export type ContentShowcaseSection = z.infer<typeof ContentShowcaseSectionSchema>;
