import type { Course } from '@/content/courses'
import { site } from '@/content/site'
import type { Post } from '@/lib/blog'
import { splitCourses } from '@/lib/courses'

type JsonLdObject = { '@context'?: string; '@type': string; [key: string]: unknown }

const absolute = (path: string) => new URL(path, site.url).toString()

const person = {
    '@type': 'Person',
    name: site.name,
    url: site.url,
}

export function personJsonLd(): JsonLdObject {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        jobTitle: 'fitness trenérka',
        url: site.url,
        email: site.email,
        telephone: site.phone,
        sameAs: Object.values(site.socials).filter(Boolean),
    }
}

/** No address on purpose — the owner has not published one. */
export function professionalServiceJsonLd(): JsonLdObject {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: site.brand,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        image: absolute('/og-image.png'),
        founder: person,
    }
}

export function courseEventJsonLd(course: Course): JsonLdObject {
    return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: course.title,
        description: course.description,
        startDate: course.startDate,
        endDate: course.endDate ?? course.startDate,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: { '@type': 'Place', name: course.place },
        image: absolute(course.image.src),
        url: course.link,
        organizer: person,
    }
}

/**
 * Homepage structured data. Events only for upcoming courses (search engines ignore past ones);
 * client references are deliberately not marked up as Review (self-serving reviews aren't eligible).
 */
export function homeJsonLd(courses: Course[], now: Date): JsonLdObject[] {
    const { upcoming } = splitCourses(courses, now)
    return [personJsonLd(), professionalServiceJsonLd(), ...upcoming.map(courseEventJsonLd)]
}

export function blogPostingJsonLd(post: Post): JsonLdObject {
    const url = absolute(`/blog/${post.slug}`)
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        url,
        mainEntityOfPage: url,
        author: person,
        publisher: person,
        ...(post.coverImage ? { image: absolute(post.coverImage.url) } : {}),
    }
}
