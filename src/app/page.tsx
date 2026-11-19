import { Reveal } from '@/components/motion/Reveal'
import { ContactCta } from '@/components/sections/ContactCta'
import { Courses } from '@/components/sections/Courses'
import { Gallery } from '@/components/sections/Gallery'
import { Hero } from '@/components/sections/Hero'
import { References } from '@/components/sections/References'
import { Seminars } from '@/components/sections/Seminars'
import { Services } from '@/components/sections/Services'
import { Story } from '@/components/sections/Story'
import { courses } from '@/content/courses'
import { references } from '@/content/references'

// Re-render daily so courses move from "upcoming" to "past" without a redeploy.
export const revalidate = 86400

export default function HomePage() {
    return (
        <>
            <Hero />
            <Services />
            <ContactCta />
            <Gallery />
            <Courses courses={courses} now={new Date()} />
            <Story />
            <Seminars />
            <References references={references} />
            {/* Temporary placeholder until the contact section lands in Task 10. */}
            <section id="kontakt" className="min-h-screen px-gutter py-section">
                <Reveal className="mx-auto max-w-content">
                    <h2 className="text-section font-semibold">Kontakt</h2>
                </Reveal>
            </section>
        </>
    )
}
