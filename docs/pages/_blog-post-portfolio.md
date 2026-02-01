# Blog Post Template: Portfolio/Case Study

This document describes the structure used for portfolio and case study blog posts on noevu.ch.

---

## Page Structure

### Grid System
- 12-column Squarespace grid
- Row/column layout: `.row.sqs-row` + `.col.sqs-col-X.span-X`
- Responsive: Mobile-first with desktop breakpoints

---

## Section Structure

### 1. Header Navigation
**Type:** Fixed header with navigation
- Logo (centered)
- Navigation menu with dropdowns
- Language picker
- CTA: "Termin buchen" → /kontakt#termin

---

### 2. Hero/Featured Image
**Type:** Full-width banner image
**Theme:** `white-bold`
**Height:** Medium
**Layout:** Full-bleed

**Content:**
- Large featured project image
- Image dimensions: ~2920x1662 or similar

---

### 3. Blog Title & Metadata
**Type:** Title section
**Layout:** Fluid engine

**Content:**
- H1: Article title (entry-title)
- Categories: Linked category tags
- Date: Publication date (dt-published)
- Author: Author name with link

---

### 4. Table of Contents
**Type:** Code block
**Layout:** Sidebar position

**Structure:**
```html
<div class="toc">
  <h3>Inhalt</h3>
  <!-- Auto-generated TOC -->
</div>
```

---

### 5. Introduction Section
**Type:** HTML block
**Layout:** 9-column wide

**Content:**
- Opening message/hook
- Key points as bullet list
- Overview of project

---

### 6. Project Details (3-Column)
**Type:** Multi-column layout
**Layout:** 3 × 4-column spans

**Boxes:**
1. **Kunde** (Client)
   - Client name
   - Industry/sector

2. **Projekt** (Project)
   - Project type
   - Deliverables

3. **Besonderheiten** (Special Features)
   - Unique aspects
   - Technologies used

---

### 7. Content Sections
**Type:** HTML blocks with headings
**Layout:** Mixed widths

**Heading Hierarchy:**
- H2: Main section headings
- H3: Subsection headings
- H4: Minor headings

**Text Formatting:**
- Paragraphs with `white-space: pre-wrap`
- Bold: `<strong>`
- Italics: `<em>`
- Links: Inline anchors
- Lists: `<ul>` and `<ol>` with `data-rte-list="default"`

---

### 8. Image Blocks
**Type:** Image blocks (interspersed)
**Layout:** Various widths

**Single Image:**
```html
<div class="sqs-block image-block" data-block-type="5">
  <figure class="sqs-block-image-figure intrinsic">
    <img data-stretch="true"
         srcset="[multiple sizes]"
         sizes="(max-width: 640px) 100vw, 75vw">
  </figure>
</div>
```

**Side-by-Side Images:**
```html
<div class="row sqs-row">
  <div class="col sqs-col-5 span-5">
    <!-- Image 1 -->
  </div>
  <div class="col sqs-col-4 span-4">
    <!-- Image 2 -->
  </div>
</div>
```

**Image Features:**
- Responsive srcset (100w to 2500w)
- Lazy loading
- Focal point support
- Aspect ratio preservation
- Border radius options

---

### 9. Horizontal Dividers
**Type:** HR block
**Block type:** 47

```html
<div class="sqs-block horizontalrule-block">
  <hr>
</div>
```

---

### 10. Tags Section
**Type:** Tag display
**Layout:** Below content

**Structure:**
```html
<span class="blog-item-tag-wrapper">
  <a href="./blog?tag=Portfolio">Portfolio</a>
</span>
```

---

### 11. Author Box
**Type:** Author profile
**Layout:** Card format

**Structure:**
```html
<div class="blog-item-author-profile-wrapper">
  <!-- Avatar -->
  <span class="author-avatar content-fill">
    <img class="author-avatar-image" src="...">
  </span>

  <!-- Name -->
  <span class="author-name">Noel Bossart</span>

  <!-- Bio -->
  <div class="author-bio">
    <p>Bio paragraph...</p>
    <p>Contact links:
      - LinkedIn
      - Email
      - Calendar booking
    </p>
  </div>
</div>
```

---

### 12. Pagination
**Type:** Prev/Next navigation
**ID:** `#itemPagination`

**Structure:**
```html
<section class="item-pagination item-pagination--prev-next">
  <!-- Previous -->
  <a class="item-pagination-link--prev">
    <svg class="caret-left-icon--small">...</svg>
    <span>Zurück</span>
    <h2 class="item-pagination-title">Previous Title</h2>
  </a>

  <!-- Next -->
  <a class="item-pagination-link--next">
    <span>Weiter</span>
    <h2 class="item-pagination-title">Next Title</h2>
    <svg class="caret-right-icon--small">...</svg>
  </a>
</section>
```

---

### 13. Footer
**Type:** Footer section
**Theme:** `dark`

---

## Content Patterns for Portfolio Posts

### Project Overview
- Client introduction
- Challenge/brief
- Solution approach
- Results/outcomes

### Visual Documentation
- Before/after comparisons
- Process screenshots
- Final deliverables
- Detail shots

### Technical Details
- Platform/technology used
- Special features implemented
- Integration details
- Performance metrics

---

## Categories for Portfolio Posts

**Service Categories:**
- Service: Squarespace Website
- Service: Online-Store & E-Commerce
- Service: Webdesign
- Service: Beratung
- Service: KI-Bildwelt
- Service: Umbraco CMS
- Service: UX & Content Strategy
- Service: Branding & Logo-Design

**Industry Categories:**
- Branche: Landwirtschaft
- Branche: Events und Anlässe
- Branche: NGOs & Gemeinnützige Institutionen
- Branche: Startup
- Branche: Staat & Behörden
- Branche: Gesundheits- und Sozialwesen

---

## SEO Elements

**Structured Data:**
- Article schema
- Author schema
- Organization schema

**Meta Tags:**
- Open Graph
- Twitter Cards
- Canonical URL

---

## Components Required
- Blog header with metadata
- Featured image display
- Table of contents generator
- Rich text renderer
- Image gallery (single + grid)
- Project details grid (3-column)
- Author box card
- Post pagination
- Tag display
- Footer

---

## Status
- [x] Template structure documented
- [ ] Template components created
- [ ] JSON schema defined
