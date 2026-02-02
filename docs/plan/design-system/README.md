# Design System

Design tokens extracted from Squarespace CSS for migration to Tailwind CSS.

## Color Palette

### Core HSL Variables

The site uses HSL color format for theming flexibility.

| Token | HSL Value | Hex Equivalent | Usage |
|-------|-----------|----------------|-------|
| `--darkAccent-hsl` | `167.21, 46.56%, 25.69%` | `#255a4e` | Primary brand green |
| `--lightAccent-hsl` | `31.11, 55.1%, 90.39%` | `#f5e6d3` | Beige backgrounds |
| `--black-hsl` | `24, 10.2%, 19.22%` | `#372f2c` | Dark brown text |
| `--white-hsl` | `17.1, 100%, 59.41%` | `#ff6b30` | Orange accent |
| `--accent-hsl` | `0, 0%, 100%` | `#ffffff` | White |

### Semantic Color Mappings

```css
/* Safe contrast colors */
--safeLightAccent-hsl: 0, 0%, 100%      /* Pure white for contrast */
--safeDarkAccent-hsl: 0, 0%, 0%          /* Pure black for contrast */
--safeInverseAccent-hsl: 0, 0%, 0%       /* Inverse text */
--safeInverseDarkAccent-hsl: 0, 0%, 100% /* Inverse on dark */
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
const colors = {
  brand: {
    green: {
      DEFAULT: 'hsl(167, 47%, 26%)',  // #255a4e
      light: 'hsl(167, 18%, 46%)',     // Bright green variant
    },
    orange: {
      DEFAULT: 'hsl(17, 100%, 59%)',  // #ff6b30
      bright: 'hsl(17, 100%, 59%)',
    },
    beige: {
      DEFAULT: 'hsl(31, 55%, 90%)',   // #f5e6d3
      light: 'hsl(31, 55%, 95%)',
    },
    brown: {
      DEFAULT: 'hsl(24, 10%, 19%)',   // #372f2c - dark text
      light: 'hsl(24, 10%, 40%)',
    },
  },
};
```

---

## Typography

### Font Families

| Token | Font | Usage |
|-------|------|-------|
| `--heading-font-font-family` | "Abril Fatface" | Headings (H1-H4) |
| `--body-font-font-family` | "Heebo" | Body text, paragraphs |
| `--meta-font-font-family` | "Heebo" | Metadata, captions |

### Heading Font Properties

```css
--heading-font-font-style: normal
--heading-font-font-weight: 400
--heading-font-text-transform: none
--heading-font-letter-spacing: 0em
--heading-font-line-height: 1.5em
```

### Body Font Properties

```css
--body-font-font-style: normal
--body-font-font-weight: 400
--body-font-text-transform: none
--body-font-letter-spacing: 0em
--body-font-line-height: 1.75em
```

### Meta Font Properties

```css
--meta-font-font-style: normal
--meta-font-font-weight: 400
--meta-font-text-transform: none
--meta-font-letter-spacing: 0em
--meta-font-line-height: 1.5em
```

### Base Font Size

```css
--base-font-size: 16px
```

### Tailwind Font Configuration

```typescript
// tailwind.config.ts
const fontFamily = {
  heading: ['"Abril Fatface"', 'serif'],
  body: ['"Heebo"', 'sans-serif'],
  meta: ['"Heebo"', 'sans-serif'],
};

const fontSize = {
  // Base scale using rem
  xs: ['0.75rem', { lineHeight: '1.5' }],
  sm: ['0.875rem', { lineHeight: '1.5' }],
  base: ['1rem', { lineHeight: '1.75' }],
  lg: ['1.125rem', { lineHeight: '1.75' }],
  xl: ['1.25rem', { lineHeight: '1.5' }],
  '2xl': ['1.5rem', { lineHeight: '1.5' }],
  '3xl': ['2rem', { lineHeight: '1.5' }],
  '4xl': ['2.5rem', { lineHeight: '1.2' }],
  '5xl': ['3rem', { lineHeight: '1.2' }],
  '6xl': ['4rem', { lineHeight: '1.1' }],
};
```

### Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Heebo:wght@400;500;600;700&display=swap');
```

---

## Buttons

### Primary Button

```css
--primary-button-font-font-family: "Heebo"
--primary-button-font-font-weight: 600
--primary-button-font-text-transform: uppercase
--primary-button-font-letter-spacing: 0em
--primary-button-font-line-height: 1.2em
--primary-button-font-font-size: 1rem

/* Border Radius - Pill shape */
--primary-button-rounded-border-top-left-radius: 300px
--primary-button-rounded-border-top-right-radius: 300px
--primary-button-rounded-border-bottom-left-radius: 300px
--primary-button-rounded-border-bottom-right-radius: 300px

/* Padding */
--primary-button-padding-x: 1.5em
--primary-button-padding-y: 0.75em

