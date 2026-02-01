import { z } from 'zod';

// Navigation item (can be nested)
export const NavItemSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  external: z.boolean().default(false),
  children: z.array(z.lazy(() => NavItemSchema)).optional(),
});

// Recursive type definition for nested navigation
export type NavItem = z.infer<typeof NavItemSchema>;

// Main navigation schema
export const NavigationSchema = z.object({
  main: z.array(NavItemSchema),
  footer: z.object({
    columns: z.array(z.object({
      title: z.string(),
      links: z.array(z.object({
        label: z.string(),
        href: z.string(),
        external: z.boolean().default(false),
      })),
    })),
  }),
  social: z.array(z.object({
    platform: z.enum(['linkedin', 'facebook', 'instagram', 'twitter', 'youtube', 'github']),
    href: z.string(),
    label: z.string().optional(),
  })),
  cta: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),
});

// Type export
export type Navigation = z.infer<typeof NavigationSchema>;
