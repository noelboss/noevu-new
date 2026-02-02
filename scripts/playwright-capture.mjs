#!/usr/bin/env node
/**
 * Playwright Capture - Browser automation for screenshot capture
 *
 * Usage:
 *   node scripts/playwright-capture.mjs --url <url> [options]
 *
 * Options:
 *   --url           Target URL (required)
 *   --output        Output directory (default: ./screenshots)
 *   --viewports     Comma-separated: desktop,tablet,mobile (default: desktop)
 *   --full-page     Capture full scrollable page
 *   --click         CSS selector to click before capture
 *   --hover         CSS selector to hover before capture
 *   --scroll-to     CSS selector to scroll into view
 *   --wait          Ms to wait before capture (default: 1000)
 *   --no-popups     Skip popup dismissal
 *   --analyze       Output component analysis JSON
 *   --name          Custom name prefix for screenshots
 *
 * Examples:
 *   node scripts/playwright-capture.mjs --url https://example.com
 *   node scripts/playwright-capture.mjs --url https://example.com --viewports desktop,mobile --full-page
 *   node scripts/playwright-capture.mjs --url https://example.com --click ".menu-toggle" --wait 500
 *   node scripts/playwright-capture.mjs --url https://example.com --analyze
 */

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Viewport presets
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
};

// Common popup/cookie banner selectors
const POPUP_SELECTORS = [
  '[class*="cookie"] button[class*="accept"]',
  '[class*="cookie"] button[class*="agree"]',
  '[class*="cookie"] button:not([class*="reject"]):not([class*="decline"])',
  '[class*="consent"] button[class*="accept"]',
  '[class*="consent"] button[class*="agree"]',
  '[class*="gdpr"] button[class*="accept"]',
  '[id*="cookie"] button[class*="accept"]',
  '.cc-dismiss',
  '.cc-accept',
  '#accept-cookies',
  'button[data-accept-cookies]',
  '[aria-label*="Accept"]',
  '[aria-label*="Akzeptieren"]',
  'button:has-text("Accept")',
  'button:has-text("Akzeptieren")',
  'button:has-text("Alle akzeptieren")',
];

// Component detection patterns
const COMPONENT_PATTERNS = [
  { type: 'hero', selectors: ['section.hero', '[class*="hero"]', 'header + section:first-of-type'] },
  { type: 'navigation', selectors: ['nav', 'header nav', '[role="navigation"]'] },
  { type: 'footer', selectors: ['footer', '[role="contentinfo"]'] },
  { type: 'card', selectors: ['[class*="card"]', 'article', '.card'] },
  { type: 'form', selectors: ['form', '[class*="form"]'] },
  { type: 'testimonial', selectors: ['[class*="testimonial"]', '[class*="review"]', 'blockquote'] },
  { type: 'faq', selectors: ['[class*="faq"]', '[class*="accordion"]', 'details'] },
  { type: 'cta', selectors: ['[class*="cta"]', '[class*="call-to-action"]'] },
  { type: 'feature', selectors: ['[class*="feature"]', '[class*="benefit"]'] },
  { type: 'pricing', selectors: ['[class*="pricing"]', '[class*="plan"]'] },
  { type: 'logo-grid', selectors: ['[class*="logo"]', '[class*="partner"]', '[class*="client"]'] },
  { type: 'image-gallery', selectors: ['[class*="gallery"]', '[class*="carousel"]', '[class*="slider"]'] },
  { type: 'video', selectors: ['video', 'iframe[src*="youtube"]', 'iframe[src*="vimeo"]', '[class*="video"]'] },
  { type: 'social', selectors: ['[class*="social"]', '[class*="share"]'] },
  { type: 'newsletter', selectors: ['[class*="newsletter"]', '[class*="subscribe"]'] },
];

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    url: null,
    output: './screenshots',
    viewports: ['desktop'],
    fullPage: false,
    click: null,
    hover: null,
    scrollTo: null,
    wait: 1000,
    handlePopups: true,
    analyze: false,
    name: null,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case '--url':
        options.url = nextArg;
        i++;
        break;
      case '--output':
        options.output = nextArg;
        i++;
        break;
      case '--viewports':
        options.viewports = nextArg.split(',').map((v) => v.trim());
        i++;
        break;
      case '--full-page':
        options.fullPage = true;
        break;
      case '--click':
        options.click = nextArg;
        i++;
        break;
      case '--hover':
        options.hover = nextArg;
        i++;
        break;
      case '--scroll-to':
        options.scrollTo = nextArg;
        i++;
        break;
      case '--wait':
        options.wait = parseInt(nextArg, 10);
        i++;
        break;
      case '--no-popups':
        options.handlePopups = false;
        break;
      case '--analyze':
        options.analyze = true;
        break;
      case '--name':
        options.name = nextArg;
        i++;
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
    }
  }

  return options;
}

