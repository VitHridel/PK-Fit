import type { Metadata } from 'next'
import { PostCard } from '@/components/blog/PostCard'
import { blogPage } from '@/content/home'
import { getPosts } from '@/lib/blog'

export const revalidate = 3600

export const metadata: Metadata = {
    title: blogPage.title,
    description: blogPage.description,
}

export default async function BlogPage() {
    const posts = await getPosts()
    return (
        <div className="px-gutter pt-32 pb-section">
            <div className="mx-auto max-w-content">
                <h1 className="text-hero font-bold">{blogPage.title}</h1>
                <p className="mt-4 max-w-[55ch] text-lg text-muted-foreground">
                    {blogPage.description}
                </p>
                {posts.length === 0 ? (
                    <p className="mt-12 border-t border-rule pt-8 text-muted-foreground">
                        {blogPage.empty}
                    </p>
                ) : (
                    <div className="mt-12 grid gap-x-8 gap-y-14 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <PostCard key={post.slug} post={post} headingLevel={2} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
