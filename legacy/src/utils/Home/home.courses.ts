import image1 from '@/assets/img/hp-courses/image-1.jpg'
import image2 from '@/assets/img/hp-courses/image-2.jpg'
import image3 from '@/assets/img/hp-courses/image-3.jpg'
import image4 from '@/assets/img/hp-courses/image-4.webp'
import image5 from '@/assets/img/hp-courses/image-5.webp'
import { CourseInterface } from '@/global.interface'

export const homeCourses: CourseInterface[] = [
    {
        image: image4,
        headline: 'Mobility Mastery',
        place: 'KK Nemo, Praha 6',
        date: '21. 09. 2025',
        text: 'Intenzivní půldenní workshop zaměřený na diagnostiku pohybu, zlepšení mobility a stabilizaci kloubů. Získáš praktické tipy a postupy, jak lépe porozumět svému tělu, zlepšit posturu, rozšířit rozsah pohybu a předejít bolestem či přetížení. Ideální pro sportovce i pro ty, kdo chtějí kvalitní a zdravý základ pro každodenní život.',
        link: 'https://www.bodymind.store/mobility/'
    },
    {
        image: image5,
        headline: 'Power & Recovery',
        place: 'KK Nemo, Praha 6',
        date: '19. 10. 2025',
        text: 'Power & Recovery je půldenní workshop, který spojuje intenzivní trénink a hlubokou regeneraci. Energizující Power Yoga Flow nastartuje tělo i mysl, silový kruhový trénink posílí celé tělo a závěrečná relaxační část vrátí rovnováhu i novou energii. Ideální pro každého, kdo chce zažít výkon, ale i dávku regenerace v jednom dni.',
        link: 'https://www.bodymind.store/power/'
    },
    {
        image: image1,
        headline: 'Golf Resort Konopiště****',
        place: 'střední Čechy, Tvoršovice',
        date: '06. 02. - 08. 02. 2026',
        text: 'BOSU, Cvičení DNS prof. Koláře, Cvičení s rollery a masážními míčky, Kruhový trénink, Mobilita & stabilita + vstup do bazénů, whirlpoolu, sauny, páry, solné lázně, Kneippova chodníku a posilovny v ceně pobytu',
        link: 'https://www.cklenka.cz/sportovni-vikend/269906022/'
    },
    {
        image: image2,
        headline: 'Amenity Hotel & Resort Orlické hory****',
        place: 'Orlické hory, Deštné v Orlických horách',
        date: '15. 05. - 17. 05. 2026',
        text: 'Cvičení DNS prof. Koláře, Cvičení s rollery a masážními míčky, Foot Work (zdravá chodidla), Mobilita & stabilita + v ceně pobytu vstup do bazénu a wellness (vířivka, finská sauna, bylinná a parní sauna, Kneippův chodník, venkovní ochlazovací bazén)',
        link: 'https://www.cklenka.cz/sportovni-vikend/26041505/'
    },
    {
        image: image3,
        headline: 'Resort Český les',
        place: 'Železná, Bělá nad Radbuzou',
        date: '06. 11. - 08. 11. 2026',
        text: 'Core, Cvičení s rollery a masážními míčky, Kruhový trénink, Mobilita & stabilita + v ceně pobytu vstup do wellness',
        link: 'https://www.cklenka.cz/sportovni-vikend/26240611/'
    },
]