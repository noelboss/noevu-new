# New Component Usage Examples

This document shows how to use the three newly created HIGH PRIORITY components in your JSON content files.

## 1. TeamGridSection

**File:** `/src/components/sections/TeamGridSection.astro`
**Schema:** Lines 253-272 in `/src/schemas/sections.ts`

### Features:
- Responsive grid layouts (2, 3, or 4 columns)
- Team member cards with photos, names, roles, and bios
- LinkedIn and email contact links
- Mobile-first design (1 col → 2 cols → 3-4 cols)
- Hover effects on cards

### JSON Example:
```json
{
  "type": "teamGrid",
  "theme": "white",
  "title": "Unser Team",
  "subtitle": "Lernen Sie die Menschen hinter NOEVU kennen",
  "layout": "3-column",
  "members": [
    {
      "name": "Max Mustermann",
      "role": "Webdesigner",
      "image": {
        "src": "https://images.squarespace-cdn.com/...",
        "alt": "Portrait von Max Mustermann"
      },
      "bio": "<p>Max hat über 10 Jahre Erfahrung im Webdesign und liebt moderne, minimalistische Designs.</p>",
      "linkedin": "https://linkedin.com/in/max-mustermann",
      "email": "max@noevu.ch"
    }
  ]
}
```

### Layout Options:
- `"2-column"` - 2 columns on desktop
- `"3-column"` - 3 columns on desktop
- `"4-column"` - 4 columns on desktop (default)

---

## 2. BentoGridSection

**File:** `/src/components/sections/BentoGridSection.astro`
**Schema:** Lines 274-294 in `/src/schemas/sections.ts`

### Features:
- Modern bento-box style asymmetric grid
- Material Icons support (e.g., 'web_traffic', 'ads_click')
- Emoji icon support as alternative
- Variable card sizes (small, medium, large)
- Visual hierarchy through sizing
- Hover animations with gradient borders

### JSON Example:
```json
{
  "type": "bentoGrid",
  "theme": "white",
  "title": "Unsere Dienstleistungen",
  "subtitle": "Alles aus einer Hand",
  "columns": "3",
  "items": [
    {
      "icon": "web_traffic",
      "iconDisplay": "icon",
      "title": "SEO Optimierung",
      "subtitle": "Mehr Sichtbarkeit",
      "description": "<p>Verbessern Sie Ihre Rankings in Google und gewinnen Sie mehr organischen Traffic.</p>",
      "size": "large"
    },
    {
      "icon": "🎨",
      "iconDisplay": "emoji",
      "title": "Design",
      "description": "<p>Modernes, nutzerfreundliches Design.</p>",
      "size": "small"
    },
    {
      "icon": "speed",
      "iconDisplay": "icon",
      "title": "Performance",
      "description": "<p>Schnelle Ladezeiten für bessere Nutzererfahrung.</p>",
      "size": "medium"
    }
  ]
}
```

### Size Options:
- `"small"` - 1 column span, standard height
- `"medium"` - 2 column span on tablet+
- `"large"` - 2×2 grid area on tablet+ (hero feature)

### Icon Display Options:
- `"icon"` - Use Material Icons (must provide icon name)
- `"emoji"` - Display emoji character
- `"none"` - No icon

---

## 3. ImageTextAlternatingSection

**File:** `/src/components/sections/ImageTextAlternatingSection.astro`
**Schema:** Lines 296-315 in `/src/schemas/sections.ts`

### Features:
- Full-width alternating image/text sections
- Auto-alternating or manual image positioning
- Eyebrow text support (small text above title)
- Rich text descriptions with lists and formatting
- Optional CTA buttons
- Responsive layout (stacks on mobile)

### JSON Example:
```json
{
  "type": "imageTextAlternating",
  "theme": "white",
  "title": "Unser Prozess",
  "subtitle": "So arbeiten wir",
  "items": [
    {
      "eyebrow": "Schritt 1",
      "title": "Strategische Planung",
      "description": "<p>Wir beginnen mit einer gründlichen Analyse Ihrer Anforderungen und Ziele.</p><ul><li>Zieldefinition</li><li>Zielgruppenanalyse</li><li>Wettbewerbsanalyse</li></ul>",
      "image": {
        "src": "https://images.squarespace-cdn.com/...",
        "alt": "Team bei der Planung",
        "width": 800,
        "height": 600
      },
      "imagePosition": "left",
      "cta": {
        "label": "Mehr erfahren",
        "href": "/services/beratung",
        "variant": "primary",
        "external": false
      }
    },
    {
      "eyebrow": "Schritt 2",
      "title": "Design & Entwicklung",
      "description": "<p>Unser Team entwickelt Ihre Website mit modernsten Technologien.</p>",
      "image": {
        "src": "https://images.squarespace-cdn.com/...",
        "alt": "Designer bei der Arbeit"
      },
      "imagePosition": "auto"
    }
  ]
}
```

### Image Position Options:
- `"auto"` - Automatically alternates (left, right, left, right...)
- `"left"` - Image always on left
- `"right"` - Image always on right

### CTA Variants:
- `"primary"` - Orange button with hover effect
- `"secondary"` - Outlined button
- `"text"` - Text link with arrow

---

## Theme System

All components support the 10-variant theme system:

```json
{
  "theme": "dark"        // Dark background, light text
  "theme": "white"       // White background (most common)
  "theme": "white-bold"  // White with bold elements
  "theme": "bright"      // Orange accent sections
  "theme": "light"       // Light beige background
}
```

---

## Component Registration

These components are automatically available in all pages via the `SectionRenderer`:

**File:** `/src/components/SectionRenderer.astro`

```typescript
const sectionComponents: Record<string, any> = {
  // ... existing components
  teamGrid: TeamGridSection,
  bentoGrid: BentoGridSection,
  imageTextAlternating: ImageTextAlternatingSection,
};
```

No additional imports needed - just add the JSON to your page content!

---

## Material Icons Reference

For BentoGrid icons, use Material Symbols icon names:

- `web_traffic` - Traffic/analytics
- `ads_click` - Click/interaction
- `speed` - Performance
- `shopping_cart` - E-commerce
- `support_agent` - Support/help
- `analytics` - Data/insights
- `security` - Security
- `devices` - Responsive design
- `palette` - Design/creativity
- `code` - Development

Full icon list: https://fonts.google.com/icons

---

## Build & Validation

After adding these components to your JSON:

```bash
# Validate content
npm run validate

# Build site
npm run build

# Dev server
npm run dev
```

All three components have been tested and are production-ready!
