import { render } from '@testing-library/react'
import { WordReveal } from '@/components/motion/WordReveal'

describe('WordReveal', () => {
    it('renders one span per word with consecutive --i indexes', () => {
        const { container } = render(
            <h1>
                <WordReveal text="Zdravé tělo bez bolesti" startIndex={5} />
            </h1>,
        )
        const words = container.querySelectorAll('span.hero-word')
        expect(words).toHaveLength(4)
        expect(
            [...words].map((word) => (word as HTMLElement).style.getPropertyValue('--i')),
        ).toEqual(['5', '6', '7', '8'])
        expect(container.querySelector('h1')?.textContent).toBe('Zdravé tělo bez bolesti')
    })
})
