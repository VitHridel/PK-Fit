'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef } from 'react'

type TurnstileApi = {
    render: (container: HTMLElement, options: Record<string, unknown>) => string
    reset: (widgetId?: string) => void
    remove: (widgetId: string) => void
}

declare global {
    interface Window {
        turnstile?: TurnstileApi
    }
}

/**
 * Cloudflare Turnstile with explicit rendering: the widget is rendered on every mount and removed
 * on unmount, so it keeps working after client-side navigation away from and back to the page.
 * It injects a hidden `cf-turnstile-response` input, so the token travels with the form's FormData.
 * Changing `resetSignal` asks for a fresh token (tokens are single-use).
 */
export function Turnstile({ siteKey, resetSignal }: { siteKey: string; resetSignal?: unknown }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const widgetId = useRef<string | null>(null)

    const renderWidget = useCallback(() => {
        if (!containerRef.current || !window.turnstile || widgetId.current) return
        widgetId.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            language: 'cs',
            theme: 'auto',
        })
    }, [siteKey])

    useEffect(() => {
        renderWidget() // script already loaded (e.g. after client-side navigation)
        return () => {
            if (widgetId.current) {
                try {
                    window.turnstile?.remove(widgetId.current)
                } catch {
                    // widget already gone
                }
                widgetId.current = null
            }
        }
    }, [renderWidget])

    useEffect(() => {
        if (resetSignal === undefined || !widgetId.current) return
        try {
            window.turnstile?.reset(widgetId.current)
        } catch {
            // nothing to reset; a fresh widget renders on next mount
        }
    }, [resetSignal])

    return (
        <>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                strategy="lazyOnload"
                onReady={renderWidget}
            />
            <div ref={containerRef} className="min-h-[65px]" />
        </>
    )
}
