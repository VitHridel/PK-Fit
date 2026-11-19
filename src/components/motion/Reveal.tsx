'use client'

import { MotionConfig, motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.2, 0.7, 0.2, 1] as const

/**
 * Trigger when any part of the element is at least ~20 % above the bottom edge, so the reveal
 * happens where the visitor is looking. `amount: 'some'` (not a ratio) keeps elements taller than
 * the viewport — e.g. at 400 % zoom — revealable.
 */
const VIEWPORT = { once: true, amount: 'some', margin: '0px 0px -20% 0px' } as const

const elements = {
    div: motion.div,
    section: motion.section,
    article: motion.article,
    li: motion.li,
    ul: motion.ul,
    ol: motion.ol,
    figure: motion.figure,
    p: motion.p,
} as const

type ElementName = keyof typeof elements

type Props = {
    as?: ElementName
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
                viewport={VIEWPORT}
                transition={{ duration: 0.7, delay, ease: EASE }}
            >
                {children}
            </Element>
        </MotionConfig>
    )
}

const listVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.11 } } }
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/** A list whose `<RevealItem>` children fade in one after another once the list is in view. */
export function RevealList({
    as = 'ul',
    className,
    children,
}: {
    as?: ElementName
    className?: string
    children: ReactNode
}) {
    const Element = elements[as]
    return (
        <MotionConfig reducedMotion="user">
            <Element
                className={className}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={listVariants}
            >
                {children}
            </Element>
        </MotionConfig>
    )
}

/** One staggered item of a `<RevealList>`; carries `data-reveal` for the no-JS override. */
export function RevealItem({
    as = 'li',
    className,
    children,
}: {
    as?: ElementName
    className?: string
    children: ReactNode
}) {
    const Element = elements[as]
    return (
        <Element data-reveal className={className} variants={itemVariants}>
            {children}
        </Element>
    )
}
