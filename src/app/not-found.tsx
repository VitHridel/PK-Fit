import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import questionMarks from '@/assets/img/question-marks.png'
import { notFound } from '@/content/home'

export const metadata: Metadata = { title: 'Stránka nenalezena' }

export default function NotFound() {
    return (
        <div className="flex min-h-svh items-center px-gutter pt-28 pb-section">
            <div className="mx-auto grid w-full max-w-content items-center gap-12 md:grid-cols-[1.2fr_1fr]">
                <div>
                    <p className="text-sm font-semibold tracking-[0.04em] text-primary-ink">
                        {notFound.title}
                    </p>
                    <h1 className="mt-2 text-hero font-bold">{notFound.subtitle}</h1>
                    <p className="mt-5 max-w-[40ch] text-lg text-muted-foreground">
                        {notFound.text}
                    </p>
                    <Link
                        href="/"
                        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-5 font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
                    >
                        {notFound.backLabel}
                    </Link>
                </div>
                <Image
                    src={questionMarks}
                    alt=""
                    priority
                    className="hidden h-auto w-full max-w-sm md:block"
                />
            </div>
        </div>
    )
}
