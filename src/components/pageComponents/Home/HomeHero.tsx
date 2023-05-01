import { StyledHero } from '@/components/Hero/hero.styles'
import { Container, Stack, Typography } from '@mui/material'
import { Instagram, Facebook } from '@mui/icons-material'
import Image from 'next/image'
import HeroImg from '@/assets/img/hp-hero.png'
import { PrimaryButton } from '@/components/Button/PrimaryButton/PrimaryButton'
import Tiktok from '@/assets/img/icons/tiktok.svg'

export const HomeHero = () => {
    return (
        <StyledHero sx={{ justifyContent: 'flex-end' }}>
            <Container maxWidth="xl" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Stack sx={{
                    paddingY: { xs: '1rem', md: '2rem' },
                    width: { xs: '100%', md: '50%' },
                    maxWidth: '50rem',
                    justifyContent: 'space-between',
                }}>
                    <Stack>
                        <Typography color="primary" fontWeight={500}>Petra Konrádová, fitness trenérka</Typography>
                        <Typography variant="h1" textTransform="uppercase">
                            Zdravé tělo bez bolesti
                        </Typography>
                        <Typography marginTop="1rem" maxWidth="33rem">
                            Vítejte na mé webové stránce, kde se zaměřuji na <strong>pomoc a prevenci proti bolesti</strong> a podporu zdravého životního stylu. Mé poslání je být vaším průvodcem na cestě ke kvalitnějšímu životu, <strong>bez bolesti a s maximálním zdravím.</strong>
                        </Typography>
                        <PrimaryButton href="#sluzby" size="large" sx={{ width: 'fit-content', marginTop: '2.5rem' }}>
                            zobrazit služby
                        </PrimaryButton>
                    </Stack>

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
                            textSx={{ lineHeight: 0 }}
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
                            textSx={{ lineHeight: 0 }}
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
                            textSx={{ lineHeight: 0 }}
                        >
                            <Tiktok />
                        </PrimaryButton>
                    </Stack>
                </Stack>
                <Stack sx={{ width: { xs: '100%', md: '50%' }, alignItems: 'flex-end', lineHeight: 0, img: { maxWidth: { xs: '400px', md: '100%' } } }}>
                    <Image src={HeroImg} alt="Petra Konrádová" />
                </Stack>
            </Container>
        </StyledHero>
    )
}