function printHelp() {
  console.log(`
Playwright Capture - Browser automation for screenshot capture

Usage:
  node scripts/playwright-capture.mjs --url <url> [options]

Options:
  --url           Target URL (required)
  --output        Output directory (default: ./screenshots)
  --viewports     Comma-separated: desktop,tablet,mobile (default: desktop)
  --full-page     Capture full scrollable page
  --click         CSS selector to click before capture
  --hover         CSS selector to hover before capture
  --scroll-to     CSS selector to scroll into view
  --wait          Ms to wait before capture (default: 1000)
  --no-popups     Skip popup dismissal
  --analyze       Output component analysis JSON
  --name          Custom name prefix for screenshots
  --help, -h      Show this help message

Examples:
  node scripts/playwright-capture.mjs --url https://example.com
  node scripts/playwright-capture.mjs --url https://example.com --viewports desktop,mobile --full-page
  node scripts/playwright-capture.mjs --url https://example.com --click ".menu-toggle" --wait 500
`);
}

/**
 * Extract domain name from URL for file naming
 */
function getDomainName(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '').replace(/\./g, '-');
  } catch {
    return 'screenshot';
  }
}

/**
 * Handle cookie banners and popups
 */
async function handlePopups(page) {
  for (const selector of POPUP_SELECTORS) {
    try {
      const element = await page.$(selector);
      if (element) {
        await element.click({ timeout: 1000 });
        console.log(`  Dismissed popup: ${selector}`);
        await page.waitForTimeout(300);
        return true;
      }
    } catch {
      // Selector not found or click failed, continue
    }
  }
  return false;
}

/**
 * Analyze page for components
 */
async function analyzeComponents(page) {
  const components = [];

  for (const pattern of COMPONENT_PATTERNS) {
    for (const selector of pattern.selectors) {
      try {
        const elements = await page.$$(selector);
        if (elements.length > 0) {
          const info = await page.evaluate(
            ({ sel, count }) => {
              const els = document.querySelectorAll(sel);
              return Array.from(els).map((el) => ({
                tagName: el.tagName.toLowerCase(),
                className: el.className,
                id: el.id,
                rect: el.getBoundingClientRect(),
                hasImage: el.querySelector('img') !== null,
                hasVideo: el.querySelector('video, iframe') !== null,
                textPreview: el.textContent?.slice(0, 100)?.trim(),
              }));
            },
            { sel: selector, count: elements.length }
          );

          components.push({
            type: pattern.type,
            selector,
            count: elements.length,
            instances: info,
          });
          break; // Found this component type, move to next
        }
      } catch {
        // Selector failed, continue
      }
    }
  }

  return components;
}

/**
 * Capture screenshots at a specific viewport
 */
