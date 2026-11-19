'use client'

import { MotionConfig, motion } from 'motion/react'
import type { ReactNode } from 'react'

const elements = {
    div: motion.div,
    section: motion.section,
    article: motion.article,
    li: motion.li,
    ul: motion.ul,
    figure: motion.figure,
} as const

type Props = {
    as?: keyof typeof elements
    delay?: number
    className?: string
    children: ReactNode
}

/**
 * Fades content up once when it scrolls into view. The hidden initial state is server-rendered,
 * so the layout carries a <noscript> override for `[data-reveal]`.
 */
export function Reveal({ as = 'div', delay = 0, className, children }: Props) {
    const Element = elements[as]
    // MotionConfig lives here rather than in the root layout so pages without reveals
    // (blog, GDPR) don't download Motion at all.
    return (
        <MotionConfig reducedMotion="user">
            <Element
                data-reveal
                className={className}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                // `amount: 'some'` (not a ratio) so sections taller than the viewport — e.g. at 400 % zoom —
                // still reveal; the bottom margin waits until the element is a little way in.
                viewport={{ once: true, amount: 'some', margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
            >
                {children}
            </Element>
        </MotionConfig>
    )
}
