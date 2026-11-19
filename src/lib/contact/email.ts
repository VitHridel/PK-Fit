import type { ContactInput } from './schema'

const ENTITIES: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
}

export function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (char) => ENTITIES[char])
}

/** Builds the owner's notification mail. Every user value is escaped before it enters the HTML. */
export function buildContactEmail(input: ContactInput): {
    subject: 'Poptávka z webu'
    text: string
    html: string
} {
    const phone = input.phone?.trim()
    const lines = [
        `Jméno: ${input.fullname}`,
        `E-mail: ${input.email}`,
        ...(phone ? [`Telefon: ${phone}`] : []),
        '',
        input.note,
    ]
    const note = escapeHtml(input.note).replace(/\r?\n/g, '<br>')
    const html = [
        '<div>',
        `<p>Jméno: ${escapeHtml(input.fullname)}</p>`,
        `<p>E-mail: ${escapeHtml(input.email)}</p>`,
        phone ? `<p>Telefon: ${escapeHtml(phone)}</p>` : '',
        `<p>Zpráva:<br>${note}</p>`,
        '</div>',
    ].join('')

    return { subject: 'Poptávka z webu', text: lines.join('\n'), html }
}
