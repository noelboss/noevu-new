# Webseiten Tipps Page (/webseiten-tipps)

## SEO Metadata
- **Title:** Hilfreiche Tipps, Artikel und Tools für KMU Webseiten — Noevu GmbH
- **Description:** Tipps, Anleitungen und Tools für Schweizer KMU Webseiten. Was heute digital gut funktioniert, und morgen den Unterschied macht.

---

## Section Structure

### Section 1: Hero/Introduction
**Type:** `hero`
**Theme:** `white`
**Background:** Generative conic animation with product image
**Height:** Small
**Content Width:** Wide
**Divider:** Rounded (6vw height)

**Content:**
- Headline (H1): "Hilfreiche Tipps, Artikel und Tools für Eure KMU Webseite:"
- Subheading: "Was heute digital gut funktioniert, und morgen den Unterschied macht."
- Description text with links to resources

**Background Image:**
- Product render (2464x1536)
- Focal point: x:0.365, y:0.512
- Dominant color: fcf3e6 (light cream)

**Generative Effect:**
- Type: Conic gradient
- Colors: lightAccent + accent + white
- Noise intensity: 9, Scale: 14
- Distortion: ScaleY 66, Intensity 47
- Blur: 34
- Rotation: 280°
- Repeat: 3

---

### Section 2: Featured Articles Carousel
**Type:** `summaryBlock`
**Theme:** `white-bold`
**Layout:** Carousel with 3 items per row

**Configuration:**
- Collection: Blog (680c3810d0a1584bd894c93d)
- Filter: Tags "Artikel, Anleitung" + featured items only
- Design: Carousel
- Image: Square aspect ratio (1:1)
- Column width: 270px
- Gutter: 60px
- Read more text: "Jetzt Artikel lesen"

---

### Section 3: Secondary Content
**Type:** `textSection`
**Theme:** `white`

**Content:**
- Additional resource links
- CTAs to other pages

---

### Section 4: Spacing Section
**Type:** `spacer`
**Theme:** `default`

---

### Section 5: Spacing Section
**Type:** `spacer`
**Theme:** `default`

---

### Section 6: Tips & Tricks Section
**Type:** `faqAccordion`
**Theme:** `bright`
**Layout:** Inset background, centered
**Height:** Small

**Content:**
- Headline: "Die besten Tipps und Tricks zu den häufigsten Fragen rund um KMU-Webseiten und digitaler Erfolg."

**First Accordion Block (4 items):**
1. "Welche Tipps helfen Schweizer KMU, ihre Webseite zu optimieren?"
   - Clear content, simple navigation, mobile-optimization, fast loading, prominent CTAs

2. "Gibt es Anleitungen, wie wir unsere Homepage selbst erstellen können?"
   - Links to Squarespace guides and step-by-step tutorials

3. "Warum sind regelmässige Tipps und Updates für unsere Webseite wichtig?"
   - Digital landscape changes; updates keep site current

4. "Wo finden wir Antworten auf unsere Fragen rund um Webdesign und Homepage-Optimierung?"
   - Comprehensive tips collection; personal consultations available

**Second Accordion Block (4 items):**
1. "Was ist die beste Alternative zu WordPress für Schweizer KMU?"
   - Squarespace - intuitive, modern, no maintenance, secure

2. "Wie kann eine CMS-Evaluation meinem Unternehmen helfen?"
   - Analyzes requirements; compares solutions; optimal fit

3. "Wie verbessert Noevu die SEO Eurer Webseite?"
   - Clear structures, SEO-friendly content, targeted optimization

4. "Wie sorgt Noevu für beste Performance und Sicherheit der Homepage?"
   - Cloudflare technology for speed, security, reliability

**Accordion Styling:**
- Plus/minus icon toggle (right-aligned)
- Dividers between items (opacity: 0.26)
- Padding: 20px top/bottom
- Title alignment: left
- Icon placement: right

**CTA Section:**
- Heading: "Eure Frage war nicht dabei?"
- Text: Contact invitation
- CTA: "Kostenlose Video-Beratung" → /termin

---

### Section 7: Footer
**Type:** `footer`
**Theme:** `dark`
**Height:** Small (custom height: 10)
**Background:** Image with 0.15 overlay

**Footer Columns:**
1. **Dienstleistungen (Services)**
   - New KMU website development
   - AI consulting & implementation
   - Website consultation & help
   - Squarespace development

2. **Ressourcen (Resources)**
   - Projects & portfolio
   - Articles, guides & tips
   - Free CMS test
   - FAQ section

3. **Über uns (About)**
   - Contact
   - Free consultation booking
   - Why Noevu
   - Team
   - Social responsibility

4. **Squarespace**
   - Swiss Squarespace agency
   - Squarespace expert & Gold partner

5. **Kontakt (Contact)**
   - Phone: +41 44 505 10 20
   - Email: hello@noevu.ch
   - Appointment booking

**Custom Footer Styling:**
- Text color: #769F97 (muted teal/sage)

---

## Grid System
- Mobile: 8-column grid with 6vw gutters
- Desktop: 24-column grid with 4vw gutters
- Max width: 1500px
- Row heights: Container-width × scaling factor

---

## Components Required
- Hero with generative background
- Featured articles carousel (summary block)
- Text sections
- Spacer sections
- FAQ accordion (2 blocks × 4 items)
- Multi-column footer

## Images Required
- Hero background (product render)
- Article thumbnails (from blog collection)

---

## Typography
- Headlines: Abril Fatface (serif display)
- Body: Heebo (400, 600, 700 weights)

---

## Status
- [ ] JSON content created
- [ ] Blog collection configured
- [ ] Images collected
- [ ] Page implemented