/* Stroke */
--primary-button-stroke: 0px
```

### Secondary Button

```css
--secondary-button-font-font-family: "Heebo"
--secondary-button-font-font-weight: 600
--secondary-button-font-text-transform: uppercase
--secondary-button-font-letter-spacing: 0em
--secondary-button-font-line-height: 1.2em
--secondary-button-font-font-size: 1rem

/* Border Radius - Pill shape */
--secondary-button-rounded-border-top-left-radius: 300px
--secondary-button-rounded-border-top-right-radius: 300px
--secondary-button-rounded-border-bottom-left-radius: 300px
--secondary-button-rounded-border-bottom-right-radius: 300px

/* Padding */
--secondary-button-padding-x: 1.5em
--secondary-button-padding-y: 0.75em

/* Stroke */
--secondary-button-stroke: 0px
```

### Tertiary Button

```css
--tertiary-button-font-font-family: "Heebo"
--tertiary-button-font-font-weight: 600
--tertiary-button-font-text-transform: uppercase
--tertiary-button-font-line-height: 1.2em
--tertiary-button-font-font-size: 1rem

/* Border Radius - Rounded corners (not pill) */
--tertiary-button-rounded-border-top-left-radius: 5px
--tertiary-button-rounded-border-top-right-radius: 5px
--tertiary-button-rounded-border-bottom-left-radius: 5px
--tertiary-button-rounded-border-bottom-right-radius: 5px
```

### Tailwind Button Classes

```typescript
// Component classes (use @apply in CSS or direct classes)

// Primary Button (Orange background, white text, pill shape)
const primaryButton = `
  px-6 py-3
  bg-brand-orange text-white
  font-body font-semibold uppercase
  rounded-full
  hover:bg-brand-orange/90
  transition-colors
`;

// Secondary Button (Green background, white text, pill shape)
const secondaryButton = `
  px-6 py-3
  bg-brand-green text-white
  font-body font-semibold uppercase
  rounded-full
  hover:bg-brand-green/90
  transition-colors
`;

// Tertiary Button (Dark background, white text, rounded corners)
const tertiaryButton = `
  px-6 py-3
  bg-brand-brown text-white
  font-body font-semibold uppercase
  rounded-md
  hover:bg-brand-brown/90
  transition-colors
`;

// Outline Button
const outlineButton = `
  px-6 py-3
  border-2 border-brand-green text-brand-green
  font-body font-semibold uppercase
  rounded-full
  hover:bg-brand-green hover:text-white
  transition-colors
`;
```

---

## Spacing

### Section Padding

Based on component analysis, sections use consistent vertical padding:

| Breakpoint | Vertical Padding |
|------------|------------------|
| Mobile | `py-12` (3rem) |
| Tablet | `py-16` (4rem) |
| Desktop | `py-20` to `py-24` (5-6rem) |

### Container

```typescript
// Container max-width and padding
const container = {
  center: true,
  padding: {
    DEFAULT: '1rem',
    sm: '1.5rem',
    lg: '2rem',
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px', // Max content width
  },
};
```

---

## Border Radius

| Usage | Value | Tailwind Class |
|-------|-------|----------------|
| Buttons (pill) | `300px` | `rounded-full` |
| Cards | `10px` | `rounded-xl` |
| Small elements | `5px` | `rounded-md` |
| Images | `10px` | `rounded-xl` |

---

## Shadows

### Card Shadow

```css
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
```

### Elevated Shadow

```css
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
```

### Tailwind Shadow Configuration

```typescript
const boxShadow = {
  card: '0 4px 20px rgba(0, 0, 0, 0.08)',
  elevated: '0 8px 30px rgba(0, 0, 0, 0.12)',
  glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
};
```

---

## Section Themes

The site uses data attributes for section theming:

| Theme | Background | Text | Usage |
|-------|------------|------|-------|
| `white` | White | Dark | Default light sections |
| `light` | Beige | Dark | Warm background sections |
| `dark` | Green | Light | Primary accent sections |
| `black` | Dark brown | Light | Footer, contrast sections |
| `bright` | Orange | Light | CTA sections |
| `bright-inverse` | Orange | Dark | Alternative CTA |

### Tailwind Theme Classes

```css
/* Section Theme Variants */
.section-white {
  @apply bg-white text-brand-brown;
}

.section-light {
  @apply bg-brand-beige text-brand-brown;
}

.section-dark {
  @apply bg-brand-green text-white;
}

.section-black {
  @apply bg-brand-brown text-white;
}

.section-bright {
  @apply bg-brand-orange text-white;
}
```

---

## Glass Effect (New Mobile Menu)

For the new liquid glass mobile menu design:

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-dark {
  background: rgba(37, 90, 78, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Tailwind Glass Utilities

```typescript
// Add to tailwind.config.ts
const backdropBlur = {
  glass: '20px',
};

