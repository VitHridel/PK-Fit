import type { Course } from '@/content/courses'

const pragueDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Prague',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
})

/** Calendar date of `now` in Prague as `YYYY-MM-DD`, independent of the server timezone. */
function todayInPrague(now: Date): string {
    return pragueDate.format(now)
}

function lastDay(course: Course): string {
    return course.endDate ?? course.startDate
}

/**
 * Splits courses into upcoming (soonest first) and past (most recent first).
 * A course stays upcoming until the end of its last day in Prague time.
 */
export function splitCourses(courses: Course[], now: Date): { upcoming: Course[]; past: Course[] } {
    const today = todayInPrague(now)
    const upcoming = courses
        .filter((course) => lastDay(course) >= today)
        .sort((a, b) => a.startDate.localeCompare(b.startDate))
    const past = courses
        .filter((course) => lastDay(course) < today)
        .sort((a, b) => lastDay(b).localeCompare(lastDay(a)))
    return { upcoming, past }
}

function parts(isoDate: string) {
    const [year, month, day] = isoDate.split('-').map(Number)
    return { year, month, day }
}

/** Czech date label: `21. 9. 2025`, `6.–8. 2. 2026`, `30. 1.–1. 2. 2026`, `30. 12. 2025–2. 1. 2026`. */
export function formatCourseDate(course: Pick<Course, 'startDate' | 'endDate'>): string {
    const start = parts(course.startDate)
    if (!course.endDate || course.endDate === course.startDate) {
        return `${start.day}. ${start.month}. ${start.year}`
    }
    const end = parts(course.endDate)
    const endLabel = `${end.day}. ${end.month}. ${end.year}`
    if (start.year !== end.year) {
        return `${start.day}. ${start.month}. ${start.year}–${endLabel}`
    }
    if (start.month !== end.month) {
        return `${start.day}. ${start.month}.–${endLabel}`
    }
    return `${start.day}.–${endLabel}`
}
