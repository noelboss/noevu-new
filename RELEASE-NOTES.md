# Release Notes - Component Styling Session

## Date: 2026-02-02

## Summary
1. Added inline markdown parsing support across all section components
2. Applied critical styling fixes to match original noevu.ch design

## Styling Fixes Applied (This Session)

### Hero.astro
- **Primary button**: Increased box-shadow opacity (0.2→0.5, 0.1→0.15), added backdrop-filter blur(10px)
- **Primary button hover**: Increased shadow intensity, changed inset shadow to orange
- **Secondary button**: Added border, 2-layer box-shadow, backdrop-filter, padding, border-radius
- **Subheadline**: Added tag-style glass effect (backdrop-filter, background, padding, border-radius)
- **Subheadline dot**: Added hover animation
- **CTA gap**: Increased from 1.5rem to 2rem

### ValueProposition.astro
- **Cards**: Added 3D perspective transforms, 3-layer shadow with orange glow
- **Card hover**: Added rotateX/rotateY/translateZ transforms, brightness/saturation filters
- **Icons**: Added glass effect (backdrop-filter, border, inset shadows)
- **Image hover**: Enhanced to scale(1.08) rotate(-1deg) with brightness filter

### ServicesGrid.astro
- **Items**: Added card-like styling with background, backdrop-filter, border-radius, padding
- **Item hover**: Added translateY(-4px) with shadow effect

### CTA.astro
- **Primary button**: Same fixes as Hero.astro (shadow opacity, backdrop-filter)

## Changes Made

### New Utility
- **`src/utils/markdown.ts`** - Created `parseInlineMarkdown()` function for converting inline markdown to HTML

### Components Updated with Markdown Parsing

| Component | Fields with Markdown Support |
|-----------|------------------------------|
| Hero.astro | headline |
| TextContent.astro | title, content |
| SplitContent.astro | title, subtitle, content |
| ValueProposition.astro | title, subtitle, item titles/descriptions |
| ServicesGrid.astro | title, subtitle, service titles/descriptions |
| Process.astro | title, subtitle, step titles/descriptions |
| CTA.astro | title, description |
| BentoGridSection.astro | title, subtitle, item titles/subtitles/descriptions |
| FAQ.astro | title, questions |
| Testimonials.astro | title, quotes |
| FeaturesList.astro | title, feature titles/descriptions |
| ComparisonTable.astro | title, column headers, list items |
| Newsletter.astro | title, description |

### Theme System (in themes.css)
- Heading gradient text effects for light/dark themes
- Strong/em underline highlight styling with orange accent

## Build Status
- Build passes successfully (91 pages)
- Two unknown section types warnings (blogPostsGrid, blogList) - not blocking

## CRITICAL: Styling Does Not Match Original Site

**Most component styling does NOT match the live noevu.ch site.** The markdown parsing infrastructure is in place, but visual styling needs comprehensive rework.

### Priority for Next Session
1. **Compare each component against live site** - Use screenshots in `screenshots/` folder
2. **Reference original LESS source** - Located in `extracted-content/old-site-backup/src/`
3. **Follow the styling plan** - `~/.claude/plans/staged-whistling-bonbon.md`

### Key Source Files to Reference
- `extracted-content/old-site-backup/src/base/` - Base styles (headings, buttons, sections, accordion, timeline)
- `extracted-content/old-site-backup/src/components/` - Component-specific LESS/JS
- `screenshots/sections/` - 18 themed section screenshots
- `screenshots/sections-components/` - 20 detailed component screenshots

### Components Needing Styling Review (All of them)
- Header.astro / Footer.astro
- Hero.astro
- ValueProposition.astro
- LogoGallery.astro
- SplitContent.astro
- ServicesGrid.astro
- FeaturesList.astro
- Process.astro
- Testimonials.astro
- FAQ.astro
- ContactForm.astro
- ComparisonTable.astro
- CTA.astro
- Newsletter.astro
- BlogGrid.astro / BlogCard.astro
- TextContent.astro
- WaveDivider.astro

### Approach
For each component:
1. Read the corresponding LESS source file
2. View the screenshot reference
3. Rewrite the `<style>` section to match exactly
4. Test across all 10 themes
