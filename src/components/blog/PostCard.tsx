import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/blog'
import { formatLongDate } from '@/lib/dates'

/** A post preview; the whole card is one link. */
export function PostCard({ post, headingLevel = 3 }: { post: Post; headingLevel?: 2 | 3 }) {
    const Heading = headingLevel === 2 ? 'h2' : 'h3'
    return (
        <article className="group">
            <Link href={`/blog/${post.slug}`} className="block rounded-lg no-underline">
                {post.coverImage && (
                    <Image
                        src={post.coverImage.url}
                        alt=""
                        width={post.coverImage.width}
                        height={post.coverImage.height}
                        sizes="(min-width: 1024px) 18rem, (min-width: 768px) 45vw, 100vw"
                        className="mb-4 aspect-[4/3] w-full rounded-lg object-cover transition-opacity group-hover:opacity-90"
                    />
                )}
                <time
                    dateTime={post.publishedAt}
                    className="text-sm text-muted-foreground tabular-nums"
                >
                    {formatLongDate(post.publishedAt)}
                </time>
                <Heading className="mt-1 text-title font-semibold text-foreground underline-offset-4 group-hover:underline">
                    {post.title}
                </Heading>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {post.excerpt}
                </p>
            </Link>
        </article>
    )
}
