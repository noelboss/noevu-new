# FAQ Extraction Summary

**Date:** 2026-02-02
**Source:** Extracted markdown files from original noevu.ch site
**Output:** `/extracted-content/extracted-faqs.json`

## Overview

Successfully extracted **198 FAQ items** from **21 files** (8 pages + 13 blog posts).

### Extraction Statistics

- **Total files processed:** 113 markdown files (61 pages + 52 blogs)
- **Files with FAQs:** 21 (18.6% success rate)
- **Total FAQs extracted:** 198
- **Average FAQs per file:** 9.4

### File Breakdown

#### German Pages (8 files, 64 FAQs)
1. `de_kmu-webseite-erstellen-lassen.md` - 8 FAQs
2. `de_services.md` - 8 FAQs
3. `de_squarespace-hilfe.md` - 8 FAQs
4. `de_squarespace-webdesign.md` - 8 FAQs
5. `de_squarespace-webseiten-entwicklung.md` - 8 FAQs
6. `de_webseiten-beratung-hilfe.md` - 8 FAQs
7. `de_webseiten-entwicklung.md` - 8 FAQs
8. `de_websites-erstellen-lassen.md` - 8 FAQs

#### German Blog Posts (6 files, 59 FAQs)
1. `de_bexio-tools-mit-ai-fuer-kmu.md` - 14 FAQs
2. `de_neue-website-fuer-ausgleichskasse-und-sozialversicherung.md` - 12 FAQs
3. `de_squarespace-erfahrungen-fuer-schweizer-kmu.md` - 12 FAQs
4. `de_warum-schweizer-kmu-jetzt-ai-brauchen.md` - 12 FAQs
5. `de_ai-tools-kmu-schweiz.md` - 10 FAQs

#### English Blog Posts (7 files, 75 FAQs)
1. `en_bexio-tools-mit-ai-fuer-kmu.md` - 14 FAQs
2. `en_neue-website-fuer-ausgleichskasse-und-sozialversicherung.md` - 12 FAQs
3. `en_squarespace-erfahrungen-fuer-schweizer-kmu.md` - 12 FAQs
4. `en_warum-schweizer-kmu-jetzt-ai-brauchen.md` - 12 FAQs
5. `en_ai-tools-kmu-schweiz.md` - 10 FAQs
6. `en_notion-ideales-intranet-fuer-schweizer-kmus.md` - 6 FAQs
7. `en_cms-check-schweiz.md` - 4 FAQs
8. `en_cms-evaluation-fuer-schweizer-kmus.md` - 4 FAQs

## FAQ Patterns Detected

### Pattern 1: List-based FAQs (Main Pages)
```markdown
## Häufig gestellte Fragen / FAQ Section Heading

*  #### Question text here?

   Answer paragraph 1...

   * Sub-bullet point
   * Another sub-bullet

   Answer paragraph 2...

*  #### Next question?

   Answer...
```

### Pattern 2: Simple FAQs (Blog Posts)
```markdown
## FAQ

#### Question text here?

Answer paragraph...

#### Next question?

Answer paragraph...
```

## Common FAQ Topics Extracted

### Service & Pricing (All main pages)
- What does a website cost?
- How long does development take?
- Can you help with content/text?
- Do you offer professional photography?
- How do we start a project?

### Technology & Platform
- Why Squarespace?
- What types of websites do you develop?
- Can you renovate our old website?
- Squarespace-specific questions

### AI & Tools (Blog posts)
- AI tools for Swiss KMUs
- Bexio integration
- Notion as intranet
- CMS comparisons (WordPress vs Squarespace)

## Data Quality Notes

### ✅ Successfully Extracted
- Question text (clean, formatted)
- Answer text (paragraphs and bullets)
- File references and metadata
- Both German and English content

### ⚠️ Manual Cleanup Needed
- Some answers still contain nested bullet formatting (`* `)
- Links have been converted to text only (URLs removed)
- Bold markdown (`**text**`) converted to plain text
- Some very long answers may need paragraph breaks

## TinaCMS Format

The extracted FAQs are already in the correct structure for TinaCMS import:

```json
{
  "file": "de_home.md",
  "type": "page",
  "count": 8,
  "faqs": [
    {
      "question": "Was kostet eine Webseite bei Euch?",
      "answer": "Ihr bekommt bei uns keine KMU Webseite..."
    }
  ]
}
```

This maps directly to the TinaCMS FAQ section schema:
```typescript
{
  type: "faq",
  title: "Häufige Fragen",
  items: [
    { question: "...", answer: "..." }
  ]
}
```

## Next Steps

1. ✅ FAQs extracted and structured
2. ⏳ Import FAQs into TinaCMS JSON files
3. ⏳ Deduplicate common FAQs across pages
4. ⏳ Review and clean up answer formatting
5. ⏳ Compare with existing FAQ content in TinaCMS

## Files Not Found with FAQs

Notable files that don't have FAQ sections:
- `de_home.md` - Uses same 8 FAQs as other service pages
- `de_squarespace-agentur.md` - Has FAQ section (verified manually)
- Most portfolio/case study blog posts
- Simple informational pages

## Usage

To import these FAQs into TinaCMS:

```bash
# The extraction script
node scripts/extract-faqs.mjs

# Output location
cat extracted-content/extracted-faqs.json
```

## Sample FAQ Entry

```json
{
  "question": "Was kostet eine Webseite bei Euch?",
  "answer": "Ihr bekommt bei uns keine KMU Webseite von der Stange, sondern eine fundierte Investition in Eure digitale Zukunft. Transparenz ist dabei die Basis unserer Partnerschaft. * Effiziente Starter-Lösungen: Für Startups und klare Projekte, bei denen es auf eine schnelle und professionelle Umsetzung ankommt, starten unsere Webdesign-Pakete bei CHF 4'500. * Individuelles, strategisches Webdesign: Für umfassende Projekte, die eine tiefgehende Strategie, ein einzigartiges Design und individuelle Funktionen erfordern, beginnen die Investitionen bei CHF 10'000. Für jedes Projekt erhaltet Ihr von uns ein klares Fixpreis-Angebot. So habt Ihr von Anfang an volle Kostenkontrolle und Planungssicherheit."
}
```
