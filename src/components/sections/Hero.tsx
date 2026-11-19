import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import heroImage from '@/assets/img/hp-hero.png'
import { WordReveal } from '@/components/motion/WordReveal'
import { hero } from '@/content/home'

const START = 0.55
const STEP = 0.08
/** Pause between the last title word starting and the lead paragraph (owner asked for a clear beat). */
const LEAD_GAP = 0.4

const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length

export function Hero() {
    const [titleLine1, titleLine2] = hero.titleLines
    const eyebrowWords = wordCount(hero.eyebrow)
    const line1Start = eyebrowWords
    const line2Start = line1Start + wordCount(titleLine1)
    const lastWordIndex = line2Start + wordCount(titleLine2) - 1
    const leadDelay = START + lastWordIndex * STEP + LEAD_GAP
    const lateDelay = leadDelay + 0.15

    return (
        <section
            data-hero
            aria-labelledby="hero-title"
            className="relative isolate flex min-h-svh flex-col justify-center px-gutter pt-24 pb-36 lg:pt-20 lg:pb-0"
        >
            {/* Delays depend on the copy length, so they are computed here and shared via CSS variables. */}
            <style>{`:root{--hero-lead-delay:${leadDelay.toFixed(2)}s;--hero-late-delay:${lateDelay.toFixed(2)}s}`}</style>
            <div className="mx-auto grid w-full max-w-content items-center gap-10 lg:flex-1 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                <div className="max-w-xl">
                    <p className="text-[0.9375rem] font-semibold tracking-[0.04em] text-primary-ink">
                        <WordReveal text={hero.eyebrow} startIndex={0} />
                    </p>
                    <h1 id="hero-title" className="mt-3 text-hero font-bold text-foreground">
                        <span className="block">
                            <WordReveal text={titleLine1} startIndex={line1Start} />
                        </span>{' '}
                        <span className="block">
                            <WordReveal text={titleLine2} startIndex={line2Start} />
                        </span>
                    </h1>
                    <p className="hero-lead mt-6 max-w-[34ch] text-lg leading-relaxed text-muted-foreground">
                        {hero.lead}
                    </p>
                </div>
                {/* On desktop the photo's hard bottom crop sits on the hero's bottom hairline instead of floating.
                    The mobile hero (text first, photo, arrow above the pill nav) is owner-approved as is. */}
                <div
                    data-hero-photo
                    className="hero-photo mx-auto w-full max-w-[18rem] sm:max-w-sm lg:max-w-[30rem] lg:self-end"
                >
                    <Image
                        src={heroImage}
                        alt={hero.imageAlt}
                        fetchPriority="high"
                        loading="eager"
                        sizes="(min-width: 1024px) 30rem, (min-width: 640px) 24rem, 18rem"
                        className="h-auto w-full"
                    />
                </div>
            </div>
            {/* Content-width hairline (like every other rule on the page) for the photo to sit on. */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 hidden px-gutter lg:block"
            >
                <div className="mx-auto max-w-content border-b border-border" />
            </div>
            <a
                href="#sluzby"
                aria-label="Přejít na služby"
                className="hero-arrow absolute bottom-24 left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-full border-[1.5px] border-primary text-primary-ink transition-colors hover:bg-primary hover:text-primary-foreground xl:bottom-8"
            >
                <ArrowDown aria-hidden className="hero-arrow-icon size-5" />
            </a>
        </section>
    )
}
