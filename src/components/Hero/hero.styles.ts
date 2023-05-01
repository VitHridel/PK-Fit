import { Stack, styled } from '@mui/material'
import { headerHeight } from '@/components/Layout/layout.styles'

export const StyledHero = styled(Stack)(({ theme }) => ({
    background: theme.palette.background.default,
    width: '100%',
    height: 'unset',
    paddingTop: '2rem',
    minHeight: 'fit-content',
    [theme.breakpoints.up('lg')]: {
        height: `calc(100vh - ${theme.typography.pxToRem(headerHeight)})`,
    }
}))