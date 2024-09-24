import { ReactNode } from 'react'

export interface HomeSeminarInterface {
    text: string
    link: ReactNode
}

export const homeSeminars: HomeSeminarInterface[] = [
    {
        text: 'Instruktor fitness - osobní trenér',
        link: <a href="https://tonus.cz/" target="_blank">Tonus Institut</a>
    },
    {
        text: 'Instruktor aerobiku',
        link: <a href="https://wellness.cz/" target="_blank">wellness.cz</a>
    },
    {
        text: 'Certifikovaný DNS trenér',
        link: <a href="https://www.rehabps.com/REHABILITATION/CZHome.html" target="_blank">rehabps.cz</a>
    },
    {
        text: 'Svalové řetězce, trigger pointy, kinesiotaping',
        link: <a href="https://www.improveacademy.cz/" target="_blank">improveacademy.cz</a>
    },
    {
        text: 'Pánevní dno, uvolnění kloubních blokád páteře - automobilizace, funkční noha a ruka, těhotné a po porodu, cvičení s tyčí a overbally, BOSU rehab, SI skloubení, cvičení u výhřezu meziobratlové ploténky bederní páteře, cvičení s overballem',
        link: <a href="https://ivanakellnerova.cz/" target="_blank">ivanakellnerova.cz</a>
    },
    {
        text: 'Triobody',
        link: <a href="https://fisaf.cz/" target="_blank">fisaf.cz</a>
    },
    {
        text: '3D fitness trénink',
        link: <a href="https://www.iqpohyb.cz/" target="_blank">iqpohyb.cz</a>
    },
    {
        text: 'Intensive course',
        link: 'Khora Movement School'
    },
    {
        text: 'Seminář pro rozhodčí Aerobic Master Class',
        link: <a href="https://aerobicdanceleague.cz/" target="_blank">aerobicdanceleague.cz</a>
    },
    {
        text: 'Výživový poradce',
        link: <a href="https://vitalinstitut.cz/" target="_blank">vitalinstitut.cz</a>
    },
]