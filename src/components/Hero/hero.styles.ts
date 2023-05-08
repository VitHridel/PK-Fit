import { Stack, styled } from '@mui/material'

export const StyledHero = styled(Stack)(({ theme }) => ({
    background: theme.palette.background.default,
    width: '100%',
    paddingTop: '8rem',
    [theme.breakpoints.down('md')]: {
        paddingTop: '4rem'
    },
    [theme.breakpoints.down('sm')]: {
        paddingTop: '3rem'
    },
}))

export const HeroSocials = styled(Stack)(({ theme }) => ({
    svg: {
        transition: '.3s ease-in-out',
        fill: 'linear-gradient(74.37deg, #4AC8C1 50.76%, #59D6B7 96.31%)',
        '&:hover': {
            fill: 'linear-gradient(74.37deg, #27A9A2 50.76%, #0DDAA7 96.31%)'
        }
    }
}))