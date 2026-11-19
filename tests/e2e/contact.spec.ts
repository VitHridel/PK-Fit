import { expect, test } from '@playwright/test'

test('empty submit shows Czech field errors, focuses the first one and sends nothing', async ({
    page,
}) => {
    await page.goto('/#kontakt')
    const posts: string[] = []
    page.on('request', (request) => {
        if (request.method() === 'POST') posts.push(request.url())
    })
    const form = page.getByRole('form', { name: 'Kontaktní formulář' })
    await form.getByRole('button', { name: 'odeslat' }).click()

    await expect(form.getByText('Jméno je povinný údaj')).toBeVisible()
    await expect(form.getByText('E-mail je povinný údaj')).toBeVisible()
    await expect(
        form.getByText('Prosím napište něco o sobě a s čím potřebujete pomoci'),
    ).toBeVisible()
    await expect(form.getByLabel('Jméno a příjmení *')).toBeFocused()
    await expect(form.getByLabel('Jméno a příjmení *')).toHaveAttribute('aria-invalid', 'true')
    expect(posts).toEqual([])
})

test('valid submission shows the confirmation', async ({ page }) => {
    await page.goto('/#kontakt')
    const form = page.getByRole('form', { name: 'Kontaktní formulář' })
    await form.getByLabel('Jméno a příjmení *').fill('Jana Nováková')
    await form.getByLabel('E-mailová adresa *').fill('jana@example.com')
    await form.getByLabel('S čím potřebujete pomoci? *').fill('Bolí mě záda.\nDruhý řádek.')
    // Cloudflare's always-pass test key issues a token shortly after the widget loads.
    await expect(form.locator('input[name="cf-turnstile-response"]')).toHaveValue(/.+/, {
        timeout: 20_000,
    })
    await form.getByRole('button', { name: 'odeslat' }).click()

    const kontakt = page.locator('#kontakt')
    await expect(kontakt.getByText('Děkuji, zpráva je odeslaná')).toBeVisible({ timeout: 15_000 })
    await kontakt.getByRole('button', { name: 'odeslat další zprávu' }).click()
    await expect(kontakt.getByLabel('Jméno a příjmení *')).toHaveValue('')
})

test('blocked Turnstile shows a clear fallback with phone and e-mail', async ({ page }) => {
    await page.route('https://challenges.cloudflare.com/**', (route) => route.abort())
    await page.goto('/#kontakt')
    const form = page.getByRole('form', { name: 'Kontaktní formulář' })
    await form.getByLabel('Jméno a příjmení *').fill('Jana Nováková')
    await form.getByLabel('E-mailová adresa *').fill('jana@example.com')
    await form.getByLabel('S čím potřebujete pomoci? *').fill('Ahoj')
    await form.getByRole('button', { name: 'odeslat' }).click()
    await expect(form.getByRole('alert')).toContainText(
        'Ověření proti robotům se nenačetlo. Napište mi prosím na info@pk-fit.cz nebo zavolejte na +420 720 458 858.',
    )
})

test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false })

    test('shows the noscript contact note', async ({ page }) => {
        await page.goto('/')
        // getByText skips <noscript> content, so locate the note by structure.
        const note = page.locator('#kontakt noscript p')
        await expect(note).toBeVisible()
        await expect(note).toHaveText(
            'Formulář potřebuje zapnutý JavaScript. Napište mi na info@pk-fit.cz nebo zavolejte na +420 720 458 858.',
        )
    })
})
