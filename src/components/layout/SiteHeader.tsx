import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Logo } from './Logo'

/** Logo top-left (scrolls with the page, visible from first paint); theme toggle top-right, fixed above the side nav on desktop. */
export function SiteHeader() {
    return (
        <header>
            <div className="absolute inset-x-0 top-5 z-40 px-gutter">
                <div className="mx-auto max-w-content">
                    <Link
                        href="/"
                        aria-label="PK-FIT – úvodní stránka"
                        className="block w-36 rounded-sm sm:w-40"
                    >
                        <Logo />
                    </Link>
                </div>
            </div>
            <div data-hero-late className="absolute top-4 right-4 z-40 xl:fixed">
                <ThemeToggle />
            </div>
        </header>
    )
}
