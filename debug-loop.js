import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:5173/admin/login', { waitUntil: 'networkidle2' });

        // Just click login
        await page.click('button[type="submit"]');

        await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => { });
        console.log('Navigated to:', page.url());

        await page.goto('http://localhost:5173/admin/pages', { waitUntil: 'load' });
        await new Promise(r => setTimeout(r, 2000));

        // Take screenshot
        await page.screenshot({ path: 'puppeteer-error.png' });

        // Extract error from Vite overlay shadow DOM
        const errorText = await page.evaluate(() => {
            const overlay = document.querySelector('vite-error-overlay');
            if (overlay && overlay.shadowRoot) {
                return overlay.shadowRoot.textContent;
            }
            return 'No Vite overlay found';
        });

        console.log('Vite Error Overlay Data:', errorText);
    } catch (e) {
        console.log('Puppeteer error:', e);
    } finally {
        await browser.close();
    }
})();
