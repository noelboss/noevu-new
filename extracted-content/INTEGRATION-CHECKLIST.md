# Integration Checklist - New Section Components

Quick reference checklist for integrating the 10 new section types into the noevu.ch rebuild.

---

## Phase 1: Schema Integration ⏳

### 1.1 Merge Zod Schemas into `sections.ts`

- [ ] Open `/src/schemas/sections.ts`
- [ ] Add import at top:
  ```typescript
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
  ```
- [ ] Add all 10 schemas to `SectionSchema` discriminated union (line ~254)
- [ ] Add all 10 type exports (line ~286)
- [ ] Save file

### 1.2 Update TinaCMS Config

- [ ] Open `/tina/config.ts`
- [ ] Add import at top:
  ```typescript
  import { newSectionTemplates } from '../src/schemas/sections-new-components';
  ```
- [ ] Add to `sectionTemplates` object (line ~352):
  ```typescript
  ...newSectionTemplates,
  ```
- [ ] Save file

### 1.3 Verify Build

- [ ] Run `npm run build`
- [ ] Verify no TypeScript errors
- [ ] Verify all 91 pages build successfully
- [ ] Check TinaCMS admin (optional: `npm run dev` and visit `/admin`)

**Status:** Ready to proceed when all checkboxes above are complete.

---

## Phase 2: HIGH PRIORITY Components 🔴

### 2.1 TeamGrid Component

- [ ] Create `/src/components/sections/TeamGrid.astro`
- [ ] Import type: `import type { TeamGridSection } from '@/schemas/sections';`
- [ ] Implement grid layout (responsive 2/3/4 columns)
- [ ] Add team member cards with:
  - [ ] Profile photo
  - [ ] Name and role
  - [ ] Bio text (rich text rendering)
  - [ ] LinkedIn link (icon)
  - [ ] Email link (optional)
- [ ] Support theme system (10 variants)
- [ ] Test with example JSON from `COMPONENT-USAGE-EXAMPLES.md`
- [ ] Verify responsive behavior (mobile/tablet/desktop)
- [ ] Match design from original site

**Pages that need this:**
- `ueber-uns.json`
- `webdesign-agentur.json`
- `schweizer-squarespace-experte.json`

### 2.2 BentoGrid Component

- [ ] Create `/src/components/sections/BentoGrid.astro`
- [ ] Import type: `import type { BentoGridSection } from '@/schemas/sections';`
- [ ] Implement asymmetric grid layout
- [ ] Add Material Icons integration
- [ ] Support variable card sizes (small/medium/large)
- [ ] Add items with:
  - [ ] Icon display (Material Icons)
  - [ ] Title and subtitle
  - [ ] Rich text description
- [ ] Support 2/3/4 column layouts
- [ ] Support theme system
- [ ] Test with example JSON
- [ ] Verify visual hierarchy matches original

**Pages that need this:**
- `squarespace-agentur.json`
- `services/ai-beratung.json`

### 2.3 ImageTextAlternating Component

- [ ] Create `/src/components/sections/ImageTextAlternating.astro`
- [ ] Import type: `import type { ImageTextAlternatingSection } from '@/schemas/sections';`
- [ ] Implement full-width alternating layout
- [ ] Auto-alternating logic (left/right based on index)
- [ ] Add items with:
  - [ ] Eyebrow text (small heading)
  - [ ] Title
  - [ ] Rich text description
  - [ ] Full-width image
  - [ ] Optional CTA button
- [ ] Support manual image position override
- [ ] Support theme system
- [ ] Test with 4-item process example
- [ ] Verify responsive behavior

**Pages that need this:**
- `webdesign-agentur.json` (4 steps: Botschaft, Bedienung, Design, Service)
- `services/ai-beratung.json` (4 AI transformation steps)
- `squarespace-agentur.json` (4 process steps)

---

## Phase 3: MEDIUM PRIORITY Components 🟡

### 3.1 SocialResponsibility Component

- [ ] Create `/src/components/sections/SocialResponsibility.astro`
- [ ] Import type: `import type { SocialResponsibilitySection } from '@/schemas/sections';`
- [ ] Implement full-width layout with large image
- [ ] Add eyebrow, title, description (rich text)
- [ ] Add optional CTA button
- [ ] Support theme system
- [ ] Test with familyboss.art example

**Pages that need this:**
- `webdesign-agentur.json`
- `ueber-uns.json`

### 3.2 StatsBanner Component

- [ ] Create `/src/components/sections/StatsBanner.astro`
- [ ] Import type: `import type { StatsBannerSection } from '@/schemas/sections';`
- [ ] Implement horizontal/grid layouts
- [ ] Add stat items with:
  - [ ] Large value text
  - [ ] Label
  - [ ] Optional icon (Material Icons)
