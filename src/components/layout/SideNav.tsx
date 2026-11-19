'use client'

import Image from 'next/image'
import Link from 'next/link'
import { navItems } from '@/content/nav'
import { cn } from '@/lib/utils'
import { useActiveHref } from './useActiveHref'
import { useInView } from './useInView'

/** Desktop navigation: a quiet vertical list fixed on the right edge. */
export function SideNav() {
    const activeHref = useActiveHref()
    // Once the header logo has scrolled away, a small mark under the nav keeps the brand in view.
    const showLogo = !useInView('[data-site-logo]')

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
            <div
                data-nav-logo
                inert={!showLogo}
                className={cn(
                    'mt-5 flex flex-col items-end gap-4 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none',
                    showLogo ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0',
                )}
            >
                <span aria-hidden className="block h-px w-10 bg-foreground/25" />
                {/* Back to the hero on the homepage; from other pages it opens the homepage at the top. */}
                <Link
                    href="/#uvod"
                    aria-label="PK-FIT – úvodní stránka"
                    className="block w-9 rounded-sm opacity-90 transition-opacity hover:opacity-100"
                >
                    <Image
                        src="/favicon.svg"
                        alt=""
                        width={603}
                        height={579}
                        unoptimized
                        className="h-auto w-full"
                    />
                </Link>
            </div>
        </nav>
    )
}
