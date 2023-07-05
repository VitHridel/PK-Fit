import { Button, Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import me from '@/assets/img/me.png'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { ShowMoreButton } from '@/components/ShowMoreButton'

export const HomeStory = () => {
    const [showMore, setShowMore] = useState<boolean>(false)
    const hideTextRef = useRef<HTMLDivElement>(null)
    const theme = useTheme()
    const isSmallDisplay = useMediaQuery(theme.breakpoints.down('sm'))

    const showMoreText = () => {
        if (hideTextRef.current) {
            hideTextRef.current.style.height = `${hideTextRef.current.scrollHeight}px`
            setShowMore(true)
        }
    }

    return (
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' } }}>
            {isSmallDisplay && (
                <Stack>
                    <Typography variant="h2">Můj příběh</Typography>
                </Stack>
            )}
            <Stack sx={{ img: { width: '100%' } }} width={{ xs: '100%', md: 'calc(50% - 1rem)' }} justifyContent="center" alignItems={{ xs: 'center', md: 'flex-start' }}>
                <Image src={me} alt="Petra Konrádová" quality={100} loading="lazy" />
            </Stack>
            <Stack width={{ xs: '100%', md: 'calc(50% - 1rem)' }} alignItems={{ xs: 'center', md: 'flex-end' }}>
                <Stack>
                    {!isSmallDisplay && (
                        <>
                            <Typography variant="h2">Můj příběh</Typography>
                        </>
                    )}
                    <Typography>
                        Také jsem se dřív každou chvíli kontrolovala v zrcadle, jestli mi někde z pod trička nevykukuje kus břicha nebo jestli nemám v těch kraťasech tlustá stehna. Kdybych řekla, že už to teď neřeším, tak bych lhala. Ale to, co jsem si uvědomila bylo, že vzhled už pro mě není priorita. Důležitější pro mě je, <strong>jak se cítím</strong>, jestli mi tělo funguje a můžu dělat, co chci a <strong>bez omezení či bolesti</strong>.
                    </Typography>
                    <Stack ref={hideTextRef} height={{ xs: '0px', sm: 'unset!important' }} overflow="hidden" sx={(theme) => ({ transition: `${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}` })}>
                        <Typography>
                            <strong>A co vlastně znamená být FIT?</strong> Udýchat výšlap do kopce? Sjet na lyžích sjezdovku na jeden zátah? Zvednout těžký nákup bez píchnutí v kříži? Vylézt na nejvyšší bod lezecké stěny? K tomu všemu Vám mohu pomoci. Za mě je důležité, aby <strong>tréninky byly všestranné</strong> a klienti měli <strong>radost z pohybu</strong> i z běžných činností, které se jim najednou dělají s lehkostí a s co nejmenším úsilím.
                        </Typography>
                        <Typography>
                            Díky <strong>propojení těla a mysli</strong> v pohybu budete moci dělat, co chcete. S tréninkovou přípravou pod mým vedení Vaše tělo společně připravíme nejen na aktivně strávený čas, ale i na delší sezení. Pohyb se tak stane Vaším dlouhodobým návykem a motivací k lepšímu JÁ. Budete <strong>více nabití energií</strong>, produktivnější v práci a motivujete i svou rodinu a okolí. <strong>Hlavní je ZAČÍT, zbytek nechte na mně</strong>.
                        </Typography>
                    </Stack>
                    <ShowMoreButton variant="text" sx={{ display: { xs: showMore ? 'none' : 'block', sm: 'none' } }} onClick={showMoreText}>Zobrazit více</ShowMoreButton>
                </Stack>
            </Stack>
        </Container>
    )
}