- [ ] Support background colors (green/orange/beige/white)
- [ ] Support theme system
- [ ] Test with 4-stat example (4.9 stars, 25+ years, etc.)

**Pages that need this:**
- Multiple pages as trust signals

### 3.3 RatingDisplay Component

- [ ] Create `/src/components/sections/RatingDisplay.astro`
- [ ] Import type: `import type { RatingDisplaySection } from '@/schemas/sections';`
- [ ] Implement inline/card display
- [ ] Add star visualization (5-star rating)
- [ ] Show score, review count, source
- [ ] Add optional link to reviews
- [ ] Support theme system
- [ ] Test with Google rating example (4.9/5)

**Pages that need this:**
- Hero sections on multiple pages
- Trust signal sections

### 3.4 CertificationBadge Component

- [ ] Create `/src/components/sections/CertificationBadge.astro`
- [ ] Import type: `import type { CertificationBadgeSection } from '@/schemas/sections';`
- [ ] Implement standalone section version
- [ ] Implement inline version (smaller)
- [ ] Add badge image, title, description
- [ ] Add optional link to certification
- [ ] Support theme system
- [ ] Test with Squarespace Gold Partner badge

**Pages that need this:**
- Multiple pages showing partner status

### 3.5 TimelineProcess Component

- [ ] Create `/src/components/sections/TimelineProcess.astro`
- [ ] Import type: `import type { TimelineProcessSection } from '@/schemas/sections';`
- [ ] Implement vertical timeline layout
- [ ] Implement horizontal timeline layout
- [ ] Add numbered steps with:
  - [ ] Number display (supports "01", "02" or 1, 2)
  - [ ] Eyebrow text
  - [ ] Title
  - [ ] Rich text description
  - [ ] Optional image
- [ ] Add timeline connector lines
- [ ] Support theme system
- [ ] Test with 4-step process example

**Pages that need this:**
- Process pages showing detailed timelines

---

## Phase 4: LOW PRIORITY Components 🟢

### 4.1 IconGrid Component

- [ ] Create `/src/components/sections/IconGrid.astro`
- [ ] Import type: `import type { IconGridSection } from '@/schemas/sections';`
- [ ] Implement simple grid layout (2/3/4 columns)
- [ ] Add icon + label items
- [ ] Support Material Icons or checkmarks
- [ ] Support theme system
- [ ] Test with feature checklist example

**Pages that need this:**
- Service offering sections

### 4.2 ContentShowcase Component

- [ ] Create `/src/components/sections/ContentShowcase.astro`
- [ ] Import type: `import type { ContentShowcaseSection } from '@/schemas/sections';`
- [ ] Implement full-width background image
- [ ] Add dark overlay option
- [ ] Add content with:
  - [ ] Eyebrow text
  - [ ] Title
  - [ ] Rich text description
  - [ ] Up to 2 CTA buttons
- [ ] Support text positioning (left/center/right)
- [ ] Support theme system
- [ ] Test with showcase example

**Pages that need this:**
- Various mid-page highlights

---

## Phase 5: Material Icons Setup ⏳

Choose one approach:

### Option A: Google Fonts CDN (Easiest)
- [ ] Add to `<head>` in base layout:
  ```html
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  ```
- [ ] Create helper component `/src/components/MaterialIcon.astro`
- [ ] Use in components: `<MaterialIcon icon="web_traffic" size="large" />`

### Option B: npm Package (Self-hosted)
- [ ] Install: `npm install @material-icons/svg`
- [ ] Import icons as needed in components
- [ ] Bundle size consideration

### Option C: SVG Sprite (Best performance)
- [ ] Create SVG sprite with used icons only
- [ ] Add to base layout
- [ ] Use with `<use>` elements

**Recommended:** Start with Option A for speed, optimize later if needed.

---

## Phase 6: Content Migration 📄

### 6.1 Update Existing Pages

For each page that needs new sections:

**ueber-uns.json**
- [ ] Replace placeholder content with `teamGrid`
- [ ] Add `socialResponsibility` section
- [ ] Verify visual match with original

**webdesign-agentur.json**
- [ ] Add `teamGrid` for team members
- [ ] Add `imageTextAlternating` for 4-step process
- [ ] Add `socialResponsibility` for familyboss.art
- [ ] Verify visual match with original

**squarespace-agentur.json**
- [ ] Add `bentoGrid` for 6 features
- [ ] Add `imageTextAlternating` for process steps
- [ ] Verify visual match with original

**services/ai-beratung.json**
- [ ] Add `bentoGrid` for AI services
- [ ] Add `imageTextAlternating` for transformation steps
- [ ] Verify visual match with original