async function captureAtViewport(page, viewport, options, domain) {
  const { width, height } = VIEWPORTS[viewport] || VIEWPORTS.desktop;
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(500); // Allow layout to settle

  const screenshots = [];
  const baseName = options.name || domain;
  const timestamp = new Date().toISOString().split('T')[0];

  // Viewport screenshot
  const viewportPath = join(options.output, `${baseName}-${viewport}-viewport.png`);
  await page.screenshot({ path: viewportPath, fullPage: false });
  screenshots.push({ path: viewportPath, viewport, type: 'viewport', width, height });
  console.log(`  Captured: ${viewportPath}`);

  // Full page screenshot if requested
  if (options.fullPage) {
    const fullPath = join(options.output, `${baseName}-${viewport}-full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    const fullHeight = await page.evaluate(() => document.body.scrollHeight);
    screenshots.push({ path: fullPath, viewport, type: 'full-page', width, height: fullHeight });
    console.log(`  Captured: ${fullPath}`);
  }

  return screenshots;
}

/**
 * Main capture function
 */
async function capture(options) {
  if (!options.url) {
    console.error('Error: --url is required');
    printHelp();
    process.exit(1);
  }

  // Ensure output directory exists
  if (!existsSync(options.output)) {
    await mkdir(options.output, { recursive: true });
  }

  const domain = getDomainName(options.url);
  const result = {
    url: options.url,
    capturedAt: new Date().toISOString(),
    viewports: options.viewports,
    screenshots: [],
    components: [],
    interactions: [],
  };

  console.log(`\nCapturing: ${options.url}`);
  console.log(`Viewports: ${options.viewports.join(', ')}`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORTS.desktop,
    locale: 'de-CH',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  try {
    // Navigate to URL
    console.log('\nLoading page...');
    await page.goto(options.url, { waitUntil: 'networkidle', timeout: 30000 });

    // Handle popups if enabled
    if (options.handlePopups) {
      console.log('Checking for popups...');
      await handlePopups(page);
    }

    // Wait for any animations
    await page.waitForTimeout(options.wait);

    // Perform interactions if specified
    if (options.click) {
      console.log(`\nClicking: ${options.click}`);
      try {
        await page.click(options.click, { timeout: 5000 });
        result.interactions.push({ type: 'click', selector: options.click, success: true });
        await page.waitForTimeout(options.wait);
      } catch (e) {
        console.log(`  Warning: Could not click ${options.click}`);
        result.interactions.push({ type: 'click', selector: options.click, success: false, error: e.message });
      }
    }

    if (options.hover) {
      console.log(`\nHovering: ${options.hover}`);
      try {
        await page.hover(options.hover, { timeout: 5000 });
        result.interactions.push({ type: 'hover', selector: options.hover, success: true });
        await page.waitForTimeout(options.wait);
      } catch (e) {
        console.log(`  Warning: Could not hover ${options.hover}`);
        result.interactions.push({ type: 'hover', selector: options.hover, success: false, error: e.message });
      }
    }

    if (options.scrollTo) {
      console.log(`\nScrolling to: ${options.scrollTo}`);
      try {
        await page.locator(options.scrollTo).scrollIntoViewIfNeeded({ timeout: 5000 });
        result.interactions.push({ type: 'scroll', selector: options.scrollTo, success: true });
        await page.waitForTimeout(options.wait);
      } catch (e) {
        console.log(`  Warning: Could not scroll to ${options.scrollTo}`);
        result.interactions.push({ type: 'scroll', selector: options.scrollTo, success: false, error: e.message });
      }
    }

    // Capture at each viewport
    console.log('\nCapturing screenshots...');
    for (const viewport of options.viewports) {
      if (!VIEWPORTS[viewport]) {
        console.log(`  Warning: Unknown viewport "${viewport}", skipping`);
        continue;
      }
      const screenshots = await captureAtViewport(page, viewport, options, domain);
      result.screenshots.push(...screenshots);
    }

    // Analyze components if requested
    if (options.analyze) {
      console.log('\nAnalyzing components...');
      result.components = await analyzeComponents(page);
      console.log(`  Found ${result.components.length} component types`);

      // Save analysis JSON
      const analysisPath = join(options.output, `${domain}-analysis.json`);
      await writeFile(analysisPath, JSON.stringify(result, null, 2));
      console.log(`  Analysis saved: ${analysisPath}`);
    }

    console.log('\nCapture complete!');
    console.log(`Screenshots: ${result.screenshots.length}`);
    if (options.analyze) {
      console.log(`Components: ${result.components.map((c) => c.type).join(', ')}`);
    }
  } catch (error) {
    console.error(`\nError capturing ${options.url}:`, error.message);
    result.error = error.message;
  } finally {
    await browser.close();
  }

  return result;
}

// Run if called directly
const __filename = fileURLToPath(import.meta.url);
const isMain = process.argv[1] === __filename;

if (isMain) {
  const options = parseArgs();
  capture(options).then((result) => {
    if (result.error) {
      process.exit(1);
    }
  });
}

export { capture, VIEWPORTS, COMPONENT_PATTERNS };
