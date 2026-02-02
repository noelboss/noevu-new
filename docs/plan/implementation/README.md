# Implementation Plan

Step-by-step implementation roadmap for rebuilding noevu.ch with Astro + Tina CMS.

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Framework | Astro |
| CMS | Tina CMS (Git-based) |
| Styling | Tailwind CSS |
| Content | Markdown/MDX |
| Hosting | Vercel |
| i18n | Native Astro i18n |
| Icons | Material Symbols Outlined |
| Fonts | Abril Fatface, Heebo |

---

## Phase 1: Project Setup

### 1.1 Initialize Astro Project

```bash
# Create new Astro project
npm create astro@latest noevu-2.0

# Install dependencies
npm install @astrojs/tailwind @astrojs/mdx @astrojs/sitemap
npm install tailwindcss @tailwindcss/typography
npm install tinacms

# Dev dependencies
npm install -D prettier prettier-plugin-astro
```

### 1.2 Configure Tailwind

Create `tailwind.config.ts` with design tokens from `docs/plan/design-system/README.md`:
- Brand colors (green, orange, beige, brown)
- Font families (Abril Fatface, Heebo)
- Custom shadows, border radius
- Container settings

### 1.3 Set Up Content Collections

Create `src/content/config.ts` with schemas from `docs/plan/content-schemas/README.md`:
- Blog collection
- Pages collection
- Testimonials collection
- Navigation collection
- Settings collection

### 1.4 Configure Tina CMS

Create `tina/config.ts` matching content schemas.
Set up Vercel deployment for Tina Cloud.

### 1.5 Configure i18n

Set up Astro i18n in `astro.config.mjs`:
- Default locale: `de`
- Secondary locale: `en`
- No prefix for German

### 1.6 Project Structure

```
src/
├── assets/
│   └── images/
├── components/
│   ├── common/           # Shared components
│   │   ├── Button.astro
│   │   ├── Icon.astro
│   │   └── ...
│   ├── layout/           # Layout components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Section.astro
│   │   └── ...
│   ├── sections/         # Page sections
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── CTA.astro
│   │   └── ...
│   └── blog/             # Blog components
│       ├── PostCard.astro
│       ├── TOC.astro
│       └── ...
├── content/              # Content collections
│   ├── blog/
│   ├── pages/
│   └── ...
├── i18n/                 # Translations
│   ├── de.json
│   ├── en.json
│   └── index.ts
├── layouts/
│   ├── BaseLayout.astro
│   ├── PageLayout.astro
│   └── BlogLayout.astro
├── pages/
│   ├── index.astro
│   ├── [...slug].astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── en/
│       ├── index.astro
│       └── ...
└── styles/
    └── global.css
```

---

## Phase 2: Core Layout

### 2.1 Base Layout

Create `BaseLayout.astro`:
- HTML structure with lang attribute
- Meta tags and SEO
- Google Fonts import
- Material Symbols import
- Global styles

### 2.2 Header Component

Implement based on `docs/plan/components/navigation/README.md`:
- Desktop navigation with dropdowns
- **New mobile menu** with liquid glass effect and FAB button
- Language switcher
- Logo

### 2.3 Footer Component

Implement based on `docs/plan/components/footer/README.md`:
- Link columns
- Social icons
- Contact info
- Legal links
- Cookie settings trigger

### 2.4 Section Component

Create flexible section wrapper:
- Theme variants (white, light, dark, bright)
- Background options (color, image, gradient)
- Section dividers (curved, arrow)
- Inset background option

---

## Phase 3: Homepage

### 3.1 Hero Section

Implement based on `docs/plan/components/hero/README.md`:
- Full-width background
- Headline and subheadline
- CTA buttons
- Optional overlay

### 3.2 Feature List Section

Implement based on `docs/plan/components/feature-list/README.md`:
- Checkmark list
- Social proof widget
- Primary CTA

