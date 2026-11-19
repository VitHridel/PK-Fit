import { expect, test } from '@playwright/test'

const pages = ['/', '/blog', '/blog/co-je-metoda-dns', '/zasady-zpracovani-osobnich-udaju-gdpr']

for (const path of pages) {
    test(`SEO basics on ${path}`, async ({ page }) => {
        const response = await page.goto(path)
        expect(response?.status()).toBe(200)
        await expect(page.locator('h1')).toHaveCount(1)

        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
        expect(canonical).toMatch(/^https:\/\/pk-fit\.cz(\/|$)/)
        for (const property of ['og:title', 'og:description', 'og:image']) {
            const content = await page
                .locator(`meta[property="${property}"]`)
                .getAttribute('content')
            expect(content, property).toBeTruthy()
        }
        for (const json of await page
            .locator('script[type="application/ld+json"]')
            .allTextContents()) {
            expect(() => JSON.parse(json)).not.toThrow()
        }
    })
}

test('unknown URL shows the 404 page with a way home', async ({ page }) => {
    const response = await page.goto('/tahle-stranka-neexistuje')
    expect(response?.status()).toBe(404)
    await expect(page.getByText('Ups... tady nic není')).toBeVisible()
    await expect(
        page.getByRole('main').getByRole('link', { name: /zpátky na hlavní stránku/ }),
    ).toHaveAttribute('href', '/')
})
