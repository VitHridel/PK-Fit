'use server'

import { headers } from 'next/headers'
import { type ContactState, handleContact } from './handle'
import { sendMail } from './mailer'
import { verifyTurnstile } from './turnstile'

/** Server Action behind the contact form — a public endpoint, so it trusts nothing from the client. */
export async function submitContact(
    _prev: ContactState,
    formData: FormData,
): Promise<ContactState> {
    const requestHeaders = await headers()
    const ip =
        requestHeaders.get('cf-connecting-ip') ??
        requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        requestHeaders.get('x-real-ip') ??
        undefined
    return handleContact(formData, { verify: verifyTurnstile, send: sendMail, ip })
}