### 3.3 Cards Section

Implement based on `docs/plan/components/cards/README.md`:
- 3D hover effect cards
- Grid layout
- Card variants

### 3.4 Logo Slider

Implement based on `docs/plan/components/logo-slider/README.md`:
- Infinite marquee animation
- Client logos

### 3.5 Features Grid

Implement based on `docs/plan/components/features/README.md`:
- Icon + text cards
- Responsive grid

### 3.6 Bento Grid

Implement based on `docs/plan/components/bento-grid/README.md`:
- Mixed-size cards
- Various card types (image, icon, text)

### 3.7 Comparison Table

Implement based on `docs/plan/components/comparison-table/README.md`:
- Feature comparison
- Highlight column
- CTAs

### 3.8 Horizontal Scroll

Implement based on `docs/plan/components/horizontal-scroll/README.md`:
- Scroll-triggered animation
- Pinned container
- Progress indicator

### 3.9 Timeline

Implement based on `docs/plan/components/timeline/README.md`:
- Vertical timeline
- Scroll reveal animation
- Step markers

### 3.10 Testimonials

Implement based on `docs/plan/components/testimonials/README.md`:
- Quote cards
- Grid or carousel layout

### 3.11 Blog Preview

Implement based on `docs/plan/components/blog-list/README.md`:
- Horizontal swiper
- Post cards

### 3.12 FAQ Section

Implement based on `docs/plan/components/accordion/README.md`:
- Accordion component
- JSON-LD schema

### 3.13 CTA Section

Implement based on `docs/plan/components/cta/README.md`:
- Form integration
- Background options

---

## Phase 4: Service Pages

### 4.1 Page Template

Create reusable page template with:
- Hero section
- Content sections
- FAQ section
- CTA section

### 4.2 Implement Service Pages

In order of priority:
1. `/squarespace-agentur`
2. `/webdesign-agentur`
3. `/websites-erstellen-lassen`
4. `/ai-beratung-kmu-schweiz`
5. Additional subpages

### 4.3 Portfolio Page

Implement `/webseiten-projekte`:
- Portfolio grid
- Category filtering
- Case study links

---

## Phase 5: Blog System

### 5.1 Blog Listing Page

Implement `/blog`:
- Post grid/list
- Category/tag filtering
- Pagination
- Search (optional)

### 5.2 Blog Post Template

Implement based on `docs/plan/blog-system/README.md`:
- Sticky table of contents
- Quick summary box
- Author box
- Reading time
- Related posts
- FAQ section
- JSON-LD schema

### 5.3 Category/Tag Pages

Dynamic routes for:
- `/blog/category/[slug]`
- `/blog/tag/[slug]`

### 5.4 Device Mockups

Implement iPhone and laptop mockup components for portfolio posts.

### 5.5 Content Migration

Migrate blog posts from `_reference/blog.json`:
- Extract content
- Convert to MDX
- Download images
- Set up frontmatter

---

## Phase 6: Additional Pages

### 6.1 Contact Page

- Contact form
- Map (optional)
- Contact details

### 6.2 About Page

- Team section
- Company info
- Timeline/history

### 6.3 Appointment Page

- Calendly or similar embed
- Service selection

### 6.4 Legal Pages

- Datenschutz/Impressum
- AGB

### 6.5 404 Page

- Error message
- Navigation suggestions

---

## Phase 7: Interactive Features

### 7.1 Cookie Banner

Implement based on `docs/plan/components/cookie-banner/README.md`:
- Consent management
- Category toggles
- localStorage persistence
- Analytics integration

### 7.2 Contact Forms

- Form validation
- Submission handling
- Success/error states

### 7.3 Language Switcher

- Preserve current path
- Fallback handling

---

## Phase 8: SEO & Performance

### 8.1 Meta Tags

- Page-specific titles
- Descriptions
- Open Graph tags
- Twitter cards

### 8.2 Structured Data

