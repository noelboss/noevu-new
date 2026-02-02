# Page Sections Component

## Overview

The site uses a section-based page structure where each page is composed of multiple `<section>` elements. Each section has:
- Theme (colors)
- Layout type
- Background options
- Content alignment
- Optional dividers

## Section Screenshots (Homepage)

| # | Theme | Type | Screenshot |
|---|-------|------|------------|
| 0 | white | Hero with background image | ![](../../screenshots/sections/00-white-686f2d27.png) |
| 1 | white-bold | User items list (cards) | ![](../../screenshots/sections/01-white-bold-686f2d27.png) |
| 2 | bright | Gallery section | ![](../../screenshots/sections/02-bright-6903a38b.png) |
| 3 | bright-inverse | Layout engine | ![](../../screenshots/sections/03-bright-inverse-686f2d27.png) |
| 4 | bright-inverse | User items list | ![](../../screenshots/sections/04-bright-inverse-686f2d27.png) |
| 5 | light | Layout engine | ![](../../screenshots/sections/05-light-686f2d27.png) |
| 6 | white-bold | User items list | ![](../../screenshots/sections/06-white-bold-686f2d27.png) |
| 7 | white | Layout engine + divider | ![](../../screenshots/sections/07-white-6877e3b8.png) |
| 8 | dark | Layout engine | ![](../../screenshots/sections/08-dark-686f2d27.png) |
| 9-12 | dark | Horizontal scroll sections | ![](../../screenshots/sections/09-dark-686f2d27.png) |
| 13 | dark | Layout engine + divider | ![](../../screenshots/sections/13-dark-686f2d27.png) |
| 14 | light-bold | Layout engine + divider | ![](../../screenshots/sections/14-light-bold-686f2d27.png) |
| 15 | dark | Layout engine | ![](../../screenshots/sections/15-dark-686f2d27.png) |
| 16 | bright | Layout engine (inset) | ![](../../screenshots/sections/16-bright-6877f7c8.png) |
| 17 | dark | Footer section | ![](../../screenshots/sections/17-dark-67fe953a.png) |

## Theme Variants

| Theme | Description | Usage |
|-------|-------------|-------|
| `white` | Clean white background | Hero, content sections |
| `white-bold` | White with bolder typography | Feature cards |
| `bright` | Light accent background | Highlights, CTAs |
| `bright-inverse` | Inverted bright colors | Emphasis sections |
| `light` | Subtle light background | Alternating sections |
| `light-bold` | Light with bold styling | FAQ sections |
| `dark` | Dark background | Footer, contrast sections |

## Section Types

### 1. Layout Engine Section
Fluid grid-based layout with flexible positioning.

```html
<section class="page-section layout-engine-section">
  <div data-fluid-engine="true">
    <div class="fluid-engine fe-[ID]">
      <!-- Grid-positioned blocks -->
    </div>
  </div>
</section>
```

### 2. User Items List Section
Card/list-based layout for repeating items.

```html
<section class="page-section user-items-list-section">
  <div class="user-items-list-simple">
    <div class="list-item">...</div>
    <div class="list-item">...</div>
  </div>
</section>
```

### 3. Gallery Section
Image gallery with grid or masonry layout.

```html
<section class="page-section gallery-section">
  <div class="sqs-gallery-container">
    <!-- Gallery items -->
  </div>
</section>
```

### 4. Horizontal Scroll Section
Side-scrolling content panels.

```html
<section class="page-section horizontal-scroll-section">
  <!-- Scrollable panels -->
</section>
```

## HTML Structure

```html
<section 
  data-test="page-section"
  data-section-id="[UNIQUE_ID]"
  data-section-theme="[THEME]"
  class="page-section [MODIFIERS]"
  data-controller="SectionWrapperController">
  
  <!-- Background Layer -->
  <div class="section-border">
    <div class="section-background">
      <div class="section-background-content">
        <!-- Background image/color/gradient -->
      </div>
      <div class="section-background-overlay"></div>
    </div>
  </div>
  
  <!-- Content Layer -->
  <div class="content-wrapper">
    <div class="content">
      <!-- Section content -->
    </div>
  </div>
  
  <!-- Optional Divider -->
  <div class="section-divider-display">
    <svg class="section-divider-svg-clip">...</svg>
  </div>
</section>
```

## Modifier Classes

### Background Width
- `background-width--full-bleed` - Full viewport width
- `background-width--inset` - Contained width

### Section Height
- `section-height--small`
- `section-height--medium`
- `section-height--custom`

### Content Width
- `content-width--wide` - Maximum width
- `content-width--inset` - Narrower

### Alignment
- `horizontal-alignment--left`
- `horizontal-alignment--center`
- `vertical-alignment--top`
- `vertical-alignment--middle`
- `vertical-alignment--bottom`

### Special
- `has-section-divider` - Has decorative divider
- `has-background` - Has background image
- `full-bleed-section` - Full width layout

## Background Options

### Solid Color
Default section background using theme colors.

### Image Background
```html
<div class="section-background-content" 
  data-controller="BackgroundImageFXParallax">
  <img data-image-focal-point="0.5,0.5" 
    class="background-image-fx" 
    src="...">
  <div class="section-background-canvas background-fx-canvas"></div>
</div>
```

### Gradient Backgrounds
From `sections.less` - gradient sections using section IDs:

| Gradient Type | ID Pattern | Colors |
|---------------|------------|--------|
| Green Down | `gradient-down-green` | `#235f52` → `#141110` |
| Green Up | `gradient-up-green` | `#141110` → `#235f52` |
| Dark Down | `gradient-down-dark` | `#0b201c` → `#141110` |
| Dark Up | `gradient-up-dark` | `#141110` → `#0b201c` |
| White to Beige | `.white` class | `white` → `beige` |
| Beige to White | `.white-bold` class | `beige` → `white` |

