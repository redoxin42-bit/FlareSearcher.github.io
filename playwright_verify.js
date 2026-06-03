const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load the local index.html
  const filePath = 'file://' + path.resolve('index.html');
  await page.goto(filePath);

  // Check if language overlay is visible
  const isOverlayVisible = await page.isVisible('#lang-overlay');
  console.log('Language overlay visible:', isOverlayVisible);

  // Screenshot before selection
  await page.screenshot({ path: 'before_selection.png' });

  // Click English button
  await page.click('button.lang-btn:has-text("English")');
  console.log('Clicked English button');

  // Check if balls are added to the DOM (they should be)
  const ballsExist = await page.evaluate(() => {
    return document.querySelectorAll('.selection-ball').length === 2;
  });
  console.log('Balls exist in DOM:', ballsExist);

  // Wait for animation and overlay to hide
  await page.waitForTimeout(1200);

  const isOverlayHidden = await page.evaluate(() => {
    return document.getElementById('lang-overlay').classList.contains('hidden');
  });
  console.log('Language overlay hidden after selection:', isOverlayHidden);

  // Check links
  const vpnRepo = await page.getAttribute('a.btn-git', 'href');
  console.log('VPN Repo link:', vpnRepo);
  const vpnTg = await page.getAttribute('a.btn-tg', 'href');
  console.log('VPN Telegram link:', vpnTg);

  // Screenshot after selection
  await page.screenshot({ path: 'after_selection.png' });

  await browser.close();
})();
