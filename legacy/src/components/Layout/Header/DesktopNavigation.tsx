import { List, ListItem, Stack } from '@mui/material'
import { NavLink } from '@/components/Layout/Header/header.styles'
import { PrimaryButton } from '@/components/Button/PrimaryButton/PrimaryButton'
import { pages } from '@/components/Layout/Header/Header'

export const DesktopNavigation = () => {
    return (
        <Stack direction="row">
            <List sx={{ position: 'relative', display: 'flex', whiteSpace: 'nowrap', padding: '.125rem 2rem' }}>
                {pages.map(page => {
                    return (
                        <ListItem disablePadding key={page.name} sx={{ fontSize: '1rem', paddingX: { xs: '1rem', lg: '2rem' } }}>
                            <NavLink href={page.href} underline="none">
                                {page.name}
                            </NavLink>
                        </ListItem>
                    )
                })}
                {/*<NavLine />*/}
            </List>
            <PrimaryButton size="medium" href="tel:+420720458858" withTopLine={false} sx={{ marginLeft: '1rem' }} textSx={{ fontSize: '1rem' }}>
                +420 720 458 858
            </PrimaryButton>
        </Stack>
    )
}