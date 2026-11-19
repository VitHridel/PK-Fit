'use client'

import { type ReactNode, useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
    items: ReactNode[]
    initial: number
    moreLabel: string
    className?: string
    itemClassName?: string
    buttonClassName?: string
}

/**
 * Inline expander: every item is in the HTML (good for SEO and no-JS), items past `initial`
 * carry `hidden` until expanded. After expanding, the button goes away and focus moves to the
 * first newly shown item so keyboard and screen-reader users land on the new content.
 */
export function ShowMore({
    items,
    initial,
    moreLabel,
    className,
    itemClassName,
    buttonClassName,
}: Props) {
    const [expanded, setExpanded] = useState(false)
    const listId = useId()
    const firstNewRef = useRef<HTMLLIElement>(null)

    useEffect(() => {
        if (expanded) firstNewRef.current?.focus()
    }, [expanded])

    const hasMore = items.length > initial

    return (
        <>
            <ul id={listId} className={className}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        ref={index === initial ? firstNewRef : undefined}
                        tabIndex={index === initial ? -1 : undefined}
                        hidden={!expanded && index >= initial}
                        className={itemClassName}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            {hasMore && !expanded && (
                <button
                    type="button"
                    aria-expanded={false}
                    aria-controls={listId}
                    onClick={() => setExpanded(true)}
                    className={cn(
                        'inline-flex min-h-11 items-center rounded-full border border-input px-5 text-[0.9375rem] font-medium text-foreground transition-colors hover:border-foreground hover:bg-muted',
                        buttonClassName,
                    )}
                >
                    {moreLabel}
                </button>
            )}
        </>
    )
}
