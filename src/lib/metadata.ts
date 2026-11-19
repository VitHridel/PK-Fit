import type { Metadata } from 'next'
import { site } from '@/content/site'

const DEFAULT_IMAGE = { url: '/og-image.png', width: 1200, height: 630, alt: site.brand }

type PageMeta = {
    title: string
    description: string
    /** Path of the page, used for the canonical URL and og:url. */
    path: string
    type?: 'website' | 'article'
    image?: { url: string; width?: number; height?: number; alt?: string }
    /** Use the title as-is instead of the "%s | PK-FIT" template. */
    absoluteTitle?: boolean
}

/**
 * Complete per-page metadata. Next merges `openGraph` shallowly, so every page sets the whole
 * object (title, description, url, image) rather than inheriting parts from the layout.
 */
export function pageMetadata({
    title,
    description,
    path,
    type = 'website',
    image,
    absoluteTitle,
}: PageMeta): Metadata {
    const images = [image ?? DEFAULT_IMAGE]
    return {
        title: absoluteTitle ? { absolute: title } : title,
        description,
        alternates: { canonical: path },
        openGraph: {
            type,
            locale: 'cs_CZ',
            siteName: site.brand,
            url: path,
            title,
            description,
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: images.map((i) => i.url),
        },
    }
}
