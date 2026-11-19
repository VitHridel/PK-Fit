import { expect, type Page, test } from '@playwright/test'

function mainNav(page: Page) {
    return page.getByRole('navigation', { name: 'Hlavní navigace' })
}

test.describe('desktop side nav', () => {
    test.skip(({ isMobile }) => isMobile, 'desktop only')

    test('is fixed and follows the section in view', async ({ page }) => {
        await page.goto('/')
        const nav = mainNav(page)
        await expect(nav).toBeVisible()
        expect(await nav.evaluate((el) => getComputedStyle(el).position)).toBe('fixed')

        await page.locator('#kurzy').scrollIntoViewIfNeeded()
        await page.evaluate(() =>
            document.getElementById('kurzy')?.scrollIntoView({ block: 'start' }),
        )
        await expect(nav.getByRole('link', { name: 'kurzy' })).toHaveAttribute(
            'aria-current',
            'location',
        )
        await expect(nav.locator('[aria-current]')).toHaveCount(1)
    })

    test('marks blog as current on /blog and links back to home sections', async ({ page }) => {
        await page.goto('/blog')
        const nav = mainNav(page)
        await expect(nav.getByRole('link', { name: 'blog' })).toHaveAttribute(
            'aria-current',
            'location',
        )

        await nav.getByRole('link', { name: 'kurzy' }).click()
        await expect(page).toHaveURL(/\/#kurzy$/)
        await expect(page.locator('#kurzy')).toBeInViewport()
    })
})

test.describe('mobile pill nav', () => {
    test.skip(({ isMobile }) => !isMobile, 'mobile only')

    test('shows the primary items and hides the side nav', async ({ page }) => {
        await page.goto('/')
        const nav = mainNav(page)
        await expect(nav).toHaveCount(1)
        for (const label of ['služby', 'kurzy', 'o mně', 'kontakt']) {
            await expect(nav.getByRole('link', { name: label })).toBeVisible()
        }
        await expect(nav.getByRole('button', { name: 'Další položky' })).toBeVisible()
    })

    test('hides on scroll down and returns on scroll up', async ({ page }) => {
        await page.goto('/')
        const nav = mainNav(page)
        const viewport = page.viewportSize()!

        await page.mouse.wheel(0, 600)
        await expect(nav).toHaveAttribute('inert', '')
        await expect
            .poll(async () => (await nav.boundingBox())?.y ?? 0)
            .toBeGreaterThanOrEqual(viewport.height)
        await expect(nav.getByRole('link', { name: 'kurzy' })).not.toBeInViewport()

        await page.mouse.wheel(0, -200)
        await expect(nav).not.toHaveAttribute('inert', '')
        await expect(nav.getByRole('link', { name: 'kurzy' })).toBeInViewport()
    })

    test('overflow menu lists the remaining items and closes on Escape', async ({ page }) => {
        await page.goto('/')
        const nav = mainNav(page)
        const more = nav.getByRole('button', { name: 'Další položky' })
        await more.click()
        await expect(more).toHaveAttribute('aria-expanded', 'true')
        for (const label of ['semináře', 'reference', 'blog']) {
            await expect(nav.getByRole('link', { name: label })).toBeVisible()
        }
        await expect(nav.getByRole('button', { name: /^Přepnout na/ })).toBeVisible()

        await page.keyboard.press('Escape')
        await expect(more).toHaveAttribute('aria-expanded', 'false')
        await expect(nav.getByRole('link', { name: 'semináře' })).toBeHidden()
        await expect(more).toBeFocused()
    })
})

test('footer carries contact details, socials and the GDPR link', async ({ page }) => {
    await page.goto('/')
    const footer = page.getByRole('contentinfo')
    await expect(footer).toContainText('IČ: 07044143')
    await expect(footer.locator('a[href="tel:+420720458858"]')).toHaveCount(1)
    await expect(footer.locator('a[href="mailto:info@pk-fit.cz"]')).toHaveCount(1)
    await expect(footer.locator('a[href="/zasady-zpracovani-osobnich-udaju-gdpr"]')).toHaveCount(1)
    await expect(footer.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
        'href',
        'https://instagram.com/test',
    )
    await expect(footer.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
        'href',
        'https://facebook.com/test',
    )
})
