import { StyledNextLink } from '@/components/Link'
import Image from 'next/image'
import logo from '../../../../public/logo.png'
import { List, ListItem, Container, Stack, useTheme, useMediaQuery, Box } from '@mui/material'
import { AppBar } from '../layout.styles'
import { NavLine, NavLink } from '@/components/Layout/Header/header.styles'
import { PrimaryButton } from '@/components/Button/PrimaryButton/PrimaryButton'

const pages: Array<{ href: string, name: string }> = [
    {
        name: 'služby',
        href: '#sluzby',
    },
    {
        name: 'o mně',
        href: '#o-mne',
    },
    {
        name: 'reference',
        href: '#reference',
    },
    {
        name: 'blog',
        href: '/blog',
    }
]

export const Header = () => {
    const theme = useTheme()
    const isSmallDisplay = useMediaQuery(theme.breakpoints.down('900'))

    return (
        <AppBar>
            <Container maxWidth="xxl">
                <Stack component="nav" direction="row" alignItems="flex-end" justifyContent="space-between" overflow="hidden" padding={{ xs: '.75rem 0', '900': 0 }}>
                    <StyledNextLink href="/" sx={{ lineHeight: 0 }}>
                        <Image src={logo} alt="PK-FIT Logo" priority />
                    </StyledNextLink>
                    {!isSmallDisplay && (
                        <Stack direction="row">
                            <List sx={{ position: 'relative', display: 'flex', whiteSpace: 'nowrap', padding: '.125rem 2rem' }}>
                                {pages.map(page => {
                                    return (
                                        <ListItem key={page.name} sx={{ padding: '0 1rem' }}>
                                            <NavLink href={page.href} underline="none">
                                                {page.name}
                                            </NavLink>
                                        </ListItem>
                                    )
                                })}
                                {/*<NavLine />*/}
                            </List>
                            <PrimaryButton size="small" href="tel:+420720458858" withTopLine={false} sx={{ marginLeft: '1rem' }} textSx={{ fontSize: '1rem' }}>
                                +420 720 458 858
                            </PrimaryButton>
                        </Stack>
                    )}
                </Stack>
            </Container>
            {isSmallDisplay && (
                <Box sx={(theme) => ({ letterSpacing: '.145rem', padding: '.75rem 0', fontSize: '.875rem', fontWeight: 600, background: theme.palette.primary.light })}>
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
        </AppBar>
    )
}