/** A numbered clause: plain text, text followed by a bullet list, or separate lines. */
export type GdprClause = string | { text: string; list: string[] } | { lines: string[] }
export type GdprSection = { title: string; clauses: GdprClause[] }

export const gdpr: { title: string; sections: GdprSection[]; effective: string } = {
    title: 'Zásady zpracování osobních údajů',
    sections: [
        {
            title: 'Základní ustanovení',
            clauses: [
                'Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů (dále jen: „GDPR”) je Petra Konrádová, IČ: 07044143, se sídlem: Praha 6, Břevnov, Bělohorská 249/61, (dále jen: „správce“).',
                {
                    lines: [
                        'Kontaktní údaje správce jsou:',
                        'adresa: Praha 6, Břevnov, Bělohorská 249/61',
                        'email: info@pk-fit.cz',
                        'telefon: +420 720 458 858',
                    ],
                },
                'Osobními údaji se rozumí veškeré informace o identifikované nebo identifikovatelné fyzické osobě; identifikovatelnou fyzickou osobou je fyzická osoba, kterou lze přímo či nepřímo identifikovat, zejména odkazem na určitý identifikátor, například jméno, identifikační číslo, lokační údaje, síťový identifikátor nebo na jeden či více zvláštních prvků fyzické, fyziologické, genetické, psychické, ekonomické, kulturní nebo společenské identity této fyzické osoby.',
                'Správce nejmenoval pověřence pro ochranu osobních údajů.',
            ],
        },
        {
            title: 'Zdroje a kategorie zpracovávaných osobních údajů',
            clauses: [
                'Správce zpracovává osobní údaje, které jste mu poskytl/a nebo osobní údaje, které správce získal na základě plnění Vaší objednávky.',
                'Správce zpracovává Vaše identifikační a kontaktní údaje a údaje nezbytné pro plnění smlouvy.',
            ],
        },
        {
            title: 'Zákonný důvod a účel zpracování osobních údajů',
            clauses: [
                {
                    text: 'Zákonným důvodem zpracování osobních údajů je',
                    list: [
                        'plnění smlouvy mezi Vámi a správcem podle čl. 6 odst. 1 písm. b) GDPR,',
                        'oprávněný zájem správce na poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. f) GDPR,',
                        'Váš souhlas se zpracováním pro účely poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. a) GDPR ve spojení s § 7 odst. 2 zákona č. 480/2004 Sb., o některých službách informační společnosti v případě, že nedošlo k objednávce zboží nebo služby.',
                    ],
                },
                {
                    text: 'Účelem zpracování osobních údajů je',
                    list: [
                        'vyřízení Vaší objednávky a výkon práv a povinností vyplývajících ze smluvního vztahu mezi Vámi a správcem; při objednávce jsou vyžadovány osobní údaje, které jsou nutné pro úspěšné vyřízení objednávky (jméno a adresa, kontakt), poskytnutí osobních údajů je nutným požadavkem pro uzavření a plnění smlouvy, bez poskytnutí osobních údajů není možné smlouvu uzavřít či jí ze strany správce plnit,',
                        'zasílání obchodních sdělení a činění dalších marketingových aktivit.',
                    ],
                },
                'Ze strany správce nedochází k automatickému individuálnímu rozhodování ve smyslu čl. 22 GDPR. S takovým zpracováním jste poskytl/a svůj výslovný souhlas.',
            ],
        },
        {
            title: 'Doba uchovávání údajů',
            clauses: [
                {
                    text: 'Správce uchovává osobní údaje',
                    list: [
                        'po dobu nezbytnou k výkonu práv a povinností vyplývajících ze smluvního vztahu mezi Vámi a správcem a uplatňování nároků z těchto smluvních vztahů (po dobu 15 let od ukončení smluvního vztahu).',
                        'po dobu, než je odvolán souhlas se zpracováním osobních údajů pro účely marketingu, nejdéle 10 let, jsou-li osobní údaje zpracovávány na základě souhlasu.',
                    ],
                },
                'Po uplynutí doby uchovávání osobních údajů správce osobní údaje vymaže.',
            ],
        },
        {
            title: 'Příjemci osobních údajů (subdodavatelé správce)',
            clauses: [
                {
                    text: 'Příjemci osobních údajů jsou osoby',
                    list: [
                        'podílející se na dodání zboží / služeb / realizaci plateb na základě smlouvy,',
                        'podílející se na zajištění provozu služeb,',
                        'zajišťující marketingové služby.',
                    ],
                },
                'Správce nemá v úmyslu předat osobní údaje do třetí země (do země mimo EU) nebo mezinárodní organizaci. Příjemci osobních údajů ve třetích zemích jsou poskytovatelé mailingových služeb / cloudových služeb.',
            ],
        },
        {
            title: 'Vaše práva',
            clauses: [
                {
                    text: 'Za podmínek stanovených v GDPR máte',
                    list: [
                        'právo na přístup ke svým osobním údajům dle čl. 15 GDPR,',
                        'právo opravu osobních údajů dle čl. 16 GDPR, popřípadě omezení zpracování dle čl. 18 GDPR.',
                        'právo na výmaz osobních údajů dle čl. 17 GDPR.',
                        'právo vznést námitku proti zpracování dle čl. 21 GDPR a',
                        'právo na přenositelnost údajů dle čl. 20 GDPR.',
                        'právo odvolat souhlas se zpracováním písemně nebo elektronicky na adresu nebo email správce uvedený v čl. III těchto podmínek.',
                    ],
                },
                'Dále máte právo podat stížnost u Úřadu pro ochranu osobních údajů v případě, že se domníváte, že bylo porušeno Vaší právo na ochranu osobních údajů.',
            ],
        },
        {
            title: 'Podmínky zabezpečení osobních údajů',
            clauses: [
                'Správce prohlašuje, že přijal veškerá vhodná technická a organizační opatření k zabezpečení osobních údajů.',
                'Správce přijal technická opatření k zabezpečení datových úložišť a úložišť osobních údajů v listinné podobě, zejména antivirovými programy, bezpečným uložením záloh a pravidelnou kontrolou bezpečnosti.',
                'Správce prohlašuje, že k osobním údajům mají přístup pouze jím pověřené osoby.',
            ],
        },
        {
            title: 'Závěrečná ustanovení',
            clauses: [
                'Odesláním objednávky z internetového objednávkového formuláře potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.',
                'S těmito podmínkami souhlasíte zaškrtnutím souhlasu prostřednictvím internetového formuláře. Zaškrtnutím souhlasu potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.',
                'Správce je oprávněn tyto podmínky změnit. Novou verzi podmínek ochrany osobních údajů zveřejní na svých internetových stránkách, případně Vám zašle novou verzi těchto podmínek na e-mailovou adresu, kterou jste správci poskytl/a.',
            ],
        },
    ],
    effective: 'Tyto podmínky nabývají účinnosti dnem 1.1.2021',
}
