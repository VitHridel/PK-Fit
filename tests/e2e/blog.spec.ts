import { expect, test } from '@playwright/test'

test('blog lists posts and opens an article', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible()
    const cards = page.getByRole('article')
    expect(await cards.count()).toBeGreaterThanOrEqual(5)

    const firstTitle = (await cards.first().getByRole('heading').textContent())!.trim()
    await cards.first().getByRole('link').click()
    await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(firstTitle)
})

test('unknown article returns 404', async ({ request }) => {
    const response = await request.get('/blog/neexistuje')
    expect(response.status()).toBe(404)
})

test('homepage teaser links to the latest posts and the blog', async ({ page }) => {
    await page.goto('/')
    const teaser = page.getByRole('region', { name: 'Z blogu' })
    await expect(teaser.getByRole('article')).toHaveCount(4)
    await expect(teaser.getByRole('link', { name: /přejít na blog/ })).toHaveAttribute(
        'href',
        '/blog',
    )
})
