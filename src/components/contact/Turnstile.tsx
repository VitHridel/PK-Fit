'use client'

import Script from 'next/script'

declare global {
    interface Window {
        turnstile?: { reset: (widget?: string | HTMLElement) => void }
    }
}

/**
 * Cloudflare Turnstile, implicit rendering: the script finds `.cf-turnstile` and injects a hidden
 * `cf-turnstile-response` input into it, so the token travels with the form's FormData.
 * Keep this element mounted for the page's lifetime; the script renders it only once.
 */
export function Turnstile({ siteKey }: { siteKey: string }) {
    return (
        <>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="lazyOnload"
            />
            <div
                className="cf-turnstile min-h-[65px]"
                data-sitekey={siteKey}
                data-language="cs"
                data-theme="auto"
                suppressHydrationWarning
            />
        </>
    )
}
