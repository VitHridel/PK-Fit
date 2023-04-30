import { StyledNextLink } from '@/components/Link'
import Image from 'next/image'
import logoSm from '../../../public/logo-sm.png'
import { List, ListItem, Container, Box } from '@mui/material'
import { AppBar } from './layout.styles'

const pages: Array<{ href: string, name: string }> = []

export const Header = () => {
    return (
        <AppBar>
            <Container maxWidth="xl">
                <Box component="nav" display="flex" alignItems="center" justifyContent="space-between">
                    <StyledNextLink href="/">
                        <Image src={logoSm} alt="AWANTU Logo" />
                    </StyledNextLink>
                    <List sx={{ display: 'flex', whiteSpace: 'nowrap' }}>
                        {pages.map(page => {
                            return (
                                <ListItem key={page.name}>
                                    <StyledNextLink href={page.href}>
                                        {page.name}
                                    </StyledNextLink>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
            </Container>
        </AppBar>
    )
}