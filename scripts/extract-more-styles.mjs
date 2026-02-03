import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('Loading noevu.ch...');
await page.goto('https://noevu.ch', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(8000);

// Scroll to bottom to load footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(2000);

try {
  await page.click('[class*="cookie"] button[class*="accept"]', { timeout: 3000 });
} catch {}

const styles = await page.evaluate(() => {
  const results = {};
  const getStyles = (el, props) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = {};
    props.forEach(p => { r[p] = cs.getPropertyValue(p); });
    return r;
  };

  // Find elements with dark green/gradient background (footer area)
  document.querySelectorAll('*').forEach(el => {
    const bg = getComputedStyle(el).backgroundColor;
    const bgImage = getComputedStyle(el).backgroundImage;
    // Look for gradient backgrounds
    if (bgImage.includes('gradient') && !results.gradientSection) {
      results.gradientSection = {
        tag: el.tagName,
        class: (el.className || '').toString().slice(0, 60),
        backgroundImage: bgImage.slice(0, 150),
        backgroundColor: bg,
        color: getComputedStyle(el).color
      };
    }
  });

  // Testimonials/blog cards with glass effect
  document.querySelectorAll('.summary-item').forEach((el, i) => {
    if (i === 0) {
      results.summaryCard = {
        tag: el.tagName,
        class: (el.className || '').toString().slice(0, 80),
        ...getStyles(el, ['background-color', 'backdrop-filter', 'border-radius', 'padding', 'box-shadow'])
      };
    }
  });

  // CTA form section (often has special styling)
  document.querySelectorAll('form, [class*="form"]').forEach(el => {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg !== 'rgba(0, 0, 0, 0)' && !results.formSection) {
      results.formSection = {
        tag: el.tagName,
        class: (el.className || '').toString().slice(0, 60),
        ...getStyles(el, ['background-color', 'backdrop-filter', 'border-radius', 'padding', 'box-shadow'])
      };
    }
  });

  // Section titles (h2/h3 with specific styling)
  document.querySelectorAll('h2').forEach((h, i) => {
    if (i < 5 && !results['sectionTitle' + i]) {
      results['sectionTitle' + i] = {
        text: h.textContent.slice(0, 40),
        ...getStyles(h, ['font-size', 'font-family', 'font-weight', 'color', 'line-height'])
      };
    }
  });

  // Orange CTA cards
  document.querySelectorAll('*').forEach(el => {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg.includes('255, 107, 48') && !results.orangeCtaCard) {
      results.orangeCtaCard = {
        tag: el.tagName,
        class: (el.className || '').toString().slice(0, 60),
        ...getStyles(el, ['background-color', 'border-radius', 'padding', 'box-shadow'])
      };
    }
  });

  return results;
});

console.log(JSON.stringify(styles, null, 2));
await browser.close();
