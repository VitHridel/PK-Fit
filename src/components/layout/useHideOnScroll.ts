'use client'

import { useEffect, useRef, useState } from 'react'

const THRESHOLD = 8

/** True while the visitor scrolls down; false after scrolling up or near the top. */
export function useHideOnScroll(paused: boolean): boolean {
    const [hidden, setHidden] = useState(false)
    const lastY = useRef(0)

    useEffect(() => {
        lastY.current = window.scrollY
        const onScroll = () => {
            const y = window.scrollY
            const delta = y - lastY.current
            if (Math.abs(delta) < THRESHOLD) return
            lastY.current = y
            if (paused) return
            setHidden(delta > 0 && y > 80)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [paused])

    return hidden && !paused
}
