import { Stack, styled } from '@mui/material'

export const StyledHero = styled(Stack)(({ theme }) => ({
    background: theme.palette.background.default,
    width: '100%',
    paddingTop: '8rem',
    [theme.breakpoints.down('md')]: {
        paddingTop: '4rem'
    },
    [theme.breakpoints.down('sm')]: {
        paddingTop: '1rem'
    },
}))