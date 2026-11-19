import { Reveal } from '@/components/motion/Reveal'
import { ContactCta } from '@/components/sections/ContactCta'
import { Gallery } from '@/components/sections/Gallery'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'

// Temporary placeholder sections so navigation can be built and tested;
// each one is replaced by its real section in Tasks 7–10.
const placeholders = [
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
            <Services />
            <ContactCta />
            <Gallery />
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
