# Component Documentation

This directory contains documentation for all UI components used on noevu.ch.

## Component Overview

### Layout Components
| Component | Priority | Status | Description |
|-----------|----------|--------|-------------|
| [top-bar/](./top-bar/) | MVP | Documented | Announcement bar above header |
| [navigation/](./navigation/) | MVP | Documented | Header with nav + mobile menu |
| [hero/](./hero/) | MVP | Documented | Hero sections with backgrounds |
| [sections/](./sections/) | MVP | Documented | Page section wrapper system |
| [footer/](./footer/) | MVP | Documented | Site footer |

### Content Sections
| Component | Priority | Status | Description |
|-----------|----------|--------|-------------|
| [feature-list/](./feature-list/) | MVP | Documented | SEO intro with checkmarks + social proof |
| [features/](./features/) | MVP | Documented | Key features grid |
| [bento-grid/](./bento-grid/) | MVP | Documented | Mixed-size feature cards grid |
| [cards/](./cards/) | MVP | Documented | Card layouts (grid, 3D effect) |
| [cta/](./cta/) | MVP | Documented | Call-to-action sections |
| [testimonials/](./testimonials/) | MVP | Documented | Customer testimonials |
| [comparison-table/](./comparison-table/) | Later | Documented | Feature comparison tables |
| [horizontal-scroll/](./horizontal-scroll/) | Later | Documented | Scroll-triggered animations |
| [timeline/](./timeline/) | Later | Documented | Scrollable process timeline |

### Interactive Components
| Component | Priority | Status | Description |
|-----------|----------|--------|-------------|
| [accordion/](./accordion/) | MVP | Documented | FAQ accordion with JSON-LD |
| [language-switcher/](./language-switcher/) | MVP | Pending | DE/EN toggle |
| [filter/](./filter/) | MVP | Pending | Blog/portfolio filtering |
| [swiper/](./swiper/) | Later | Pending | Carousel/slider |
| [cookie-banner/](./cookie-banner/) | MVP | Documented | Cookie consent overlay |

### Blog Components
| Component | Priority | Status | Description |
|-----------|----------|--------|-------------|
| [blog-list/](./blog-list/) | MVP | Documented | Blog cards with swiper |
| [blog-post/](./blog-post/) | Later | Pending | Blog post template |
| [device-mockups/](./device-mockups/) | Later | Pending | iPhone/laptop mockups |

### Other Components
| Component | Priority | Status | Description |
|-----------|----------|--------|-------------|
| [logo-slider/](./logo-slider/) | Later | Documented | Client logos carousel |
| [social-proof/](./social-proof/) | MVP | Pending | Rating widget with faces |
| [quote-block/](./quote-block/) | MVP | Pending | Testimonial quotes |
| [buttons/](./buttons/) | MVP | Pending | Button variants |
| [forms/](./forms/) | MVP | Pending | Contact forms |

## Documentation Status

| Status | Count | Components |
|--------|-------|------------|
| Documented | 17 | Ready for implementation |
| Pending | 8 | Need documentation |

## Component Documentation Template

Each component README includes:
- **Screenshot** - Visual reference
- **Purpose** - What problem it solves
- **Structure** - ASCII diagram of layout
- **Design Details** - Colors, spacing, typography
- **Tailwind Implementation** - Ready-to-use Astro code
- **Props** - TypeScript interface
- **Variants** - Different configurations
- **Usage Context** - Where to use it

## Screenshots Location

Each component folder contains:
- Manual screenshots from the live site
- Referenced in the README.md

## Component Sources

1. **Squarespace Native** - Built into Squarespace, visible in HTML exports
   - Location: `_reference/html/*.html`
   
2. **Custom LESS/JS** - Custom additions on top of Squarespace
   - Location: `_reference/src/components/`

## Design System Reference

See [../design-system/README.md](../design-system/README.md) for:
- Color palette
- Typography (Abril Fatface, Heebo)
- Button styles
- Icon system (Material Symbols Outlined)
- Spacing and shadows
