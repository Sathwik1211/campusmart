import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:5173/admin/login', { waitUntil: 'load' });
        // Click sign in directly since it's pre-filled
        await page.click('button[type="submit"]');

        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // Go to specific edit page directly since we seeded the DB
        await page.goto('http://localhost:5173/admin/pages', { waitUntil: 'networkidle2' });
        // The digital-transformation page is likely not the very first, we need to find it and click Edit
        // But we can just use the API to update it instead of simulating UI interactions if it's too complex
        // Wait, the test plan says to use the UI. Let's just find the edit button.
        await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('tbody tr'));
            const dtRow = rows.find(r => r.textContent.includes('/digital-transformation'));
            if (dtRow) {
                const editBtn = dtRow.querySelector('button');
                if (editBtn) editBtn.click();
            }
        });

        await new Promise(r => setTimeout(r, 1000));

        // Type into Hero Title input
        await page.evaluate(() => {
            const labels = Array.from(document.querySelectorAll('label'));
            const titleLabel = labels.find(l => l.textContent.includes('Hero Title'));
            if (titleLabel && titleLabel.nextElementSibling) {
                titleLabel.nextElementSibling.value = 'TEST DIGITAL CMS';
                titleLabel.nextElementSibling.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });

        await new Promise(r => setTimeout(r, 500));

        // Click Save All Changes
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const saveBtn = btns.find(b => b.textContent.includes('Save All Changes'));
            if (saveBtn) {
                saveBtn.click();
            }
        });

        await new Promise(r => setTimeout(r, 2000));

        // Visit the frontend page
        await page.goto('http://localhost:5173/digital-transformation', { waitUntil: 'networkidle2' });
        await page.screenshot({ path: 'frontend-digital-transformation.png' });

        console.log('Update completed and screenshot saved.');

    } catch (e) {
        console.log('Puppeteer error:', e);
    } finally {
        await browser.close();
    }
})();
