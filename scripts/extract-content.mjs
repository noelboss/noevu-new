#!/usr/bin/env node
/**
 * Content Extraction Script
 * Parses Squarespace HTML files and extracts content to JSON structure
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { JSDOM } from 'jsdom';

const REFERENCE_DIR = './reference/noevu.ch';
const OUTPUT_DIR = './extracted-content';

/**
 * Parse a single HTML file and extract content
 */
function extractContent(htmlPath) {
  const html = readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const result = {
    file: basename(htmlPath),
    seo: extractSEO(doc),
    sections: extractSections(doc),
    faq: extractFAQ(doc),
    reviews: extractReviews(doc),
    navigation: extractNavigation(doc)
  };

  return result;
}

/**
 * Extract SEO metadata from head
 */
function extractSEO(doc) {
  return {
    title: doc.querySelector('title')?.textContent || '',
    description: doc.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    ogTitle: doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
    ogDescription: doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
    ogImage: doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
    canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
  };
}

/**
 * Extract page sections with their content
 */
function extractSections(doc) {
  const sections = [];
  const sectionElements = doc.querySelectorAll('section[data-test="page-section"]');

  sectionElements.forEach((section, index) => {
    const theme = section.getAttribute('data-section-theme') || 'white';
    const sectionId = section.getAttribute('data-section-id') || `section-${index}`;

    // Extract all text content from the section
    const headings = [];
    section.querySelectorAll('h1, h2, h3').forEach(h => {
      const text = cleanText(h.textContent);
      if (text) headings.push({ tag: h.tagName.toLowerCase(), text });
    });

    const paragraphs = [];
    section.querySelectorAll('p[style*="white-space:pre-wrap"]').forEach(p => {
      const text = cleanText(p.textContent);
      if (text && text.length > 5) paragraphs.push(text);
    });

    // Extract buttons/CTAs
    const buttons = [];
    section.querySelectorAll('a.sqs-block-button-element, .sqs-button-element--primary, .sqs-button-element--secondary').forEach(btn => {
      const text = cleanText(btn.textContent);
      const href = btn.getAttribute('href') || '';
      if (text) buttons.push({ label: text, href });
    });

    // Extract images
    const images = [];
    section.querySelectorAll('img[data-src], img[src]').forEach(img => {
      const src = img.getAttribute('data-src') || img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || '';
      if (src && !src.includes('spacer')) images.push({ src, alt });
    });

    // Extract list items
    const listItems = [];
    section.querySelectorAll('.list-item').forEach(item => {
      const title = cleanText(item.querySelector('.list-item-content__title')?.textContent || '');
      const description = cleanText(item.querySelector('.list-item-content__description')?.textContent || '');
      if (title) listItems.push({ title, description });
    });

    // Try to detect section type based on content
    const sectionType = detectSectionType(section, headings, listItems, buttons);

    sections.push({
      index,
      id: sectionId,
      theme,
      type: sectionType,
      headings,
      paragraphs,
      buttons,
      images: images.slice(0, 5), // Limit images
      listItems
    });
  });

  return sections;
}

/**
 * Detect section type based on content patterns
 */
function detectSectionType(section, headings, listItems, buttons) {
  const classes = section.className || '';
  const hasBackground = classes.includes('has-background');
  const hasDivider = classes.includes('has-section-divider');

  // Hero detection - first section with h1 or large heading
  if (headings.some(h => h.tag === 'h1')) {
    return 'hero';
  }

  // FAQ detection - has accordion structure
  if (section.querySelector('.accordion-block, .faq')) {
    return 'faq';
  }

  // Grid/Services detection - multiple list items
  if (listItems.length >= 3) {
    return 'servicesGrid';
  }

  // CTA detection - has buttons and short text
  if (buttons.length > 0 && headings.length <= 2) {
    return 'cta';
  }

  // Testimonials detection
  if (section.querySelector('.testimonial, .quote-block')) {
    return 'testimonials';
  }

  // Wave divider detection
  if (hasDivider && !headings.length) {
    return 'waveDivider';
  }

  // Default to splitContent for sections with headings and paragraphs
  if (headings.length > 0) {
    return 'splitContent';
  }

  return 'textContent';
}

/**
 * Extract FAQ data from ld+json schema
 */
function extractFAQ(doc) {
  const faqItems = [];

  doc.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    try {
      const data = JSON.parse(script.textContent);
      if (data['@type'] === 'FAQPage' && data.mainEntity) {
        data.mainEntity.forEach(item => {
          faqItems.push({
            question: item.name || '',
            answer: item.acceptedAnswer?.text || ''
          });
        });
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
  });

  return faqItems;
}

/**
 * Extract reviews/testimonials from ld+json schema
 */
function extractReviews(doc) {
  const reviews = [];

  doc.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    try {
      const data = JSON.parse(script.textContent);
      if (data.review && Array.isArray(data.review)) {
        data.review.forEach(review => {
          reviews.push({
            author: review.author?.name || '',
            text: review.reviewBody || '',
            rating: review.reviewRating?.ratingValue || 5,
            date: review.datePublished || ''
          });
        });
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
  });

  return reviews;
}

/**
 * Extract navigation structure from header
 */
function extractNavigation(doc) {
  const nav = { main: [], footer: [] };

  // Main navigation
  doc.querySelectorAll('.header-nav-item').forEach(item => {
    const link = item.querySelector('a');
    const folder = item.querySelector('.header-nav-folder-title-text');

    if (folder) {
      const children = [];
      item.querySelectorAll('.header-nav-folder-item a').forEach(child => {
        children.push({
          label: cleanText(child.textContent),
          href: child.getAttribute('href') || ''
        });
      });
      nav.main.push({
        label: cleanText(folder.textContent),
        children
      });
    } else if (link) {
      nav.main.push({
        label: cleanText(link.textContent),
        href: link.getAttribute('href') || ''
      });
    }
  });

  return nav;
}

/**
 * Clean text by removing excess whitespace
 */
function cleanText(text) {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Main execution
 */
async function main() {
  console.log('Starting content extraction...');

  // Get all HTML files (excluding blog category pages)
  const files = readdirSync(REFERENCE_DIR)
    .filter(f => f.endsWith('.html') && !f.includes('?') && !f.includes('offset='));

  console.log(`Found ${files.length} HTML files to process`);

  const allContent = {};

  for (const file of files) {
    const filePath = join(REFERENCE_DIR, file);
    console.log(`Processing: ${file}`);

    try {
      const content = extractContent(filePath);
      const slug = file.replace('.html', '').replace(/^index$/, 'home');
      allContent[slug] = content;
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  // Write output
  const outputPath = join(OUTPUT_DIR, 'extracted-content.json');
  writeFileSync(outputPath, JSON.stringify(allContent, null, 2), 'utf-8');
  console.log(`\nExtracted content written to: ${outputPath}`);

  // Generate summary
  console.log('\n=== EXTRACTION SUMMARY ===');
  console.log(`Total pages processed: ${Object.keys(allContent).length}`);

  for (const [slug, data] of Object.entries(allContent)) {
    console.log(`\n${slug}:`);
    console.log(`  - Title: ${data.seo.title?.substring(0, 50)}...`);
    console.log(`  - Sections: ${data.sections.length}`);
    console.log(`  - FAQs: ${data.faq.length}`);
    console.log(`  - Reviews: ${data.reviews.length}`);
  }
}

main().catch(console.error);
