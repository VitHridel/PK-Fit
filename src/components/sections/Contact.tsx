import { ContactForm } from '@/components/contact/ContactForm'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { Reveal } from '@/components/motion/Reveal'
import { contactSection } from '@/content/home'
import { site } from '@/content/site'

export function Contact() {
    return (
        <section id="kontakt" aria-labelledby="kontakt-title" className="px-gutter py-section">
            <div className="mx-auto grid max-w-content items-start gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] lg:gap-16">
                <Reveal>
                    <h2 id="kontakt-title" className="text-section font-semibold">
                        {contactSection.title}
                    </h2>
                    <p className="mt-4 max-w-[36ch] text-lg leading-relaxed text-muted-foreground">
                        {contactSection.subtitle}
                    </p>
                    <dl className="mt-8 border-t border-rule">
                        <div className="border-b border-border py-4">
                            <dt className="text-sm text-muted-foreground">Telefon</dt>
                            <dd>
                                <a
                                    href={site.phoneHref}
                                    className="text-xl font-semibold no-underline hover:text-primary-ink"
                                >
                                    {site.phone}
                                </a>
                            </dd>
                        </div>
                        <div className="border-b border-border py-4">
                            <dt className="text-sm text-muted-foreground">E-mail</dt>
                            <dd>
                                <a
                                    href={`mailto:${site.email}`}
                                    className="text-xl font-semibold no-underline hover:text-primary-ink"
                                >
                                    {site.email}
                                </a>
                            </dd>
                        </div>
                    </dl>
                    <SocialLinks className="mt-6" />
                </Reveal>
                {/* Not wrapped in Reveal: the form must be usable the moment someone jumps to #kontakt. */}
                <ContactForm siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY ?? ''} />
            </div>
        </section>
    )
}
