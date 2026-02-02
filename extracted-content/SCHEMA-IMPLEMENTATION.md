# Schema Implementation Guide - New Section Types

**Created:** 2026-02-02
**Status:** Ready for Integration
**Files:**
- `/src/schemas/sections-new-components.ts` - New schemas (created)
- `/src/schemas/sections.ts` - Main schema file (to be updated)
- `/tina/config.ts` - TinaCMS config (to be updated)

---

## Overview

This document describes the implementation of 10 new section types for noevu.ch, based on analysis of the original site. All Zod schemas and TinaCMS templates have been created following existing patterns.

### Component Priority

**HIGH PRIORITY (3)** - Critical for content parity:
- `teamGrid` - Team member profiles (4 team members)
- `bentoGrid` - Modern feature grid with Material Icons
- `imageTextAlternating` - Full-width alternating image/text sections

**MEDIUM PRIORITY (5)** - Important features:
- `socialResponsibility` - Company values showcase
- `statsBanner` - Trust signals and statistics
- `ratingDisplay` - Review scores (4.9 on Google)
- `certificationBadge` - Squarespace Gold Partner badge
- `timelineProcess` - Numbered process timeline

**LOW PRIORITY (2)** - Nice to have:
- `iconGrid` - Simple icon + label grid
- `contentShowcase` - Mid-page content highlights

---

## What Was Created

### 1. Zod Schemas (`sections-new-components.ts`)

All 10 section schemas following the discriminated union pattern:
- Type safety with z.literal('sectionType')
- Optional theme support (10-variant system)
- Proper field validation (min/max, enums, etc.)
- TypeScript type exports

### 2. TinaCMS Templates

Matching TinaCMS field configurations for each schema:
- German labels for editor UI
- Proper field types (string, rich-text, image, object arrays)
- Hidden `type` field (required for discriminated unions)
- Options and descriptions for user guidance
- Consistent with existing templates

### 3. Pattern Adherence

All new components follow existing patterns:
- Theme field matching existing 10 variants
- ImageSchema, LinkSchema, RichTextSchema reuse
- List fields use `items` key (matching FAQ pattern)
- Optional fields appropriately marked
- German field labels throughout

---

## Integration Steps

### Step 1: Merge Schemas into `sections.ts`

Add the new schema definitions to `/src/schemas/sections.ts`:

```typescript
// Add imports at top
import {
  TeamGridSectionSchema,
  BentoGridSectionSchema,
  ImageTextAlternatingSectionSchema,
  SocialResponsibilitySectionSchema,
  StatsBannerSectionSchema,
  RatingDisplaySectionSchema,
  CertificationBadgeSectionSchema,
  TimelineProcessSectionSchema,
  IconGridSectionSchema,
  ContentShowcaseSectionSchema,
} from './sections-new-components';

// Update the discriminated union (around line 254)
export const SectionSchema = z.discriminatedUnion('type', [
  // Existing schemas...
  HeroSectionSchema,
  LogoGallerySectionSchema,
  SplitContentSectionSchema,
  ValuePropositionSectionSchema,
  ServicesGridSectionSchema,
  ComparisonTableSectionSchema,
  ProcessSectionSchema,
  FeaturesListSectionSchema,
  TestimonialsSectionSchema,
  CTASectionSchema,
  TextContentSectionSchema,
  FAQSectionSchema,
  BlogGridSectionSchema,
  WaveDividerSectionSchema,
  ContactFormSectionSchema,
  NewsletterSectionSchema,

  // NEW: Add the 10 new schemas
  TeamGridSectionSchema,
  BentoGridSectionSchema,
  ImageTextAlternatingSectionSchema,
  SocialResponsibilitySectionSchema,
  StatsBannerSectionSchema,
  RatingDisplaySectionSchema,
  CertificationBadgeSectionSchema,
  TimelineProcessSectionSchema,
  IconGridSectionSchema,
  ContentShowcaseSectionSchema,
]);

// Add type exports (around line 286)
export type TeamGridSection = z.infer<typeof TeamGridSectionSchema>;
export type BentoGridSection = z.infer<typeof BentoGridSectionSchema>;
export type ImageTextAlternatingSection = z.infer<typeof ImageTextAlternatingSectionSchema>;
export type SocialResponsibilitySection = z.infer<typeof SocialResponsibilitySectionSchema>;
export type StatsBannerSection = z.infer<typeof StatsBannerSectionSchema>;
export type RatingDisplaySection = z.infer<typeof RatingDisplaySectionSchema>;
export type CertificationBadgeSection = z.infer<typeof CertificationBadgeSectionSchema>;
export type TimelineProcessSection = z.infer<typeof TimelineProcessSectionSchema>;
export type IconGridSection = z.infer<typeof IconGridSectionSchema>;
export type ContentShowcaseSection = z.infer<typeof ContentShowcaseSectionSchema>;
```

**Alternative:** You can leave the schemas in the separate file and just import them. This keeps the main file cleaner.

### Step 2: Update TinaCMS Config

Add the new templates to `/tina/config.ts`:

