'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

/** Motion honours the visitor's reduced-motion preference everywhere. */
export function MotionProvider({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
