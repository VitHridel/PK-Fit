import nodemailer from 'nodemailer'

export type ContactMail = { replyTo: string; subject: string; text: string; html: string }

function createTransport() {
    if (process.env.MAIL_TRANSPORT === 'json') {
        // Tests/dev: nodemailer builds the message but sends nothing.
        return nodemailer.createTransport({ jsonTransport: true })
    }
    // Owner's mail infrastructure: plain SMTP on port 25 without TLS. Do not change.
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 25,
        secure: false,
        ignoreTLS: true,
    })
}

export async function sendMail(mail: ContactMail): Promise<void> {
    const sender = process.env.SMTP_SENDER
    if (!sender) throw new Error('SMTP_SENDER is not set')
    await createTransport().sendMail({ from: sender, to: sender, ...mail })
}
