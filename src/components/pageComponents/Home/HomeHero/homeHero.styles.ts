import { Stack, styled } from '@mui/material'

export const HomeHeroImageHolder = styled(Stack)(({ theme }) => ({
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    lineHeight: 0,
    [theme.breakpoints.down('900')]: {
        width: '100%',
        marginTop: '-10rem'
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: '-4rem',
    },
    '@media (max-width: 340px)': {
        marginTop: '0'
    },
}))