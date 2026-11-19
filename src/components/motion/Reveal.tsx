'use client'

import { motion } from 'motion/react'
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
    return (
        <Element
            data-reveal
            className={className}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
        >
            {children}
        </Element>
    )
}
