import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { getPosts } from '@/lib/blog'

describe('sitemap and robots', () => {
    beforeEach(() => {
        vi.stubEnv('BLOG_SOURCE', 'mock')
    })
    afterEach(() => {
        vi.unstubAllEnvs()
    })

    it('lists home, GDPR, blog and every post', async () => {
        const urls = (await sitemap()).map((entry) => entry.url)
        expect(urls).toContain('https://pk-fit.cz/')
        expect(urls).toContain('https://pk-fit.cz/zasady-zpracovani-osobnich-udaju-gdpr')
        expect(urls).toContain('https://pk-fit.cz/blog')
        for (const post of await getPosts()) {
            expect(urls).toContain(`https://pk-fit.cz/blog/${post.slug}`)
        }
    })

    it('allows everything and points to the sitemap', () => {
        expect(robots()).toEqual({
            rules: { userAgent: '*', allow: '/' },
            sitemap: 'https://pk-fit.cz/sitemap.xml',
        })
    })
})
