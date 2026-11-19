import { handleContact } from '@/lib/contact/handle'
import { getPosts } from '@/lib/blog'

describe('review fixes', () => {
    afterEach(() => vi.unstubAllEnvs())

    it('verification failure offers phone and e-mail', async () => {
        const data = new FormData()
        data.set('cf-turnstile-response', 'expired')
        const state = await handleContact(data, {
            verify: vi.fn().mockResolvedValue(false),
            send: vi.fn(),
        })
        expect(state.message).toContain('info@pk-fit.cz')
        expect(state.message).toContain('+420 720 458 858')
    })

    it('refuses mock posts in production unless explicitly allowed', async () => {
        vi.stubEnv('BLOG_SOURCE', 'mock')
        vi.stubEnv('NODE_ENV', 'production')
        await expect(getPosts()).rejects.toThrow(/mock/i)
        vi.stubEnv('ALLOW_MOCK_BLOG', '1')
        await expect(getPosts()).resolves.not.toHaveLength(0)
    })

    it('homepage regenerates at least hourly so finished courses move to past', async () => {
        const page = await import('@/app/page')
        expect(page.revalidate).toBeLessThanOrEqual(3600)
    })
})
