import { expect, test } from '@playwright/test'

const DARK_BACKGROUND = 'rgb(12, 18, 18)' // #0C1212

test.describe('dark preference without a stored choice', () => {
    test.use({ colorScheme: 'dark' })

    test('applies the dark theme before first paint', async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        // Read right at DOMContentLoaded: the class must come from the blocking script, not from hydration.
        const atDomReady = await page.evaluate(() => document.documentElement.className)
        expect(atDomReady).toContain('dark')
        const background = await page.evaluate(
            () => getComputedStyle(document.body).backgroundColor,
        )
        expect(background).toBe(DARK_BACKGROUND)
    })
})

test.describe('theme toggle', () => {
    test.use({ colorScheme: 'light' })

    test('switches the theme and remembers it after reload', async ({ page }) => {
        await page.goto('/')
        const html = page.locator('html')
        await expect(html).not.toHaveClass(/dark/)

        const toggle = page
            .getByRole('button', { name: 'Přepnout na tmavý režim' })
            .filter({ visible: true })
        await toggle.click()
        await expect(html).toHaveClass(/dark/)
        await expect(
            page
                .getByRole('button', { name: 'Přepnout na světlý režim' })
                .filter({ visible: true }),
        ).toBeVisible()

        await page.reload()
        await expect(html).toHaveClass(/dark/)
    })
})

test('skip link is the first tab stop and moves focus to main content', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skipLink = page.getByRole('link', { name: 'Přeskočit na obsah' })
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeVisible()

    await page.keyboard.press('Enter')
    await expect(page.locator('#obsah')).toBeFocused()
})
