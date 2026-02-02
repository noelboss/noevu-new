# Device Mockups

Components for displaying screenshots within realistic device frames (laptop, phone).

## Screenshots

### Laptop Mockup
![Laptop Mockup](./Laptop%20screen%20with%20scrollable%20screenshot%20for%20blog%20posts%20and%20portfolios.png)

---

## Overview

Device mockups showcase website screenshots in a realistic context. Used primarily in:
- Portfolio/case study pages
- Blog posts (tutorials, reviews)
- Feature showcases

---

## Components

### 1. Laptop Mockup

Full-width laptop frame with scrollable screenshot viewport.

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  ● ● ●                                       [Browser]  │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │                                                         │ │
│ │                   ┌───────────────┐                     │ │
│ │                   │               │                     │ │
│ │                   │  Screenshot   │  ← Scrollable       │ │
│ │                   │   Content     │    viewport         │ │
│ │                   │               │                     │ │
│ │                   │               │                     │ │
│ │                   └───────────────┘                     │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ═══════════════════════════════════════════════════════════ │
│                         [Keyboard]                          │
└─────────────────────────────────────────────────────────────┘
```

#### Implementation

```astro
---
interface Props {
  src: string;
  alt: string;
  scrollable?: boolean;
  aspectRatio?: 'wide' | 'standard'; // 16:9 or 4:3
  caption?: string;
}

const { src, alt, scrollable = true, aspectRatio = 'wide', caption } = Astro.props;
---

<figure class="laptop-mockup my-8">
  <div class="relative mx-auto max-w-4xl">
    <!-- Laptop Frame -->
    <div class="bg-gray-800 rounded-t-xl pt-4 px-4">
      <!-- Browser Chrome -->
      <div class="flex items-center gap-2 pb-2">
        <div class="flex gap-1.5">
          <span class="w-3 h-3 rounded-full bg-red-500"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span class="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <div class="flex-1 bg-gray-700 rounded h-6 mx-8"></div>
      </div>
      
      <!-- Screen Viewport -->
      <div 
        class:list={[
          'bg-white overflow-hidden rounded-t-sm',
          aspectRatio === 'wide' ? 'aspect-[16/10]' : 'aspect-[4/3]',
          scrollable && 'overflow-y-auto'
        ]}
        style={scrollable ? 'max-height: 400px;' : ''}
      >
        <img 
          src={src}
          alt={alt}
          class="w-full h-auto"
          loading="lazy"
        />
      </div>
    </div>
    
    <!-- Laptop Base -->
    <div class="bg-gray-700 h-4 rounded-b-xl relative">
      <div class="absolute inset-x-1/4 -top-px h-1 bg-gray-600 rounded-b"></div>
    </div>
    <div class="bg-gray-600 h-2 mx-16 rounded-b-xl"></div>
  </div>
  
  {caption && (
    <figcaption class="text-center text-sm text-brand-brown/60 mt-4">
      {caption}
    </figcaption>
  )}
</figure>

<style>
  .laptop-mockup [class*="overflow-y-auto"] {
    scrollbar-width: thin;
    scrollbar-color: theme('colors.gray.400') transparent;
  }
  
  .laptop-mockup [class*="overflow-y-auto"]::-webkit-scrollbar {
    width: 6px;
  }
  
  .laptop-mockup [class*="overflow-y-auto"]::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .laptop-mockup [class*="overflow-y-auto"]::-webkit-scrollbar-thumb {
    background-color: theme('colors.gray.400');
    border-radius: 3px;
  }
</style>
```

### 2. iPhone Mockup

Phone frame for mobile screenshots, often displayed side-by-side.

```
┌───────────────────┐
│   ▬▬▬ [notch]     │
├───────────────────┤
│                   │
│   ┌───────────┐   │
│   │           │   │
│   │Screenshot │   │
│   │ Content   │   │
│   │           │   │
│   │           │   │
│   └───────────┘   │
│                   │
├───────────────────┤
│        ─          │
└───────────────────┘
```

#### Implementation

```astro
---
interface Props {
  src: string;
  alt: string;
  scrollable?: boolean;
  variant?: 'light' | 'dark';
}

