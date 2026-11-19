import Image from 'next/image'
import { Reveal } from '@/components/motion/Reveal'
import { ShowMore } from '@/components/ShowMore'
import type { Course } from '@/content/courses'
import { coursesSection } from '@/content/home'
import { formatCourseDate, splitCourses } from '@/lib/courses'
import { cn } from '@/lib/utils'

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

/** White photo print; stays light in dark mode because it is a physical object. */
function Polaroid({
    course,
    large = false,
    titleAs: Title = 'p',
}: {
    course: Course
    large?: boolean
    titleAs?: 'p' | 'h4'
}) {
    return (
        <div className="bg-paper p-2.5 pb-3.5 text-paper-foreground shadow-[0_14px_24px_-14px_rgb(14_20_20/0.45)]">
            <Image
                src={course.image}
                alt=""
                sizes={large ? '(min-width: 768px) 22rem, 100vw' : '(min-width: 768px) 18rem, 50vw'}
                className="aspect-[4/3] w-full object-cover"
            />
            <Title className={cn('mt-2.5 font-hand leading-none', large ? 'text-3xl' : 'text-2xl')}>
                {course.title}
            </Title>
        </div>
    )
}

function UpcomingCourse({ course }: { course: Course }) {
    return (
        <article className="grid items-center gap-6 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-10">
            <div className="-rotate-[1.5deg]">
                <Polaroid course={course} large titleAs="h4" />
            </div>
            <div>
                <p className="text-[0.9375rem] text-muted-foreground tabular-nums">
                    <strong className="font-semibold text-foreground">
                        {formatCourseDate(course)}
                    </strong>{' '}
                    · {course.place}
                </p>
                <p className="mt-3 max-w-[60ch] leading-relaxed text-muted-foreground">
                    {course.description}
                </p>
                <a
                    href={course.link}
                    {...external}
                    className="mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-[0.9375rem] font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
                >
                    {coursesSection.upcomingCta} ↗
                    <span className="sr-only"> – {course.title} (otevře se v novém okně)</span>
                </a>
            </div>
        </article>
    )
}

function EmptyUpcoming() {
    const { empty } = coursesSection
    return (
        <div className="relative max-w-sm -rotate-[1.2deg] rounded-sm bg-paper px-6 pt-6 pb-5 text-paper-foreground shadow-[0_10px_18px_-10px_rgb(14_20_20/0.35)] before:absolute before:-top-2.5 before:left-1/2 before:h-5 before:w-20 before:-translate-x-1/2 before:rotate-2 before:bg-accent/75">
            <p className="font-hand text-[2rem] leading-none">{empty.title}</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#3f4d4d]">
                {empty.before}
                <a
                    href="#kontakt"
                    className="font-semibold text-paper-link underline underline-offset-3"
                >
                    {empty.link}
                </a>
                {empty.after}
            </p>
        </div>
    )
}

function PastCourse({ course }: { course: Course }) {
    return (
        <a
            href={course.link}
            {...external}
            className="block no-underline transition-transform hover:-translate-y-1"
        >
            <Polaroid course={course} />
            <span className="mt-3 block text-sm text-muted-foreground tabular-nums">
                {formatCourseDate(course)} · {course.place}
            </span>
            <span className="sr-only"> (otevře se v novém okně)</span>
        </a>
    )
}

export function Courses({ courses, now }: { courses: Course[]; now: Date }) {
    const { upcoming, past } = splitCourses(courses, now)
    const allCoursesLink = (
        <a
            href={coursesSection.allCoursesUrl}
            {...external}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-[0.9375rem] font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
        >
            {coursesSection.allCoursesLabel} ↗
            <span className="sr-only"> (otevře se v novém okně)</span>
        </a>
    )

    return (
        <section id="kurzy" aria-labelledby="kurzy-title" className="px-gutter py-section">
            <Reveal className="mx-auto max-w-content">
                <h2 id="kurzy-title" className="text-section font-semibold">
                    {coursesSection.title}
                </h2>

                <section
                    aria-labelledby="kurzy-upcoming"
                    className="mt-8 border-t border-rule pt-8"
                >
                    <h3 id="kurzy-upcoming" className="mb-6 text-title font-semibold">
                        {coursesSection.upcomingTitle}
                    </h3>
                    {upcoming.length > 0 ? (
                        <div className="space-y-14">
                            {upcoming.map((course) => (
                                <UpcomingCourse key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <EmptyUpcoming />
                    )}
                </section>

                {past.length > 0 && (
                    <section aria-labelledby="kurzy-past" className="mt-16">
                        <h3 id="kurzy-past" className="mb-6 text-title font-semibold">
                            {coursesSection.pastTitle}
                        </h3>
                        <ShowMore
                            initial={3}
                            moreLabel={coursesSection.showOlder}
                            className="mb-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3"
                            // Phones: the third print sits centred on its own row instead of orphaned left.
                            itemClassName="odd:-rotate-[2deg] even:rotate-[1.5deg] focus:outline-none max-sm:[&:nth-child(3)]:col-span-2 max-sm:[&:nth-child(3)]:mx-auto max-sm:[&:nth-child(3)]:w-1/2"
                            trailing={allCoursesLink}
                            items={past.map((course) => (
                                <PastCourse key={course.id} course={course} />
                            ))}
                        />
                    </section>
                )}

                {past.length === 0 && (
                    <div className="mt-10 flex justify-end">{allCoursesLink}</div>
                )}
            </Reveal>
        </section>
    )
}
