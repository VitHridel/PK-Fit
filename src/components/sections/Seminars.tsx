import { Reveal, RevealItem, RevealList } from '@/components/motion/Reveal'
import { seminarsSection } from '@/content/home'
import { seminars } from '@/content/seminars'

export function Seminars() {
    return (
        <section id="seminare" aria-labelledby="seminare-title" className="px-gutter py-section">
            <div className="mx-auto max-w-content">
                <Reveal as="div">
                    <h2 id="seminare-title" className="text-section font-semibold">
                        {seminarsSection.title}
                    </h2>
                </Reveal>
                <RevealList className="mt-8 gap-x-12 border-t border-rule md:columns-2">
                    {seminars.map((seminar) => (
                        <RevealItem
                            key={seminar.title}
                            className="break-inside-avoid border-b border-border py-4"
                        >
                            <p>{seminar.title}</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {seminar.url ? (
                                    <a
                                        href={seminar.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-primary-ink underline underline-offset-3 hover:decoration-2"
                                    >
                                        {seminar.provider} ↗
                                        <span className="sr-only"> (otevře se v novém okně)</span>
                                    </a>
                                ) : (
                                    seminar.provider
                                )}
                            </p>
                        </RevealItem>
                    ))}
                </RevealList>
            </div>
        </section>
    )
}
