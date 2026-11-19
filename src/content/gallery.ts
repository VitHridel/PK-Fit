import type { StaticImageData } from 'next/image'
import image1 from '@/assets/img/hp-gallery/image-1.png'
import image2 from '@/assets/img/hp-gallery/image-2.png'
import image3 from '@/assets/img/hp-gallery/image-3.png'
import image4 from '@/assets/img/hp-gallery/image-4.png'

export type GalleryImage = {
    image: StaticImageData
    alt: string
    /** Hidden on phones (e.g. because the same photo already illustrates the services). */
    hideOnMobile?: boolean
}

export const servicesPhoto: GalleryImage = {
    image: image3,
    alt: 'Petra Konrádová koriguje klientce cvik v rotaci trupu',
}

export const gallery: GalleryImage[] = [
    { image: image1, alt: 'Petra Konrádová ve visu na hrazdě, vedle stojí klientka' },
    { ...servicesPhoto, hideOnMobile: true },
    { image: image4, alt: 'Petra Konrádová vede klientku při cvičení na balanční podložce BOSU' },
    { image: image2, alt: 'Petra Konrádová odpočívá v posilovně s lahví vody' },
]
