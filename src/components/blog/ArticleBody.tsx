import { sanitizeArticleHtml } from '@/lib/sanitize'

/** Renders CMS article HTML after server-side sanitizing; styled by `.article-body` in globals.css. */
export function ArticleBody({ html }: { html: string }) {
    return (
        <div
            className="article-body"
            // Safe: the HTML passes the allow-list sanitizer above before reaching the client.
            dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(html) }}
        />
    )
}
