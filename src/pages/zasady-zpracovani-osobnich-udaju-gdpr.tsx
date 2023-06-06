import { GdprContent, GdprSubtitle } from '@/components/pageComponents/Gdpr/GdprContent'
import { Container, Stack, Typography } from '@mui/material'
import { PrimaryButton } from '@/components/Button/PrimaryButton/PrimaryButton'

const ZasadyZpracovaniOsobnichUdajuGdpr = () => {
    return (
        <Container sx={{ paddingY: '2rem' }}>
            <Typography variant="h1">Zásady zpracování osobních údajů</Typography>
            <GdprContent>
                <ol type="I">
                    <li>
                        <GdprSubtitle>Základní ustanovení</GdprSubtitle>
                        <ol>
                            <li>
                                Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů (dále jen: „GDPR”) je Petra Konrádová, IČ: 07044143, se sídlem: Praha 6, Břevnov, Bělohorská 249/61, (dále jen: „správce“).
                            </li>
                            <li>
                                Kontaktní údaje správce jsou:<br />
                                adresa: Praha 6, Břevnov, Bělohorská 249/61<br />
                                email: info@pk-fit.cz<br />
                                telefon: +420 720 458 858<br />
                            </li>
                            <li>
                                Osobními údaji se rozumí veškeré informace o identifikované nebo identifikovatelné fyzické osobě; identifikovatelnou fyzickou osobou je fyzická osoba, kterou lze přímo či nepřímo identifikovat, zejména odkazem na určitý identifikátor, například jméno, identifikační číslo, lokační údaje, síťový identifikátor nebo na jeden či více zvláštních prvků fyzické, fyziologické, genetické, psychické, ekonomické, kulturní nebo společenské identity této fyzické osoby.
                            </li>
                            <li>Správce nejmenoval pověřence pro ochranu osobních údajů.</li>
                        </ol>
                    </li>

                    <li>
                        <GdprSubtitle>Zdroje a kategorie zpracovávaných osobních údajů</GdprSubtitle>
                        <ol>
                            <li>Správce zpracovává osobní údaje, které jste mu poskytl/a nebo osobní údaje, které správce získal na základě plnění Vaší objednávky.</li>
                            <li>Správce zpracovává Vaše identifikační a kontaktní údaje a údaje nezbytné pro plnění smlouvy.</li>
                        </ol>
                    </li>

                    <li>
                        <GdprSubtitle>Zákonný důvod a účel zpracování osobních údajů</GdprSubtitle>
                        <ol>
                            <li>Zákonným důvodem zpracování osobních údajů je
                                <ul>
                                    <li>plnění smlouvy mezi Vámi a správcem podle čl. 6 odst. 1 písm. b) GDPR,</li>
                                    <li> oprávněný zájem správce na poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. f) GDPR,</li>
                                    <li>Váš souhlas se zpracováním pro účely poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. a) GDPR ve spojení s § 7 odst. 2 zákona č. 480/2004 Sb., o některých službách informační společnosti v případě, že nedošlo k objednávce zboží nebo služby.</li>
                                </ul>
                            </li>
                            <li>Účelem zpracování osobních údajů je
                                <ul>
                                    <li>vyřízení Vaší objednávky a výkon práv a povinností vyplývajících ze smluvního vztahu mezi Vámi a správcem; při objednávce jsou vyžadovány osobní údaje, které jsou nutné pro úspěšné vyřízení objednávky (jméno a adresa, kontakt), poskytnutí osobních údajů je nutným požadavkem pro uzavření a plnění smlouvy, bez poskytnutí osobních údajů není možné smlouvu uzavřít či jí ze strany správce plnit,</li>
                                    <li>zasílání obchodních sdělení a činění dalších marketingových aktivit.</li>
                                </ul>
                            </li>
                            <li>Ze strany správce nedochází k automatickému individuálnímu rozhodování ve smyslu čl. 22 GDPR. S takovým zpracováním jste poskytl/a svůj výslovný souhlas.</li>
                        </ol>
                    </li>

                    <li>
                        <GdprSubtitle>Doba uchovávání údajů</GdprSubtitle>
                        <ol>
                            <li>
                                Správce uchovává osobní údaje
                                <ul>
                                    <li>po dobu nezbytnou k výkonu práv a povinností vyplývajících ze smluvního vztahu mezi Vámi a správcem a uplatňování nároků z těchto smluvních vztahů (po dobu 15 let od ukončení smluvního vztahu).</li>
                                    <li>po dobu, než je odvolán souhlas se zpracováním osobních údajů pro účely marketingu, nejdéle 10  let, jsou-li osobní údaje zpracovávány na základě souhlasu.</li>
                                </ul>
                            </li>
                            <li>Po uplynutí doby uchovávání osobních údajů správce osobní údaje vymaže.</li>
                        </ol>
                    </li>

                    <li>
                        <GdprSubtitle>Příjemci osobních údajů (subdodavatelé správce)</GdprSubtitle>
                        <ol>
                            <li>
                                Příjemci osobních údajů jsou osoby
                                <ul>
                                    <li>podílející se na dodání zboží / služeb / realizaci plateb na základě smlouvy,</li>
                                    <li>podílející se na zajištění provozu služeb,</li>
                                    <li>zajišťující marketingové služby.</li>
                                </ul>
                            </li>
                            <li>Správce nemá v úmyslu předat osobní údaje do třetí země (do země mimo EU) nebo mezinárodní organizaci. Příjemci osobních údajů ve třetích zemích jsou poskytovatelé mailingových služeb / cloudových služeb.</li>
                        </ol>
                    </li>

                    <li>
                        <GdprSubtitle>Vaše práva</GdprSubtitle>
                        <ol>
                            <li>
                                Za podmínek stanovených v GDPR máte
                                <ul>
                                    <li>právo na přístup ke svým osobním údajům dle čl. 15 GDPR,</li>
                                    <li>právo opravu osobních údajů dle čl. 16 GDPR, popřípadě omezení zpracování dle čl. 18 GDPR.</li>
                                    <li>právo na výmaz osobních údajů dle čl. 17 GDPR.</li>
                                    <li>právo vznést námitku proti zpracování dle čl. 21 GDPR a</li>
                                    <li>právo na přenositelnost údajů dle čl. 20 GDPR.</li>
                                    <li>právo odvolat souhlas se zpracováním písemně nebo elektronicky na adresu nebo email správce uvedený v čl. III těchto podmínek.</li>
                                </ul>
                            </li>
                            <li>Dále máte právo podat stížnost u Úřadu pro ochranu osobních údajů v případě, že se domníváte, že bylo porušeno Vaší právo na ochranu osobních údajů.</li>
                        </ol>
                    </li>

                    <li>
                        <GdprSubtitle>Podmínky zabezpečení osobních údajů</GdprSubtitle>
                        <ol>
                            <li>Správce prohlašuje, že přijal veškerá vhodná technická a organizační opatření k zabezpečení osobních údajů.</li>
                            <li>Správce přijal technická opatření k zabezpečení datových úložišť a úložišť osobních údajů v listinné podobě, zejména antivirovými programy, bezpečným uložením záloh a pravidelnou kontrolou bezpečnosti.</li>
                            <li>Správce prohlašuje, že k osobním údajům mají přístup pouze jím pověřené osoby.</li>
                        </ol>
                    </li>

                    <li>
                        <GdprSubtitle>Závěrečná ustanovení</GdprSubtitle>
                        <ol>
                            <li>Odesláním objednávky z internetového objednávkového formuláře potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.</li>
                            <li>S těmito podmínkami souhlasíte zaškrtnutím souhlasu prostřednictvím internetového formuláře. Zaškrtnutím souhlasu potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.</li>
                            <li>Správce je oprávněn tyto podmínky změnit. Novou verzi podmínek ochrany osobních údajů zveřejní na svých internetových stránkách, případně Vám zašle novou verzi těchto podmínek na e-mailovou adresu, kterou jste správci poskytl/a.</li>
                        </ol>
                    </li>
                </ol>

                <Typography>Tyto podmínky nabývají účinnosti dnem 1.1.2021</Typography>

            </GdprContent>
            <Stack direction="row" justifyContent="center">
                <PrimaryButton href="/" size="large">zpátky na hlavní stránku</PrimaryButton>
            </Stack>

        </Container>
    )
}

export default ZasadyZpracovaniOsobnichUdajuGdpr