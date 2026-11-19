import sanitizeHtml from 'sanitize-html'

// Server-only: used by server components when rendering CMS HTML.

const CMS_HOST = 'main-craft.cms-craft.com'
const SITE_HOSTS = new Set(['pk-fit.cz', 'www.pk-fit.cz'])

function isExternal(href: string | undefined): boolean {
    if (!href) return false
    try {
        const url = new URL(href)
        return (
            (url.protocol === 'http:' || url.protocol === 'https:') && !SITE_HOSTS.has(url.hostname)
        )
    } catch {
        return false // relative URL
    }
}

function isCmsImage(src: string | undefined): boolean {
    if (!src) return false
    try {
        const url = new URL(src)
        return url.protocol === 'https:' && url.hostname === CMS_HOST
    } catch {
        return false
    }
}

const options: sanitizeHtml.IOptions = {
    allowedTags: [
        'h2',
        'h3',
        'h4',
        'p',
        'br',
        'ul',
        'ol',
        'li',
        'a',
        'img',
        'blockquote',
        'strong',
        'em',
        'figure',
        'figcaption',
    ],
    allowedAttributes: {
        a: ['href', 'rel', 'target'],
        img: ['src', 'alt', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowProtocolRelative: false,
    disallowedTagsMode: 'discard',
    transformTags: {
        a: (tagName, attribs) => {
            const { href } = attribs
            const result: sanitizeHtml.Attributes = {}
            if (href) result.href = href
            if (isExternal(href)) {
                result.rel = 'noopener noreferrer'
                result.target = '_blank'
            }
            return { tagName, attribs: result }
        },
    },
    exclusiveFilter: (frame) => frame.tag === 'img' && !isCmsImage(frame.attribs.src),
}

/**
 * Allow-list sanitizer for article bodies coming from the CMS (defense in depth even though
 * the CMS is our own): headings, paragraphs, lists, links, CMS-hosted images, quotes, emphasis.
 */
export function sanitizeArticleHtml(html: string): string {
    return sanitizeHtml(html, options)
}
