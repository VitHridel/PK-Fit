import { StyledNextLink } from '@/components/Link'
import Image from 'next/image'
import Logo from '@/../public/logo.svg'
import BurgerIcon from '@/assets/img/icons/burger.svg'
import { Container, Stack, useTheme, useMediaQuery, Box, IconButton } from '@mui/material'
import { AppBar } from '../layout.styles'
import { DesktopNavigation } from '@/components/Layout/Header/DesktopNavigation'
import { MobileNavigation } from '@/components/Layout/Header/MobileNavigation'
import { useState } from 'react'

export const pages: Array<{ href: string, name: string }> = [
    {
        name: 'služby',
        href: '/#sluzby',
    },
    {
        name: 'o mně',
        href: '/#o-mne',
    },
    {
        name: 'absolvované semináře',
        href: '/#seminare',
    },
    {
        name: 'reference',
        href: '/#reference',
    },
    {
        name: 'kurzy',
        href: '/#kurzy',
    },
    /*{
        name: 'kontakt',
        href: '/#kontakt',
    },*/
    /*{
        name: 'blog',
        href: '/blog',
    }*/
]

export const Header = () => {
    const [showMobileNav, setShowMobileNav] = useState<boolean>(false)
    const theme = useTheme()
    const isSmallDisplay = useMediaQuery(theme.breakpoints.down('sm-md'))

    const toggleMobileNav = () => {
        setShowMobileNav((prevState) => !prevState)
    }

    return (
        <>
            <AppBar>
                <Container maxWidth="xxl">
                    <Stack component="nav" direction="row" alignItems={{ xs: 'center', sm: 'flex-end' }} justifyContent="space-between" overflow="hidden" padding={{ xs: '.75rem 0', ['sm-md']: 0 }}>
                        <StyledNextLink href="/" scroll sx={{ minWidth: '10rem', lineHeight: 0, position: 'relative', img: { width: '100%' } }}>
                            <Logo />
                        </StyledNextLink>
                        {!isSmallDisplay ? <DesktopNavigation /> : <IconButton onClick={toggleMobileNav}><BurgerIcon /></IconButton>}
                    </Stack>
                </Container>
                {isSmallDisplay && (
                    <MobileNavigation isActive={showMobileNav} onClose={() => setShowMobileNav(false)} />
                )}
            </AppBar>
            {isSmallDisplay && (
                <Box sx={(theme) => ({ position: 'relative', letterSpacing: '.145rem', padding: '.75rem 0', fontSize: '.875rem', fontWeight: 600, background: theme.palette.primary.light })}>
                    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <StyledNextLink href="mailto:info@pk-fit.cz" underline="none" sx={(theme) => ({ color: theme.palette.common.white })}>
                            info@pk-fit.cz
                        </StyledNextLink>
                        <StyledNextLink href="tel:+420720458858" underline="none" sx={(theme) => ({ color: theme.palette.common.white })}>
                            +420 720 458 858
                        </StyledNextLink>
                    </Container>
                </Box>
            )}
        </>
    )
}