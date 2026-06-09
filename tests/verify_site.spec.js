const { test, expect } = require('@playwright/test');
const path = require('path');

test('Verify FlareSpace website UI and localization', async ({ page }) => {
  // Use file protocol to open local index.html
  const filePath = `file://${path.resolve('index.html')}`;
  await page.goto(filePath);

  // 1. Verify Language Overlay
  await page.screenshot({ path: 'screenshots/01-lang-overlay.png' });
  await expect(page.locator('#lang-overlay')).toBeVisible();

  // 2. Select English and Verify Dark Theme
  await page.click('button:has-text("English")');
  await expect(page.locator('#lang-overlay')).not.toBeVisible();
  await expect(page.locator('.logo')).toHaveText('FlareSpace');
  await page.screenshot({ path: 'screenshots/02-hero-dark-en.png' });

  // 3. Toggle Theme to Light
  await page.click('#theme-btn');
  await expect(page.locator('body')).toHaveClass(/light-theme/);
  await page.screenshot({ path: 'screenshots/03-hero-light-en.png' });

  // 4. Scroll Down to Projects
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // Wait for animation
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/04-projects-en.png' });

  // 5. Reload and Test Russian
  await page.reload();
  await page.click('button:has-text("Русский")');
  await expect(page.locator('.subtitle')).toContainText('FlareSpace — различные звезды космоса');
  await page.screenshot({ path: 'screenshots/05-hero-ru.png' });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/06-projects-ru.png' });
});