const { src, alt, scrollable = true, variant = 'dark' } = Astro.props;

const frameColor = variant === 'dark' ? 'bg-gray-900' : 'bg-gray-200';
const borderColor = variant === 'dark' ? 'border-gray-800' : 'border-gray-300';
---

<div class="iphone-mockup inline-block">
  <div class={`relative w-64 ${frameColor} rounded-[3rem] p-3 shadow-xl`}>
    <!-- Notch -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10"></div>
    
    <!-- Screen -->
    <div 
      class:list={[
        'bg-white rounded-[2.5rem] overflow-hidden',
        scrollable && 'max-h-[480px] overflow-y-auto'
      ]}
    >
      <img 
        src={src}
        alt={alt}
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    
    <!-- Home Indicator -->
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-600 rounded-full"></div>
  </div>
</div>
```

### 3. Dual Phone Layout

Two phones side-by-side for before/after or multiple screens.

```astro
---
interface Props {
  screens: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

const { screens } = Astro.props;
---

<div class="flex flex-wrap justify-center gap-8 my-8">
  {screens.map((screen) => (
    <div class="flex flex-col items-center">
      <PhoneMockup src={screen.src} alt={screen.alt} />
      {screen.caption && (
        <p class="text-sm text-brand-brown/60 mt-3">{screen.caption}</p>
      )}
    </div>
  ))}
</div>
```

---

## Usage in MDX

### Basic Laptop Mockup

```mdx
import LaptopMockup from '@/components/device-mockups/LaptopMockup.astro';

<LaptopMockup 
  src="/images/portfolio/client-homepage.png"
  alt="Client homepage design"
  caption="Homepage nach dem Relaunch"
/>
```

### Scrollable Screenshot

```mdx
<LaptopMockup 
  src="/images/portfolio/client-full-page.png"
  alt="Full page screenshot"
  scrollable={true}
/>
```

### Phone Comparison

```mdx
import DualPhone from '@/components/device-mockups/DualPhone.astro';

<DualPhone 
  screens={[
    { src: "/images/mobile-before.png", alt: "Before", caption: "Vorher" },
    { src: "/images/mobile-after.png", alt: "After", caption: "Nachher" }
  ]}
/>
```

---

## Tina CMS Integration

Allow content editors to easily insert device mockups.

```typescript
// tina/config.ts - Rich text template
{
  name: 'deviceMockup',
  label: 'Device Mockup',
  fields: [
    {
      name: 'device',
      label: 'Device Type',
      type: 'string',
      options: ['laptop', 'phone', 'dual-phone'],
    },
    {
      name: 'image',
      label: 'Screenshot',
      type: 'image',
    },
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'string',
    },
    {
      name: 'caption',
      label: 'Caption (optional)',
      type: 'string',
    },
    {
      name: 'scrollable',
      label: 'Scrollable Content',
      type: 'boolean',
      description: 'Enable for full-page screenshots',
    },
  ],
}
```

---

## CSS Variables

Customize mockup appearance via CSS variables:

```css
:root {
  --mockup-laptop-bg: theme('colors.gray.800');
  --mockup-laptop-base: theme('colors.gray.700');
  --mockup-phone-frame: theme('colors.gray.900');
  --mockup-screen-radius: 0.125rem;
  --mockup-viewport-height: 400px;
}
```

---

## Responsive Behavior

| Element | Mobile | Desktop |
|---------|--------|---------|
| Laptop Mockup | Full width, smaller frame | Max-width 4xl |
| Phone Mockup | Centered, smaller | Original size |
| Dual Phones | Stacked vertically | Side-by-side |
| Scrollable viewport | Fixed height 300px | Fixed height 400px |

---

## Accessibility

- Always provide meaningful `alt` text
- Use `caption` for additional context
- Scrollable areas have visible scrollbars
- Screenshots should have sufficient contrast

---

## Related Components

- [Blog Post](../blog-post/README.md) - Uses mockups in content
- [Portfolio](../portfolio/README.md) - Showcases work with mockups
- [Image Styles](../image-styles/README.md) - Other image presentation options
