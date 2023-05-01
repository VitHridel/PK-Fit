import { HomeHero } from '@/components/pageComponents/Home/HomeHero'
import { HomeServices } from '@/components/pageComponents/Home/HomeServices/HomeServices'
import { Section } from '@/components/Layout/layout.styles'
import { Container, Typography } from '@mui/material'
import { StyledNextLink } from '@/components/Link'

const Home = () => {
    return (
        <>
            <HomeHero />
            <Section>
                <Container maxWidth="xl">
                    <HomeServices />
                    <Typography display={{ xs: 'none', md: 'block' }}>
                        Zařídím, abyste mohli žít bez bolesti, díky mé komplexní pomoci a prevenci. Nebojte se zeptat i na další služby, které v seznamu nenajdete.
                    </Typography>
                </Container>
            </Section>
            <Section sx={{ paddingTop: '0!important' }}>
                <Container maxWidth="xl">
                    <Typography variant="h3">Máte specifický problém nebo s cvičením teprve začínáte?</Typography>
                    <Typography fontWeight={500}>
                        Zavolejte mi na číslo <StyledNextLink href="tel:+420720458858" underline="always">+420 720 458 858</StyledNextLink> nebo vyplňte <StyledNextLink href="#kontaktni-formular" underline="always">kontaktní formulář</StyledNextLink> a můžeme se o všem nezávazně pobavit.
                    </Typography>
                </Container>
            </Section>
        </>
    )
}

export default Home
