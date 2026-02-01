#!/usr/bin/env node
/**
 * Content Validation Script
 *
 * Validates all JSON content against Zod schemas at build time.
 * Fails the build if any content is invalid.
 *
 * Architecture principle: Schemas are the contract.
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { z } from 'zod';

// Re-define schemas here to avoid TypeScript compilation issues
// In production, these would be imported from a shared JS module

const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const LinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'secondary', 'text']).optional().default('primary'),
  external: z.boolean().optional().default(false),
});

const SEOSchema = z.object({
  title: z.string(),
  description: z.string().max(300),
  image: ImageSchema.optional(),
  noIndex: z.boolean().optional().default(false),
  canonicalUrl: z.string().optional(),
});

// Simplified section schema for validation
const SectionSchema = z.object({
  type: z.string(),
}).passthrough();

const PageSchema = z.object({
  slug: z.string(),
  locale: z.enum(['de', 'en']).optional().default('de'),
  seo: SEOSchema,
  sections: z.array(SectionSchema),
  layout: z.enum(['default', 'blog', 'landing']).optional().default('default'),
  showHeader: z.boolean().optional().default(true),
  showFooter: z.boolean().optional().default(true),
});

const NavItemSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  external: z.boolean().optional().default(false),
  children: z.array(z.lazy(() => NavItemSchema)).optional(),
});

const NavigationSchema = z.object({
  main: z.array(NavItemSchema),
  footer: z.object({
    columns: z.array(z.object({
      title: z.string(),
      links: z.array(z.object({
        label: z.string(),
        href: z.string(),
        external: z.boolean().optional().default(false),
      })),
    })),
  }).optional(),
  social: z.array(z.object({
    platform: z.string(),
    href: z.string(),
    label: z.string().optional(),
  })).optional(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),
});

const SiteConfigSchema = z.object({
  url: z.string().url(),
  defaultLocale: z.enum(['de', 'en']).optional().default('de'),
  locales: z.array(z.enum(['de', 'en'])).optional().default(['de', 'en']),
  company: z.object({
    name: z.string(),
    legalName: z.string(),
    tagline: z.string().optional(),
    description: z.string(),
  }).passthrough(),
  contact: z.object({
    phone: z.string(),
    email: z.string().email(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      zip: z.string(),
      country: z.string(),
    }),
  }).passthrough(),
}).passthrough();

// Validation functions
function validateFile(filePath, schema, label) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    schema.parse(data);
    console.log(`✓ ${label}: ${basename(filePath)}`);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(`✗ ${label}: ${basename(filePath)}`);
      error.errors.forEach((err) => {
        console.error(`  → ${err.path.join('.')}: ${err.message}`);
      });
    } else {
      console.error(`✗ ${label}: ${basename(filePath)}`);
      console.error(`  → ${error.message}`);
    }
    return false;
  }
}

function validateDirectory(dir, schema, label) {
  if (!existsSync(dir)) {
    console.log(`  (no ${label} directory found)`);
    return true;
  }

  const files = readdirSync(dir).filter((f) => f.endsWith('.json'));
  let allValid = true;

  for (const file of files) {
    const isValid = validateFile(join(dir, file), schema, label);
    if (!isValid) allValid = false;
  }

  return allValid;
}

// Main validation
console.log('\n📋 Validating content against schemas...\n');

let allValid = true;

// Validate pages
console.log('Pages:');
if (!validateDirectory('src/content/pages', PageSchema, 'Page')) {
  allValid = false;
}

// Validate navigation
console.log('\nNavigation:');
if (!validateFile('src/content/navigation.json', NavigationSchema, 'Navigation')) {
  allValid = false;
}

// Validate site config
console.log('\nSite Config:');
if (!validateFile('src/content/site.json', SiteConfigSchema, 'Site')) {
  allValid = false;
}

// Summary
console.log('\n' + '─'.repeat(50));
if (allValid) {
  console.log('✅ All content is valid!\n');
  process.exit(0);
} else {
  console.error('❌ Content validation failed. Please fix the errors above.\n');
  process.exit(1);
}
