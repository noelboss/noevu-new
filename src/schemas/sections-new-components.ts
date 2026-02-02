import { z } from 'zod';
import { ThemeSchema } from './sections';

/**
 * NEW SECTION SCHEMAS FOR NOEVU.CH
 *
 * This file contains Zod schemas for 10 new section types identified from the
 * original site. These schemas follow the same patterns as the existing
 * sections.ts file and are ready to be merged into the main schema.
 *
 * Priority breakdown:
 * - HIGH (3): teamGrid, bentoGrid, imageTextAlternating
 * - MEDIUM (5): socialResponsibility, statsBanner, ratingDisplay, certificationBadge, timelineProcess
 * - LOW (2): iconGrid, contentShowcase
 */

// Re-use base schemas from sections.ts
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

// =============================================================================
// HIGH PRIORITY SECTIONS
// =============================================================================

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

// =============================================================================
// MEDIUM PRIORITY SECTIONS
// =============================================================================

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

// =============================================================================
// LOW PRIORITY SECTIONS
// =============================================================================

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

// =============================================================================
// TYPE EXPORTS
// =============================================================================

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
