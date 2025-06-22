import {test, expect, Page} from '@playwright/test';


const visitAndOpen = async (page: Page, name: string) => {
    await page.goto('http://uitestingplayground.com');
    await page.getByRole('link', {name: name}).click();
}

test.describe('UI Testing Playground', () => {
    test('Scrollbar Test', async ({ page }) => {
        await visitAndOpen(page, 'Scrollbars')
        await page.locator('#hidingButton').click();
    });
    test('Load Delay', async ({page}) => {
        await visitAndOpen(page, 'Load Delay');
        await page.getByRole('button', { name: 'Button Appearing After Delay' }).click();
    })
    test('Dynamic Table', async ({page}) => {
        await visitAndOpen(page, 'Dynamic Table');
        const row = page.getByRole('row').filter({ hasText: 'Chrome' });
        const percentText = await row.getByRole('cell').filter({ hasText: '%' }).innerText();
        const yellowValue = await page.locator('.bg-warning').innerText();
        expect('Chrome CPU: ' + percentText).toEqual(yellowValue);
    })
    test('Visibility', async ({page}) => {
        await visitAndOpen(page, 'Visibility');
        await page.locator('#hideButton').click();
        const buttonTypes = ['removedButton', 'zeroWidthButton', 'overlappedButton', 'transparentButton', 'invisibleButton', 'notdisplayedButton', 'offscreenButton']
        for (const buttonType of buttonTypes) {
         console.log(`${buttonType}: ` + await page.locator(`#${buttonType}`).isVisible())
        }
    })

    test('Animated Button', async ({page}) => {
        await visitAndOpen(page, 'Animated Button')
        await page.locator('#animationButton').click();
        await page.waitForSelector('.spin', {state: 'detached'});
        await page.locator('#movingTarget').click();
    })
    test('Progress Bar', async ({page}) => {
        await visitAndOpen(page, 'Progress Bar')
        await page.locator('#startButton').click();
        const progressBar = page.locator('#progressBar');
        await expect(progressBar).toHaveText(/7[0-9]%|80%/, { timeout: 25000 });
        await page.locator('#stopButton').click();
    })
    test('Sample App', async ({page}) => {
        await visitAndOpen(page, 'Sample App');
    })
});