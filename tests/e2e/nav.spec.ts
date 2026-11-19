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
        for (const label of ['služby', 'kurzy', 'blog', 'kontakt']) {
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
        const menu = page.locator(`[id="${await more.getAttribute('aria-controls')}"]`)
        const menuLabels = (await menu.getByRole('link').allTextContents()).map((t) => t.trim())
        expect(menuLabels).toEqual(['o mně', 'semináře', 'reference'])
        await expect(menu.getByRole('button', { name: /^Přepnout na/ })).toBeVisible()

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

for (const width of [320, 375]) {
    test(`mobile pill items stay on one line at ${width}px`, async ({ page, isMobile }) => {
        test.skip(!isMobile, 'mobile only')
        await page.setViewportSize({ width, height: 640 })
        await page.goto('/')
        const nav = mainNav(page)
        for (const label of ['služby', 'kurzy', 'blog', 'kontakt']) {
            const lines = await nav.getByRole('link', { name: label }).evaluate((el) => {
                const range = document.createRange()
                range.selectNodeContents(el)
                return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size
            })
            expect(lines, `"${label}" wraps`).toBe(1)
        }
        const box = await nav.locator('ul').last().boundingBox()
        expect(box!.x).toBeGreaterThanOrEqual(0)
        expect(box!.x + box!.width).toBeLessThanOrEqual(width)
    })
}

test.describe('desktop side nav logo', () => {
    test.skip(({ isMobile }) => isMobile, 'desktop only')

    test('a small logo appears under the nav once the header logo scrolls away', async ({
        page,
    }) => {
        await page.goto('/')
        const navLogo = mainNav(page).locator('[data-nav-logo]')
        await expect(navLogo).toHaveAttribute('inert', '')
        await expect(navLogo).toHaveCSS('opacity', '0')

        await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }))
        await expect(navLogo).not.toHaveAttribute('inert', '')
        await expect(navLogo).toHaveCSS('opacity', '1')
        const logoLink = navLogo.getByRole('link', { name: 'PK-FIT – úvodní stránka' })
        await expect(logoLink).toHaveAttribute('href', '/#uvod')

        // On the homepage it takes the visitor back up to the hero.
        await logoLink.click()
        await expect
            .poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 })
            .toBeLessThan(2)
        await expect(navLogo).toHaveAttribute('inert', '')
    })
})

test('element ids are unique (inline SVG gradients must not collide)', async ({ page }) => {
    await page.goto('/')
    const duplicates = await page.evaluate(() => {
        const seen = new Map<string, number>()
        for (const el of document.querySelectorAll('[id]'))
            seen.set(el.id, (seen.get(el.id) ?? 0) + 1)
        return [...seen].filter(([, count]) => count > 1).map(([id]) => id)
    })
    expect(duplicates).toEqual([])
})
