import { ServiceProps } from '@/components/Service/Service'
import Body from '@/assets/img/icons/body.svg'
import Joints from '@/assets/img/icons/klouby.svg'
import Muscles from '@/assets/img/icons/svaly.svg'
import Deportment from '@/assets/img/icons/drzeni-tela.svg'
import Core from '@/assets/img/icons/core.svg'
import Exercise from '@/assets/img/icons/cviceni.svg'

export const homeServicesArray: ServiceProps[] = [
    {
        icon: <Body />,
        headline: 'Diagnostika pohybového aparátu',
        text: 'Úvodní trénink, díky kterému zjistíme, jestli máte zkrácené či oslabené svaly a omezené rozsahy v kloubech.',
    },
    {
        icon: <Joints />,
        headline: 'Mobilita a stabilita',
        text: 'Využijeme cviky k dosažení přirozeného rozsahu páteře a kloubů. Posílíme svaly, které běžně nepoužíváme, a které jsou důležité pro správný pohybový stereotyp.',
    },
    {
        icon: <Muscles />,
        headline: 'Využití metody DNS (prof. Pavel Kolář)',
        text: 'Typ tréninku, který vychází z pohybu dítěte během vývoje. Toto cvičení aktivuje řadu svalů, které slábnou sedavým způsobem života.',
    },
    {
        icon: <Deportment />,
        headline: 'Správné držení těla',
        text: 'V tréninku se zaměříme na cviky, které rozvíjí komplexně celé tělo (sílu, flexibilitu, koordinaci...) a přispívají k prevenci bolesti zad a kloubů.',
    },
    {
        icon: <Core />,
        headline: 'Síla CORE',
        text: 'Cvičení určené k posílení středu těla, aktivaci hlubokých břišních svalů a zlepšení dýchacího stereotypu. Tímto uvolníme běžně přetěžované svaly (za krkem, bedra...).',
    },
    {
        icon: <Exercise />,
        headline: 'Cvičení pro každého',
        text: 'Ať už řešíte zdravotní omezení, máte po rehabilitaci, porodu či chcete změnit svůj životní styl, společně se domluvíme tak, aby vyhovovaly tréninky Vám i Vašim potřebám.',
    },
]