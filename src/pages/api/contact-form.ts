import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { ContactFormDataInterface } from '@/global.interface'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { token, fullname, email, phone, note } = req.body as ContactFormDataInterface
    try {
        const tokenVerify = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            secret: process.env.TURNSTILE_SECRETKEY,
            response: token
        })
        if (!tokenVerify.data.success) {
            res.status(500).json({ success: false })
            return
        }
        // send email
        res.status(200).json({ success: true })
    } catch (err: any) {
        res.status(500).json({ success: false })
    }
}

export default handler