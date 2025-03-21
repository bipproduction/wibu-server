import puppeteer from 'puppeteer';

(async () => {
  try {
    // Launch a headless browser
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the local server URL
    const url = 'https://id.pngtree.com/free-png-vectors/gambar-kartun-lucu';
    console.log(`Opening ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' }); // Wait until the page is fully loaded

    // Take a screenshot and save it as 'screenshot.png'
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'screenshot.png', fullPage: true });

    console.log('Screenshot saved as screenshot.png');

    // Close the browser
    console.log('Closing browser...');
    await browser.close();
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();