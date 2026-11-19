'use client'

import { usePathname } from 'next/navigation'
import { navItems } from '@/content/nav'
import { useActiveSection } from './useActiveSection'

const sectionIds = navItems.flatMap((item) => (item.sectionId ? [item.sectionId] : []))

/** The nav href that represents where the visitor is: a homepage section or a route. */
export function useActiveHref(): string | null {
    const pathname = usePathname()
    const activeSection = useActiveSection(pathname === '/' ? sectionIds : [])

    if (pathname === '/') {
        return activeSection ? `/#${activeSection}` : null
    }
    const routeItem = navItems.find(
        (item) =>
            !item.sectionId && (pathname === item.href || pathname.startsWith(`${item.href}/`)),
    )
    return routeItem?.href ?? null
}
