import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['400', '500', '600'], subsets: ['latin-ext'] })

export const MuiFonts = {
    Poppins: poppins.style.fontFamily
}