**Multiple pages**
- [ ] Add `statsBanner` for trust signals
- [ ] Add `ratingDisplay` in hero sections
- [ ] Add `certificationBadge` where appropriate

### 6.2 Create Test Pages

- [ ] Create `/src/content/pages/test-new-sections.json`
- [ ] Add one of each section type
- [ ] Use example JSON from `COMPONENT-USAGE-EXAMPLES.md`
- [ ] Build and verify all sections render correctly
- [ ] Test on mobile/tablet/desktop
- [ ] Test all theme variants

---

## Phase 7: Quality Assurance ✅

### 7.1 Visual Verification

For each component:
- [ ] Compare with original site screenshots
- [ ] Verify spacing and typography
- [ ] Verify colors match theme system
- [ ] Verify responsive breakpoints
- [ ] Verify hover states and interactions

### 7.2 Accessibility Audit

- [ ] All images have alt text
- [ ] Links are keyboard accessible
- [ ] Proper heading hierarchy
- [ ] Sufficient color contrast
- [ ] Screen reader testing

### 7.3 Performance Testing

- [ ] Lighthouse score ≥ 90
- [ ] Images properly optimized
- [ ] No layout shift (CLS)
- [ ] Fast Time to Interactive (TTI)

### 7.4 Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Phase 8: Documentation Updates 📚

- [ ] Update main `CLAUDE.md` with completion status
- [ ] Document any design decisions or deviations
- [ ] Add component usage notes to docs
- [ ] Update content team on new section types available
- [ ] Create video tutorial for TinaCMS editor (optional)

---

## Phase 9: Deployment 🚀

### 9.1 Pre-deployment Checklist

- [ ] All 10 components created and tested
- [ ] All affected pages updated
- [ ] Build passes without errors
- [ ] No console errors in browser
- [ ] All links tested and working
- [ ] Forms tested (if applicable)
- [ ] 404 pages tested
- [ ] Robots.txt and sitemap verified

### 9.2 Deployment Steps

- [ ] Create git commit with all changes
- [ ] Push to main branch
- [ ] Verify preview build
- [ ] Deploy to production
- [ ] Smoke test production site
- [ ] Monitor for errors

### 9.3 Post-deployment

- [ ] Full site crawl for broken links
- [ ] Google Search Console check
- [ ] Analytics verification
- [ ] Performance monitoring
- [ ] User feedback collection

---

## Success Criteria ✨

Integration is complete when:

- [x] All 10 Zod schemas created
- [x] All 10 TinaCMS templates created
- [ ] All 10 Astro components created
- [ ] All components render correctly
- [ ] All pages updated with new sections
- [ ] Visual match with original site: 100%
- [ ] Build passes: 91+ pages
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Accessibility audit passed
- [ ] Performance targets met
- [ ] Browser compatibility verified
- [ ] Deployed to production

---

## Quick Reference Files

- **Schemas:** `/src/schemas/sections-new-components.ts`
- **Integration Guide:** `/extracted-content/SCHEMA-IMPLEMENTATION.md`
- **JSON Examples:** `/extracted-content/COMPONENT-USAGE-EXAMPLES.md`
- **Component Specs:** `/extracted-content/required-components.json`
- **This Checklist:** `/extracted-content/INTEGRATION-CHECKLIST.md`

---

## Estimated Timeline

- **Phase 1 (Schema Integration):** 30 minutes
- **Phase 2 (HIGH Priority - 3 components):** 1-2 days
- **Phase 3 (MEDIUM Priority - 5 components):** 2-3 days
- **Phase 4 (LOW Priority - 2 components):** 1 day
- **Phase 5 (Material Icons):** 30 minutes
- **Phase 6 (Content Migration):** 1-2 days
- **Phase 7 (QA):** 1 day
- **Phase 8 (Documentation):** 2 hours
- **Phase 9 (Deployment):** 2 hours

**Total estimated time:** 6-10 days depending on team size and parallel work.

---

## Priority Order for Development

1. **Start here:** Phase 1 (Schema Integration)
2. **Then:** Phase 5 (Material Icons Setup)
3. **Next:** Phase 2.1 (TeamGrid) - Most visible
4. **Next:** Phase 2.3 (ImageTextAlternating) - Used on many pages
5. **Next:** Phase 2.2 (BentoGrid) - Unique to site
6. **Then:** Phase 3 (All MEDIUM components)
7. **Then:** Phase 4 (LOW priority components)
8. **Finally:** Phase 6-9 (Migration, QA, Deploy)

---

**Last Updated:** 2026-02-02
**Next Review:** After Phase 1 completion
