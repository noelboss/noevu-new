# Noevu Website Relaunch Plan

## Project Overview

**Goal:** Rebuild noevu.ch from Squarespace to Astro + Tina CMS + Markdown

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Astro** | Static site generator |
| **Tina CMS** | Git-based visual editing (everything editable) |
| **Tailwind CSS** | Styling (migrating from LESS) |
| **Vercel** | Hosting (site + Tina CMS) |
| **Zod** | Content validation via Astro Content Collections |

The goal of the relaunch is to have the new website completely under the control of AI agents. From research of topics to drafting of articles, to expanding components until publishing, everything can be done by AI and Git.

## Languages

- **German (DE)** - Base language
- **English (EN)** - Secondary
- **Portuguese (PT-BR)** - Future

## Scope Summary

| Content Type | Count |
|--------------|-------|
| Static pages | ~17-18 |
| Blog posts | ~21-22 |
| Category pages (to create) | 31 |
| Tag pages (to create) | 3 |
| **Total** | ~72-74 pages |

## Build Order

Incremental approach:
1. Foundation (Astro, Tailwind, Tina, i18n)
2. Homepage + Navigation
3. Core components
4. Service pages (one by one)
5. Blog system (last)

## Documentation Index

| Document | Description |
|----------|-------------|
| [pages/](./pages/) | Complete page inventory |
| [design-system/](./design-system/) | Colors, typography, spacing, dark theme |
| [components/](./components/) | All component documentation with screenshots |
| [blog-system/](./blog-system/) | Blog features & categories |
| [content-schemas/](./content-schemas/) | Zod/Tina schemas |
| [i18n/](./i18n/) | Internationalization strategy |
| [implementation/](./implementation/) | Build phases, roadmap & **skills reference** |

## Claude Code Skills

Three specialized skills are available to assist with development:

| Skill | Use When | Location |
|-------|----------|----------|
| **Noevu Component Builder** | Implementing components from docs/screenshots | `.claude/skills/noevu-component/` |
| **Blog Post Migration** | Migrating blog posts to MDX | `.claude/skills/migrate-blog/` |
| **Page Migration** | Migrating pages to Astro | `.claude/skills/migrate-page/` |

**Trigger phrases:**
- "implement the hero component" → Noevu Component Builder
- "migrate the cms-check-schweiz blog post" → Blog Post Migration
- "migrate the squarespace-agentur page" → Page Migration

See [implementation/README.md](./implementation/README.md#claude-code-skills) for full details.

## Reference Files

All source material is in `_reference/`:

| Path | Contents |
|------|----------|
| `_reference/blog.json` | 20+ blog posts with full content |
| `_reference/noevu.ch.json` | Site settings and metadata |
| `_reference/sitemap-de.xml` | URL structure |
| `_reference/html/` | Static HTML exports of all pages |
| `_reference/html/blog/` | Blog post HTML files |
| `_reference/html/blog/category/` | 31 category pages |
| `_reference/html/blog/tag/` | 3 tag pages |
| `_reference/html/images/` | **All images (already downloaded)** |
| `_reference/html/en/` | English page exports |
| `_reference/src/` | Existing JS/LESS components |
| `_reference/src/mixins.less` | Design tokens |

**Note:** Image paths in HTML files are already adjusted to use relative paths (`../images/` or `/images/`) pointing to the local `images/` folder.

## Site Metadata

```yaml
siteTitle: "Noevu GmbH - Webdesign und Marketing Agentur in Zurich"
baseUrl: "https://noevu.ch"
language: "de-CH"
timezone: "Europe/Zurich"
location:
  company: "Noevu GmbH"
  address: "Zürichstrasse 131"
  city: "8600 Dübendorf, Zürich"
  country: "Switzerland"
contact:
  email: "hello@noevu.ch"
  phone: "+41 44 505 10 20"
social:
  linkedin: "https://www.linkedin.com/company/noevu-swiss/"
  facebook: "https://www.facebook.com/people/Noevu-GmbH/61558039392256/"
businessHours:
  weekdays: "08:00 - 22:00"
  weekend: "Closed"
```

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Styling | Tailwind CSS | Modern, utility-first, good DX |
| CMS Scope | Everything | Full visual editing for all content |
| Build Order | Incremental | Homepage first, blog last |
| Validation | Zod + Astro | Type-safe content collections |
| Hosting | Vercel | Native Tina CMS support |

## Screenshots

Screenshots of all homepage sections are available in [`screenshots/`](./screenshots/):
- `screenshots/header/` - Header (desktop & mobile)
- `screenshots/footer/` - Footer (desktop & mobile)
- `screenshots/sections/` - All 18 homepage sections
