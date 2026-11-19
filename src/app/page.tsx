import { JsonLd } from '@/components/JsonLd'
import { BlogTeaser } from '@/components/sections/BlogTeaser'
import { Contact } from '@/components/sections/Contact'
import { ContactCta } from '@/components/sections/ContactCta'
import { Courses } from '@/components/sections/Courses'
import { Gallery } from '@/components/sections/Gallery'
import { Hero } from '@/components/sections/Hero'
import { References } from '@/components/sections/References'
import { Seminars } from '@/components/sections/Seminars'
import { Services } from '@/components/sections/Services'
import { Story } from '@/components/sections/Story'
import { courses } from '@/content/courses'
import { homeMeta } from '@/content/home'
import { references } from '@/content/references'
import { getPosts } from '@/lib/blog'
import { homeJsonLd } from '@/lib/jsonld'
import { pageMetadata } from '@/lib/metadata'

// Re-render hourly so a finished course moves from "upcoming" to "past" (and loses its Event
// JSON-LD) soon after its last day ends, without a redeploy. Regeneration also reads blog posts,
// so a failing blog source keeps serving the previous page.
export const revalidate = 3600

export const metadata = pageMetadata({
    title: homeMeta.title,
    description: homeMeta.description,
    path: '/',
})

export default async function HomePage() {
    const posts = await getPosts()
    const now = new Date()
    return (
        <>
            <JsonLd data={homeJsonLd(courses, now)} />
            <Hero />
            <Services />
            <ContactCta />
            <Gallery />
            <Courses courses={courses} now={now} />
            <Story />
            <Seminars />
            <References references={references} />
            <BlogTeaser posts={posts} />
            <Contact />
        </>
    )
}
