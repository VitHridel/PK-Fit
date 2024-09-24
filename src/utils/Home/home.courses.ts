import image1 from '@/assets/img/hp-courses/image-1.jpg'
import image2 from '@/assets/img/hp-courses/image-2.jpg'
// import image3 from '@/assets/img/hp-courses/image-3.png'
import image4 from '@/assets/img/hp-courses/image-4.jpg'
import { CourseInterface } from '@/global.interface'

export const homeCourses: CourseInterface[] = [
    {
        image: image4,
        headline: 'Hotel Tammel****',
        place: 'Český ráj, Jičín',
        date: '18.10. - 20.10.2024',
        text: 'Cvičení s rollery a masážními míčky, DNS Flow, Tabata, Zdravá záda + v ceně pobytu vstup do wellness (bazén, sauny, whirlpool)',
        link: 'https://www.cklenka.cz/sportovni-vikend/24211810/'
    },
    {
        image: image1,
        headline: 'Golf Resort Konopiště****',
        place: 'střední Čechy, Tvoršovice',
        date: '07. 02. - 09. 02. 2025',
        text: 'BOSU, Core, Cvičení s rollery a masážními míčky, Kruhový trénink + vstup do bazénů, whirlpoolu, sauny, páry, solné lázně, Kneippova chodníku a posilovny v ceně pobytu',
        link: 'https://www.cklenka.cz/sportovni-vikend/259907022/'
    },
    {
        image: image2,
        headline: 'Panorama Golf Resort',
        place: 'střední Čechy, Kácov',
        date: '31. 10. - 02. 11. 2025',
        text: 'Cvičení DNS prof. Koláře, Funkční posilování, Mobilita, Pánevní dno + v ceně pobytu vstup do wellness (bazén, whirlpooly, sauna, pára, Kneippův chodník)',
        link: 'https://www.cklenka.cz/sportovni-vikend/25063110/'
    },
    /*{
        image: image3,
        headline: 'Zámek Třešť',
        place: 'Vysočina, Třešť',
        date: '27.09. - 29.09.2024',
        text: 'Cvičení s rollery a masážními míčky, DNS Flow, Kruhový trénink, Mobilita & stabilita',
        link: 'https://www.cklenka.cz/sportovni-vikend/24412709/'
    },*/
]