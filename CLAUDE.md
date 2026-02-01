# Claude Code Session Notes

## Project Overview
Rebuilding noevu.ch with Astro 5, TinaCMS, Zod validation, and JSON as canonical truth.
**Critical requirement:** Content and design must match 100% with original.

## Current Status (2026-02-01)

### Build Status
- **89 pages** build successfully
- No errors
- All FAQ sections use correct `items` key

### Commits Made This Session
1. `d13d188` - Update page content with extracted FAQs and testimonials (19 files)
2. `ecf8f42` - Update pages via sub-agents with FAQs and testimonials (6 files)
3. `23d051e` - Add remaining content page JSON files (8 files)
4. `da73410` - Add new page templates and component updates (33 files)
5. `07a538d` - Update blog pages and package dependencies (5 files)
6. `5414d9d` - Add page documentation and templates (55 files)

**Total: 10 commits ahead of origin/main**

---

## Completed Work

### Phase 1: Build Error Fixes
- [x] Fixed FAQ sections using `questions` → `items` (13 files)
- [x] Fixed termin.json FAQ key (`faqs` → `items`)

### Phase 2: FAQ Content Updates (11 pages)
- [x] home.json - 8 FAQs
- [x] websites-erstellen-lassen.json - 8 FAQs
- [x] webdesign-agentur/kmu-webseite-erstellen-lassen.json - 8 FAQs
- [x] schweizer-kmu-webdesign-agentur-zuerich.json - 8 FAQs
- [x] schweizer-marketing-webdesign-agentur-zuerich.json - 8 FAQs
- [x] squarespace-agentur/webseiten-entwicklung.json - 6 FAQs
- [x] schweizer-squarespace-webdesign-agentur.json - 7 FAQs
- [x] webseiten-beratung-hilfe.json - 6 FAQs
- [x] squarespace-webdesign.json - 7 FAQs
- [x] services/beratung.json - 5 FAQs
- [x] services/website-erstellen.json - 6 FAQs

### Phase 3: Sub-Agent Tasks (8 completed)
- [x] squarespace-agentur.json - FAQs enhanced
- [x] squarespace-hilfe.json - 6 comprehensive FAQs
- [x] services/squarespace.json - FAQ section added
- [x] home.json - Testimonials updated (6 testimonials)
- [x] ueber-uns.json - Testimonials expanded (2→5)
- [x] termin.json - FAQ section added
- [x] Placeholder content scan - No issues found
- [x] Review verification - Build passes

### Resources Created
- `/scripts/extract-content.mjs` - Content extraction from HTML
- `/extracted-content/extracted-content.json` - 28 pages extracted
- `/src/content/testimonials.json` - 10 shared reviews
- `/docs/content-update-status.md` - Tracking document
- `/docs/pages/` - Page documentation templates

---

## Next Steps (Prioritized)

### Priority 1: SEO Optimization
- [ ] Compare extracted SEO titles/descriptions with current JSON
- [ ] Update meta descriptions where they differ from reference
- [ ] Verify canonical URLs are correct
- [ ] Add OG images where missing

### Priority 2: Content Alignment
- [ ] Update hero headlines to match reference site exactly
- [ ] Verify all CTA button text matches reference
- [ ] Check service descriptions for accuracy
- [ ] Ensure pricing information is current

### Priority 3: Testimonials Enhancement
Pages with testimonials already: 15+
- [ ] Verify testimonials match Google reviews
- [ ] Add testimonials to services/ai-beratung.json
- [ ] Add testimonials to squarespace-hilfe.json
- [ ] Ensure rating counts are accurate (currently showing 13)

### Priority 4: Technical Validation
- [ ] Run Zod schema validation on all JSON files
- [ ] Check for missing required fields
- [ ] Verify all internal links work
- [ ] Test all external links (cal.com, etc.)

### Priority 5: Blog Content
- [ ] Verify all blog posts referenced in navigation exist
- [ ] Check blog post frontmatter completeness
- [ ] Add missing featured images
- [ ] Verify category assignments

### Priority 6: Assets & Images
- [ ] Audit image paths in JSON files
- [ ] Verify all referenced images exist
- [ ] Check for placeholder image paths
- [ ] Optimize image sizes

---

## File Structure Reference

```
src/content/
├── pages/           # JSON page definitions
│   ├── services/    # Service pages
│   ├── squarespace-agentur/
│   └── webdesign-agentur/
├── blog/            # Blog posts (markdown)
├── navigation.json  # Site navigation
├── testimonials.json # Shared testimonials
└── site.json        # Site config

docs/
├── content-update-status.md  # Detailed tracking
├── pages/                    # Page templates
└── CLAUDE.md                 # This file
```

---

## Commands Reference

```bash
# Build
npm run build

# Dev server
npm run dev

# Check FAQ key usage
grep -r '"items": \[' src/content/pages --include="*.json" | wc -l

# Find pages without FAQ
for f in src/content/pages/*.json; do
  grep -q '"type": "faq"' "$f" || basename "$f"
done
```

---

## Notes

- All FAQ sections MUST use `items` key (not `questions` or `faqs`)
- Empty slug "" in home.json is correct (maps to /)
- Empty title in featuresList/process sections can be intentional
- Testimonials should reference shared testimonials.json where possible
