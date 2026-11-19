import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Logo } from './Logo'

/** Logo top-left (scrolls with the page); theme toggle top-right, fixed above the side nav on desktop. */
export function SiteHeader() {
    return (
        <header>
            <Link
                href="/"
                aria-label="PK-FIT – úvodní stránka"
                data-hero-late
                className="absolute top-5 left-gutter z-40 block w-36 rounded-sm sm:w-40"
            >
                <Logo />
            </Link>
            <div data-hero-late className="absolute top-4 right-4 z-40 xl:fixed">
                <ThemeToggle />
            </div>
        </header>
    )
}
