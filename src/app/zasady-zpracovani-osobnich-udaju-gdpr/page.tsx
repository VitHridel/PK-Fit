import Link from 'next/link'
import { type GdprClause, gdpr } from '@/content/gdpr'
import { notFound as notFoundCopy } from '@/content/home'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
    title: gdpr.title,
    description: 'Jak Petra Konrádová (PK-FIT) zpracovává osobní údaje a jaká máte práva.',
    path: '/zasady-zpracovani-osobnich-udaju-gdpr',
})

function Clause({ clause }: { clause: GdprClause }) {
    if (typeof clause === 'string') return <>{clause}</>
    if ('lines' in clause) {
        return (
            <>
                {clause.lines.map((line, index) => (
                    <span key={index} className="block">
                        {line}
                    </span>
                ))}
            </>
        )
    }
    return (
        <>
            {clause.text}
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-primary-ink">
                {clause.list.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </>
    )
}

export default function GdprPage() {
    return (
        <div className="px-gutter pt-32 pb-section">
            <div className="mx-auto max-w-[44rem]">
                <h1 className="text-section font-bold">{gdpr.title}</h1>
                <ol className="mt-10 list-[upper-roman] space-y-10 border-t border-rule pt-8 pl-8 marker:font-semibold marker:text-primary-ink">
                    {gdpr.sections.map((section) => (
                        <li key={section.title}>
                            <h2 className="text-title font-semibold">{section.title}</h2>
                            <ol className="mt-3 list-decimal space-y-3 pl-5 leading-relaxed text-muted-foreground marker:text-foreground">
                                {section.clauses.map((clause, index) => (
                                    <li key={index}>
                                        <Clause clause={clause} />
                                    </li>
                                ))}
                            </ol>
                        </li>
                    ))}
                </ol>
                <p className="mt-10 border-t border-border pt-6 text-muted-foreground">
                    {gdpr.effective}
                </p>
                <Link
                    href="/"
                    className="mt-10 inline-flex min-h-11 items-center rounded-full bg-primary px-5 font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
                >
                    {notFoundCopy.backLabel}
                </Link>
            </div>
        </div>
    )
}
