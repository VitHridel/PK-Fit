// Temporary placeholder sections so navigation can be built and tested;
// each one is replaced by its real section in Tasks 5–10.
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
            <h1 className="px-gutter pt-32 text-hero font-bold">PK-FIT</h1>
            {placeholders.map(([id, title]) => (
                <section key={id} id={id} className="min-h-screen px-gutter py-section">
                    <h2 className="text-section font-semibold">{title}</h2>
                </section>
            ))}
        </>
    )
}
