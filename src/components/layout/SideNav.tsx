'use client'

import Link from 'next/link'
import { navItems } from '@/content/nav'
import { cn } from '@/lib/utils'
import { useActiveHref } from './useActiveHref'

/** Desktop navigation: a quiet vertical list fixed on the right edge. */
export function SideNav() {
    const activeHref = useActiveHref()

    return (
        <nav
            aria-label="Hlavní navigace"
            data-hero-late="slide"
            className="fixed top-20 right-4 z-40 hidden xl:block"
        >
            <ul className="flex flex-col items-end gap-0.5 text-[0.8125rem] leading-snug tracking-[0.01em]">
                {navItems.map((item) => {
                    const isActive = item.href === activeHref
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                aria-current={isActive ? 'location' : undefined}
                                className={cn(
                                    'inline-block rounded-sm py-1 text-muted-foreground no-underline transition-colors hover:text-foreground',
                                    isActive && 'font-semibold text-foreground',
                                )}
                            >
                                {item.label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
