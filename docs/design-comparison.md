# Design Comparison: Live vs Local

## Summary

The local Astro build has a **completely different design system** from the live Squarespace site. This is not just CSS differences - it's a fundamentally different visual approach.

---

## Key Design Differences

### 1. Hero Section Treatment

| Aspect | Live Site | Local Site |
|--------|-----------|------------|
| Background | Light beige/cream (#f5f0eb) | Dark green (#1a3a2f) |
| Headline Style | Inline bold highlights (`**word**`) | Large decorative serif (Playfair Display) |
| Hero Images | Product mockups, 3D graphics | None or minimal |
| CTAs | Two-tone (green + outline) | Single orange button |

### 2. Typography

| Aspect | Live Site | Local Site |
|--------|-----------|------------|
| Headlines | Sans-serif with inline bold styling | Decorative serif (Playfair Display) |
| Body | Clean sans-serif | Similar sans-serif |
| Highlight Style | Bold inline words | Colored text |

### 3. Color Palette

**Live Site:**
- Primary: Dark green (#1a3a2f)
- Background: Beige/cream (#f5f0eb)
- Accent: Orange (#e86c3a)
- CTAs: Green filled + beige outline

**Local Site:**
- Primary: Dark green (#1a3a2f) - used as hero background
- Background: Beige (#f5f0eb) - body sections
- Accent: Orange (#e86c3a)
- CTAs: Orange filled only

### 4. Layout Patterns

**Live Site:**
- Horizontal hero layouts with image on right
- Product mockups prominently displayed
- Compact, image-heavy design
- Strikethrough/highlight text effects

**Local Site:**
- Full-width dark hero sections
- Text-focused heroes without product images
- More vertical spacing
- Decorative headings with ampersands

---

## Page-by-Page Comparison

### Homepage

**Live:**
- "Wir **entwickeln**. was Euch **einzig artig** macht."
- Climber image on right
- Video consult button + secondary CTA

**Local:**
- "Wir ... was Euch macht." (missing styled words!)
- Same climber image
- Different button styling

**Issues:** Hero text is broken - bold words not rendering

---

### Services

**Live:**
- "Neue Homepage erstellen lassen für Schweizer KMU"
- Laptop mockups displayed
- Service cards with product screenshots

**Local:**
- "Unsere Services" (decorative serif)
- Icon-based service cards
- No product images

**Issues:** Completely different page design

---

### Squarespace Agentur

**Live:**
- "Die **besten** digitale Lösung für Eure **neue** Homepage"
- 3D stacked boxes graphic
- Beige background

**Local:**
- "Professionelle Schweizer Squarespace Webdesign Agentur"
- Dark green hero
- No graphics

**Issues:** Different headline, no hero graphics

---

### Projekte

**Live:**
- "Erfolgreiche ~~Website-Projekte~~ für Schweizer Unternehmen"
- Laptop mockups
- Two CTAs

**Local:**
- "Vom strategischen Konzept zur digitalen Exzellenz"
- Dark hero with Google rating badge
- Different content structure

**Issues:** Completely different headline and structure

---

### Über Uns

**Live:**
- "Für digitalen **Erfolg** mit **Verantwortung**."
- Light background
- Two buttons

**Local:**
- "Schweizer Webdesign & Marketing Agentur"
- Dark green hero
- Single button

**Issues:** Different headline and visual treatment

---

### Kontakt

**Live:**
- "Eine grossartige **Idee** beginnt mit einem Gespräch"
- Contact form visible
- Profile photo

**Local:**
- "Kontakt mit KMU Webseiten und Squarespace Experten"
- Dark hero
- Form below fold

**Issues:** Different headline, form placement

---

## Root Cause Analysis

The local site appears to use a **different design system** that was either:
1. A redesign that diverged from the original
2. An interpretation that didn't match the source
3. Missing assets/content from the original

### Critical Missing Elements:
1. **Inline bold text rendering** - The `**word**` syntax isn't being rendered as styled text
2. **Hero mockup images** - Product screenshots in hero sections
3. **Light hero backgrounds** - Using dark green instead of beige
4. **Dual CTA buttons** - Missing secondary outline buttons
5. **3D graphics** - Decorative illustrations

---

## Fixes Applied

### ✅ Priority 1: Fix Hero Text Rendering (DONE)
Updated Hero.astro to render bold text with orange highlight underline:
- Removed gradient text effect that was hiding highlights
- Added `background: linear-gradient(to top, orange 30%, transparent 30%)` for bold words
- Bold text now shows with subtle orange underline, matching live site

### Remaining Issues (Content Architecture)

The following differences are due to **content/structure** differences, not just CSS:

### Priority 2: Services Page Structure
- **Live**: Shows "Neue Homepage erstellen lassen" with laptop mockups
- **Local**: Shows "Unsere Services" overview with icon cards
- **Fix required**: Content restructure or page redirection

### Priority 3: Page Headlines
Many pages have different headline text between live and local:
- Live projekte: "Erfolgreiche Website-Projekte"
- Local projekte: "Vom strategischen Konzept zur digitalen Exzellenz"
- **Fix required**: Update JSON content files

### Priority 4: Product Mockup Images
Live site has laptop/screen mockups in hero sections that local site is missing.
- **Fix required**: Add image assets and update hero sections

### Priority 5: CTA Button Variants
Live site has two-button CTAs (primary + outline), local has single buttons.
- **Fix required**: Update CTA arrays in JSON content

---

## Screenshots Location

- Live site: `screenshots/live/`
- Local site: `screenshots/local/`

Each page has `-desktop-viewport.png` (above fold) and `-desktop-full.png` (full page).
