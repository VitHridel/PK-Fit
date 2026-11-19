import type { Metadata } from 'next'
import { Caveat, Poppins } from 'next/font/google'
import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { MobileNav } from '@/components/layout/MobileNav'
import { SideNav } from '@/components/layout/SideNav'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
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
                    <SiteHeader />
                    <SideNav />
                    <main id="obsah" tabIndex={-1}>
                        {children}
                    </main>
                    <Footer />
                    <MobileNav />
                </ThemeProvider>
            </body>
        </html>
    )
}
