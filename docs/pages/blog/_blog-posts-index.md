# Blog Posts Documentation Index

This directory contains documentation for all 26 blog posts on noevu.ch.

## Blog Post Categories

### Portfolio/Case Studies (13 posts)
Posts showcasing completed client projects with challenge-solution narratives.

| # | Slug | Title | Doc File |
|---|------|-------|----------|
| 1 | `neue-webseite-fuer-bodenleger` | Handwerker-Website erstellen lassen | `portfolio/bodenleger.md` |
| 2 | `neue-webseite-fuer-handwerker` | Webseite für Handwerker | `portfolio/handwerker.md` |
| 3 | `neue-webseite-fuer-schweizer-anwaltskanzlei-in-zuerich` | Webseite für Anwaltskanzlei | `portfolio/anwaltskanzlei.md` |
| 4 | `neue-webseite-fuer-schweizer-weingut` | Webseite für Weingut | `portfolio/weingut.md` |
| 5 | `neue-website-fuer-ausgleichskasse-und-sozialversicherung` | Webseite für Ausgleichskasse | `portfolio/ausgleichskasse.md` |
| 6 | `squarespace-webseite-fuer-ferienwohnung` | Webseite für Ferienwohnung | `portfolio/ferienwohnung.md` |
| 7 | `squarespace-webseite-fuer-interimsmanagement` | Webseite für Interimsmanagement | `portfolio/interimsmanagement.md` |
| 8 | `squarespace-webseite-fuer-nzz-connect` | Webseite für NZZ Connect | `portfolio/nzz-connect.md` |
| 9 | `squarespace-webseite-fuer-schweizer-dentaltechniker` | Webseite für Dentaltechniker | `portfolio/dentaltechniker.md` |
| 10 | `squarespace-webseite-fuer-schweizer-ngo-vereine` | Webseite für NGO/Vereine | `portfolio/ngo-vereine.md` |
| 11 | `squarespace-webseite-fuer-sozialbetrieb` | Webseite für Sozialbetrieb | `portfolio/sozialbetrieb.md` |
| 12 | `squarespace-webseite-fuer-zuercher-sicherheitsfirma` | Webseite für Sicherheitsfirma | `portfolio/sicherheitsfirma.md` |
| 13 | `webdesign-fuer-schweizer-tourismus-unternehmen` | Webdesign für Tourismus | `portfolio/tourismus.md` |

### Guides & Tutorials (4 posts)
Step-by-step guides and checklists for Squarespace users.

| # | Slug | Title | Doc File |
|---|------|-------|----------|
| 14 | `squarespace-webseite-erstellen-anleitung` | Squarespace Anleitung | `guides/anleitung.md` |
| 15 | `squarespace-webseite-erstellen-anleitung-2025` | Squarespace Anleitung 2026 | `guides/anleitung-2025.md` |
| 16 | `squarespace-webseite-online-gehen-checkliste` | Go-Live Checkliste | `guides/go-live-checkliste.md` |
| 17 | `squarespace-erfahrungen-fuer-schweizer-kmu` | Squarespace Erfahrungen | `guides/erfahrungen.md` |

### CMS & Technology (5 posts)
Articles comparing CMS platforms and WordPress alternatives.

| # | Slug | Title | Doc File |
|---|------|-------|----------|
| 18 | `cms-check-schweiz` | CMS Check Schweiz | `cms/cms-check.md` |
| 19 | `cms-evaluation-fuer-schweizer-kmus` | CMS Evaluation | `cms/cms-evaluation.md` |
| 20 | `beste-alternative-zu-wordpress` | WordPress Alternative | `cms/wordpress-alternative.md` |
| 21 | `beste-alternative-zu-wordpress-fuer-schweizer-kmus` | WordPress Alternative KMU | `cms/wordpress-alternative-kmu.md` |
| 22 | `beste-alternative-zu-wordpress-2025-fuer-schweizer-kmus` | WordPress Alternative 2025 | `cms/wordpress-alternative-2025.md` |

### AI & Tools (4 posts)
Articles about AI tools and productivity solutions for Swiss KMU.

| # | Slug | Title | Doc File |
|---|------|-------|----------|
| 23 | `ai-tools-kmu-schweiz` | AI Tools für KMU | `ai-tools/ai-tools-kmu.md` |
| 24 | `warum-schweizer-kmu-jetzt-ai-brauchen` | Warum KMU AI brauchen | `ai-tools/warum-ai.md` |
| 25 | `bexio-tools-mit-ai-fuer-kmu` | Bexio Tools mit AI | `ai-tools/bexio-ai.md` |
| 26 | `notion-ideales-intranet-fuer-schweizer-kmus` | Notion als Intranet | `ai-tools/notion-intranet.md` |

---

## Common Blog Post Structure

All blog posts share these structural elements:

### Frontmatter
```yaml
---
title: "Post Title"
slug: "url-slug"
excerpt: "SEO meta description"
featuredImage: "/images/blog/[slug].png"
categories:
  - "Category 1"
  - "Category 2"
author:
  name: "Noel Bossart"
  bio: "Gründer von Noevu und Experte für Webdesign und digitale Strategien."
publishedAt: "YYYY-MM-DDTHH:MM:SS.000Z"
---
```

### Content Sections
1. **Table of Contents** (`### Inhalt` or `### Artikel-Inhalt`)
2. **Key Points Summary** (bullet list)
3. **Main Content** (H2/H3 headings with paragraphs)
4. **Images** (interspersed throughout)
5. **FAQ Section** (accordion format)
6. **Author Bio** (standard footer block)
7. **CTAs** (calendar_today Termin buchen)

---

## Category-Specific Patterns

### Portfolio Posts
- **Project Details Box**: Kunde, Projekt, Besonderheiten (3-column)
- **Process Steps**: Numbered approach sections
- **Before/After**: Design prototypes comparison
- **Result Section**: Outcome and impact

### Guide Posts
- **Step-by-Step**: Numbered sections (Schritt 1, 2, 3...)
- **Comparison Tables**: Features/pricing comparison
- **CTA Links**: Links to related resources
- **Pro Tips**: Expert callouts (`Squarespace Experten Tipp`)

### CMS Posts
- **Fillout.com Embed**: Interactive CMS evaluation tool
- **Comparison Tables**: WordPress vs Squarespace
- **Pros/Cons Lists**: Vorteile/Nachteile sections
- **Decision Frameworks**: When to use each platform

### AI/Tools Posts
- **Tool Listings**: Numbered tool descriptions (1-13+)
- **Use Cases**: "Wofür Ihr es nutzen könntet" bullets
- **Implementation Steps**: How to get started
- **Swiss Focus**: DSG/nDSG compliance mentions

---

## Implementation Notes

### Images Required
- Featured images for each post
- In-article screenshots and diagrams
- Project showcase images (portfolio posts)
- Tool screenshots (AI/tools posts)

### Components Needed
- Blog post header with metadata
- Table of contents generator
- FAQ accordion component
- Author bio card
- Post pagination
- Category/tag display
- Related posts section

### SEO Elements
- Structured data (Article schema)
- Open Graph tags
- Twitter Cards
- Canonical URLs
- Category/tag archives

---

## Status
- [x] Blog structure documented
- [ ] Individual post documentation created
- [ ] JSON schema for blog posts defined
- [ ] Images verified/collected
- [ ] Posts implemented
