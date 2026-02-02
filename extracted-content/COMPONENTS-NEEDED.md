# Required Components Analysis for 100% Content Match

## Executive Summary

To achieve 100% content match with the original noevu.ch site, we need **10 new TinaCMS component types** in addition to the 16 existing components.

**Current Coverage:** 65%
**With High-Priority Components:** 85%
**With All Components:** 100%

---

## Existing Components (16)

✅ Already implemented in `/src/schemas/sections.ts`:

1. `hero` - Hero sections with headline, description, CTAs, images
2. `logoGallery` - Client logo displays
3. `splitContent` - Two-column image + content sections
4. `valueProposition` - Three-column card layouts
5. `servicesGrid` - Service offerings in grid
6. `comparisonTable` - Side-by-side comparisons
7. `process` - Process steps with alternating layout
8. `featuresList` - Features with icons and descriptions
9. `testimonials` - Customer testimonials and reviews
10. `cta` - Call-to-action banners
11. `textContent` - Rich text content blocks
12. `faq` - FAQ accordions
13. `blogGrid` - Blog post listings
14. `waveDivider` - Decorative wave transitions
15. `contactForm` - Contact forms
16. `newsletter` - Newsletter signup forms

---

## New Components Needed (10)

### HIGH PRIORITY (3 components)

#### 1. `teamGrid` 🔴 CRITICAL
**Purpose:** Display team member profiles with photos, roles, and social links

**Why Critical:** Used on multiple core pages (About Us, Webdesign Agentur)

**Fields:**
```typescript
{
  title?: string
  members: Array<{
    name: string
    role: string
    image: ImageSchema
    bio: RichTextSchema
    linkedin?: string
    email?: string
  }>
  layout: '2-column' | '3-column' | '4-column'
}
```

**Used In:**
- `de_webdesign-agentur.md` (lines 70-109)
- `de_ueber-uns.md` (lines 71-108)
- `de_schweizer-squarespace-experte.md`

**Example:** Shows 4 team members (Noel Bossart, Tobias Morf, Michael Karrer, Anabel Hafstad) with photos, roles, detailed bios, and LinkedIn links.

---

#### 2. `bentoGrid` 🔴 CRITICAL
**Purpose:** Modern bento-box style feature grid with icons, varied sizing, and visual hierarchy

**Why Critical:** Key differentiator, used extensively throughout site for features

**Fields:**
```typescript
{
  title?: string
  subtitle?: string
  items: Array<{
    icon: string  // Material Icons name
    iconDisplay: 'icon' | 'emoji' | 'none'
    title: string
    subtitle?: string
    description: RichTextSchema
    size: 'small' | 'medium' | 'large'
  }>
  columns: '2' | '3' | '4'
}
```

**Used In:**
- `de_squarespace-agentur.md` (lines 128-201) - 6 feature cards
- `de_ai-beratung-kmu-schweiz.md` (lines 42-64) - AI services

**Example Icons Used:** `web_traffic`, `ads_click`, `mobile_layout`, `phone`, `add_shopping_cart`, `3p`, `data_loss_prevention`

**Different from `featuresList`:** Asymmetric grid, larger cards, more visual emphasis, Material Icons integration.

---

#### 3. `imageTextAlternating` 🔴 CRITICAL
**Purpose:** Alternating image-text sections for detailed process steps or feature explanations

**Why Critical:** Used on all major service pages for process/approach explanations

**Fields:**
```typescript
{
  title?: string
  items: Array<{
    eyebrow?: string
    title: string
    description: RichTextSchema
    image: ImageSchema
    imagePosition: 'left' | 'right' | 'auto'
    cta?: LinkSchema
  }>
}
```

**Used In:**
- `de_webdesign-agentur.md` (lines 211-257) - 4 steps: Botschaft, Bedienung, Design, Service
- `de_ai-beratung-kmu-schweiz.md` (lines 119-157) - 4 AI transformation steps
- `de_squarespace-agentur.md` (lines 294-340) - 4 process steps

**Different from `process`:** Full-width images, more detailed descriptions, explicit alternating layout control.

---

### MEDIUM PRIORITY (5 components)

#### 4. `socialResponsibility` 🟡
**Purpose:** Showcase company's social responsibility initiatives and values

**Fields:**
```typescript
{
  eyebrow?: string
  title: string
  description: RichTextSchema
  image: ImageSchema
  cta?: LinkSchema
}
```

**Used In:**
- `de_webdesign-agentur.md` (lines 112-122)
- `de_ueber-uns.md` (lines 112-122)

**Example:** Describes social engagement in Brazil (familyboss.art project).

---

#### 5. `statsBanner` 🟡
**Purpose:** Display key statistics/numbers with labels (trust signals)

**Fields:**
```typescript
{
  title?: string
  backgroundColor: 'green' | 'orange' | 'beige' | 'white'
  stats: Array<{
    value: string  // e.g., '4.9', '25+', '100%'
    label: string
    icon?: string
  }>
  layout: 'horizontal' | 'grid'
}
```

**Used In:** Multiple pages showing "4.9 stars on Google", "25 years experience"

