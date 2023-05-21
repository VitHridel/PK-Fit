import { HomeHero } from '@/components/pageComponents/Home/HomeHero/HomeHero'
import { HomeServices } from '@/components/pageComponents/Home/HomeServices'
import { Section } from '@/components/Layout/layout.styles'
import { Box, Container, Link, Typography } from '@mui/material'
import { StyledNextLink } from '@/components/Link'
import { HomeGallery } from '@/components/pageComponents/Home/HomeGallery/HomeGallery'
import { HomeCourses } from '@/components/pageComponents/Home/HomeCourses/HomeCourses'
import { HomeStory } from '@/components/pageComponents/Home/HomeStory'
import { ContactForm } from '@/components/Form/ContactForm/ContactForm'
import { HomeReferences } from '@/components/pageComponents/Home/HomeReferences'

const Home = () => {
    return (
        <>
            <HomeHero />
            <Section id="sluzby">
                <Container maxWidth="xl">
                    <HomeServices />
                    <Typography display={{ xs: 'none', md: 'block' }}>
                        Zařídím, abyste mohli žít bez bolesti, díky mé komplexní pomoci a prevenci. Nebojte se zeptat i na další služby, které v seznamu nenajdete.
                    </Typography>
                </Container>
            </Section>
            <Section sx={{ paddingBottom: { xs: '9rem!important', lg: '12.5rem!important' } }}>
                <Container maxWidth="xl">
                    <Typography variant="h3">Máte specifický problém nebo s cvičením teprve začínáte?</Typography>
                    <Typography fontWeight={500}>
                        Zavolejte mi na číslo <StyledNextLink href="tel:+420720458858" underline="always">+420 720 458 858</StyledNextLink> nebo vyplňte <Link href="#kontakt" underline="always">kontaktní formulář</Link> a můžeme se o všem nezávazně pobavit.
                    </Typography>
                </Container>
            </Section>
            <Box component="section">
                <HomeGallery />
            </Box>
            <Section id="kurzy">
                <HomeCourses />
            </Section>
            <Section id="o-mne" withBottomPadding>
                <HomeStory />
            </Section>
            <Section id="kontakt" background>
                <ContactForm />
            </Section>
            {/*<Section id="reference" background>
                <HomeReferences />
            </Section>*/}
        </>
    )
}

export default Home
