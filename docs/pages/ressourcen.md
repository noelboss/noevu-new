# Resources Page (/ressourcen)

## SEO Metadata
- **Title:** Ressourcen für Schweizer KMU Webseiten — Noevu GmbH
- **Description:** Anleitungen, Tipps, Tools und Ressourcen für erfolgreiche KMU Webseiten in der Schweiz.

---

## Section Structure

### Section 1: Hero
**Type:** `hero`
**Theme:** `white`
**Background:** Generative conic gradient
**Height:** Small
**Content Width:** Wide

**Content:**
- Main headline
- Subheading
- Introduction text with resource links

**Navigation Links:**
- Squarespace Anleitung → blog/squarespace-webseite-erstellen-anleitung.html
- WordPress Alternative → blog/beste-alternative-zu-wordpress-fuer-schweizer-kmus.html
- Services → services.html
- Webseiten Beratung → webseiten-beratung-hilfe.html
- CMS Evaluation → blog/cms-evaluation-fuer-schweizer-kmus.html

**Shortcut Links (H4):**
- Erfolgreiche Webseiten-Projekte → webseiten-projekte.html
- Squarespace Tipps → squarespace-webseiten-tipps.html

---

### Section 2: Featured Articles Carousel
**Type:** `summaryBlock`
**Theme:** `white`
**Layout:** Carousel gallery

**Configuration:**
- Collection: Blog (ID: 680c3810d0a1584bd894c93d)
- Filter: Tags "Artikel, Anleitung" + Featured only
- Design: Carousel
- Columns: 3 (desktop), 2 (tablet), 5 (mobile)
- Items per page: 3
- Image aspect: 1:1 (square)
- Gutter: 60px
- Column width: 270px
- Text size: Small
- Shows: Title, thumbnail, excerpt, tags
- Metadata: Tags above title

---

### Section 3: Blog Articles Grid
**Type:** `summaryBlock`
**Theme:** `white-bold`
**Layout:** Grid with featured content

---

### Section 4: FAQ Section (Part 1)
**Type:** `faqAccordion`
**Theme:** `bright`
**Layout:** Inset

**Questions (4 items):**
1. "Welche Tipps helfen Schweizer KMU, ihre Webseite zu optimieren?"
2. "Gibt es Anleitungen, wie wir unsere Homepage selbst erstellen können?"
3. "Warum sind regelmässige Tipps und Updates für unsere Webseite wichtig?"
4. "Wo finden wir Antworten auf unsere Fragen rund um Webdesign und Homepage-Optimierung?"

---

### Section 5: FAQ Section (Part 2)
**Type:** `faqAccordion`
**Theme:** `bright`
**Layout:** Inset

**Questions (4 items):**
1. "Was ist die beste Alternative zu WordPress für Schweizer KMU?"
2. "Wie kann eine CMS-Evaluation meinem Unternehmen helfen?"
3. "Wie verbessert Noevu die SEO Eurer Webseite?"
4. "Wie sorgt Noevu für beste Performance und Sicherheit der Homepage?"

**Accordion Config:**
- Multiple open: true
- Dividers: true (opacity 0.26)
- First/last divider: visible
- Icon: Right (plus/minus)
- Icon size: 24px

---

### Section 6: CTA Section
**Type:** `ctaSection`
**Theme:** `bright`
**Layout:** Center-aligned

**Content:**
- "Eure Frage war nicht dabei?"
- Contact prompt

**CTA:**
- "Kostenlose Video-Beratung" (icon: calendar_month) → termin.html

---

### Section 7: Social Proof
**Type:** `socialProof`
**Theme:** `bright`
**Layout:** Custom HTML component

**Content:**
- "Schweizer KMU vertrauen auf Noevu"
- "100% Fünf Sterne Bewertungen auf Google"
- Link to reviews

---

### Section 8: Footer
**Type:** `footer`
**Theme:** `dark`
**Height:** Small

**Footer Columns:**
1. **Dienstleistungen**
   - Neue KMU Webseite entwickeln
   - AI-Beratung & Implementierung
   - Webseiten Beratung & Hilfe
   - Squarespace Webseiten Entwicklung

2. **Ressourcen**
   - Projekte & Portfolio
   - Artikel, Anleitungen & Tipps
   - Gratis CMS-Test
   - Häufige Fragen

3. **Über uns**
   - Kontakt
   - Kostenlose Beratung
   - Warum Noevu
   - Team
   - Soziale Verantwortung

4. **Squarespace**
   - Schweizer Squarespace Agentur
   - Squarespace Experte & Goldpartner

5. **Kontakt**
   - Phone: +41 44 505 10 20
   - Email: hello@noevu.ch
   - Termin buchen

**Footer Styling:**
- Custom color: #769F97 (sage green for copyright)
- Social icons: LinkedIn, Facebook

---

## Background Configuration

| Section | Mode | Overlay |
|---------|------|---------|
| Hero | Generative (Conic) | 0.0 |
| Featured | Image | 0.15 |
| Grid | Image | 0.15 |
| FAQ | Image | 0.15 |
| Footer | Image | 0.15 |

---

## Layout Grid

**Mobile:**
- 8 columns
- 11px row gap
- 6vw gutter

**Desktop (768px+):**
- 24 columns
- 30px gaps
- 4vw gutter

---

## Components Required
- Hero with generative background
- Summary block carousel
- Summary block grid
- FAQ accordion (2 sections)
- CTA section
- Social proof component
- Multi-column footer

## Images Required
- Hero background (generative)
- Article thumbnails

---

## Status
- [ ] JSON content created
- [ ] Blog collection configured
- [ ] FAQ content added
- [ ] Page implemented
