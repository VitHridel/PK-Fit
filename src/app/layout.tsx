import type { Metadata } from 'next'
import { Caveat, Poppins } from 'next/font/google'
import type { ReactNode } from 'react'
import { SkipLink } from '@/components/layout/SkipLink'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { site } from '@/content/site'
import './globals.css'

const poppins = Poppins({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
})

const caveat = Caveat({
    subsets: ['latin', 'latin-ext'],
    weight: ['700'],
    variable: '--font-caveat',
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: 'PK-FIT | Petra Konrádová',
        template: '%s | PK-FIT',
    },
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="cs"
            suppressHydrationWarning
            className={`${poppins.variable} ${caveat.variable}`}
        >
            <body>
                <ThemeProvider>
                    <SkipLink />
                    <div className="fixed top-4 right-4 z-40">
                        <ThemeToggle />
                    </div>
                    <main id="obsah" tabIndex={-1}>
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    )
}
