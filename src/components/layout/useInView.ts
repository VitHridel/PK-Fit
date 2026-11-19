'use client'

import { useEffect, useState } from 'react'

/**
 * Whether the element matching `selector` is (at least partly) inside the viewport.
 * Starts as `true` so nothing that depends on it flashes in before the first measurement.
 */
export function useInView(selector: string): boolean {
    const [inView, setInView] = useState(true)

    useEffect(() => {
        const element = document.querySelector(selector)
        if (!element) return
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
        observer.observe(element)
        return () => observer.disconnect()
    }, [selector])

    return inView
}
