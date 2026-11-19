import Image from 'next/image'
import { Reveal } from '@/components/motion/Reveal'
import { gallery } from '@/content/gallery'
import { cn } from '@/lib/utils'

export function Gallery() {
    const lastMobileIndex = gallery.findLastIndex((item) => !item.hideOnMobile)

    return (
        <section aria-label="Galerie" className="px-gutter py-section">
            <Reveal
                as="ul"
                className="mx-auto grid max-w-content grid-cols-2 items-start gap-3 sm:gap-4 lg:grid-cols-4"
            >
                {gallery.map((item, index) => {
                    const isLastOnMobile = index === lastMobileIndex
                    return (
                        <li
                            key={item.alt}
                            className={cn(
                                index % 2 === 1 && 'lg:mt-12',
                                item.hideOnMobile && 'max-sm:hidden',
                                isLastOnMobile && 'max-sm:col-span-2',
                            )}
                        >
                            <Image
                                src={item.image}
                                alt={item.alt}
                                sizes="(min-width: 1024px) 18rem, (min-width: 640px) 50vw, 100vw"
                                className={cn(
                                    'aspect-square w-full rounded-lg object-cover',
                                    // Full-width on phones: keep the whole head (and a little above) in frame.
                                    isLastOnMobile && 'max-sm:aspect-[4/3] max-sm:object-top',
                                )}
                            />
                        </li>
                    )
                })}
            </Reveal>
        </section>
    )
}
