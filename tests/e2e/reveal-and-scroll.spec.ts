import { expect, test } from '@playwright/test'

test('the hero arrow scrolls the hero completely out of view', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Přejít na služby' }).click()
    // Wait for the smooth scroll to settle, then nothing of the hero (or its hairline) may show.
    const heroBottomNow = () =>
        page.locator('[data-hero]').evaluate((el) => el.getBoundingClientRect().bottom)
    await expect.poll(heroBottomNow, { timeout: 5000 }).toBeLessThan(100)
    await page.waitForTimeout(800)
    const heroBottom = await page
        .locator('[data-hero]')
        .evaluate((el) => el.getBoundingClientRect().bottom)
    expect(heroBottom).toBeLessThanOrEqual(1)
})

test('services list items reveal one after another, only once the list is in view', async ({
    page,
}) => {
    await page.goto('/')
    const items = page.locator('#sluzby ol > li')
    await expect(items).toHaveCount(6)

    // List top just entering at the very bottom of the viewport: nothing revealed yet.
    await page.evaluate(() => {
        const list = document.querySelector('#sluzby ol')!
        const top = list.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: top - window.innerHeight * 0.95, behavior: 'instant' })
    })
    await page.waitForTimeout(700)
    expect(Number(await items.first().evaluate((el) => getComputedStyle(el).opacity))).toBe(0)

    // Bring the list into view: the first item leads, the last follows.
    await page.evaluate(() => {
        const list = document.querySelector('#sluzby ol')!
        const top = list.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: top - window.innerHeight * 0.3, behavior: 'instant' })
    })
    await page.waitForTimeout(250)
    const [first, last] = await Promise.all([
        items.first().evaluate((el) => Number(getComputedStyle(el).opacity)),
        items.last().evaluate((el) => Number(getComputedStyle(el).opacity)),
    ])
    expect(first).toBeGreaterThan(last)
    for (const item of await items.all()) {
        await expect.poll(() => item.evaluate((el) => getComputedStyle(el).opacity)).toBe('1')
    }
})
