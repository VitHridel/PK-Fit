import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Courses } from '@/components/sections/Courses'
import type { Course } from '@/content/courses'

const image = { src: '/course.jpg', width: 400, height: 300 }

function course(id: string, startDate: string, endDate?: string): Course {
    return {
        id,
        title: `Kurz ${id}`,
        place: 'Praha',
        startDate,
        endDate,
        description: `Popis ${id}`,
        link: `https://example.com/${id}`,
        image,
    }
}

const now = new Date('2026-11-19T10:00:00Z')
const past = [
    course('p1', '2026-10-01'),
    course('p2', '2026-06-01', '2026-06-03'),
    course('p3', '2026-03-01'),
    course('p4', '2025-09-21'),
]

describe('Courses', () => {
    it('lists the upcoming course and shows three past ones with the rest expandable', async () => {
        const user = userEvent.setup()
        render(
            <Courses courses={[...past, course('next', '2027-01-10', '2027-01-12')]} now={now} />,
        )

        const upcoming = screen.getByRole('region', { name: 'Nadcházející' })
        expect(within(upcoming).getByText('Kurz next')).toBeInTheDocument()
        expect(
            within(upcoming).getByRole('link', { name: /podrobnosti a přihláška/ }),
        ).toHaveAttribute('href', 'https://example.com/next')

        const pastRegion = screen.getByRole('region', { name: 'Proběhlé' })
        const pastLinks = within(pastRegion).getAllByRole('link', { hidden: true })
        expect(pastLinks).toHaveLength(4)
        pastLinks.forEach((link, index) => {
            expect(link).toHaveAttribute('href', `https://example.com/p${index + 1}`)
            expect(link).toHaveAttribute('target', '_blank')
            expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        })
        expect(within(pastRegion).getAllByRole('link')).toHaveLength(3)

        await user.click(within(pastRegion).getByRole('button', { name: 'zobrazit starší' }))
        expect(within(pastRegion).getAllByRole('link')).toHaveLength(4)
        expect(within(pastRegion).queryByRole('button', { name: 'zobrazit starší' })).toBeNull()
        expect(pastLinks[3].closest('li')).toHaveFocus()

        expect(screen.getByRole('link', { name: /zobrazit všechny kurzy/ })).toHaveAttribute(
            'href',
            'https://www.cklenka.cz/instruktor/detail/konradova-petra/',
        )
    })

    it('shows the empty state with a link to contact when nothing is upcoming', () => {
        render(<Courses courses={past} now={now} />)
        const upcoming = screen.getByRole('region', { name: 'Nadcházející' })
        expect(within(upcoming).getByText(/Další víkend chystám/)).toBeInTheDocument()
        expect(within(upcoming).getByRole('link', { name: 'napište si o něj' })).toHaveAttribute(
            'href',
            '#kontakt',
        )
    })
})
