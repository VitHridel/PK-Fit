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
    /** Rendered on the same row as the button, pushed to the right (stays after expanding). */
    trailing?: ReactNode
}

/**
 * Inline expander: every item is in the HTML (good for SEO), items past `initial` carry `hidden`
 * until expanded; without JS a <noscript> rule in the root layout shows them all and hides the button. After expanding, the button goes away and focus moves to the
 * first newly shown item so keyboard and screen-reader users land on the new content.
 */
export function ShowMore({
    items,
    initial,
    moreLabel,
    className,
    itemClassName,
    buttonClassName,
    trailing,
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
                        data-show-more={index >= initial ? '' : undefined}
                        className={itemClassName}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            {((hasMore && !expanded) || trailing) && (
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                    {hasMore && !expanded && (
                        <button
                            type="button"
                            data-show-more-button
                            aria-expanded={false}
                            aria-controls={listId}
                            onClick={() => setExpanded(true)}
                            className={cn(
                                'inline-flex min-h-11 items-center justify-center rounded-full border border-input px-5 text-[0.9375rem] font-medium text-foreground transition-colors hover:border-foreground hover:bg-muted',
                                buttonClassName,
                            )}
                        >
                            {moreLabel}
                        </button>
                    )}
                    {trailing && (
                        <div className="flex flex-col sm:ml-auto sm:block">{trailing}</div>
                    )}
                </div>
            )}
        </>
    )
}
