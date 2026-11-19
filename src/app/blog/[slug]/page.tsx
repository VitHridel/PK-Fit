import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArticleBody } from '@/components/blog/ArticleBody'
import { JsonLd } from '@/components/JsonLd'
import { blogPage } from '@/content/home'
import { getPost, getPosts } from '@/lib/blog'
import { formatLongDate } from '@/lib/dates'
import { blogPostingJsonLd } from '@/lib/jsonld'
import { pageMetadata } from '@/lib/metadata'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
    const posts = await getPosts()
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPost((await params).slug)
    if (!post) return {}
    return pageMetadata({
        title: post.title,
        description: post.excerpt,
        path: `/blog/${post.slug}`,
        type: 'article',
        image: post.coverImage && {
            url: post.coverImage.url,
            width: post.coverImage.width,
            height: post.coverImage.height,
            alt: post.coverImage.alt,
        },
    })
}

export default async function PostPage({ params }: Props) {
    const post = await getPost((await params).slug)
    if (!post) notFound()

    return (
        <article className="px-gutter pt-32 pb-section">
            <JsonLd data={blogPostingJsonLd(post)} />
            <div className="mx-auto max-w-[44rem]">
                <Link
                    href="/blog"
                    className="text-sm text-muted-foreground no-underline hover:text-foreground"
                >
                    ← {blogPage.back}
                </Link>
                <header className="mt-8 border-b border-rule pb-8">
                    <time
                        dateTime={post.publishedAt}
                        className="text-sm text-muted-foreground tabular-nums"
                    >
                        {formatLongDate(post.publishedAt)}
                    </time>
                    <h1 className="mt-2 text-section font-bold">{post.title}</h1>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                        {post.excerpt}
                    </p>
                </header>
                {post.coverImage && (
                    <Image
                        src={post.coverImage.url}
                        alt={post.coverImage.alt}
                        width={post.coverImage.width}
                        height={post.coverImage.height}
                        fetchPriority="high"
                        loading="eager"
                        sizes="(min-width: 768px) 44rem, 100vw"
                        className="mt-10 aspect-[3/2] w-full rounded-lg object-cover"
                    />
                )}
                <div className="mt-10">
                    <ArticleBody html={post.body} />
                </div>
            </div>
        </article>
    )
}
