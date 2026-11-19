import { Reveal } from '@/components/motion/Reveal'
import { ShowMore } from '@/components/ShowMore'
import { referencesSection } from '@/content/home'
import type { Reference } from '@/content/references'

export function References({ references }: { references: Reference[] }) {
    return (
        <section id="reference" aria-labelledby="reference-title" className="px-gutter py-section">
            <div className="mx-auto max-w-content">
                <Reveal>
                    <h2 id="reference-title" className="text-section font-semibold">
                        {referencesSection.title}
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <ShowMore
                        initial={3}
                        moreLabel={referencesSection.showAll}
                        className="mt-8 mb-10 grid gap-x-10 gap-y-12 border-t border-rule pt-8 md:grid-cols-3"
                        itemClassName="focus:outline-none"
                        items={references.map((reference) => (
                            <figure key={reference.name}>
                                <blockquote className="text-[0.9375rem] leading-relaxed text-foreground before:mb-2 before:block before:text-5xl before:leading-[0.6] before:font-semibold before:text-primary-ink before:content-['“']">
                                    <p>{reference.text}</p>
                                </blockquote>
                                <figcaption className="mt-4 text-[0.9375rem] font-semibold">
                                    <span aria-hidden className="font-normal text-muted-foreground">
                                        —{' '}
                                    </span>
                                    {reference.name}
                                </figcaption>
                            </figure>
                        ))}
                    />
                </Reveal>
            </div>
        </section>
    )
}
