import { render } from '@testing-library/react'
import { JsonLd } from '@/components/JsonLd'
import type { Course } from '@/content/courses'
import { blogPostingJsonLd, courseEventJsonLd, homeJsonLd } from '@/lib/jsonld'

const image = { src: '/_next/static/media/kurz.jpg', width: 400, height: 300 }
const course = (id: string, startDate: string, endDate?: string): Course => ({
    id,
    title: `Kurz ${id}`,
    place: 'Resort Český les',
    startDate,
    endDate,
    description: 'Popis kurzu',
    link: `https://example.com/${id}`,
    image,
})

describe('courseEventJsonLd', () => {
    it('maps a course to a schema.org Event', () => {
        expect(courseEventJsonLd(course('vikend', '2027-02-05', '2027-02-07'))).toMatchObject({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: 'Kurz vikend',
            description: 'Popis kurzu',
            startDate: '2027-02-05',
            endDate: '2027-02-07',
            location: { '@type': 'Place', name: 'Resort Český les' },
            url: 'https://example.com/vikend',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            image: 'https://pk-fit.cz/_next/static/media/kurz.jpg',
        })
    })

    it('uses the start date as end date for single-day courses', () => {
        expect(courseEventJsonLd(course('den', '2027-03-01')).endDate).toBe('2027-03-01')
    })
})

describe('homeJsonLd', () => {
    it('describes Petra and PK-FIT and emits Events only for upcoming courses', () => {
        const items = homeJsonLd(
            [course('old', '2026-01-10'), course('next', '2027-01-10')],
            new Date('2026-11-19T10:00:00Z'),
        )
        const types = items.map((item) => item['@type'])
        expect(types).toEqual(['Person', 'ProfessionalService', 'Event'])
        expect(items[2].name).toBe('Kurz next')
        expect(JSON.stringify(items)).not.toContain('Review')
        expect(items[0]).toMatchObject({ name: 'Petra Konrádová', jobTitle: 'fitness trenérka' })
    })
})

describe('blogPostingJsonLd', () => {
    it('maps a post', () => {
        expect(
            blogPostingJsonLd({
                slug: 'clanek',
                title: 'Článek',
                excerpt: 'Perex',
                publishedAt: '2026-11-10T08:00:00Z',
                body: '',
            }),
        ).toMatchObject({
            '@type': 'BlogPosting',
            headline: 'Článek',
            description: 'Perex',
            datePublished: '2026-11-10T08:00:00Z',
            dateModified: '2026-11-10T08:00:00Z',
            url: 'https://pk-fit.cz/blog/clanek',
            author: { '@type': 'Person', name: 'Petra Konrádová' },
        })
    })
})

describe('JsonLd', () => {
    it('escapes < so data cannot close the script element', () => {
        const { container } = render(
            <JsonLd data={{ name: '</script><script>alert(1)</script>' }} />,
        )
        const script = container.querySelector('script[type="application/ld+json"]')!
        expect(script.innerHTML).not.toContain('</script')
        expect(JSON.parse(script.innerHTML)).toEqual({ name: '</script><script>alert(1)</script>' })
    })
})
