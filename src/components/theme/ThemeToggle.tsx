'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

const subscribe = () => () => {}

/** True only after hydration; the resolved theme is unknown on the server. */
function useIsClient() {
    return useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    )
}

export function ThemeToggle({ className }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme()
    const isClient = useIsClient()
    const isDark = isClient && resolvedTheme === 'dark'
    const label = !isClient
        ? 'Přepnout barevný režim'
        : isDark
          ? 'Přepnout na světlý režim'
          : 'Přepnout na tmavý režim'

    return (
        <button
            type="button"
            aria-label={label}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
                'inline-grid size-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary-ink',
                className,
            )}
        >
            {/* Icon follows the class on <html>, so it is right before hydration too. */}
            <Moon aria-hidden className="size-4 dark:hidden" />
            <Sun aria-hidden className="hidden size-4 dark:block" />
        </button>
    )
}
