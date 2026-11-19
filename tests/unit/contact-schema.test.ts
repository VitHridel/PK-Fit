import { contactSchema } from '@/lib/contact/schema'

const valid = {
    fullname: 'Jana Nováková',
    email: 'jana@example.com',
    phone: '+420 777 123 456',
    note: 'Bolí mě záda a chtěla bych začít cvičit.',
}

function messages(input: unknown) {
    const result = contactSchema.safeParse(input)
    if (result.success) return {}
    return Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message]))
}

describe('contactSchema', () => {
    it('accepts valid input, phone is optional', () => {
        expect(contactSchema.safeParse(valid).success).toBe(true)
        expect(contactSchema.safeParse({ ...valid, phone: '' }).success).toBe(true)
        expect(contactSchema.safeParse({ ...valid, phone: undefined }).success).toBe(true)
    })

    it('reports missing required fields in Czech', () => {
        expect(messages({})).toEqual({
            fullname: 'Jméno je povinný údaj',
            email: 'E-mail je povinný údaj',
            note: 'Prosím napište něco o sobě a s čím potřebujete pomoci',
        })
        expect(messages({ fullname: ' ', email: '', note: '' })).toEqual({
            fullname: 'Jméno je povinný údaj',
            email: 'E-mail je povinný údaj',
            note: 'Prosím napište něco o sobě a s čím potřebujete pomoci',
        })
    })

    it('rejects a malformed e-mail', () => {
        expect(messages({ ...valid, email: 'jana@' }).email).toBe(
            'E-mailová adresa nemá správný tvar',
        )
    })

    it('rejects over-long input', () => {
        expect(messages({ ...valid, note: 'a'.repeat(5001) }).note).toBe('Text je příliš dlouhý')
        expect(messages({ ...valid, fullname: 'a'.repeat(101) }).fullname).toBe(
            'Text je příliš dlouhý',
        )
        expect(messages({ ...valid, phone: '1'.repeat(31) }).phone).toBe('Text je příliš dlouhý')
        expect(messages({ ...valid, note: 'a'.repeat(5000) })).toEqual({})
    })
})
