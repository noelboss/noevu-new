# Logo Slider Component

## Screenshot

![Logo Slider](./x03%20logo-slider.png)

## Description

Horizontal carousel displaying client/partner logos. Auto-scrolling with infinite loop effect. Shows trust and social proof through brand associations.

## Design

- **Background:** Neutral (white or light gray)
- **Logos:** Grayscale or muted, full color on hover
- **Height:** ~80-120px section
- **Spacing:** Even gaps between logos
- **Animation:** Smooth continuous scroll (marquee effect)

## Structure

```
logo-slider
├── section-title (optional, "Trusted by" / "Our Clients")
├── slider-track (overflow hidden)
│   └── slider-content (duplicated for infinite scroll)
│       ├── logo-item
│       │   └── img (max-height constrained)
│       ├── logo-item
│       └── ... (repeated)
```

## Behavior

- **Auto-scroll:** Continuous left-to-right (or right-to-left)
- **Pause on hover:** Optional, stops animation when hovering
- **Infinite loop:** Content duplicated to create seamless loop
- **Speed:** Configurable, typically 20-40 seconds per cycle
- **No controls:** No arrows or dots (purely decorative)

## Variants

1. **Marquee** - Continuous scroll, no interaction
2. **Swiper** - Manual navigation with arrows/dots
3. **Static Grid** - No animation, responsive grid

## Tailwind Implementation

```html
<section class="py-12 bg-gray-50 overflow-hidden">
  <p class="text-center text-sm text-gray-500 mb-8">Trusted by leading companies</p>
  
  <div class="relative">
    <!-- Gradient masks -->
    <div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
    <div class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />
    
    <!-- Scrolling track -->
    <div class="flex animate-marquee">
      <div class="flex shrink-0 items-center gap-12 px-6">
        <img src="..." class="h-10 grayscale hover:grayscale-0 transition" alt="Logo 1" />
        <img src="..." class="h-10 grayscale hover:grayscale-0 transition" alt="Logo 2" />
        <!-- More logos -->
      </div>
      <!-- Duplicate for infinite scroll -->
      <div class="flex shrink-0 items-center gap-12 px-6">
        <!-- Same logos repeated -->
      </div>
    </div>
  </div>
</section>
```

### CSS Animation
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

## Props

```typescript
interface LogoSliderProps {
  title?: string;
  logos: Array<{
    src: string;
    alt: string;
    href?: string; // Optional link
  }>;
  speed?: number; // Seconds per cycle
  pauseOnHover?: boolean;
  grayscale?: boolean;
  variant?: 'marquee' | 'swiper' | 'grid';
}
```

## Reference

- Custom CSS: `_reference/src/components/logoslider/`
