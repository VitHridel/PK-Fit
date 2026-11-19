import { expect, test } from '@playwright/test'

test('hero copy is in the server-rendered HTML', async ({ request }) => {
    const html = await (await request.get('/')).text()
    expect(html).toContain('Zdravé')
    expect(html).toContain('bolesti')
    expect(html).toContain(
        'Pomáhám od bolesti a učím prevenci, aby se pohyb stal radostí, ne povinností.',
    )
})

test.describe('reduced motion', () => {
    test.use({ reducedMotion: 'reduce' })

    test('shows the hero text and photo immediately', async ({ page }) => {
        await page.goto('/', { waitUntil: 'load' })
        const opacities = await page.evaluate(() =>
            [...document.querySelectorAll('h1 .hero-word, [data-hero-photo]')].map(
                (el) => getComputedStyle(el).opacity,
            ),
        )
        expect(opacities.length).toBeGreaterThan(4)
        expect(new Set(opacities)).toEqual(new Set(['1']))
    })
})

test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false })

    test('scroll-reveal content is visible', async ({ page }) => {
        await page.goto('/')
        const reveal = page.locator('[data-reveal]').last()
        await expect(reveal).toHaveCount(1)
        expect(await reveal.evaluate((el) => getComputedStyle(el).opacity)).toBe('1')
    })
})

test('the arrow scrolls to services', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Přejít na služby' }).click()
    await expect(page.locator('#sluzby')).toBeInViewport()
})
