# Projects/Portfolio Page (/webseiten-projekte)

## SEO Metadata
- **Title:** Webseiten Projekte & Portfolio — Noevu GmbH
- **Description:** Entdeckt unsere Webseiten Projekte und Portfolio. Erfolgreiche KMU Webseiten aus der Schweiz.

---

## Section Structure

### Section 1: Hero
**Type:** `hero`
**Theme:** `white`
**Background:** Full-bleed image
**Height:** Small
**Content Width:** Wide (50%)
**Alignment:** Center, middle
**Divider:** Pointed (6vw, flipped X)

**Content:**
- Page title and introduction
- Background hero image

---

### Section 2: Spacer
**Type:** `spacer`
**Theme:** `default`
**Height:** Custom (0)

---

### Section 3: Featured Projects
**Type:** `summaryBlock`
**Theme:** `default`
**Layout:** Grid with carousel
**Height:** Small

**Configuration:**
- Heading: "Empfohlen" (Recommended)
- Collection: Blog (portfolio items)
- Filter: Tag "Portfolio"
- Items per row: 4 (desktop)
- Tablet columns: 2
- Mobile columns: 5 (carousel)
- Design: List layout
- Image alignment: Left
- Image aspect ratio: 1.5:1
- Column width: 270px
- Gutter: 60px
- Text size: Large
- Text alignment: Left
- Read more text: "Mehr über das Projekt"

**Display Options:**
- Show title: true
- Show thumbnail: true
- Show excerpt: true
- Show read more link: true
- Show categories: true
- Metadata position: Above title
- Primary metadata: Categories (cats)
- Auto crop: true
- Lightbox: false

---

### Section 4: Load More Projects
**Type:** `summaryBlock`
**ID:** `#load-projects`
**Theme:** `default`
**Layout:** Paginated grid
**Height:** Custom (0)

**Pagination:**
- Load page size: 4
- Total page size: 20
- Lazy scroll: true

---

### Section 5: Services CTA
**Type:** `ctaSection`
**Theme:** `bright`
**Layout:** Inset background
**Height:** Medium
**Column gutter:** 30px

---

### Section 6: Footer
**Type:** `footer`
**Theme:** `dark`
**Height:** Small (custom: 10)
**Gutter:** 0px

---

## Project Card Structure

```html
<div class="summary-item">
  <!-- Thumbnail -->
  <div class="summary-thumbnail-outer-container">
    <a href="blog/[slug].html" class="summary-thumbnail-container">
      <img src="[image-url]" alt="[title]" />
    </a>
  </div>

  <!-- Content -->
  <div class="summary-content">
    <!-- Categories above title -->
    <div class="summary-metadata-container--above-title">
      <span class="summary-metadata-item--cats">
        <a href="./blog?category=[category]">[Category]</a>
      </span>
    </div>

    <!-- Title -->
    <div class="summary-title">
      <a href="blog/[slug].html">[Project Title]</a>
    </div>

    <!-- Excerpt -->
    <div class="summary-excerpt">[Description]</div>

    <!-- Read More -->
    <div class="summary-read-more">
      <a href="blog/[slug].html">Mehr über das Projekt</a>
    </div>
  </div>
</div>
```

---

## Filter/Category System

**Service Categories:**
- Service: Squarespace Website
- Service: Online-Store & E-Commerce
- Service: Webdesign
- Service: Beratung
- Service: KI-Bildwelt
- Service: Umbraco CMS
- Service: UX & Content Strategy
- Service: Branding & Logo-Design

**Industry Categories (Branche):**
- Branche: Landwirtschaft
- Branche: Events und Anlässe
- Branche: NGOs & Gemeinnützige Institutionen
- Branche: Startup
- Branche: Staat & Behörden
- Branche: Gesundheits- und Sozialwesen

**Filter URL Pattern:**
```
./blog?category=[Service/Branche]:+[Name]
```

---

## Grid Layout

**Mobile (< 768px):**
- Columns: 8
- Gutter: 11px
- Row gap: 11px
- Site gutter: 6vw

**Desktop (≥ 768px):**
- Columns: 24
- Gutter: 11px or 30px (section-dependent)
- Row gap: 11px
- Site gutter: 4vw
- Max width: 1500px

---

## Background Configuration

| Section | Mode | Overlay Opacity |
|---------|------|-----------------|
| Hero | Image | 0.0 |
| Featured | Default | 0.15 |
| Load More | Default | 0.15 |
| Services CTA | Default | 0.15 |
| Footer | Default | 0.15 |

---

## Components Required
- Hero with pointed divider
- Summary block (featured carousel)
- Summary block (paginated grid)
- Project cards with metadata
- Category filter links
- CTA section
- Footer

## Images Required
- Hero background
- Project thumbnails (multiple)

---

## Status
- [ ] JSON content created
- [ ] Blog collection configured
- [ ] Category filters implemented
- [ ] Images collected
- [ ] Page implemented
