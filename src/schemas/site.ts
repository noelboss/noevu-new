import { z } from 'zod';

// Contact information
export const ContactSchema = z.object({
  phone: z.string(),
  email: z.string().email(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),
    country: z.string(),
  }),
  hours: z.object({
    days: z.string(),
    time: z.string(),
  }).optional(),
});

// Company information
export const CompanySchema = z.object({
  name: z.string(),
  legalName: z.string(),
  tagline: z.string().optional(),
  description: z.string(),
  foundedYear: z.number(),
  logo: z.object({
    default: z.string(),
    dark: z.string().optional(),
    icon: z.string().optional(),
  }),
});

// Site configuration schema
export const SiteConfigSchema = z.object({
  // Basic info
  url: z.string().url(),
  defaultLocale: z.enum(['de', 'en']).default('de'),
  locales: z.array(z.enum(['de', 'en'])).default(['de', 'en']),

  // Company & contact
  company: CompanySchema,
  contact: ContactSchema,

  // Default SEO
  defaultSeo: z.object({
    titleTemplate: z.string(), // e.g. "%s | Noevu"
    defaultTitle: z.string(),
    defaultDescription: z.string(),
    defaultImage: z.string().optional(),
  }),

  // Integrations
  analytics: z.object({
    googleTagManager: z.string().optional(),
    plausible: z.string().optional(),
  }).optional(),

  // Features
  features: z.object({
    blog: z.boolean().default(true),
    i18n: z.boolean().default(true),
    darkMode: z.boolean().default(false),
  }).optional(),
});

// Type exports
export type Contact = z.infer<typeof ContactSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
