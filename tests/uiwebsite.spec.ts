import { test, expect } from '@playwright/test';


test('has title', async ({ page }) => {
    await page.goto('http://uitestingplayground.com')
    await expect(page.locator('#title')).toHaveText(/UI Test Automation/)
})