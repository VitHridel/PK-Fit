import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * PK-FIT wordmark: the teal artwork in light mode, the light artwork in dark mode.
 * Rendered as images (not inline SVG) so repeated logos never duplicate gradient ids.
 * Decorative here — the surrounding link carries the accessible name.
 */
export function Logo({ className }: { className?: string }) {
    return (
        <span className={cn('inline-block', className)}>
            <Image
                src="/logo.svg"
                alt=""
                width={192}
                height={45}
                unoptimized
                loading="eager"
                className="h-auto w-full dark:hidden"
            />
            <Image
                src="/logo-white.svg"
                alt=""
                width={222}
                height={52}
                unoptimized
                loading="eager"
                className="hidden h-auto w-full dark:block"
            />
        </span>
    )
}
