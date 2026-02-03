#!/usr/bin/env node
/**
 * Extract computed styles from all major components on live noevu.ch
 * Compare with local implementation
 */

import { chromium } from 'playwright';

const LIVE_URL = 'https://noevu.ch';

async function extractAllStyles() {
  console.log('🔍 Extracting styles from live site...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(LIVE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(8000);

  // Dismiss cookie banner
  try {
    await page.click('[class*="cookie"] button[class*="accept"]', { timeout: 3000 });
    await page.waitForTimeout(1000);
  } catch {}

  const styles = await page.evaluate(() => {
    const results = {};

    // Helper to get computed styles
    const getStyles = (el, props) => {
      if (!el) return null;
      const computed = getComputedStyle(el);
      const result = {};
      for (const prop of props) {
        result[prop] = computed.getPropertyValue(prop);
      }
      return result;
    };

    const commonProps = [
      'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing',
      'color', 'background-color', 'background', 'backdrop-filter',
      'padding', 'margin', 'border-radius', 'box-shadow', 'border',
      'display', 'gap', 'align-items', 'justify-content'
    ];

    // 1. HERO SUBHEADLINE (pill/tag)
    const allH1 = document.querySelectorAll('h1');
    for (const h1 of allH1) {
      if (h1.textContent.includes('Webagentur für professionelles')) {
        results.heroSubheadline = {
          text: h1.textContent.slice(0, 60) + '...',
          ...getStyles(h1, commonProps)
        };
        break;
      }
    }

    // 2. HERO HEADLINE
    const allH2 = document.querySelectorAll('h2');
    for (const h2 of allH2) {
      if (h2.textContent.includes('entwickeln')) {
        results.heroHeadline = {
          text: h2.textContent.slice(0, 50),
          ...getStyles(h2, commonProps),
          '-webkit-background-clip': getComputedStyle(h2).webkitBackgroundClip,
          '-webkit-text-fill-color': getComputedStyle(h2).webkitTextFillColor
        };

        // Check strong/em elements
        const strong = h2.querySelector('strong');
        if (strong) {
          results.heroHeadlineStrong = {
            text: strong.textContent,
            ...getStyles(strong, commonProps),
            'background-size': getComputedStyle(strong).backgroundSize,
            'background-position': getComputedStyle(strong).backgroundPosition
          };
        }
        break;
      }
    }

    // 3. NAVIGATION
    const navList = document.querySelector('.header-nav-list');
    if (navList) {
      results.navList = getStyles(navList, commonProps);

      // Check for ::after pseudo element styles via nav wrapper
      const navWrapper = document.querySelector('.header-nav-wrapper');
      if (navWrapper) {
        results.navWrapper = getStyles(navWrapper, commonProps);
      }
    }

    // 4. NAV LINK
    const navLink = document.querySelector('.header-nav-item > a, .header-nav-item > button');
    if (navLink) {
      results.navLink = {
        text: navLink.textContent.slice(0, 20),
        ...getStyles(navLink, commonProps)
      };
    }

    // 5. NAV DROPDOWN
    const dropdown = document.querySelector('.header-nav-folder-content');
    if (dropdown) {
      results.navDropdown = getStyles(dropdown, commonProps);
    }

    // 6. PRIMARY BUTTON (orange CTA)
    const primaryBtns = document.querySelectorAll('a, button');
    for (const btn of primaryBtns) {
      const bg = getComputedStyle(btn).backgroundColor;
      if (bg.includes('255, 107, 48') || bg.includes('ff6b30')) {
        results.primaryButton = {
          text: btn.textContent.slice(0, 30).trim(),
          ...getStyles(btn, commonProps)
        };
        break;
      }
    }

    // 7. SECONDARY BUTTON
    const secondaryBtns = document.querySelectorAll('.sqs-block-button-element--secondary, .btn--border');
    if (secondaryBtns.length > 0) {
      results.secondaryButton = {
        text: secondaryBtns[0].textContent.slice(0, 30).trim(),
        ...getStyles(secondaryBtns[0], commonProps)
      };
    }

    // 8. LOGO GALLERY TITLE
    const logoTitle = document.querySelector('.fe-block h2, .fe-block h3');
    for (const h of document.querySelectorAll('h2, h3')) {
      if (h.textContent.includes('professionelles Webdesign')) {
        results.logoGalleryTitle = {
          text: h.textContent.slice(0, 50),
          ...getStyles(h, commonProps)
        };
        break;
      }
    }

    // 9. CARD/TESTIMONIAL
    const cards = document.querySelectorAll('.summary-item, .list-item');
    if (cards.length > 0) {
      results.card = getStyles(cards[0], commonProps);
    }

    // 10. SECTION WITH DARK BACKGROUND
    const darkSections = document.querySelectorAll('section, .page-section');
    for (const section of darkSections) {
      const bg = getComputedStyle(section).backgroundColor;
      if (bg.includes('35, 96, 83') || bg.includes('22, 54, 47')) {
        results.darkSection = {
          ...getStyles(section, ['background-color', 'background', 'color', 'padding'])
        };
        break;
      }
    }

    // 11. FOOTER
    const footer = document.querySelector('footer, #footer');
    if (footer) {
      results.footer = getStyles(footer, ['background-color', 'background', 'color', 'padding']);
    }

    // 12. TOP BAR
    const topBar = document.querySelector('.header-announcement-bar-wrapper, [class*="announcement"]');
    if (topBar) {
      results.topBar = getStyles(topBar, commonProps);
    }

    return results;
  });

  await browser.close();
  return styles;
}

// Format output
function formatStyles(styles) {
  console.log('=' .repeat(70));
  console.log('LIVE SITE COMPUTED STYLES');
  console.log('='.repeat(70));

  for (const [component, props] of Object.entries(styles)) {
    console.log(`\n📦 ${component.toUpperCase()}`);
    console.log('-'.repeat(50));

    if (!props) {
      console.log('  (not found)');
      continue;
    }

    for (const [prop, value] of Object.entries(props)) {
      if (value && value !== 'none' && value !== 'normal' && value !== '0px' && value !== 'rgba(0, 0, 0, 0)') {
        // Truncate long values
        const displayValue = value.length > 80 ? value.slice(0, 77) + '...' : value;
        console.log(`  ${prop}: ${displayValue}`);
      }
    }
  }
}

// Run
const styles = await extractAllStyles();
formatStyles(styles);

console.log('\n\n✅ Extraction complete!\n');