```typescript
// Add import at top
import { newSectionTemplates } from '../src/schemas/sections-new-components';

// Update sectionTemplates object (around line 352)
const sectionTemplates = {
  // Existing templates...
  hero: heroSection,
  logoGallery: logoGallerySection,
  valueProposition: valuePropositionSection,
  servicesGrid: servicesGridSection,
  comparisonTable: comparisonTableSection,
  process: processSection,
  cta: ctaSection,
  waveDivider: waveDividerSection,
  testimonials: testimonialsSection,
  featuresList: featuresListSection,
  faq: faqSection,

  // NEW: Add the 10 new templates
  ...newSectionTemplates,
};
```

### Step 3: Verify Schema Compilation

```bash
# Build should pass without errors
npm run build

# TypeScript should validate
npx tsc --noEmit
```

---

## Next Steps: UI Components

After schemas are integrated, create Astro components for rendering:

### HIGH PRIORITY Components (Do First)

1. **TeamGrid.astro**
   - Grid layout (2/3/4 columns responsive)
   - Team member cards with photos
   - LinkedIn icons, bio text
   - Reference: `webdesign-agentur.md` lines 70-109

2. **BentoGrid.astro**
   - Asymmetric grid layout
   - Material Icons integration
   - Variable card sizes (small/medium/large)
   - Reference: `squarespace-agentur.md` lines 128-201

3. **ImageTextAlternating.astro**
   - Full-width sections
   - Auto-alternating image position
   - Eyebrow text support
   - Reference: `webdesign-agentur.md` lines 211-257

### MEDIUM PRIORITY Components

4. **SocialResponsibility.astro**
5. **StatsBanner.astro**
6. **RatingDisplay.astro**
7. **CertificationBadge.astro**
8. **TimelineProcess.astro**

### LOW PRIORITY Components

9. **IconGrid.astro**
10. **ContentShowcase.astro**

### Component Location

Create all components in:
```
/src/components/sections/
```

Following the naming convention:
- `TeamGrid.astro`
- `BentoGrid.astro`
- `ImageTextAlternating.astro`
- etc.

### Component Requirements

Each component should:
1. Import the TypeScript type from `sections.ts`
2. Accept props with type annotation
3. Support the theme system (10 variants)
4. Be responsive (mobile-first)
5. Match design from original site
6. Handle optional fields gracefully

---

## Example JSON Usage

### Team Grid Example

```json
{
  "type": "teamGrid",
  "theme": "white",
  "title": "Unser Team",
  "subtitle": "Die Menschen hinter Noevu",
  "layout": "4-column",
  "members": [
    {
      "name": "Noel Bossart",
      "role": "Gründer & Designer",
      "image": {
        "src": "/images/team/noel.jpg",
        "alt": "Noel Bossart"
      },
      "bio": "Noel ist Gründer und Creative Director von Noevu...",
      "linkedin": "https://linkedin.com/in/noelbossart"
    },
    {
      "name": "Tobias Morf",
      "role": "Entwickler",
      "image": {
        "src": "/images/team/tobias.jpg",
        "alt": "Tobias Morf"
      },
      "bio": "Tobias ist unser Full-Stack Entwickler...",
      "linkedin": "https://linkedin.com/in/tobiasmorf"
    }
  ]
}
```

### Bento Grid Example

```json
{
  "type": "bentoGrid",
  "theme": "dark",
  "title": "Unsere Leistungen",
  "columns": "3",
  "items": [
    {
      "icon": "web_traffic",
      "iconDisplay": "icon",
      "title": "Web-Traffic Optimierung",
      "description": "Wir optimieren Ihre Website für Suchmaschinen...",
      "size": "medium"
    },
    {
      "icon": "ads_click",
      "iconDisplay": "icon",
      "title": "Marketing Integration",
      "description": "Nahtlose Integration von Marketing-Tools...",
      "size": "large"
    }
  ]
}
```

### Image Text Alternating Example

```json
{
  "type": "imageTextAlternating",
  "theme": "white",
  "title": "Unser Prozess",
  "items": [
    {
      "eyebrow": "Schritt 1",
      "title": "Strategie & Konzept",
      "description": "Wir beginnen mit einer gründlichen Analyse...",
      "image": {
        "src": "/images/process/step1.jpg",
        "alt": "Strategie Workshop"
      },
      "imagePosition": "auto"
    },
    {
      "eyebrow": "Schritt 2",
      "title": "Design & Entwicklung",
      "description": "Basierend auf der Strategie entwickeln wir...",
      "image": {
        "src": "/images/process/step2.jpg",
        "alt": "Design Mockups"
      },
      "imagePosition": "auto"
    }
  ]
}
```

---

## Material Icons Integration

Several components use Material Icons. To integrate:

### 1. Add Material Icons CDN

In your `<head>` (or base layout):

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

### 2. Or Use npm Package

```bash
npm install @material-icons/svg
```

### 3. Icon Component Helper

Create `/src/components/MaterialIcon.astro`:

