import image1 from '@/assets/img/hp-courses/image-1.jpg'
import image2 from '@/assets/img/hp-courses/image-2.jpg'
import image3 from '@/assets/img/hp-courses/image-3.png'
import image4 from '@/assets/img/hp-courses/image-4.jpg'
import { CourseInterface } from '@/global.interface'

export const homeCourses: CourseInterface[] = [
    {
        image: image1,
        headline: 'Golf Resort Konopiště****',
        place: 'střední Čechy, Tvoršovice',
        date: '09.02. - 11.02.2024',
        text: 'BOSU, Cvičení s rollery a masážními míčky, Mobilita & stabilita , Tabata, cvičení DNS prof. Koláře',
        link: 'https://www.cklenka.cz/sportovni-vikend/249909022/'
    },
    {
        image: image2,
        headline: 'Wellness penzion Medličky',
        place: 'Vysočina, Švábov',
        date: '15.03. - 17.03.2024',
        text: 'DNS Flow, Funkční noha, Roller (Pěnový válec), Zdravá záda (automobilizace = uvolňování kloubních blokád)',
        link: 'https://www.cklenka.cz/sportovni-vikend/24121503/'
    },
    {
        image: image3,
        headline: 'Zámek Třešť',
        place: 'Vysočina, Třešť',
        date: '27.09. - 29.09.2024',
        text: 'Cvičení s rollery a masážními míčky, DNS Flow, Kruhový trénink, Mobilita & stabilita',
        link: 'https://www.cklenka.cz/sportovni-vikend/24412709/'
    },
    {
        image: image4,
        headline: 'Hotel Tammel****',
        place: 'Český ráj, Jičín',
        date: '18.10. - 20.10.2024',
        text: 'Cvičení s rollery a masážními míčky, DNS Flow, Tabata, Zdravá záda',
        link: 'https://www.cklenka.cz/sportovni-vikend/24211810/'
    }
]