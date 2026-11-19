import { sanitizeArticleHtml } from '@/lib/sanitize'

const CMS = 'https://main-craft.cms-craft.com/uploads/foto.jpg'

describe('sanitizeArticleHtml', () => {
    it('removes scripts, iframes, style blocks and their content', () => {
        const html = sanitizeArticleHtml(
            '<p>a</p><script>alert(1)</script><iframe src="https://evil"></iframe><style>p{color:red}</style><p>b</p>',
        )
        expect(html).toBe('<p>a</p><p>b</p>')
    })

    it('removes event handlers, style attributes and javascript: links', () => {
        const html = sanitizeArticleHtml(
            `<p style="color:red" onclick="x()">text</p><img src="${CMS}" alt="foto" onerror="alert(1)"><a href="javascript:alert(1)">klik</a>`,
        )
        expect(html).not.toMatch(/style=|onclick|onerror|javascript:/)
        expect(html).toContain('<p>text</p>')
        expect(html).toContain('klik')
    })

    it('keeps the article structure', () => {
        const input =
            '<h2>Nadpis</h2><h3>Pod</h3><h4>Pod pod</h4><p><strong>tučně</strong> a <em>kurzíva</em></p>' +
            '<ul><li>jedna</li></ul><ol><li>dva</li></ol><blockquote><p>citace</p></blockquote>' +
            `<figure><img src="${CMS}" alt="foto" width="800" height="600"><figcaption>popisek</figcaption></figure>` +
            '<p><a href="/blog/jiny-clanek">interní</a></p>'
        // sanitize-html serialises void elements as `<img ... />`
        expect(sanitizeArticleHtml(input)).toBe(input.replace('height="600">', 'height="600" />'))
    })

    it('opens external links in a new tab with noopener noreferrer', () => {
        const html = sanitizeArticleHtml('<a href="https://example.com/x">venku</a>')
        expect(html).toBe(
            '<a href="https://example.com/x" rel="noopener noreferrer" target="_blank">venku</a>',
        )
    })

    it('drops images that are not hosted on the CMS', () => {
        expect(sanitizeArticleHtml('<p>x</p><img src="https://evil.example/a.jpg" alt="a">')).toBe(
            '<p>x</p>',
        )
    })
})
