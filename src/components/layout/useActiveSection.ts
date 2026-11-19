'use client'

import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing a horizontal band ~40–45 % from the
 * top of the viewport, or null when none does. One IntersectionObserver for all sections.
 */
export function useActiveSection(sectionIds: string[]): string | null {
    const [active, setActive] = useState<string | null>(null)
    const key = sectionIds.join('|')

    useEffect(() => {
        const ids = key.split('|')
        const elements = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null)
        if (elements.length === 0) return

        const visible = new Set<string>()
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) visible.add(entry.target.id)
                    else visible.delete(entry.target.id)
                }
                // Sections don't overlap, so at most one crosses the band; keep document order anyway.
                setActive(ids.find((id) => visible.has(id)) ?? null)
            },
            { rootMargin: '-40% 0px -55% 0px' },
        )
        elements.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [key])

    return active
}
