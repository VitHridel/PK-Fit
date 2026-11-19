import Image from 'next/image'
import { Reveal } from '@/components/motion/Reveal'
import { servicesPhoto } from '@/content/gallery'
import { servicesSection } from '@/content/home'
import { services } from '@/content/services'

export function Services() {
    return (
        <section id="sluzby" aria-labelledby="sluzby-title" className="px-gutter py-section">
            <Reveal className="mx-auto max-w-content">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <h2 id="sluzby-title" className="text-section font-semibold">
                        {servicesSection.title}
                    </h2>
                    <p className="text-sm tracking-[0.03em] text-muted-foreground">
                        {servicesSection.keywords.join(' · ')}
                    </p>
                </div>
                <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
                    <div className="overflow-hidden rounded-lg">
                        <Image
                            src={servicesPhoto.image}
                            alt={servicesPhoto.alt}
                            sizes="(min-width: 768px) 40vw, 100vw"
                            className="aspect-[4/3] h-full w-full object-cover object-[50%_30%] md:aspect-auto"
                        />
                    </div>
                    <ol className="border-t border-rule">
                        {services.map((service, index) => (
                            <li
                                key={service.id}
                                className="grid grid-cols-[2rem_1fr] gap-x-2 gap-y-1 border-b border-border py-4 last:border-b-0"
                            >
                                <span
                                    aria-hidden
                                    className="pt-0.5 text-sm font-semibold text-primary-ink tabular-nums"
                                >
                                    {index + 1}
                                </span>
                                <h3 className="text-title font-semibold">{service.title}</h3>
                                <p className="col-start-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                                    {service.text}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
                <p className="mt-8 max-w-[65ch] text-muted-foreground">{servicesSection.outro}</p>
            </Reveal>
        </section>
    )
}
