import { styled } from '@mui/material'
import { headerHeight } from '@/components/Layout/layout.styles'

export const StyledHero = styled('section')(({ theme }) => ({
    background: theme.palette.background.default,
    width: '100%',
    paddingTop: '4rem',
    minHeight: 'fit-content',
    height: `calc(100vh - ${theme.typography.pxToRem(headerHeight)})`,
    maxHeight: '55rem',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
        height: 'fit-content',
        maxHeight: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
        paddingTop: '1rem',
    },
}))