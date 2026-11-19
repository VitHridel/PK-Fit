import { Reveal } from '@/components/motion/Reveal'
import { contactCta } from '@/content/home'
import { site } from '@/content/site'

const linkClass =
    'font-semibold text-primary-foreground underline decoration-[1.5px] underline-offset-4 hover:decoration-[3px] focus-visible:outline-primary-foreground'

/** The page's one filled colour field: contact is the site's main goal. */
export function ContactCta() {
    return (
        <section
            aria-labelledby="cta-title"
            className="bg-primary px-gutter py-16 text-primary-foreground md:py-20"
        >
            <Reveal className="mx-auto grid max-w-content gap-6 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-12">
                <h2 id="cta-title" className="text-section font-semibold">
                    {contactCta.title}
                </h2>
                <p className="text-lg leading-relaxed">
                    Zavolejte mi na číslo{' '}
                    <a
                        href={site.phoneHref}
                        className={`${linkClass} text-[1.375rem] whitespace-nowrap`}
                    >
                        {site.phone}
                    </a>{' '}
                    nebo vyplňte{' '}
                    <a href="#kontakt" className={linkClass}>
                        kontaktní formulář
                    </a>{' '}
                    a můžeme se o všem nezávazně pobavit.
                </p>
            </Reveal>
        </section>
    )
}
