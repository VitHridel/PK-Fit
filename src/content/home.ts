/** A run of text; `strong` segments are rendered emphasized. */
export type RichSegment = string | { strong: string }
export type RichParagraph = RichSegment[]

/** Placeholder until the owner supplies new, shorter hero copy. */
export const hero = {
    eyebrow: 'Petra Konrádová · fitness trenérka',
    title: 'Zdravé tělo bez bolesti',
    /** The approved hero breaks the title after "tělo". */
    titleLines: ['Zdravé tělo', 'bez bolesti'] as const,
    lead: 'Pomáhám od bolesti a učím prevenci, aby se pohyb stal radostí, ne povinností.',
    imageAlt: 'Petra Konrádová',
}

export const servicesSection = {
    title: 'Služby',
    keywords: ['Diagnostika', 'Pohyb', 'Prevence'],
    outro: 'Zařídím, abyste mohli žít bez bolesti, díky mé komplexní pomoci a prevenci. Nebojte se zeptat i na další služby, které v seznamu nenajdete.',
}

export const contactCta = {
    title: 'Máte specifický problém nebo s cvičením teprve začínáte?',
}

export const coursesSection = {
    title: 'Sportovní víkendy a akce',
    upcomingTitle: 'Nadcházející',
    pastTitle: 'Proběhlé',
    /** Empty state when nothing is upcoming (owner-approved copy). */
    empty: {
        title: 'Další víkend chystám!',
        before: 'Termín zatím není venku — ',
        link: 'napište si o něj',
        after: ' a dám vám vědět jako první.',
    },
    upcomingCta: 'podrobnosti a přihláška',
    showOlder: 'zobrazit starší',
    allCoursesLabel: 'zobrazit všechny kurzy',
    allCoursesUrl: 'https://www.cklenka.cz/instruktor/detail/konradova-petra/',
}

export const story: {
    title: string
    imageAlt: string
    signature: string
    paragraphs: RichParagraph[]
} = {
    title: 'Můj příběh',
    signature: 'Petra',
    imageAlt: 'Petra Konrádová',
    paragraphs: [
        [
            'Také jsem se dřív každou chvíli kontrolovala v zrcadle, jestli mi někde z pod trička nevykukuje kus břicha nebo jestli nemám v těch kraťasech tlustá stehna. Kdybych řekla, že už to teď neřeším, tak bych lhala. Ale to, co jsem si uvědomila bylo, že vzhled už pro mě není priorita. Důležitější pro mě je, ',
            { strong: 'jak se cítím' },
            ', jestli mi tělo funguje a můžu dělat, co chci a ',
            { strong: 'bez omezení či bolesti' },
            '.',
        ],
        [
            { strong: 'A co vlastně znamená být FIT?' },
            ' Udýchat výšlap do kopce? Sjet na lyžích sjezdovku na jeden zátah? Zvednout těžký nákup bez píchnutí v kříži? Vylézt na nejvyšší bod lezecké stěny? K tomu všemu Vám mohu pomoci. Za mě je důležité, aby ',
            { strong: 'tréninky byly všestranné' },
            ' a klienti měli ',
            { strong: 'radost z pohybu' },
            ' i z běžných činností, které se jim najednou dělají s lehkostí a s co nejmenším úsilím.',
        ],
        [
            'Díky ',
            { strong: 'propojení těla a mysli' },
            ' v pohybu budete moci dělat, co chcete. S tréninkovou přípravou pod mým vedení Vaše tělo společně připravíme nejen na aktivně strávený čas, ale i na delší sezení. Pohyb se tak stane Vaším dlouhodobým návykem a motivací k lepšímu JÁ. Budete ',
            { strong: 'více nabití energií' },
            ', produktivnější v práci a motivujete i svou rodinu a okolí. ',
            { strong: 'Hlavní je ZAČÍT, zbytek nechte na mně' },
            '.',
        ],
    ],
}

export const seminarsSection = { title: 'Absolvované semináře' }
export const referencesSection = {
    title: 'Reference klientů',
    showAll: 'zobrazit všechny reference',
}

export const contactSection = {
    title: 'Kontaktujte mě',
    subtitle: 'Domluvme si termín tréninku nebo si jen nezávazně popovídejme.',
}

export const notFound = {
    title: '404 ERROR',
    subtitle: 'Ups... tady nic není',
    text: 'Stránka, kterou hledáte neexistuje. Vraťte se prosím na úvod webu.',
    backLabel: 'zpátky na hlavní stránku',
}

export const blogTeaser = {
    title: 'Z blogu',
    before: 'Zaujalo Vás něco a zajímá Vás více můj pohled na cvičení a zdravý životní styl? ',
    contactLink: 'Kontaktujte mne',
    after: ' nebo navštivte můj blog a zjistěte více jak o cvičení, zdravém životním stylu i o mně.',
    cta: 'přejít na blog',
}

export const blogPage = {
    title: 'Blog',
    description: 'Články Petry Konrádové o cvičení bez bolesti, prevenci a zdravém životním stylu.',
    empty: 'Zatím tu nejsou žádné články.',
    back: 'všechny články',
}

export const contactForm = {
    label: 'Kontaktní formulář',
    submit: 'odeslat',
    pending: 'odesílám…',
    successTitle: 'Děkuji, zpráva je odeslaná',
    successText: 'Ozvu se vám co nejdříve.',
    another: 'odeslat další zprávu',
    gdprBefore: 'Odesláním tohoto formuláře souhlasíte s ',
    gdprLink: 'podmínkami GDPR',
    turnstileMissing:
        'Ověření proti robotům se nenačetlo. Napište mi prosím na info@pk-fit.cz nebo zavolejte na +420 720 458 858.',
    noscript:
        'Formulář potřebuje zapnutý JavaScript. Napište mi na info@pk-fit.cz nebo zavolejte na +420 720 458 858.',
}
