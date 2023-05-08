import { HeroSocials, StyledHero } from '@/components/Hero/hero.styles'
import { Container, Stack, Typography } from '@mui/material'
import { Instagram, Facebook } from '@mui/icons-material'
import Tiktok from '@/assets/img/icons/tiktok.svg'
// import Tiktok from '@/assets/img/icons/tt-primary.svg'
// import Instagram from '@/assets/img/icons/ig-primary.svg'
// import Facebook from '@/assets/img/icons/fb-primary.svg'
import Image from 'next/image'
import HeroImg from '@/assets/img/hp-hero.png'
import { PrimaryButton } from '@/components/Button/PrimaryButton/PrimaryButton'
import { HomeHeroImageHolder } from '@/components/pageComponents/Home/HomeHero/homeHero.styles'

export const HomeHero = () => {
    return (
        <StyledHero sx={{ justifyContent: 'flex-end' }}>
            <Container maxWidth="xl" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Stack sx={{
                    paddingY: { xs: '1rem', md: '2rem' },
                    width: { xs: '100%', 900: '50%' },
                    maxWidth: '50rem',
                    justifyContent: 'space-between',
                }}>
                    <Stack>
                        <Typography variant="subtitle1">Petra Konrádová, fitness trenérka</Typography>
                        <Typography variant="h1" textTransform="uppercase">
                            Zdravé tělo bez bolesti
                        </Typography>
                        <Typography marginTop="1rem" maxWidth="33rem">
                            Vítejte na mé webové stránce, kde se zaměřuji na <strong>pomoc a prevenci proti bolesti</strong> a podporu zdravého životního stylu. Mé poslání je být vaším průvodcem na cestě ke kvalitnějšímu životu, <strong>bez bolesti a s maximálním zdravím.</strong>
                        </Typography>
                        <PrimaryButton href="#sluzby" size="large" sx={{ width: 'fit-content', marginTop: { xs: '1.25rem', md: '2.5rem'} }}>
                            zobrazit služby
                        </PrimaryButton>
                    </Stack>

                    {/*<HeroSocials>
                        <Instagram />
                        <Facebook />
                        <Tiktok />
                    </HeroSocials>*/}

                    <Stack direction="row" gap=".8rem" marginTop="2rem">
                        <PrimaryButton
                            href="#sluzby"
                            withTopLine={false}
                            sx={{
                                minWidth: 'unset',
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                padding: 0
                            }}
                            textSx={{ lineHeight: '0!important' }}
                        >
                            <Instagram sx={{ width: '1.25rem', height: '1.25rem' }} />
                        </PrimaryButton>

                        <PrimaryButton
                            href="#sluzby"
                            withTopLine={false}
                            sx={{
                                minWidth: 'unset',
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                padding: 0
                            }}
                            textSx={{ lineHeight: '0!important' }}
                        >
                            <Facebook sx={{ width: '1.25rem', height: '1.25rem' }} />
                        </PrimaryButton>

                        <PrimaryButton
                            href="#sluzby"
                            withTopLine={false}
                            sx={{
                                minWidth: 'unset',
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                padding: 0,
                                svg: { width: 20 }
                            }}
                            textSx={{ lineHeight: '0!important' }}
                        >
                            <Tiktok />
                        </PrimaryButton>
                    </Stack>
                </Stack>
                <HomeHeroImageHolder>
                    <Image src={HeroImg} alt="Petra Konrádová" />
                </HomeHeroImageHolder>
            </Container>
        </StyledHero>
    )
}