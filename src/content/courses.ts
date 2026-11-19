import type { StaticImageData } from 'next/image'
import image1 from '@/assets/img/hp-courses/image-1.jpg'
import image2 from '@/assets/img/hp-courses/image-2.jpg'
import image3 from '@/assets/img/hp-courses/image-3.jpg'
import image4 from '@/assets/img/hp-courses/image-4.webp'
import image5 from '@/assets/img/hp-courses/image-5.webp'

export type Course = {
    id: string
    title: string
    place: string
    /** ISO date `YYYY-MM-DD` */
    startDate: string
    /** ISO date `YYYY-MM-DD`, for multi-day courses */
    endDate?: string
    description: string
    link: string
    image: StaticImageData
}

export const courses: Course[] = [
    {
        id: 'mobility-mastery-2025-09',
        image: image4,
        title: 'Mobility Mastery',
        place: 'KK Nemo, Praha 6',
        startDate: '2025-09-21',
        description:
            'Intenzivní půldenní workshop zaměřený na diagnostiku pohybu, zlepšení mobility a stabilizaci kloubů. Získáš praktické tipy a postupy, jak lépe porozumět svému tělu, zlepšit posturu, rozšířit rozsah pohybu a předejít bolestem či přetížení. Ideální pro sportovce i pro ty, kdo chtějí kvalitní a zdravý základ pro každodenní život.',
        link: 'https://www.bodymind.store/mobility/',
    },
    {
        id: 'power-recovery-2025-10',
        image: image5,
        title: 'Power & Recovery',
        place: 'KK Nemo, Praha 6',
        startDate: '2025-10-19',
        description:
            'Power & Recovery je půldenní workshop, který spojuje intenzivní trénink a hlubokou regeneraci. Energizující Power Yoga Flow nastartuje tělo i mysl, silový kruhový trénink posílí celé tělo a závěrečná relaxační část vrátí rovnováhu i novou energii. Ideální pro každého, kdo chce zažít výkon, ale i dávku regenerace v jednom dni.',
        link: 'https://www.bodymind.store/power/',
    },
    {
        id: 'konopiste-2026-02',
        image: image1,
        title: 'Golf Resort Konopiště****',
        place: 'střední Čechy, Tvoršovice',
        startDate: '2026-02-06',
        endDate: '2026-02-08',
        description:
            'BOSU, Cvičení DNS prof. Koláře, Cvičení s rollery a masážními míčky, Kruhový trénink, Mobilita & stabilita + vstup do bazénů, whirlpoolu, sauny, páry, solné lázně, Kneippova chodníku a posilovny v ceně pobytu',
        link: 'https://www.cklenka.cz/sportovni-vikend/269906022/',
    },
    {
        id: 'orlicke-hory-2026-05',
        image: image2,
        title: 'Amenity Hotel & Resort Orlické hory****',
        place: 'Orlické hory, Deštné v Orlických horách',
        startDate: '2026-05-15',
        endDate: '2026-05-17',
        description:
            'Cvičení DNS prof. Koláře, Cvičení s rollery a masážními míčky, Foot Work (zdravá chodidla), Mobilita & stabilita + v ceně pobytu vstup do bazénu a wellness (vířivka, finská sauna, bylinná a parní sauna, Kneippův chodník, venkovní ochlazovací bazén)',
        link: 'https://www.cklenka.cz/sportovni-vikend/26041505/',
    },
    {
        id: 'cesky-les-2026-11',
        image: image3,
        title: 'Resort Český les',
        place: 'Železná, Bělá nad Radbuzou',
        startDate: '2026-11-06',
        endDate: '2026-11-08',
        description:
            'Core, Cvičení s rollery a masážními míčky, Kruhový trénink, Mobilita & stabilita + v ceně pobytu vstup do wellness',
        link: 'https://www.cklenka.cz/sportovni-vikend/26240611/',
    },
]
