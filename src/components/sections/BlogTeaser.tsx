import Link from 'next/link'
import { PostCard } from '@/components/blog/PostCard'
import { Reveal, RevealItem, RevealList } from '@/components/motion/Reveal'
import { blogTeaser } from '@/content/home'
import type { Post } from '@/lib/blog'

export function BlogTeaser({ posts }: { posts: Post[] }) {
    const latest = posts.slice(0, 4)
    return (
        <section aria-labelledby="blog-teaser-title" className="px-gutter py-section">
            <div className="mx-auto max-w-content">
                <Reveal>
                    <h2 id="blog-teaser-title" className="text-section font-semibold">
                        {blogTeaser.title}
                    </h2>
                    <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
                        {blogTeaser.before}
                        <a
                            href="#kontakt"
                            className="font-semibold text-primary-ink underline underline-offset-3"
                        >
                            {blogTeaser.contactLink}
                        </a>
                        {blogTeaser.after}
                    </p>
                </Reveal>
                {latest.length > 0 && (
                    <RevealList
                        as="div"
                        className="mt-10 grid gap-x-6 gap-y-10 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {latest.map((post) => (
                            <RevealItem key={post.slug} as="div">
                                <PostCard post={post} />
                            </RevealItem>
                        ))}
                    </RevealList>
                )}
                <Link
                    href="/blog"
                    className="mt-10 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-[0.9375rem] font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
                >
                    {blogTeaser.cta} →
                </Link>
            </div>
        </section>
    )
}