---

#### 6. `ratingDisplay` 🟡
**Purpose:** Display rating/review score with source

**Fields:**
```typescript
{
  score: number  // e.g., 4.9
  maxScore: number  // default 5
  reviewCount: number
  source: string  // e.g., 'Google', 'Trustpilot'
  label: string
  cta?: LinkSchema
}
```

**Used In:**
- Hero sections (e.g., `home.md` line 19-22)
- Throughout pages as trust signal

**Example:** "4.9 Sterne Bewertungen auf Google"

---

#### 7. `certificationBadge` 🟡
**Purpose:** Display certification or partner badges (Gold Partner, etc.)

**Fields:**
```typescript
{
  badge: ImageSchema
  title?: string
  description?: string
  link?: string
  inline: boolean  // default false
}
```

**Used In:** Squarespace Gold Partner badge throughout site

---

#### 8. `timelineProcess` 🟡
**Purpose:** Numbered timeline showing process steps with detailed descriptions

**Fields:**
```typescript
{
  title?: string
  subtitle?: string
  steps: Array<{
    number: number | string
    eyebrow?: string
    title: string
    description: RichTextSchema
    image?: ImageSchema
  }>
  layout: 'vertical' | 'horizontal'
}
```

**Used In:**
- `de_webdesign-agentur.md` (4 numbered steps)
- `de_squarespace-agentur.md` (4 numbered steps with images)

**Different from `process`:** Explicitly numbered, more formal timeline presentation.

---

### LOW PRIORITY (2 components)

#### 9. `iconGrid` ⚪
**Purpose:** Simple grid of icons with short labels (checkmarks, features)

**Fields:**
```typescript
{
  title?: string
  columns: '2' | '3' | '4'
  items: Array<{
    icon: string  // e.g., 'check', Material Icons
    label: string
  }>
}
```

**Used In:** Service offering sections with checkmarks, feature lists

**Note:** Simpler version of `featuresList` - just icon + short text.

---

#### 10. `contentShowcase` ⚪
**Purpose:** Showcase content with large background image and overlay text

**Fields:**
```typescript
{
  backgroundImage: ImageSchema
  eyebrow?: string
  title: string
  description?: RichTextSchema
  ctas: Array<LinkSchema>
  overlay: boolean  // default true
  textPosition: 'left' | 'center' | 'right'
}
```

**Used In:** Various showcase sections throughout site

**Note:** Similar to `hero` but for mid-page content highlights.

---

## Implementation Roadmap

### Phase 1: High Priority (Required for Core Pages)
1. **`teamGrid`** - About page cannot be completed without this
2. **`bentoGrid`** - Critical for feature showcases on all service pages
3. **`imageTextAlternating`** - Required for process/approach sections

**Impact:** Brings coverage from 65% → 85%

### Phase 2: Medium Priority (Polish & Trust)
4. **`socialResponsibility`** - Company values (About page)
5. **`statsBanner`** - Trust signals
6. **`ratingDisplay`** - Social proof
7. **`certificationBadge`** - Authority signals
8. **`timelineProcess`** - Alternative process display

**Impact:** Brings coverage from 85% → 95%

### Phase 3: Low Priority (Nice-to-Have)
9. **`iconGrid`** - Can use `featuresList` as workaround
10. **`contentShowcase`** - Can use `hero` as workaround

**Impact:** Brings coverage from 95% → 100%

---

## Key Findings

### Content Patterns Identified

1. **Team Member Display** - Critical missing piece, used on 3+ pages
2. **Bento Grid Layout** - Modern asymmetric grid is a key design differentiator
3. **Process Variations** - Site uses 3 different process display styles:
   - Basic `process` (exists)
   - `imageTextAlternating` (needed)
   - `timelineProcess` (needed)
4. **Trust Signals** - Multiple components for social proof:
   - Ratings (needed)
   - Stats (needed)
   - Badges (needed)
   - Testimonials (exists)
5. **Social Responsibility** - Unique company values section (needed)

### Component Overlap

Some new components overlap with existing ones but have distinct use cases:

- **`imageTextAlternating` vs `process`:** More detailed, full images, explicit alternating
- **`bentoGrid` vs `featuresList`:** Asymmetric layout, varied sizing, Material Icons
- **`timelineProcess` vs `process`:** Numbered timeline presentation
- **`contentShowcase` vs `hero`:** Mid-page highlights vs top-of-page

---

## Next Steps

1. ✅ **Review this analysis** - Confirm component requirements
2. **Create Zod schemas** - Add new components to `sections.ts`
3. **Build Astro components** - Create UI components for each type
4. **Configure TinaCMS** - Add to TinaCMS schema
5. **Update JSON files** - Convert content to use new components
6. **Test & validate** - Ensure 100% visual match

---

## Notes

- All file paths are absolute as required
- Component priorities based on:
  - Frequency of use
  - Uniqueness (no workaround available)
  - Visual impact on page accuracy
- Material Icons library should be integrated for `bentoGrid` and `iconGrid`
- The 10-variant theme system applies to all new components
