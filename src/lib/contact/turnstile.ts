const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/**
 * Server-side Cloudflare Turnstile check. Returns false on a missing token, a missing secret,
 * a rejected token, a timeout (5 s) or a network error — the caller never sends mail then.
 */
export async function verifyTurnstile(token: string | null, ip?: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRETKEY
    if (!token || !secret) {
        if (!secret) console.error('[contact] TURNSTILE_SECRETKEY is not set')
        return false
    }
    const body = new URLSearchParams({ secret, response: token })
    if (ip) body.set('remoteip', ip)
    try {
        const response = await fetch(VERIFY_URL, {
            method: 'POST',
            body,
            signal: AbortSignal.timeout(5000),
        })
        if (!response.ok) return false
        const result = (await response.json()) as { success?: boolean }
        return result.success === true
    } catch (error) {
        console.error('[contact] Turnstile verification failed', error)
        return false
    }
}
