import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { ContactFormDataInterface } from '@/global.interface'
import nodemailer, { SendMailOptions } from 'nodemailer'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { token, fullname, email, phone, note } = req.body as ContactFormDataInterface
    try {
        const tokenVerify = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            secret: process.env.TURNSTILE_SECRETKEY,
            response: token
        })
        if (!tokenVerify.data.success) {
            return res.status(500).json({ success: false, message: 'Nejsi bot?' })
        }
        // send email
        const transporter = nodemailer.createTransport({
            port: 25,
            host: process.env.SMTP_HOST,
            secure: false,
            ignoreTLS: true,
        })
        const mailData: SendMailOptions = {
            from: process.env.SMTP_SENDER,
            to: process.env.SMTP_SENDER,
            replyTo: email,
            subject: 'Poptávka z webu',
            text: `jméno: ${fullname}, email: ${email}${!!phone ? `, tel: ${phone}` : ''}, poznámka: ${note}`,
            html: `<div><p>Jméno: ${fullname}</p><p>E-mail: ${email}</p>${!!phone ? `<p>Tel: ${phone}</p>` : ''}<p>Poznámka: ${note}</p></div>`
        }
        transporter.sendMail(mailData, (err) => {
            if (err) {
                console.log('err', err)
                return res.status(500).json({ success: false, message: 'Nepodařilo se odeslat e-mail' })
            } else {
                return res.status(200).json({ success: true })
            }
        })
    } catch (err: any) {
        return res.status(500).json({ success: false })
    }
}

export default handler