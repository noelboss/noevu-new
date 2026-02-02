# Testimonials Extraction Report

**Date:** 2026-02-02
**Task:** Extract testimonial/review sections from markdown files

---

## Summary

- **Total testimonials extracted:** 66 testimonials from 43 markdown pages
- **Unique authors found:** 2 (Reto Gerber, Benedikt Vogel)
- **Existing testimonials in testimonials.json:** 10 testimonials from 10 different authors
- **Google rating referenced:** 4.9 stars (13 reviews)

---

## Key Findings

### 1. Testimonial Authors Distribution

The extracted markdown files contain testimonials from only 2 authors, used repeatedly across multiple pages:

- **Reto Gerber:** 14 different quote variations used across 35+ pages
- **Benedikt Vogel:** 7 different quote variations used across 31+ pages

### 2. Quote Variations

Both authors have multiple variations of their testimonials tailored to specific page contexts:

#### Reto Gerber Variations (14 variations):
1. Generic version: "Noevu kombiniert Innovation und Präzision..."
2. Homepage version: "Die Webseiten Agentur Noevu kombiniert..." (mentions Rrevival company)
3. Squarespace version: "Noevu verbindet Innovation und Squarespace Erfahrung..."
4. Gold Partner version: "Noevu kombiniert Innovation und Experten-Wissen..."
5. English versions: Multiple English translations for international pages

#### Benedikt Vogel Variations (7 variations):
1. Generic version: "Our web project was implemented perfectly..."
2. Squarespace version: "Our new Squarespace homepage..."
3. Consulting version: "Thanks to Noevu's professional advice and help..."
4. Various English translations for different page contexts

### 3. Comparison with Existing testimonials.json

**Testimonials in JSON but NOT in extracted markdown:**
1. Wohnperspektive GmbH (rating: 5)
2. Martin Künzi (rating: 5)
3. Peter Hirning (rating: 5)
4. Anabel Hafstad - Senior SEO-Beraterin (rating: 5)
5. Dolores Libertas (rating: 5)
6. Tobias Morf (rating: 5)
7. Andy Zimmermann - Schweizer Werbesprecher (rating: 5)
8. Rebecca Mantel - EntdeckerBox (rating: 5)

**Match Rate:**
- Reto Gerber: Found in both (but different quote in testimonials.json: "Ein Profi durch und durch, sehr gutes Preis-Leistungsverhältnis!")
- Benedikt Vogel: Found in both (but different quote in testimonials.json: "Noevu hat uns hoch professionell, engagiert und termingerecht...")

---

## Analysis

### Strengths of Existing testimonials.json:
1. **Diverse testimonials:** 10 different customers/companies
2. **All 5-star ratings:** Consistent quality perception
3. **Professional variety:** Includes SEO consultant, speaker, startup founder, social enterprise
4. **Comprehensive rating data:** 4.9 average from 13 Google reviews

### Extracted Markdown Insights:
1. **Strategic repetition:** Reto Gerber and Benedikt Vogel testimonials are the "hero" testimonials used across the site
2. **Contextual adaptation:** Quotes are slightly modified to match page context (e.g., Squarespace-specific pages mention Squarespace)
3. **Bilingual support:** Both German and English versions exist
4. **Prominent placement:** These 2 testimonials appear on 43 of the 61 extracted pages

### Pages with Reto Gerber Testimonials (examples):
- Homepage (de_home.md, en_home.md)
- Services pages (de_services.md, en_services.md)
- Squarespace pages (14+ variations)
- Webdesign agency pages (6+ variations)
- AI consulting page (de_ai-beratung-kmu-schweiz.md)

### Pages with Benedikt Vogel Testimonials (examples):
- Homepage (English versions)
- Squarespace expert pages
- Agency pages
- Website development pages

---

## Recommendations

### 1. Content Strategy
The current approach uses 2 "hero" testimonials (Reto Gerber, Benedikt Vogel) prominently across the site, while maintaining a larger pool of 10 diverse testimonials in testimonials.json. This is a solid strategy:

- **Hero testimonials:** Provide consistency and recognizable social proof
- **Diverse pool:** Offers variety and breadth for different contexts

### 2. No Changes Needed
The existing `testimonials.json` is comprehensive and well-structured. The extracted testimonials confirm that:
- The hero testimonials (Reto Gerber, Benedikt Vogel) are already in the system
- The additional 8 testimonials provide valuable diversity
- The rating data (4.9 stars, 13 reviews) is accurate

### 3. Potential Enhancement
Consider creating a "featured" flag in testimonials.json to mark Reto Gerber and Benedikt Vogel as primary testimonials for prominent placement, while keeping the other 8 for rotation or specific sections.

---

## Files Generated

1. **extracted-testimonials.json** - Raw extraction data (66 testimonials, all variations)
2. **testimonials-analysis.json** - Detailed analysis comparing extracted vs existing
3. **TESTIMONIALS-EXTRACTION-REPORT.md** - This comprehensive report

---

## Conclusion

The testimonial extraction successfully identified the testimonial structure across 43 pages. The finding that only 2 authors appear in the extracted pages while 10 exist in testimonials.json suggests:

1. Reto Gerber and Benedikt Vogel are the primary "face" testimonials used for marketing
2. The other 8 testimonials may be used in specific sections or rotated
3. The existing testimonials.json is more comprehensive and should remain the source of truth

**No action required.** The existing testimonial system is well-designed and comprehensive.
