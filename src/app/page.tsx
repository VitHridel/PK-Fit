import { Reveal } from '@/components/motion/Reveal'
import { Hero } from '@/components/sections/Hero'

// Temporary placeholder sections so navigation can be built and tested;
// each one is replaced by its real section in Tasks 6–10.
const placeholders = [
    ['sluzby', 'Služby'],
    ['kurzy', 'Kurzy'],
    ['o-mne', 'O mně'],
    ['seminare', 'Semináře'],
    ['reference', 'Reference'],
    ['kontakt', 'Kontakt'],
] as const

export default function HomePage() {
    return (
        <>
            <Hero />
            {placeholders.map(([id, title]) => (
                <section key={id} id={id} className="min-h-screen px-gutter py-section">
                    <Reveal className="mx-auto max-w-content">
                        <h2 className="text-section font-semibold">{title}</h2>
                    </Reveal>
                </section>
            ))}
        </>
    )
}
