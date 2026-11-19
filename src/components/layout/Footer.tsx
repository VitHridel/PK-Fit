import Link from 'next/link'
import { site } from '@/content/site'
import { Logo } from './Logo'
import { SocialLinks } from './SocialLinks'

export function Footer() {
    return (
        <footer className="px-gutter pt-16 pb-32 xl:pb-16">
            <div className="mx-auto grid max-w-content gap-10 border-t border-rule pt-10 sm:grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] lg:items-end">
                <div className="space-y-1 text-[0.9375rem]">
                    <p className="text-lg font-semibold">{site.name}</p>
                    <p className="text-muted-foreground">IČ: {site.ico}</p>
                    <p className="pt-3">
                        <a href={site.phoneHref} className="hover:text-primary-ink">
                            {site.phone}
                        </a>
                    </p>
                    <p>
                        <a href={`mailto:${site.email}`} className="hover:text-primary-ink">
                            {site.email}
                        </a>
                    </p>
                </div>
                <Logo className="order-first w-44 lg:order-none" />
                <div className="flex flex-col gap-4 sm:items-end">
                    <SocialLinks />
                    <Link
                        href="/zasady-zpracovani-osobnich-udaju-gdpr"
                        className="text-sm text-muted-foreground underline hover:text-foreground"
                    >
                        Zásady zpracování osobních údajů
                    </Link>
                </div>
            </div>
        </footer>
    )
}
