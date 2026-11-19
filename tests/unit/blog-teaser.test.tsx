import { render, screen } from '@testing-library/react'
import { BlogTeaser } from '@/components/sections/BlogTeaser'
import type { Post } from '@/lib/blog'

const post = (n: number): Post => ({
    slug: `clanek-${n}`,
    title: `Článek ${n}`,
    excerpt: `Perex ${n}`,
    publishedAt: `2026-0${n}-01T08:00:00Z`,
    body: '<p>x</p>',
})

describe('BlogTeaser', () => {
    it('shows up to four posts, each card a single link, plus a link to the blog', () => {
        render(<BlogTeaser posts={[1, 2, 3, 4, 5, 6].map(post)} />)
        const cards = screen.getAllByRole('article')
        expect(cards).toHaveLength(4)
        cards.forEach((card, index) => {
            const links = card.querySelectorAll('a')
            expect(links).toHaveLength(1)
            expect(links[0]).toHaveAttribute('href', `/blog/clanek-${index + 1}`)
        })
        expect(screen.getByRole('link', { name: 'Kontaktujte mne' })).toHaveAttribute(
            'href',
            '#kontakt',
        )
        expect(screen.getByRole('link', { name: /přejít na blog/ })).toHaveAttribute(
            'href',
            '/blog',
        )
    })

    it('shows only the intro and the blog link when there are no posts', () => {
        render(<BlogTeaser posts={[]} />)
        expect(screen.queryAllByRole('article')).toHaveLength(0)
        expect(screen.getByText(/Zaujalo Vás něco/)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /přejít na blog/ })).toHaveAttribute(
            'href',
            '/blog',
        )
    })
})
