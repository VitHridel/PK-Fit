import { handleContact } from '@/lib/contact/handle'

function form(values: Record<string, string>) {
    const data = new FormData()
    for (const [key, value] of Object.entries(values)) data.set(key, value)
    return data
}

const validFields = {
    fullname: 'Jana Nováková',
    email: 'jana@example.com',
    phone: '',
    note: 'Bolí mě záda.',
    'cf-turnstile-response': 'token-123',
}

const VERIFY_ERROR =
    'Ověření se nepovedlo. Zkuste to prosím znovu, nebo mi napište na info@pk-fit.cz či zavolejte na +420 720 458 858.'

describe('handleContact', () => {
    it('refuses when Turnstile verification fails and sends nothing', async () => {
        const verify = vi.fn().mockResolvedValue(false)
        const send = vi.fn()
        const state = await handleContact(form(validFields), { verify, send, ip: '1.2.3.4' })
        expect(state).toEqual({ status: 'error', message: VERIFY_ERROR })
        expect(verify).toHaveBeenCalledWith('token-123', '1.2.3.4')
        expect(send).not.toHaveBeenCalled()
    })

    it('refuses a missing token even if the verifier would pass', async () => {
        const verify = vi.fn().mockResolvedValue(true)
        const send = vi.fn()
        const withoutToken = form(validFields)
        withoutToken.delete('cf-turnstile-response')
        const state = await handleContact(withoutToken, { verify, send })
        expect(state).toEqual({ status: 'error', message: VERIFY_ERROR })
        expect(send).not.toHaveBeenCalled()
    })

    it('returns field errors for invalid input and sends nothing', async () => {
        const send = vi.fn()
        const state = await handleContact(form({ ...validFields, email: 'nope', note: '' }), {
            verify: vi.fn().mockResolvedValue(true),
            send,
        })
        expect(state.status).toBe('error')
        expect(state.fieldErrors).toEqual({
            email: 'E-mailová adresa nemá správný tvar',
            note: 'Prosím napište něco o sobě a s čím potřebujete pomoci',
        })
        expect(send).not.toHaveBeenCalled()
    })

    it('sends one escaped mail with replyTo set to the visitor', async () => {
        const send = vi.fn().mockResolvedValue(undefined)
        const state = await handleContact(form({ ...validFields, note: '<b>ahoj</b>' }), {
            verify: vi.fn().mockResolvedValue(true),
            send,
        })
        expect(state).toEqual({ status: 'success' })
        expect(send).toHaveBeenCalledTimes(1)
        const mail = send.mock.calls[0][0]
        expect(mail.replyTo).toBe('jana@example.com')
        expect(mail.subject).toBe('Poptávka z webu')
        expect(mail.html).toContain('&lt;b&gt;ahoj&lt;/b&gt;')
    })

    it('returns a generic error when sending fails and logs details server-side only', async () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {})
        const state = await handleContact(form(validFields), {
            verify: vi.fn().mockResolvedValue(true),
            send: vi.fn().mockRejectedValue(new Error('SMTP down at 10.0.0.5')),
        })
        expect(state).toEqual({
            status: 'error',
            message:
                'Něco se nepovedlo, zkuste to prosím znovu nebo mě kontaktujte na mém telefonním čísle.',
        })
        expect(JSON.stringify(state)).not.toContain('SMTP')
        expect(error).toHaveBeenCalled()
        error.mockRestore()
    })
})
