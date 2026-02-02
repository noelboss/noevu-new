# Feature List (SEO Intro)

A compact intro section typically placed at the beginning of pages for SEO purposes, featuring a headline, feature list with icons, and social proof widget.

## Screenshot

![Feature List](./x02%20feature%20list%20intro%20-%20for%20seo%20at%20begining%20of%20pages%20with%20social%20proof.png)

## Purpose

- Provides quick overview of key value propositions
- Includes social proof (customer faces + rating) for trust
- SEO-optimized intro text at page start
- Guides users to main CTA

## Structure

```
┌─────────────────────────────────────────────────────┐
│  [Headline - H1 or H2]                              │
│                                                     │
│  ✓ Feature point 1     ✓ Feature point 2           │
│  ✓ Feature point 3     ✓ Feature point 4           │
│                                                     │
│  [Social Proof Widget]  [Primary CTA Button]        │
└─────────────────────────────────────────────────────┘
```

## Design Details

### Layout
- Full-width section with beige/light background
- Content centered with max-width container
- Feature list in 2-column grid on desktop, stacked on mobile
- Social proof and CTA aligned horizontally

### Feature List Items
- Orange checkmark icon (Material Symbols: `check`)
- Body font, regular weight
- Adequate spacing between items

### Social Proof Widget
- Overlapping circular avatar images (3-4 faces)
- Star rating or text rating
- Small supporting text

## Tailwind Implementation

```astro
---
interface Props {
  headline: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

const { headline, features, ctaText, ctaHref } = Astro.props;
---

<section class="bg-brand-beige py-16 lg:py-20">
  <div class="container max-w-4xl text-center">
    <h2 class="font-heading text-3xl lg:text-4xl text-brand-green mb-8">
      {headline}
    </h2>
    
    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left max-w-2xl mx-auto">
      {features.map((feature) => (
        <li class="flex items-start gap-2">
          <span class="material-symbols-outlined text-brand-orange">check</span>
          <span class="text-brand-brown">{feature}</span>
        </li>
      ))}
    </ul>
    
    <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
      <SocialProof />
      <a href={ctaHref} class="btn-primary">{ctaText}</a>
    </div>
  </div>
</section>
```

## Props

```typescript
interface FeatureListProps {
  headline: string;
  features: string[];          // Array of feature text strings
  ctaText: string;
  ctaHref: string;
  showSocialProof?: boolean;   // Default: true
  theme?: 'light' | 'white';   // Background theme
}
```

## Variants

1. **With Social Proof** - Default, includes customer faces and rating
2. **Without Social Proof** - Just features and CTA
3. **Centered** - All content centered (default)
4. **Left-aligned** - Content aligned left for longer pages

## Usage Context

- Service page intros
- Landing page hero supplements
- Product overview sections
