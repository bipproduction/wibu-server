import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://id.pngtree.com/free-png-vectors/gambar-kartun-lucu');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  await browser.close();
})();