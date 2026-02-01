import { chromium } from 'playwright';

const URLS = [
  { name: 'homepage', url: 'https://noevu.ch' },
  { name: 'blog', url: 'https://noevu.ch/blog' },
  { name: 'blog-post-squarespace', url: 'https://noevu.ch/blog/squarespace-erfahrungen-fuer-schweizer-kmu' },
  { name: 'cms-check', url: 'https://noevu.ch/blog/cms-check-schweiz' },
];

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'de-CH',
  });

  for (const { name, url } of URLS) {
    console.log(`Capturing: ${name}`);
    const page = await context.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      // Close cookie banner if present
      try {
        await page.click('[class*="cookie"] button, [class*="consent"] button', { timeout: 2000 });
      } catch (e) {
        // No cookie banner
      }

      // Wait a bit for any animations
      await page.waitForTimeout(1000);

      // Full page screenshot
      await page.screenshot({
        path: `screenshots/${name}-full.png`,
        fullPage: true,
      });

      // Above the fold screenshot
      await page.screenshot({
        path: `screenshots/${name}-viewport.png`,
        fullPage: false,
      });

      console.log(`✓ Captured ${name}`);
    } catch (error) {
      console.error(`✗ Failed to capture ${name}:`, error.message);
    }

    await page.close();
  }

  await browser.close();
  console.log('\nAll screenshots captured!');
}

captureScreenshots();
