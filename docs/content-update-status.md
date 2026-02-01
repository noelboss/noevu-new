# Content Update Status

## Completed Tasks

### Build Error Fixes
- [x] Fixed FAQ sections using `questions` instead of `items` (13 files fixed)
- [x] All 89 pages now build successfully

### FAQ Updates (Extracted Content Applied)
- [x] `home.json` - Added 8 FAQs from extracted content
- [x] `websites-erstellen-lassen.json` - Already had comprehensive FAQs (8 questions)
- [x] `webdesign-agentur/kmu-webseite-erstellen-lassen.json` - Updated with 8 richer FAQs
- [x] `schweizer-kmu-webdesign-agentur-zuerich.json` - Updated with 8 comprehensive FAQs
- [x] `schweizer-marketing-webdesign-agentur-zuerich.json` - Updated with 8 FAQs
- [x] `squarespace-agentur/webseiten-entwicklung.json` - Updated from 4 to 6 FAQs
- [x] `schweizer-squarespace-webdesign-agentur.json` - Updated from 5 to 7 FAQs
- [x] `webseiten-beratung-hilfe.json` - Updated from 4 to 6 FAQs
- [x] `squarespace-webdesign.json` - Updated from 5 to 7 FAQs
- [x] `services/beratung.json` - Added FAQ section with 5 questions
- [x] `services/website-erstellen.json` - Added FAQ section with 6 questions

### Content Extraction
- [x] Created `/scripts/extract-content.mjs` - extracts content from HTML files
- [x] Created `/extracted-content/extracted-content.json` - 28 pages extracted

### Shared Resources
- [x] Created `/src/content/testimonials.json` - 10 real reviews for reuse

## Pending Tasks

### Pages Still Needing FAQ Updates
- [ ] `squarespace-agentur.json` - Has FAQs but could be enhanced
- [ ] `services/squarespace.json` - Check if needs FAQ section
- [ ] `ueber-uns.json` - Check if needs FAQ section
- [ ] `squarespace-hilfe.json` - Has 5 FAQs, could be enhanced
- [ ] `webseiten-tipps.json` - Has 7 FAQs, seems complete

### Content Sections to Update
- [ ] Update testimonials sections across pages to use extracted reviews
- [ ] Update hero sections with extracted headlines where different
- [ ] Update SEO meta descriptions where extracted content differs

### Technical Tasks
- [ ] Verify all page JSON files validate against Zod schemas
- [ ] Check for any remaining placeholder content
- [ ] Add missing blog posts if referenced in navigation

## Extracted Content Summary (from /extracted-content/extracted-content.json)

| Page | FAQs | Reviews |
|------|------|---------|
| ai-beratung-kmu-schweiz | 5 | 10 |
| blog | 0 | 10 |
| home | 8 | 10 |
| schweizer-kmu-webdesign-und-marketing-agentur-in-zuerich | 8 | 10 |
| schweizer-marketing-und-webdesign-agentur-in-zuerich | 8 | 10 |
| services | 16 | 10 |
| websites-erstellen-lassen | 16 | 10 |
| squarespace-agentur | 0 | 10 |
| squarespace-hilfe | 0 | 10 |
| squarespace-webdesign | 0 | 10 |
| webseiten-beratung-hilfe | 0 | 10 |

## Notes
- All FAQ sections now use `items` key (not `questions`) per schema
- Build passes with 89 pages
- Testimonials are consistent across pages using shared data file
