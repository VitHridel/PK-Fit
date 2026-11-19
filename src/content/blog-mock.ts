// DEVELOPMENT ONLY — fictional placeholder posts used while the CMS integration is pending.
// Selected by BLOG_SOURCE=mock; must never reach production.
import type { StaticImageData } from 'next/image'
import course3 from '@/assets/img/hp-courses/image-3.jpg'
import gallery1 from '@/assets/img/hp-gallery/image-1.png'
import gallery3 from '@/assets/img/hp-gallery/image-3.png'
import gallery4 from '@/assets/img/hp-gallery/image-4.png'
import type { Post } from '@/lib/blog'

const cover = (image: StaticImageData, alt: string): Post['coverImage'] => ({
    url: image.src,
    width: image.width,
    height: image.height,
    alt,
})

const mockNote = '<p><em>Ukázkový článek pro vývoj webu – skutečný obsah dodá CMS.</em></p>'

export const mockPosts: Post[] = [
    {
        slug: 'bolest-zad-z-sezeni',
        title: 'Bolí vás záda z celodenního sezení? Začněte dechem',
        excerpt:
            'Proč se bolest beder často neozývá ze zad, ale z břicha, a tři jednoduché cviky, které zvládnete u stolu.',
        publishedAt: '2026-11-10T08:00:00Z',
        coverImage: cover(gallery3, 'Petra Konrádová koriguje klientce cvik v rotaci trupu'),
        body: `
<p>Sedavé zaměstnání samo o sobě záda nezničí. Problém nastává, když tělo celý den drží jednu polohu a hluboký stabilizační systém přestane pracovat.</p>
<h2>Dech jako základ stability</h2>
<p>Bránice není jen dýchací sval – spolu s pánevním dnem a hlubokými břišními svaly drží páteř zevnitř. Když dýcháme jen do hrudníku, tahle „vnitřní korzet“ vypne.</p>
<h3>Tři cviky k pracovnímu stolu</h3>
<ol>
<li><strong>Dech do boků</strong> – dlaně položte na spodní žebra a nadechujte se tak, aby se rozšířila do stran.</li>
<li><strong>Sed na sedacích kostech</strong> – zhoupněte pánev dopředu a dozadu a najděte střed.</li>
<li><strong>Protažení hrudní páteře</strong> – propleťte prsty za hlavou a s výdechem se jemně zakloňte přes opěradlo.</li>
</ol>
<blockquote><p>Nejlepší poloha je ta příští. Měňte ji alespoň každých třicet minut.</p></blockquote>
<p>Pokud bolest trvá déle než pár týdnů, <a href="/#kontakt">ozvěte se mi</a> a podíváme se na to společně.</p>
${mockNote}`,
    },
    {
        slug: 'co-je-metoda-dns',
        title: 'Co je metoda DNS a proč ji používám',
        excerpt:
            'Dynamická neuromuskulární stabilizace prof. Koláře vychází z toho, jak se pohybují děti. Co to znamená pro dospělé?',
        publishedAt: '2026-10-22T08:00:00Z',
        coverImage: cover(
            gallery4,
            'Petra Konrádová vede klientku při cvičení na balanční podložce BOSU',
        ),
        body: `
<p>Každé zdravé dítě se naučí sedět, lézt a chodit ve stejném pořadí a se stejnými vzorci. Metoda DNS tyto vývojové pozice využívá k tomu, abychom „přepnuli“ svaly, které dospělým časem vypnuly.</p>
<h2>Pro koho je DNS vhodná</h2>
<ul>
<li>pro lidi s opakovanou bolestí zad nebo kloubů,</li>
<li>po úrazech a po rehabilitaci,</li>
<li>pro sportovce, kteří chtějí zlepšit stabilitu a výkon.</li>
</ul>
<p>Více o metodě najdete na stránkách <a href="https://www.rehabps.com/REHABILITATION/CZHome.html">Prague School of Rehabilitation</a>.</p>
${mockNote}`,
    },
    {
        slug: 'jak-zacit-cvicit-po-padesatce',
        title: 'Jak začít cvičit po padesátce',
        excerpt:
            'Nikdy není pozdě. Na co si dát pozor v prvních týdnech a proč je diagnostika lepší začátek než posilovna.',
        publishedAt: '2026-09-30T08:00:00Z',
        coverImage: cover(gallery1, 'Petra Konrádová ve visu na hrazdě, vedle stojí klientka'),
        body: `
<p>Začít se dá v každém věku. Tělo se přizpůsobuje pohybu i v osmdesáti – jen je potřeba začít rozumně.</p>
<h2>První týdny</h2>
<p>Nejdřív zjistíme, kde jsou omezené rozsahy a které svaly jsou oslabené. Teprve potom přidáváme zátěž.</p>
<h3>Co čekat</h3>
<p>Mírná svalová únava je v pořádku, bolest kloubů ne. <em>Rozdíl mezi nimi se naučíte poznat už na prvním tréninku.</em></p>
${mockNote}`,
    },
    {
        slug: 'sportovni-vikend-co-si-zabalit',
        title: 'Jedete na sportovní víkend? Co si zabalit',
        excerpt: 'Praktický seznam věcí na víkendový kurz – od podložky po přezůvky do wellness.',
        publishedAt: '2026-08-14T08:00:00Z',
        coverImage: cover(course3, 'Resort Český les, místo konání sportovního víkendu'),
        body: `
<p>Na víkendových kurzech cvičíme dvakrát až třikrát denně, takže se vyplatí mít pohodlné oblečení na převlečení.</p>
<ul>
<li>dvě sady sportovního oblečení,</li>
<li>čistou obuv do sálu,</li>
<li>láhev na vodu,</li>
<li>plavky a přezůvky do wellness.</li>
</ul>
${mockNote}`,
    },
    {
        slug: 'pet-mytu-o-posilovani-bricha',
        title: 'Pět mýtů o posilování břicha',
        excerpt:
            'Sklapovačky, výdrž v planku a „spalování tuku na břiše“ – co z toho opravdu funguje?',
        publishedAt: '2026-07-02T08:00:00Z',
        body: `
<p>Silný střed těla není o vyrýsovaných svalech, ale o tom, jak spolupracují.</p>
<h2>Mýtus 1: Čím víc sklapovaček, tím lépe</h2>
<p>Stovky opakování přetěžují bederní páteř a hluboký stabilizační systém téměř nezapojí.</p>
<h2>Mýtus 2: Plank musí trvat minuty</h2>
<p>Kvalita výdrže je důležitější než čas. Jakmile se prohne bedra, cvik končí.</p>
${mockNote}`,
    },
]
