'use client'

import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { mobileMoreNav, mobilePrimaryNav, type NavItem } from '@/content/nav'
import { cn } from '@/lib/utils'
import { useActiveHref } from './useActiveHref'
import { useHideOnScroll } from './useHideOnScroll'

function NavLink({
    item,
    activeHref,
    className,
    onNavigate,
}: {
    item: NavItem
    activeHref: string | null
    className?: string
    onNavigate?: () => void
}) {
    const isActive = item.href === activeHref
    return (
        <Link
            href={item.href}
            aria-current={isActive ? 'location' : undefined}
            onClick={onNavigate}
            className={cn(
                'rounded-full text-muted-foreground no-underline transition-colors hover:text-foreground',
                isActive && 'font-semibold text-foreground',
                className,
            )}
        >
            {item.label}
        </Link>
    )
}

/** Mobile/tablet navigation: a floating pill at the bottom that gets out of the way while reading. */
export function MobileNav() {
    const activeHref = useActiveHref()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const hidden = useHideOnScroll(open)
    const menuId = useId()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const rootRef = useRef<HTMLElement>(null)

    // Close the menu on navigation.
    const [lastPath, setLastPath] = useState(pathname)
    if (pathname !== lastPath) {
        setLastPath(pathname)
        setOpen(false)
    }

    useEffect(() => {
        if (!open) return
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false)
                buttonRef.current?.focus()
            }
        }
        const onPointer = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
        }
        document.addEventListener('keydown', onKey)
        document.addEventListener('pointerdown', onPointer)
        return () => {
            document.removeEventListener('keydown', onKey)
            document.removeEventListener('pointerdown', onPointer)
        }
    }, [open])

    return (
        <nav
            ref={rootRef}
            aria-label="Hlavní navigace"
            data-hero-late
            inert={hidden}
            className={cn(
                'fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4 transition-transform duration-300 ease-out motion-reduce:transition-none xl:hidden',
                hidden && 'translate-y-[calc(100%+2rem)]',
            )}
        >
            <div className="relative">
                <div
                    id={menuId}
                    hidden={!open}
                    className="absolute right-0 bottom-[calc(100%+0.5rem)] min-w-44 rounded-xl border border-border bg-surface p-2 shadow-[0_12px_32px_-12px_rgb(14_20_20/0.35)]"
                >
                    <ul className="flex flex-col">
                        {mobileMoreNav.map((item) => (
                            <li key={item.href}>
                                <NavLink
                                    item={item}
                                    activeHref={activeHref}
                                    onNavigate={() => setOpen(false)}
                                    className="block rounded-lg px-3 py-2.5 text-[0.9375rem]"
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="mt-1 flex items-center justify-between gap-3 border-t border-border px-3 pt-2 text-sm text-muted-foreground">
                        <span aria-hidden>režim</span>
                        <ThemeToggle />
                    </div>
                </div>
                <ul className="flex items-center gap-0.5 rounded-full border border-border bg-surface/95 p-1 text-[0.9375rem] shadow-[0_12px_32px_-12px_rgb(14_20_20/0.35)] backdrop-blur-sm">
                    {mobilePrimaryNav.map((item) => (
                        <li key={item.href}>
                            <NavLink
                                item={item}
                                activeHref={activeHref}
                                className="inline-flex min-h-11 items-center px-3"
                            />
                        </li>
                    ))}
                    <li>
                        <button
                            ref={buttonRef}
                            type="button"
                            aria-label="Další položky"
                            aria-expanded={open}
                            aria-controls={menuId}
                            onClick={() => setOpen((value) => !value)}
                            className="inline-grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground"
                        >
                            <Ellipsis aria-hidden className="size-5" />
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
