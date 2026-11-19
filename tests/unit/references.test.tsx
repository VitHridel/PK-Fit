import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { References } from '@/components/sections/References'
import type { Reference } from '@/content/references'

const references: Reference[] = ['Anna', 'Bára', 'Cyril', 'David', 'Eva'].map((name) => ({
    name,
    text: `Reference od ${name}`,
}))

describe('References', () => {
    it('renders every reference in the HTML, shows three and expands the rest', async () => {
        const user = userEvent.setup()
        const { container } = render(<References references={references} />)

        for (const { name } of references) expect(container.innerHTML).toContain(name)
        const items = [...container.querySelectorAll('li')]
        expect(items).toHaveLength(5)
        expect(items.filter((item) => !item.hidden)).toHaveLength(3)

        const button = screen.getByRole('button', { name: 'zobrazit všechny reference' })
        expect(button).toHaveAttribute('aria-expanded', 'false')
        expect(button).toHaveAttribute('aria-controls')
        await user.click(button)
        expect(items.filter((item) => !item.hidden)).toHaveLength(5)
    })
})
