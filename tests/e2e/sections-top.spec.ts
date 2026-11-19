import { expect, test } from '@playwright/test'

const serviceTitles = [
    'Diagnostika pohybového aparátu',
    'Mobilita a stabilita',
    'Využití metody DNS (prof. Pavel Kolář)',
    'Správné držení těla',
    'Síla CORE',
    'Cvičení pro každého',
]

test('all six services are readable without horizontal scrolling', async ({ page }) => {
    await page.goto('/')
    const services = page.locator('#sluzby')
    await expect(services.getByRole('heading', { level: 2, name: 'Služby' })).toBeVisible()
    const width = page.viewportSize()!.width
    for (const title of serviceTitles) {
        const heading = services.getByRole('heading', { name: title })
        await heading.scrollIntoViewIfNeeded()
        await expect(heading).toBeVisible()
        const box = (await heading.boundingBox())!
        expect(box.x).toBeGreaterThanOrEqual(0)
        expect(box.x + box.width).toBeLessThanOrEqual(width)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
    )
})

test('contact CTA links to the phone and the contact form', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByRole('region', {
        name: 'Máte specifický problém nebo s cvičením teprve začínáte?',
    })
    await expect(cta.locator('a[href="tel:+420720458858"]')).toHaveText('+420 720 458 858')
    await expect(cta.getByRole('link', { name: 'kontaktní formulář' })).toHaveAttribute(
        'href',
        '#kontakt',
    )
})

test('gallery photos have alt text; four on desktop, three on mobile', async ({
    page,
    isMobile,
}) => {
    await page.goto('/')
    const gallery = page.getByRole('region', { name: 'Galerie' })
    const images = gallery.locator('img')
    await expect(images).toHaveCount(4)
    for (const alt of await images.evaluateAll((els) => els.map((el) => el.getAttribute('alt')))) {
        expect(alt?.trim()).toBeTruthy()
    }
    await gallery.scrollIntoViewIfNeeded()
    await expect(gallery.locator('img:visible')).toHaveCount(isMobile ? 3 : 4)
})
