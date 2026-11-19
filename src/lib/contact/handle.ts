import { buildContactEmail } from './email'
import type { sendMail } from './mailer'
import { type ContactInput, contactSchema } from './schema'
import type { verifyTurnstile } from './turnstile'

export type ContactState = {
    status: 'idle' | 'success' | 'error'
    message?: string
    fieldErrors?: Partial<Record<keyof ContactInput, string>>
}

type Deps = { verify: typeof verifyTurnstile; send: typeof sendMail; ip?: string }

const VERIFY_FAILED: ContactState = {
    status: 'error',
    message:
        'Ověření se nepovedlo. Zkuste to prosím znovu, nebo mi napište na info@pk-fit.cz či zavolejte na +420 720 458 858.',
}

const SEND_FAILED: ContactState = {
    status: 'error',
    message:
        'Něco se nepovedlo, zkuste to prosím znovu nebo mě kontaktujte na mém telefonním čísle.',
}

const fields = ['fullname', 'email', 'phone', 'note'] as const

function readField(formData: FormData, name: string): string | undefined {
    const value = formData.get(name)
    return typeof value === 'string' ? value : undefined
}

/**
 * The contact form's server logic, independent of Next so it can be unit-tested.
 * Order matters: bot check first (cheapest rejection, no work for bots), then validation,
 * then the mail. Nothing is sent without a verified token.
 */
export async function handleContact(formData: FormData, deps: Deps): Promise<ContactState> {
    const token = readField(formData, 'cf-turnstile-response')
    if (!token) return VERIFY_FAILED
    if (!(await deps.verify(token, deps.ip))) return VERIFY_FAILED

    const parsed = contactSchema.safeParse(
        Object.fromEntries(fields.map((name) => [name, readField(formData, name)])),
    )
    if (!parsed.success) {
        const fieldErrors: ContactState['fieldErrors'] = {}
        for (const issue of parsed.error.issues) {
            const field = issue.path[0] as keyof ContactInput
            fieldErrors[field] ??= issue.message
        }
        return { status: 'error', fieldErrors }
    }

    try {
        await deps.send({ replyTo: parsed.data.email, ...buildContactEmail(parsed.data) })
        return { status: 'success' }
    } catch (error) {
        // Details stay in the server log; the visitor gets a generic message.
        console.error('[contact] sending mail failed', error)
        return SEND_FAILED
    }
}
