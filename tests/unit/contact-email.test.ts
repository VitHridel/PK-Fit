import { buildContactEmail, escapeHtml } from '@/lib/contact/email'

const base = {
    fullname: 'Jana Nováková',
    email: 'jana@example.com',
    phone: '',
    note: 'Dobrý den',
}

describe('escapeHtml', () => {
    it('escapes the HTML special characters', () => {
        expect(escapeHtml(`<a href="x" title='y'>&</a>`)).toBe(
            '&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;',
        )
    })
})

describe('buildContactEmail', () => {
    it('escapes HTML in the note and turns newlines into <br>', () => {
        const mail = buildContactEmail({
            ...base,
            note: '<a href="https://evil">klik</a>\nřádek 2',
        })
        expect(mail.subject).toBe('Poptávka z webu')
        expect(mail.html).toContain('&lt;a href=&quot;https://evil&quot;&gt;')
        expect(mail.html).toContain('<br>')
        expect(mail.html).not.toContain('<a')
        expect(mail.text).toContain('<a href="https://evil">klik</a>')
    })

    it('escapes HTML in the name', () => {
        const mail = buildContactEmail({ ...base, fullname: '<img src=x onerror=alert(1)>' })
        expect(mail.html).toContain('&lt;img src=x onerror=alert(1)&gt;')
        expect(mail.html).not.toContain('<img')
    })

    it('includes the phone only when given', () => {
        expect(buildContactEmail(base).html).not.toContain('Telefon')
        expect(buildContactEmail({ ...base, phone: '+420 777 123 456' }).html).toContain(
            'Telefon: +420 777 123 456',
        )
    })
})
