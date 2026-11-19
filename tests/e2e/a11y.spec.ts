import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

const pages = [
    '/',
    '/blog',
    '/blog/co-je-metoda-dns',
    '/zasady-zpracovani-osobnich-udaju-gdpr',
    '/tahle-stranka-neexistuje',
]

/** Scroll through the page so every scroll reveal has run before axe checks colours. */
async function revealEverything(page: Page) {
    await page.evaluate(async () => {
        for (let y = 0; y <= document.body.scrollHeight; y += 400) {
            window.scrollTo(0, y)
            await new Promise((resolve) => setTimeout(resolve, 40))
        }
        window.scrollTo(0, 0)
    })
    // Let the hero entrance finish (the arrow's bob loops forever and is ignored).
    await page.waitForFunction(() =>
        document
            .getAnimations()
            .every(
                (animation) =>
                    animation.playState !== 'running' ||
                    animation.effect?.getTiming().iterations === Infinity,
            ),
    )
    await page.waitForTimeout(800)
}

for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`${colorScheme} theme`, () => {
        test.use({ colorScheme })

        for (const path of pages) {
            test(`no WCAG 2.2 AA violations on ${path}`, async ({ page }) => {
                await page.goto(path, { waitUntil: 'load' })
                await revealEverything(page)
                const results = await new AxeBuilder({ page })
                    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
                    // Third-party Turnstile iframe is outside our control.
                    .exclude('.cf-turnstile')
                    .analyze()
                const summary = results.violations.map((violation) => ({
                    id: violation.id,
                    nodes: violation.nodes.map((node) => node.target.join(' ')),
                }))
                expect(summary).toEqual([])
            })
        }
    })
}
