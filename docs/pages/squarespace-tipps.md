# Squarespace Tipps Page (/squarespace-webseiten-tipps)

## SEO Metadata
- **Title:** Webseiten Tipps für Schweizer Unternehmen & Squarespace — Noevu GmbH
- **Description:** Praktische Tipps, Anleitungen und Tools für Squarespace Webseiten. Optimierung für Schweizer KMU.

---

## Section Structure

### Section 1: Hero
**Type:** `hero`
**Theme:** `white`
**Background:** Generative conic gradient animation
**Height:** Small
**Content Width:** Wide
**Alignment:** Center, middle
**Divider:** Rounded (6vw, parallax 180°/7)

**Generative Background:**
- Type: Conic gradient
- Colors: Light Accent, Accent, White
- Distortion: Y-axis 66%
- Noise: Intensity 9, Scale 14
- Fog: 53%, Blur: 34

**Content:**
- Main headline and subheading
- Introductory description

---

### Section 2: Intro Content
**Type:** `textSection`
**Theme:** `white`
**Layout:** Fluid Engine grid

**Content:**
- H1, H2, H3 text blocks
- Links to blog articles and services
- Navigation anchors

**Links:**
- Squarespace Anleitung → blog/squarespace-webseite-erstellen-anleitung-2025.html
- Alternative CMS → blog/beste-alternative-zu-wordpress-fuer-schweizer-kmus.html
- Neue KMU Webseite → webdesign-agentur/kmu-webseite-erstellen-lassen.html
- CMS-Evaluation → blog/cms-evaluation-fuer-schweizer-kmus.html
- Webseiten Pflege → squarespace-hilfe.html

---

### Section 3: Spacer
**Type:** `spacer`
**Theme:** `white-bold`
**Height:** Custom (minimal)

---

### Section 4: Featured Articles
**Type:** `summaryBlock`
**Theme:** `white`
**Layout:** Carousel design
**Height:** Small

**Configuration:**
- Filter: Tags "Artikel, Anleitung" + Featured only
- Items per row: 3 (desktop), 2 (tablet), 5 (mobile carousel)
- Page size: 4 items
- Image aspect: 1:1 (square)
- Column width: 270px
- Gutter: 60px
- Shows: Title, thumbnail, excerpt, tags

---

### Section 5: Spacer (Kontakt)
**Type:** `spacer`
**ID:** `#load-projects-kontakt`
**Theme:** `default`
**Height:** Custom (minimal)

---

### Section 6: Spacer (Cards3D)
**Type:** `spacer`
**ID:** `#load-projects-cards3d`
**Theme:** `default`
**Height:** Custom (minimal)

---

### Section 7: Tips & FAQ
**Type:** `faqAccordion`
**Theme:** `bright`
**Layout:** Inset background
**Height:** Small

**Content:**
- Heading: "Die besten Tipps und Tricks zu den häufigsten Fragen rund um KMU-Webseiten und digitaler Erfolg."

**Accordion Items (4 questions):**
1. "Welche Tipps helfen Schweizer KMU, ihre Webseite zu optimieren?"
   - Clear content, simple navigation, mobile optimization, fast loading, CTAs

2. "Gibt es Anleitungen, wie wir unsere Homepage selbst erstellen können?"
   - Step-by-step tutorials, Squarespace guides

3. "Warum sind regelmässige Tipps und Updates für unsere Webseite wichtig?"
   - Digital landscape changes, keeping current

4. "Wo finden wir Antworten auf unsere Fragen rund um Webdesign?"
   - Resource guide, consultation options

**Accordion Styling:**
- Icon: Plus/minus toggle (right-aligned)
- Dividers: 1px, opacity 0.26
- Padding: 20px top/bottom
- Multiple open: Allowed

---

### Section 8: Footer
**Type:** `footer`
**Theme:** `dark`
**Height:** Custom (10)

---

## Color Palette

**Section Themes:**
- `white` - Main content
- `white-bold` - Spacer/divider
- `bright` - FAQ section (inset)
- `dark` - Footer

**Background Colors:**
- Center: #fcf3e6 (warm cream)
- Top: #e1d2c5 / #d8d6d0 (beige tones)
- Bottom: #fcfcf9 / #f9f6f2 (off-white)

---

## Layout Patterns

**Grid System:**
- Mobile: 8 columns, 6vw gutter
- Desktop: 24 columns, 4vw gutter
- Max width: 1500px

**Responsive Breakpoints:**
- Mobile: Default
- Desktop: 768px+

---

## Components Required
- Hero with generative background
- Text section with navigation links
- Spacer sections
- Summary block carousel
- FAQ accordion
- Footer

## Images Required
- Hero background (generative)
- Article thumbnails (from blog collection)

---

## Status
- [ ] JSON content created
- [ ] Blog collection configured
- [ ] Images collected
- [ ] Page implemented