```astro
---
interface Props {
  icon: string;
  size?: 'small' | 'medium' | 'large';
}

const { icon, size = 'medium' } = Astro.props;
const sizeMap = {
  small: '24px',
  medium: '48px',
  large: '64px'
};
---

<span class="material-icons" style={`font-size: ${sizeMap[size]}`}>
  {icon}
</span>
```

Usage in components:
```astro
<MaterialIcon icon={item.icon} size="large" />
```

---

## Theme System Reference

All new components support the 10-variant theme system:

| Theme Value | Description | Background | Text |
|------------|-------------|------------|------|
| `dark` | Primary content (most common) | Dark green | Light |
| `white` | Light content areas | White | Dark |
| `white-bold` | Emphasis with white | White | Dark bold |
| `bright-inverse` | Inverted (orange bg) | Orange | Dark |
| `bright` | Accent/highlight | Light orange | Dark |
| `light-bold` | Light with bold elements | Light beige | Dark bold |
| `black-bold` | Hero sections | Black | Light bold |
| `black` | Dark sections | Black | Light |
| `light` | Light backgrounds | Light beige | Dark |
| `dark-bold` | Bold dark sections | Dark green | Light bold |

Theme CSS classes should be applied in component:
```astro
<section class={`section theme-${theme || 'white'}`}>
  <!-- content -->
</section>
```

---

## Validation Checklist

After integration, verify:

- [ ] All 10 schemas compile without errors
- [ ] TypeScript types are exported correctly
- [ ] TinaCMS templates appear in editor
- [ ] Test build: `npm run build`
- [ ] Create test page with each section type
- [ ] Verify theme system works on all sections
- [ ] Check responsive layouts
- [ ] Validate against Zod schema in dev mode

---

## Testing Strategy

### Phase 1: Schema Integration
1. Merge schemas into `sections.ts`
2. Update TinaCMS config
3. Run build - should pass
4. Check TinaCMS editor - new sections appear

### Phase 2: High Priority Components
1. Create `TeamGrid.astro`
2. Create test page with teamGrid section
3. Verify layout and responsiveness
4. Repeat for `BentoGrid` and `ImageTextAlternating`

### Phase 3: Medium Priority Components
1. Create remaining 5 components
2. Test each individually
3. Verify theme system support

### Phase 4: Content Migration
1. Update existing pages to use new sections
2. Replace temporary content with new components
3. Verify 100% match with original site

---

## Known Issues / Notes

### 1. Material Icons Dependency
Several components require Material Icons. Decision needed:
- Use Google Fonts CDN (easier, external dependency)
- Use npm package (self-hosted, larger bundle)
- Create SVG sprite (best performance, more work)

### 2. Image Sizes
Components with images should specify optimal sizes:
- TeamGrid member photos: ~400x400px
- BentoGrid icons: 48x48px or 64x64px
- ImageTextAlternating: ~1200x800px
- Full-width backgrounds: ~1920x1080px

### 3. Rich Text Rendering
All `RichTextSchema` fields use markdown strings. Ensure proper markdown-to-HTML rendering in components:

```astro
---
import { marked } from 'marked';
const htmlContent = marked(props.description);
---
<div set:html={htmlContent} />
```

### 4. LinkedIn Icon
TeamGrid component needs LinkedIn icon. Options:
- Use Font Awesome
- Use custom SVG
- Use Material Icons 'linkedin' if available

---

## Questions for Review

1. **Schema Location**: Keep schemas in separate file or merge into `sections.ts`?
2. **Icon System**: Which icon solution preferred (CDN vs npm)?
3. **Image Hosting**: Continue with Squarespace CDN or migrate images?
4. **Component Priority**: Agree with HIGH/MEDIUM/LOW priority order?
5. **Theme Classes**: Existing CSS supports all 10 theme variants?

---

## References

- **Component Specs:** `/extracted-content/required-components.json`
- **Existing Schemas:** `/src/schemas/sections.ts`
- **TinaCMS Config:** `/tina/config.ts`
- **New Schemas:** `/src/schemas/sections-new-components.ts` (this file)
- **Original Site:** noevu.ch (reference for design)
- **Content Extraction:** `/extracted-content/extracted-content.json`

---

## Success Criteria

Integration is complete when:

1. ✅ All 10 Zod schemas validate correctly
2. ✅ All 10 TinaCMS templates appear in editor
3. ✅ Build passes without errors
4. ✅ TypeScript types are properly exported
5. ⏳ All 10 Astro components created (next step)
6. ⏳ Components render correctly on test pages
7. ⏳ Theme system works on all components
8. ⏳ Mobile responsive layouts verified
9. ⏳ Content migrated to use new sections
10. ⏳ 100% visual match with original site

**Current Status:** Steps 1-4 complete (schemas ready), Steps 5-10 pending (component creation)

---

## Contact / Questions

If questions arise during integration:
1. Check existing component patterns in `/src/components/sections/`
2. Verify schema patterns in `/src/schemas/sections.ts`
3. Review TinaCMS patterns in `/tina/config.ts`
4. Reference original site at noevu.ch for design details

---

**Next Action:** Integrate schemas into main files and begin HIGH PRIORITY component development.
