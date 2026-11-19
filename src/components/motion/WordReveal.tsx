import { type CSSProperties, Fragment } from 'react'

type Props = {
    text: string
    /** Position of the first word in the hero's overall word sequence; drives the stagger delay. */
    startIndex: number
    as?: 'span' | 'div'
}

/**
 * Splits text into words for the hero's CSS-only entrance (see `.hero-word` in globals.css).
 * Server component: plain HTML with real spaces, so the text is readable without CSS or JS.
 */
export function WordReveal({ text, startIndex, as: Tag = 'span' }: Props) {
    const words = text.split(/\s+/).filter(Boolean)
    return (
        <Tag>
            {words.map((word, index) => (
                <Fragment key={index}>
                    {index > 0 && ' '}
                    <span
                        className="hero-word"
                        style={{ '--i': startIndex + index } as CSSProperties}
                    >
                        {word}
                    </span>
                </Fragment>
            ))}
        </Tag>
    )
}
