import { Stack, styled } from '@mui/material'

export const HomeHeroImageHolder = styled(Stack)(({ theme }) => ({
    width: '55%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    lineHeight: 0,
    img: {
        width: '100%'
    },
    [theme.breakpoints.down('sm-md')]: {
        width: '100%',
        marginTop: '-10rem',
        img: {
            width: 'auto'
        },
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: '-4rem',
    },
    '@media (max-width: 340px)': {
        marginTop: '0'
    },
}))