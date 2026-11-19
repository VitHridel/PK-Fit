import LogoDark from '@/assets/img/logo-white.svg'
import LogoLight from '../../../public/logo.svg'
import { cn } from '@/lib/utils'

/** PK-FIT wordmark; the teal artwork in light mode, the light artwork in dark mode. */
export function Logo({ className }: { className?: string }) {
    return (
        <span className={cn('inline-block', className)}>
            <LogoLight aria-hidden className="h-auto w-full dark:hidden" />
            <LogoDark aria-hidden className="hidden h-auto w-full dark:block" />
        </span>
    )
}
