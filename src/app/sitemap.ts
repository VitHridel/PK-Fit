import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { getPosts } from '@/lib/blog'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts()
    return [
        { url: `${site.url}/`, changeFrequency: 'monthly', priority: 1 },
        { url: `${site.url}/blog`, changeFrequency: 'weekly', priority: 0.7 },
        ...posts.map((post) => ({
            url: `${site.url}/blog/${post.slug}`,
            lastModified: post.updatedAt ?? post.publishedAt,
            priority: 0.6,
        })),
        {
            url: `${site.url}/zasady-zpracovani-osobnich-udaju-gdpr`,
            changeFrequency: 'yearly',
            priority: 0.2,
        },
    ]
}
