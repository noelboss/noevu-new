import type { Theme } from '../schemas/sections';

/**
 * Default themes for each section type
 * Based on analysis of original noevu.ch site
 */
export const themeDefaults: Record<string, Theme> = {
  hero: 'black-bold',
  logoGallery: 'light',
  splitContent: 'light-bold',
  valueProposition: 'dark',
  servicesGrid: 'white',
  comparisonTable: 'light-bold',
  process: 'dark',
  featuresList: 'light-bold',
  testimonials: 'white',
  cta: 'dark-bold',
  textContent: 'white',
  faq: 'light',
  blogGrid: 'white',
  waveDivider: 'light', // Wave divider uses its own color system
  contactForm: 'white',
  newsletter: 'dark',
};

/**
 * Resolve theme for a section, using default if not specified
 */
export function resolveTheme(sectionType: string, theme?: Theme): Theme | undefined {
  return theme ?? themeDefaults[sectionType];
}