// Custom utility classes
'.glass': {
  '@apply bg-white/70 backdrop-blur-glass border border-white/20': {},
},
'.glass-dark': {
  '@apply bg-brand-green/80 backdrop-blur-glass border border-white/10': {},
},
```

---

## Complete Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: 'hsl(167, 47%, 26%)',
            light: 'hsl(167, 18%, 46%)',
          },
          orange: {
            DEFAULT: 'hsl(17, 100%, 59%)',
          },
          beige: {
            DEFAULT: 'hsl(31, 55%, 90%)',
            light: 'hsl(31, 55%, 95%)',
          },
          brown: {
            DEFAULT: 'hsl(24, 10%, 19%)',
            light: 'hsl(24, 10%, 40%)',
          },
        },
      },
      fontFamily: {
        heading: ['"Abril Fatface"', 'serif'],
        body: ['"Heebo"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.08)',
        elevated: '0 8px 30px rgba(0, 0, 0, 0.12)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## Icons

### Icon System: Material Symbols Outlined

The site uses Google's **Material Symbols Outlined** icon font.

**Import URL:**
```css
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
```

### Usage Patterns

| Pattern | Example | Description |
|---------|---------|-------------|
| Class-based | `<span class="material-icon">check</span>` | Icon name as text content |
| Data attribute | `<span data-material-icon="phone"></span>` | Uses `:after` pseudo-element |
| List items | Automatic | `check` icon added before `<li>` items |

### Icons Used on the Site

| Icon Name | Usage |
|-----------|-------|
| `check` | List item bullets (orange) |
| `web_traffic` | Analytics/traffic features |
| `ads_click` | Marketing/advertising |
| `mobile_layout` | Responsive design |
| `phone` | Contact/phone features |
| `add_shopping_cart` | E-commerce |
| `3p` | Third-party integrations |
| `data_loss_prevention` | Security/data protection |
| `arrow_forward` | Links, buttons |
| `arrow_back` | Navigation |
| `close` | Modal close buttons |
| `menu` | Mobile menu |

### Tailwind Integration

```typescript
// Icon component helper
const materialIcon = `
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
`;
```

### Astro Icon Component

```astro
---
// components/Icon.astro
interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}

const { name, size = 'md', class: className } = Astro.props;

const sizes = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
};
---

<span 
  class:list={[
    'material-symbols-outlined',
    sizes[size],
    className
  ]}
>
  {name}
</span>

<style>
  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
  }
</style>
```

---

## Dark Theme

The site supports a dark theme variant, primarily used for AI/technology-related content pages. The dark theme inverts the color scheme while maintaining brand identity.

### Screenshot

![Dark Theme Example](./xx%20Dark%20Version.png)

### Color Mappings

| Element | Light Theme | Dark Theme |
|---------|-------------|------------|
| Background | White / Beige | Dark brown / Near-black |
| Primary text | Dark brown | White / Light beige |
| Headings | Brand green | Light green or white |
| Accent | Brand orange | Brand orange (unchanged) |
| Cards | White | Dark gray with subtle border |
| Borders | Beige | Dark gray |

### Implementation

Dark theme is applied via a `data-theme="dark"` attribute on the section or page level:

```html
<section data-theme="dark">
  <!-- Content uses dark theme colors -->
</section>
```

### CSS Custom Properties

```css
[data-theme="dark"] {
  --bg-primary: hsl(24, 10%, 12%);      /* Near-black */
  --bg-secondary: hsl(24, 10%, 16%);    /* Dark gray */
  --bg-card: hsl(24, 10%, 18%);         /* Card background */
  
  --text-primary: hsl(0, 0%, 95%);      /* White text */
  --text-secondary: hsl(0, 0%, 70%);    /* Muted text */
  --text-heading: hsl(167, 30%, 70%);   /* Light green headings */
  
  --border-color: hsl(24, 10%, 25%);    /* Subtle borders */
  --accent: hsl(17, 100%, 59%);         /* Orange (unchanged) */
}
```

### Tailwind Dark Theme Classes

```css
/* Section with dark theme */
.section-theme-dark {
  @apply bg-[hsl(24,10%,12%)] text-white;
}

.section-theme-dark h1,
.section-theme-dark h2,
.section-theme-dark h3 {
  @apply text-brand-green-light;
}

.section-theme-dark .card {
  @apply bg-[hsl(24,10%,18%)] border border-white/10;
}
```

### Use Cases

1. **AI/Technology pages** - Creates a modern, tech-focused aesthetic
2. **Evening/night mode** - Can be user-toggled for preference
3. **Feature highlights** - Dark sections for visual contrast
4. **Code blocks** - Natural fit for syntax highlighting

### Accessibility

- Maintain WCAG AA contrast ratios (4.5:1 for body text)
- Orange accent remains unchanged for recognizability
- Reduce pure white (#fff) to off-white to reduce eye strain
- Test all interactive states (hover, focus) for visibility

---

## Source Files

Design tokens extracted from:
- `_reference/static1.squarespace.com/static/versioned-site-css/.../site.css`
- `_reference/src/mixins.less` (original LESS variables)
- `_reference/src/components/material-icons/material-icons.less` (icon system)
