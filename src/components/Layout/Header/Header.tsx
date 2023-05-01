import { StyledNextLink } from '@/components/Link'
import Image from 'next/image'
import logo from '../../../../public/logo.png'
import { List, ListItem, Container, Box } from '@mui/material'
import { AppBar } from '../layout.styles'
import { NavLine, NavLink } from '@/components/Layout/Header/header.styles'

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
    return (
        <AppBar>
            <Container maxWidth="xxl">
                <Box component="nav" display="flex" alignItems="flex-end" justifyContent="space-between" overflow="hidden">
                    <StyledNextLink href="/" sx={{ lineHeight: 0 }}>
                        <Image src={logo} alt="PK-FIT Logo" priority />
                    </StyledNextLink>
                    <List sx={{ position: 'relative', display: 'flex', whiteSpace: 'nowrap', padding: '0 2rem' }}>
                        {pages.map(page => {
                            return (
                                <ListItem key={page.name} sx={{ padding: '0 1rem' }}>
                                    <NavLink href={page.href} underline="none">
                                        {page.name}
                                    </NavLink>
                                </ListItem>
                            )
                        })}
                        <NavLine />
                    </List>
                </Box>
            </Container>
        </AppBar>
    )
}