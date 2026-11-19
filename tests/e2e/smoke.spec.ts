import { expect, test } from '@playwright/test'

test('homepage responds and renders a heading', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toBeVisible()
})
