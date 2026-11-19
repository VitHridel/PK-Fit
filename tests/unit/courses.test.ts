import type { Course } from '@/content/courses'
import { formatCourseDate, splitCourses } from '@/lib/courses'

const image = { src: '/x.jpg', width: 1, height: 1 }

function course(id: string, startDate: string, endDate?: string): Course {
    return {
        id,
        title: id,
        place: 'Praha',
        startDate,
        endDate,
        description: '',
        link: 'https://example.com',
        image,
    }
}

const ids = (list: Course[]) => list.map((c) => c.id)

describe('splitCourses', () => {
    const now = new Date('2026-11-19T10:00:00Z')

    it('puts a course that ended before today in past', () => {
        const { upcoming, past } = splitCourses([course('old', '2026-11-10', '2026-11-12')], now)
        expect(ids(past)).toEqual(['old'])
        expect(upcoming).toEqual([])
    })

    it('puts a course starting after today in upcoming', () => {
        const { upcoming, past } = splitCourses([course('next', '2026-12-01')], now)
        expect(ids(upcoming)).toEqual(['next'])
        expect(past).toEqual([])
    })

    it('sorts upcoming by startDate ascending', () => {
        const { upcoming } = splitCourses(
            [course('c', '2027-03-01'), course('a', '2026-12-01'), course('b', '2027-01-15')],
            now,
        )
        expect(ids(upcoming)).toEqual(['a', 'b', 'c'])
    })

    it('sorts past by endDate ?? startDate descending', () => {
        const { past } = splitCourses(
            [
                course('a', '2025-09-21'),
                course('c', '2026-02-06', '2026-02-08'),
                course('b', '2025-10-19'),
                course('d', '2026-05-01', '2026-05-30'),
            ],
            now,
        )
        expect(ids(past)).toEqual(['d', 'c', 'b', 'a'])
    })

    it('keeps an ongoing multi-day course in upcoming', () => {
        const { upcoming } = splitCourses([course('now', '2026-11-18', '2026-11-20')], now)
        expect(ids(upcoming)).toEqual(['now'])
    })

    it('keeps a single-day course upcoming until the end of its day in Prague', () => {
        const today = course('today', '2026-11-19')
        // 22:30 UTC = 23:30 in Prague (CET, UTC+1)
        expect(ids(splitCourses([today], new Date('2026-11-19T22:30:00Z')).upcoming)).toEqual([
            'today',
        ])
        // 23:30 UTC = 00:30 on the 20th in Prague
        expect(ids(splitCourses([today], new Date('2026-11-19T23:30:00Z')).past)).toEqual(['today'])
    })
})

describe('formatCourseDate', () => {
    it('formats a single day', () => {
        expect(formatCourseDate(course('x', '2025-09-21'))).toBe('21. 9. 2025')
    })

    it('formats a range within one month', () => {
        expect(formatCourseDate(course('x', '2026-02-06', '2026-02-08'))).toBe('6.–8. 2. 2026')
    })

    it('formats a range across months', () => {
        expect(formatCourseDate(course('x', '2026-01-30', '2026-02-01'))).toBe('30. 1.–1. 2. 2026')
    })
})
