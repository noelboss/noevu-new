import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('Loading noevu.ch...');
await page.goto('https://noevu.ch', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(8000);

const result = await page.evaluate(() => {
  const elements = document.querySelectorAll('*');
  const withBackdrop = [];

  for (const el of elements) {
    const styles = getComputedStyle(el);
    const bf = styles.backdropFilter;

    if (bf && bf !== 'none') {
      withBackdrop.push({
        tag: el.tagName,
        class: (el.className || '').toString().slice(0, 80),
        backdropFilter: bf,
        backgroundColor: styles.backgroundColor,
        borderRadius: styles.borderRadius
      });
    }
  }
  return withBackdrop;
});

console.log('Elements with backdrop-filter:', result.length);
console.log(JSON.stringify(result, null, 2));
await browser.close();
