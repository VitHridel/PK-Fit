import { getPost, getPosts } from '@/lib/blog'

describe('blog data layer', () => {
    afterEach(() => {
        vi.unstubAllEnvs()
    })

    it('returns mock posts newest first', async () => {
        vi.stubEnv('BLOG_SOURCE', 'mock')
        const posts = await getPosts()
        expect(posts.length).toBeGreaterThanOrEqual(5)
        const dates = posts.map((post) => post.publishedAt)
        expect(dates).toEqual([...dates].sort().reverse())
    })

    it('finds a post by slug and returns null for an unknown slug', async () => {
        vi.stubEnv('BLOG_SOURCE', 'mock')
        const [first] = await getPosts()
        expect((await getPost(first.slug))?.title).toBe(first.title)
        expect(await getPost('neexistuje')).toBeNull()
    })

    it('throws when no source is configured', async () => {
        vi.stubEnv('BLOG_SOURCE', '')
        await expect(getPosts()).rejects.toThrow(
            'BLOG_SOURCE not configured — CMS integration required',
        )
        await expect(getPost('cokoliv')).rejects.toThrow('BLOG_SOURCE not configured')
    })
})
