import { expect, test } from '@playwright/test'

test('contact form still works after client-side navigation away and back', async ({ page }) => {
    await page.goto('/')
    // Client-side navigation: footer GDPR link, then the page's own link back home.
    await page
        .getByRole('contentinfo')
        .getByRole('link', { name: /Zásady zpracování/ })
        .click()
    await expect(page).toHaveURL(/zasady-zpracovani/)
    await page.getByRole('main').getByRole('link', { name: 'zpátky na hlavní stránku' }).click()
    await expect(page).toHaveURL(/\/$/)

    const form = page.getByRole('form', { name: 'Kontaktní formulář' })
    await form.scrollIntoViewIfNeeded()
    await form.getByLabel('Jméno a příjmení *').fill('Jana Nováková')
    await form.getByLabel('E-mailová adresa *').fill('jana@example.com')
    await form.getByLabel('S čím potřebujete pomoci? *').fill('Ahoj')
    await expect(form.locator('input[name="cf-turnstile-response"]')).toHaveValue(/.+/, {
        timeout: 20_000,
    })
    await form.getByRole('button', { name: 'odeslat' }).click()
    await expect(page.getByText('Děkuji, zpráva je odeslaná')).toBeVisible({ timeout: 15_000 })
})

test('submitting before the bot check has a token offers phone and e-mail', async ({ page }) => {
    // A Turnstile stand-in that loads but never issues a token.
    await page.route('https://challenges.cloudflare.com/**', (route) =>
        route.fulfill({
            contentType: 'application/javascript',
            body: 'window.turnstile={render:function(){return "w"},reset:function(){},remove:function(){}}',
        }),
    )
    await page.goto('/#kontakt')
    const form = page.getByRole('form', { name: 'Kontaktní formulář' })
    await page.waitForFunction(() => 'turnstile' in window)
    await form.getByLabel('Jméno a příjmení *').fill('Jana Nováková')
    await form.getByLabel('E-mailová adresa *').fill('jana@example.com')
    await form.getByLabel('S čím potřebujete pomoci? *').fill('Ahoj')
    await form.getByRole('button', { name: 'odeslat' }).click()
    const alert = form.getByRole('alert')
    await expect(alert).toContainText('info@pk-fit.cz')
    await expect(alert).toContainText('+420 720 458 858')
})

test.describe('zoomed to 400 % (320 × 256)', () => {
    test.use({ viewport: { width: 320, height: 256 } })

    test('every scroll reveal becomes visible', async ({ page }) => {
        await page.goto('/')
        await page.evaluate(async () => {
            // Instant jumps: the page uses smooth scrolling, which would lag behind the loop.
            for (let y = 0; y <= document.body.scrollHeight; y += 120) {
                window.scrollTo({ top: y, behavior: 'instant' })
                await new Promise((resolve) => setTimeout(resolve, 30))
            }
        })
        await page.waitForTimeout(1000)
        const hidden = await page.evaluate(() =>
            [...document.querySelectorAll('[data-reveal]')]
                .filter((el) => Number(getComputedStyle(el).opacity) < 1)
                .map(
                    (el) =>
                        el.closest('section')?.id ||
                        el.closest('section')?.getAttribute('aria-labelledby'),
                ),
        )
        expect(hidden).toEqual([])
    })
})

test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false })

    test('the contact form cannot be submitted (no personal data in a GET URL)', async ({
        page,
    }) => {
        await page.goto('/')
        await expect(page.locator('#kontakt input[name="fullname"]')).toBeHidden()
        await expect(page.locator('#kontakt button[type="submit"]')).toBeHidden()
        await expect(page.locator('#kontakt form')).toHaveAttribute('method', 'post')
    })

    test('all references and all past courses are visible', async ({ page }) => {
        await page.goto('/')
        await expect(page.locator('#reference figure')).toHaveCount(5)
        for (const figure of await page.locator('#reference figure').all()) {
            await expect(figure).toBeVisible()
        }
        for (const course of await page.locator('#kurzy-past ~ ul li').all()) {
            await expect(course).toBeVisible()
        }
        await expect(page.getByRole('button', { name: 'zobrazit všechny reference' })).toBeHidden()
    })
})