```css
/* Example gradient section */
section[id*="gradient-down-green"] .section-background {
  background: linear-gradient(0deg, #141110 0%, #235f52 100%);
}
```

### Inset Background
Sections with `background-width--inset` have rounded corners and shadow:
```css
section.background-width--inset .section-background {
  border-radius: calc(var(--default-border-radius) * 2); /* 20px */
  box-shadow: 0px 0px 15px hsla(green, 0.3), 8px 8px 40px hsla(black, 0.5);
}
```

### Overlay
```html
<div class="section-background-overlay" style="opacity: 0.3;"></div>
```

## Section Dividers & Shapes

Sections can have decorative shapes at their borders to create visual flow between sections.

### Divider Types

| Shape | Direction | Description |
|-------|-----------|-------------|
| **Curved/Rounded** | Up | Rounded edge curves upward into previous section |
| **Curved/Rounded** | Down | Rounded edge curves downward into next section |
| **Triangle/Arrow** | Down | Pointed arrow shape pointing to next section |
| **Wave** | Various | Wavy decorative edge |

### How It Works

Sections with dividers use:
1. `has-section-divider` class on the section
2. SVG clip-path for the curved shape
3. Extra padding to accommodate the shape

```html
<section class="page-section has-section-divider" data-section-theme="dark">
  <!-- Section border with clip-path -->
  <div class="section-border" data-controller="SectionDivider" 
       style="clip-path: url(#section-divider-ID);">
    <div class="section-background">...</div>
  </div>
  
  <!-- SVG definitions for the shape -->
  <div class="section-divider-display">
    <svg class="section-divider-svg-clip">
      <clipPath id="section-divider-ID" clipPathUnits="objectBoundingBox">
        <path class="section-divider-clip" d="M0,0 C0.5,0.1 0.5,0.1 1,0 L1,1 L0,1 Z"></path>
      </clipPath>
    </svg>
    <svg class="section-divider-svg-stroke" viewBox="0 0 1 1" preserveAspectRatio="none">
      <path class="section-divider-stroke" d="M0,0 C0.5,0.1 0.5,0.1 1,0" 
            vector-effect="non-scaling-stroke"></path>
    </svg>
  </div>
</section>
```

### Tailwind Implementation

```css
/* Curved section bottom (curves down) */
.section-curve-down {
  clip-path: ellipse(75% 100% at 50% 0%);
  /* or use SVG clip-path for more control */
}

/* Curved section top (curves up into this section) */
.section-curve-up {
  margin-top: -5vw;
  clip-path: ellipse(75% 100% at 50% 100%);
}

/* Triangle/Arrow pointing down */
.section-arrow-down::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-left: 50vw solid transparent;
  border-right: 50vw solid transparent;
  border-top: 5vw solid currentColor;
}
```

### Example: Rounded Section Transition

```astro
---
// Section with rounded bottom edge curving into next section
---
<section class="relative bg-brand-green text-white py-20">
  <div class="container">
    <!-- Content -->
  </div>
  
  <!-- Curved bottom edge -->
  <div class="absolute bottom-0 left-0 right-0 h-[5vw] overflow-hidden">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" 
         class="absolute bottom-0 w-full h-full">
      <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" 
            fill="currentColor" class="text-brand-beige"/>
    </svg>
  </div>
</section>

<section class="bg-brand-beige py-20 -mt-[5vw]">
  <!-- Next section overlaps the curve -->
</section>
```

## Grid System

### Desktop (768px+)
- 24-column grid
- CSS Grid with `grid-template-columns`
- Blocks positioned via `grid-area`

### Mobile (<768px)
- 8-column grid
- Stacked layout
- Responsive block repositioning

```css
.fluid-engine {
  display: grid;
  grid-template-rows: repeat(N, minmax(24px, auto));
  grid-template-columns: 
    minmax(var(--grid-gutter), 1fr) 
    repeat(8, minmax(0, var(--cell-max-width))) 
    minmax(var(--grid-gutter), 1fr);
}

@media (min-width: 768px) {
  .fluid-engine {
    grid-template-columns: 
      minmax(var(--grid-gutter), 1fr) 
      repeat(24, minmax(0, var(--cell-max-width))) 
      minmax(var(--grid-gutter), 1fr);
  }
}
```

## Tailwind Implementation

### Section Component Props
```typescript
interface SectionProps {
  theme: 'white' | 'white-bold' | 'bright' | 'bright-inverse' | 
         'light' | 'light-bold' | 'dark';
  height?: 'small' | 'medium' | 'custom';
  width?: 'wide' | 'inset';
  align?: 'left' | 'center';
  background?: {
    type: 'color' | 'image' | 'gradient';
    src?: string;
    focalPoint?: { x: number; y: number };
    overlay?: number; // opacity 0-1
    effect?: 'none' | 'parallax';
  };
  divider?: boolean;
}
```

### Theme Classes (Tailwind)
```css
/* Map Squarespace themes to Tailwind */
.theme-white { @apply bg-white text-gray-900; }
.theme-white-bold { @apply bg-white text-gray-900 font-bold; }
.theme-bright { @apply bg-beige-100 text-gray-900; }
.theme-bright-inverse { @apply bg-green-600 text-white; }
.theme-light { @apply bg-gray-50 text-gray-900; }
.theme-light-bold { @apply bg-gray-100 text-gray-900; }
.theme-dark { @apply bg-green-900 text-white; }
```

## Reference Files

- HTML: `_reference/html/index.html`
- Section metadata: `../screenshots/sections/_index.json`