- Organization schema
- LocalBusiness schema
- Article schema
- FAQPage schema
- BreadcrumbList schema

### 8.3 Sitemap

Configure `@astrojs/sitemap`:
- All pages
- Blog posts
- Categories

### 8.4 Performance

- Image optimization
- Font loading strategy
- Critical CSS
- Lazy loading

### 8.5 Analytics

- Google Analytics 4
- Google Tag Manager
- Cookie consent integration

---

## Phase 9: Testing & Launch

### 9.1 Testing

- Cross-browser testing
- Mobile responsiveness
- Accessibility audit
- Performance testing (Lighthouse)
- Content review

### 9.2 Redirects

Set up 301 redirects from old URLs in `vercel.json` or `_redirects`.

### 9.3 DNS & Domain

- Update DNS to Vercel
- Configure SSL
- Set up www redirect

### 9.4 Launch Checklist

- [ ] All pages migrated
- [ ] All blog posts migrated
- [ ] Forms working
- [ ] Analytics configured
- [ ] Cookie consent working
- [ ] SEO meta tags complete
- [ ] Structured data validated
- [ ] 301 redirects configured
- [ ] Performance optimized
- [ ] Mobile tested
- [ ] Cross-browser tested
- [ ] Accessibility checked
- [ ] Content proofread

---

## File References

| Documentation | Path |
|---------------|------|
| Design System | `docs/plan/design-system/README.md` |
| Components | `docs/plan/components/` |
| Page Inventory | `docs/plan/pages/README.md` |
| Blog System | `docs/plan/blog-system/README.md` |
| Content Schemas | `docs/plan/content-schemas/README.md` |
| i18n Strategy | `docs/plan/i18n/README.md` |

---

## Resource Files

| Resource | Path |
|----------|------|
| HTML Exports | `_reference/html/` |
| Blog Content | `_reference/blog.json` |
| Site Settings | `_reference/noevu.ch.json` |
| LESS Sources | `_reference/src/` |
| CSS Exports | `_reference/static1.squarespace.com/` |
| Sitemaps | `_reference/sitemap-*.xml` |
| Downloaded Images | `_reference/html/images/` |

---

## Claude Code Skills

This project includes specialized skills to assist with development tasks. Use these skills by describing the task - they will activate automatically.

| Skill | Trigger Phrases | Purpose |
|-------|-----------------|---------|
| **Noevu Component Builder** | "implement a component", "build component from screenshot", "create Astro component" | Guides implementation of Astro components with Tailwind CSS, following the design system |
| **Blog Post Migration** | "migrate a blog post", "convert blog to MDX", "migrate blog content" | Step-by-step migration of blog posts from `_reference/` to Astro MDX |
| **Page Migration** | "migrate a page", "convert page to Astro", "extract page sections" | Analyze and migrate pages from HTML exports to Astro components |

### Skill Locations

```
.claude/skills/
├── noevu-component/     # Component implementation guidance
│   ├── SKILL.md
│   └── references/
│       └── design-tokens.md
├── migrate-blog/        # Blog post migration
│   ├── SKILL.md
│   └── scripts/
│       └── extract-post.py
└── migrate-page/        # Page migration
    ├── SKILL.md
    └── scripts/
        └── analyze-page.py
```

### When to Use Each Skill

**Noevu Component Builder** - Use when:
- Implementing a component from `docs/plan/components/` documentation
- Converting a screenshot to an Astro component
- Building new sections following the design system

**Blog Post Migration** - Use when:
- Migrating a specific blog post (e.g., "migrate the cms-check-schweiz blog post")
- Converting blog content from `_reference/blog.json` to MDX
- Setting up frontmatter and image mappings for blog posts

**Page Migration** - Use when:
- Migrating a service page (e.g., "migrate the squarespace-agentur page")
- Analyzing HTML structure to map to Astro components
- Extracting sections and content from Squarespace exports
