// screenshot.js
const puppeteer = require('puppeteer');

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the local server URL
  const url = 'https://id.pngtree.com/free-png-vectors/gambar-kartun-lucu';
  console.log(`Opening ${url}`);
  await page.goto(url, { waitUntil: 'networkidle2' }); // Wait until the page is fully loaded

  // Take a screenshot and save it as 'screenshot.png'
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  console.log('Screenshot saved as screenshot.png');

  // Close the browser
  await browser.close();
})();