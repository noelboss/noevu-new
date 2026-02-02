# Hero Component

## Screenshot

![Hero Section](./x01%20header%20section%20with%20top%20bar.png)

## Description

Full-width hero section with background image, headline, subtext, and call-to-action buttons. First section visitors see on landing pages.

## Design

- **Height:** 80-100vh or custom height
- **Background:** Full-bleed image with optional overlay
- **Content:** Left-aligned or centered
- **Typography:** Large headline (H1), supporting text, CTAs
- **Overlay:** Semi-transparent gradient for text readability

## Structure

```
hero-section
├── background-layer
│   ├── image (object-fit: cover)
│   └── overlay (gradient or solid)
├── content-wrapper (centered container)
│   ├── badge/label (optional, small text)
│   ├── headline (H1)
│   ├── subheadline (paragraph)
│   ├── cta-group
│   │   ├── primary-button
│   │   └── secondary-button (optional)
│   └── social-proof (optional, rating widget)
└── scroll-indicator (optional, bottom)
```

## Variants

1. **Image Background** - Full photo with overlay
2. **Video Background** - Looping video
3. **Gradient Background** - Color gradient only
4. **Split Layout** - Image on one side, content on other

## Responsive Behavior

- Desktop: Side-by-side or layered layout
- Mobile: Stacked, reduced padding, smaller typography
- Background image focal point adjusts

## Tailwind Implementation

```html
<section class="relative min-h-screen flex items-center">
  <!-- Background -->
  <div class="absolute inset-0">
    <img src="..." class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
  </div>
  
  <!-- Content -->
  <div class="relative container mx-auto px-4">
    <span class="text-sm text-green-400 uppercase tracking-wide">Badge</span>
    <h1 class="text-5xl md:text-7xl font-bold text-white mt-4">Headline</h1>
    <p class="text-xl text-white/80 mt-6 max-w-2xl">Supporting text...</p>
    <div class="flex gap-4 mt-8">
      <a href="#" class="btn btn-primary">Primary CTA</a>
      <a href="#" class="btn btn-secondary">Secondary CTA</a>
    </div>
  </div>
</section>
```

## Props

```typescript
interface HeroProps {
  headline: string;
  subheadline?: string;
  badge?: string;
  background: {
    type: 'image' | 'video' | 'gradient';
    src?: string;
    overlay?: 'dark' | 'light' | 'gradient' | 'none';
    focalPoint?: { x: number; y: number };
  };
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  alignment?: 'left' | 'center';
  height?: 'full' | 'large' | 'medium';
}
```
