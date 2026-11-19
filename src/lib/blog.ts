/**
 * Blog data layer — the only module the CMS (Craft) integration replaces.
 * Keep the exported names and the `Post` shape when swapping the source.
 */
export type Post = {
    slug: string
    title: string
    excerpt: string
    /** ISO date-time */
    publishedAt: string
    updatedAt?: string
    coverImage?: { url: string; width: number; height: number; alt: string }
    /** Article body as HTML from the CMS; always render through `sanitizeArticleHtml`. */
    body: string
}

async function loadPosts(): Promise<Post[]> {
    if (process.env.BLOG_SOURCE === 'mock') {
        // Mock posts must never reach production. `next build`/`next start` run with
        // NODE_ENV=production, so local builds and e2e opt in explicitly with ALLOW_MOCK_BLOG=1.
        if (process.env.NODE_ENV === 'production' && process.env.ALLOW_MOCK_BLOG !== '1') {
            throw new Error(
                'BLOG_SOURCE=mock is not allowed in production (set ALLOW_MOCK_BLOG=1 for local builds)',
            )
        }
        // Dynamic import keeps the mock content out of bundles that don't use it.
        const { mockPosts } = await import('@/content/blog-mock')
        return mockPosts
    }
    throw new Error('BLOG_SOURCE not configured — CMS integration required')
}

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
    const posts = await loadPosts()
    return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export async function getPost(slug: string): Promise<Post | null> {
    const posts = await loadPosts()
    return posts.find((post) => post.slug === slug) ?? null
}
