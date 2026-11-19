import Image from 'next/image'
import meImage from '@/assets/img/me.png'
import { Reveal } from '@/components/motion/Reveal'
import { type RichParagraph, story } from '@/content/home'
import { cn } from '@/lib/utils'

function Paragraph({ segments, lead }: { segments: RichParagraph; lead: boolean }) {
    return (
        <p
            className={cn(
                'max-w-[62ch] leading-relaxed',
                lead ? 'text-lg text-foreground' : 'text-muted-foreground',
            )}
        >
            {segments.map((segment, index) =>
                typeof segment === 'string' ? (
                    segment
                ) : (
                    <strong key={index} className="font-semibold text-foreground">
                        {segment.strong}
                    </strong>
                ),
            )}
        </p>
    )
}

export function Story() {
    return (
        <section id="o-mne" aria-labelledby="o-mne-title" className="px-gutter py-section">
            <Reveal className="mx-auto grid max-w-content items-start gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                <Image
                    src={meImage}
                    alt={story.imageAlt}
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="mx-auto h-auto w-full max-w-sm md:max-w-none"
                />
                <div>
                    <h2 id="o-mne-title" className="text-section font-semibold">
                        {story.title}
                    </h2>
                    <div className="mt-6 space-y-4">
                        {story.paragraphs.map((paragraph, index) => (
                            <Paragraph key={index} segments={paragraph} lead={index === 0} />
                        ))}
                    </div>
                    <p className="mt-6 inline-block -rotate-2 font-hand text-4xl text-primary-ink">
                        {story.signature}
                    </p>
                </div>
            </Reveal>
        </section>
    )
}
