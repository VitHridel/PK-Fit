import { z } from 'zod'

const TOO_LONG = 'Text je příliš dlouhý'

/** Shared by the form (client-side hints) and the server action (the real check). */
export const contactSchema = z.object({
    fullname: z
        .string({ error: 'Jméno je povinný údaj' })
        .trim()
        .min(1, { error: 'Jméno je povinný údaj', abort: true })
        .max(100, { error: TOO_LONG }),
    email: z
        .string({ error: 'E-mail je povinný údaj' })
        .trim()
        .min(1, { error: 'E-mail je povinný údaj', abort: true })
        .max(254, { error: TOO_LONG, abort: true })
        .email({ error: 'E-mailová adresa nemá správný tvar' }),
    phone: z.string().trim().max(30, { error: TOO_LONG }).optional(),
    note: z
        .string({ error: 'Prosím napište něco o sobě a s čím potřebujete pomoci' })
        .trim()
        .min(1, { error: 'Prosím napište něco o sobě a s čím potřebujete pomoci', abort: true })
        .max(5000, { error: TOO_LONG }),
})

export type ContactInput = z.infer<typeof contactSchema>
