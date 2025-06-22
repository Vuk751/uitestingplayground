import { test, expect } from '@playwright/test';


test.describe('main', () => {
    test('Scrollbar Test', async ({ page }) => {
        await page.goto('http://uitestingplayground.com');
        await expect(page.locator('#title')).toHaveText(/UI Test Automation/);
        await page.getByText('Scrollbars').click();
        await expect(page.locator('h3')).toHaveText(/Scrollbars/);
        await page.locator('#hidingButton').click();
    });
    test('Load Delay', async ({page}) => {
        await page.goto('http://uitestingplayground.com');
        await page.getByText('Load Delay').click();
        await page.getByRole('button', { name: 'Button Appearing After Delay' }).click();
    })
    test('Dynamic Table', async ({page}) => {
        await page.goto('http://uitestingplayground.com');
        await page.getByRole('link', {name: 'Dynamic Table'}).click();
        const row = page.getByRole('row').filter({ hasText: 'Chrome' });
        const percentText = await row.getByRole('cell').filter({ hasText: '%' }).innerText();
        const yellowValue = await page.locator('.bg-warning').innerText();
        expect('Chrome CPU: ' + percentText).toEqual(yellowValue);
    })
});