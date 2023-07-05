import { Button, Container, Stack, Typography } from '@mui/material'
import { StyledFooter } from '@/components/Layout/layout.styles'
import { StyledNextLink } from '@/components/Link'
import Image from 'next/image'
import logoWhite from '@/assets/img/logo-white.png'
import { Instagram, Facebook } from '@mui/icons-material'
import { FooterSocialButton } from './footer.style'

export const Footer = () => {
    return (
        <StyledFooter>
            <Container component={Stack} maxWidth="xl" sx={{ display: 'flex', flexDirection: { sm: 'row' }, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: { md: 'center' }, gap: '1.5rem' }}>
                <Stack>
                    <Typography variant="h2" fontSize="1.2rem!important">Petra Konrádová</Typography>
                    <Typography variant="caption" fontSize="1rem" marginBottom="1.5rem">IČ: 07044143</Typography>
                    <StyledNextLink href="tel:+420720458858" underline="none">+420 720 458 858</StyledNextLink>
                    <StyledNextLink href="mailto:info@pk-fit.cz" underline="none">info@pk-fit.cz</StyledNextLink>
                </Stack>
                <Stack justifyContent="center" alignItems="center" sx={{ img: { minWidth: '220px' } }} width={{ xs: '100%', ['sm-md']: 'unset' }} order={{ xs: -1, ['sm-md']: 0 }} marginBottom={{ xs: '3rem', ['sm-md']: 0 }}>
                    <Image src={logoWhite} alt="Petra Konrádová" quality={100} loading="lazy" />
                </Stack>
                <Stack alignSelf={{ ['sm-md']: 'flex-end' }} gap="1rem">
                    <Stack direction="row" gap=".8rem">
                        <FooterSocialButton
                            variant="contained"
                            href={process.env.NEXT_PUBLIC_IG}
                            target="_blank"
                            aria-label="Instagram"
                        >
                            <Instagram />
                        </FooterSocialButton>
                        <FooterSocialButton
                            variant="contained"
                            href={process.env.NEXT_PUBLIC_FB}
                            target="_blank"
                            aria-label="Facebook"
                        >
                            <Facebook />
                        </FooterSocialButton>
                    </Stack>
                    <StyledNextLink href="/zasady-zpracovani-osobnich-udaju-gdpr" scroll target="_blank">Podmínky GDPR</StyledNextLink>
                </Stack>
            </Container>
        </StyledFooter>
    )
}