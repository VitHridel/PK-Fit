import { StyledHero } from '@/components/Hero/hero.styles'
import { Container, Stack, Typography } from '@mui/material'
import heroImg from '@/assets/img/hp-hero.png'
import { PrimaryButton } from '@/components/Button/PrimaryButton/PrimaryButton'
import { HomeHeroImageHolder } from '@/components/pageComponents/Home/HomeHero/homeHero.styles'
import { PrimarySocials } from '@/components/PrimarySocials'
import Image from 'next/image'

export const HomeHero = () => {
    return (
        <StyledHero>
            <Stack sx={{ justifyContent: 'flex-end', height: 'auto', minHeight: '100%' }}>
                <Container maxWidth="xl" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Stack sx={{
                        paddingY: { xs: '1rem', md: '10%' },
                        width: { xs: '100%', ['sm-md']: '45%' },
                        maxWidth: '50rem',
                        justifyContent: 'space-between',
                    }}>
                        <Stack>
                            <Typography variant="subtitle1" marginBottom=".25rem">Petra Konrádová, fitness trenérka</Typography>
                            <Typography variant="h1" textTransform="uppercase">
                                Zdravé tělo bez bolesti
                            </Typography>
                            <Typography marginTop="1rem" maxWidth="33rem">
                                Vítejte na mé webové stránce, kde se zaměřuji na <strong>pomoc a prevenci proti bolesti</strong> a podporu zdravého životního stylu. Mé poslání je být vaším průvodcem na cestě ke kvalitnějšímu životu, <strong>bez bolesti a s maximálním zdravím.</strong>
                            </Typography>
                            <PrimaryButton href="#sluzby" size="large" sx={{ width: 'fit-content', marginTop: { md: '2.5rem'} }}>
                                zobrazit služby
                            </PrimaryButton>
                        </Stack>

                        <Stack direction="row" gap=".8rem" marginTop="2rem">
                            <PrimarySocials />
                        </Stack>
                    </Stack>
                    <HomeHeroImageHolder>
                        <Image src={heroImg} alt="Petra Konrádová" quality={100} priority />
                    </HomeHeroImageHolder>
                </Container>
            </Stack>
        </StyledHero>
    )
}