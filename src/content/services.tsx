import type { ComponentType, SVGProps } from 'react'
import Body from '@/assets/img/icons/body.svg'
import Core from '@/assets/img/icons/core.svg'
import Exercise from '@/assets/img/icons/cviceni.svg'
import Deportment from '@/assets/img/icons/drzeni-tela.svg'
import Joints from '@/assets/img/icons/klouby.svg'
import Muscles from '@/assets/img/icons/svaly.svg'

export type Service = {
    id: string
    title: string
    text: string
    Icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const services: Service[] = [
    {
        id: 'diagnostika',
        Icon: Body,
        title: 'Diagnostika pohybového aparátu',
        text: 'Úvodní trénink, díky kterému zjistíme, jestli máte zkrácené či oslabené svaly a omezené rozsahy v kloubech.',
    },
    {
        id: 'mobilita-stabilita',
        Icon: Joints,
        title: 'Mobilita a stabilita',
        text: 'Využijeme cviky k dosažení přirozeného rozsahu páteře a kloubů. Posílíme svaly, které běžně nepoužíváme, a které jsou důležité pro správný pohybový stereotyp.',
    },
    {
        id: 'dns',
        Icon: Muscles,
        title: 'Využití metody DNS (prof. Pavel Kolář)',
        text: 'Typ tréninku, který vychází z pohybu dítěte během vývoje. Toto cvičení aktivuje řadu svalů, které slábnou sedavým způsobem života.',
    },
    {
        id: 'drzeni-tela',
        Icon: Deportment,
        title: 'Správné držení těla',
        text: 'V tréninku se zaměříme na cviky, které rozvíjí komplexně celé tělo (sílu, flexibilitu, koordinaci...) a přispívají k prevenci bolesti zad a kloubů.',
    },
    {
        id: 'core',
        Icon: Core,
        title: 'Síla CORE',
        text: 'Cvičení určené k posílení středu těla, aktivaci hlubokých břišních svalů a zlepšení dýchacího stereotypu. Tímto uvolníme běžně přetěžované svaly (za krkem, bedra...).',
    },
    {
        id: 'pro-kazdeho',
        Icon: Exercise,
        title: 'Cvičení pro každého',
        text: 'Ať už řešíte zdravotní omezení, máte po rehabilitaci, porodu či chcete změnit svůj životní styl, společně se domluvíme tak, aby vyhovovaly tréninky Vám i Vašim potřebám.',
    },
]
