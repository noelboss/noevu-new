#!/usr/bin/env node
/**
 * Extract computed styles from live noevu.ch site
 * Outputs exact CSS values for matching in local implementation
 */

import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://noevu.ch';

// Elements to extract styles from
const SELECTORS = {
  // Hero section
  heroSubheadline: '.fe-block-yui_3_17_2_1_1731611082498_5498 .sqs-html-content p',
  heroHeadline: '.fe-block-yui_3_17_2_1_1731611082498_5498 h2',
  heroDescription: '.fe-block-yui_3_17_2_1_1731611082498_3498 .sqs-html-content p',

  // Navigation
  navList: '.header-nav-list',
  navLink: '.header-nav-item a',

  // Buttons
  primaryButton: '.sqs-block-button-element--primary',
  secondaryButton: '.sqs-block-button-element--secondary',
};

// CSS properties to extract
const PROPERTIES = [
  'font-family',
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
  'color',
  'background-color',
  'background-image',
  'background',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin',
  'margin-bottom',
  'border-radius',
  'box-shadow',
  'backdrop-filter',
  '-webkit-backdrop-filter',
  'text-decoration',
  'text-transform',
  'opacity',
  'display',
  'gap',
  'align-items',
];

async function extractStyles() {
  console.log(`\n🔍 Extracting styles from: ${URL}\n`);
  console.log('='.repeat(60));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    // Wait for full page load
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });

    // Wait for DOM to be fully ready
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    // Wait for any lazy-loaded images
    await page.evaluate(async () => {
      const images = document.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );
    });

    // Additional wait for animations/transitions to settle
    await page.waitForTimeout(3000);

    // Try to dismiss cookie banner
    try {
      await page.click('[class*="cookie"] button[class*="accept"]', { timeout: 3000 });
      await page.waitForTimeout(1000);
    } catch {}

    // Scroll to trigger any scroll-based animations
    await page.evaluate(() => window.scrollBy(0, 100));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // Extract styles for each selector
    for (const [name, selector] of Object.entries(SELECTORS)) {
      console.log(`\n📦 ${name}`);
      console.log(`   Selector: ${selector}`);
      console.log('-'.repeat(60));

      try {
        const element = await page.$(selector);
        if (!element) {
          console.log('   ❌ Element not found');
          continue;
        }

        // Get computed styles
        const styles = await page.evaluate(
          ({ sel, props }) => {
            const el = document.querySelector(sel);
            if (!el) return null;

            const computed = getComputedStyle(el);
            const result = {};

            for (const prop of props) {
              const value = computed.getPropertyValue(prop);
              if (value && value !== 'none' && value !== 'normal' && value !== '0px') {
                result[prop] = value;
              }
            }

            // Also get the element's classes and text content
            result._classes = el.className;
            result._tagName = el.tagName.toLowerCase();
            result._textPreview = el.textContent?.slice(0, 50) + '...';

            return result;
          },
          { sel: selector, props: PROPERTIES }
        );

        if (styles) {
          console.log(`   Tag: <${styles._tagName}>`);
          console.log(`   Classes: ${styles._classes || '(none)'}`);
          console.log(`   Text: "${styles._textPreview}"`);
          console.log('');

          delete styles._classes;
          delete styles._tagName;
          delete styles._textPreview;

          for (const [prop, value] of Object.entries(styles)) {
            console.log(`   ${prop}: ${value}`);
          }
        }
      } catch (err) {
        console.log(`   ❌ Error: ${err.message}`);
      }
    }

    // Also extract CSS custom properties from :root
    console.log('\n\n📐 CSS Custom Properties (from :root)');
    console.log('='.repeat(60));

    const cssVars = await page.evaluate(() => {
      const root = document.documentElement;
      const computed = getComputedStyle(root);
      const vars = {};

      // Get all custom properties
      const allProps = Array.from(document.styleSheets)
        .flatMap(sheet => {
          try {
            return Array.from(sheet.cssRules);
          } catch {
            return [];
          }
        })
        .filter(rule => rule.selectorText === ':root')
        .flatMap(rule => rule.cssText.match(/--[^:]+/g) || []);

      for (const prop of [...new Set(allProps)]) {
        const value = computed.getPropertyValue(prop).trim();
        if (value) {
          vars[prop] = value;
        }
      }

      return vars;
    });

    // Group and display CSS vars
    const groups = {
      colors: [],
      fonts: [],
      spacing: [],
      other: []
    };

    for (const [prop, value] of Object.entries(cssVars)) {
      if (prop.includes('color') || prop.includes('hsl') || prop.includes('Accent')) {
        groups.colors.push([prop, value]);
      } else if (prop.includes('font')) {
        groups.fonts.push([prop, value]);
      } else if (prop.includes('space') || prop.includes('padding') || prop.includes('margin')) {
        groups.spacing.push([prop, value]);
      } else {
        groups.other.push([prop, value]);
      }
    }

    for (const [group, vars] of Object.entries(groups)) {
      if (vars.length > 0) {
        console.log(`\n${group.toUpperCase()}:`);
        for (const [prop, value] of vars.slice(0, 20)) {
          console.log(`   ${prop}: ${value}`);
        }
        if (vars.length > 20) {
          console.log(`   ... and ${vars.length - 20} more`);
        }
      }
    }

  } finally {
    await browser.close();
  }

  console.log('\n\n✅ Done!\n');
}

extractStyles().catch(console.error);
