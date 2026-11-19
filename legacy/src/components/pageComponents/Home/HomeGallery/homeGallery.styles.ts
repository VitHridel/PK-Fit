import { Stack, styled } from '@mui/material'
import background from '@/assets/img/hp-gallery/hp-gallery-bg.png'

export const HomeGalleryHolder = styled(Stack)(({ theme }) => ({
    backgroundImage: `url(${background.src})`,
    backgroundPosition: 'top',
    backgroundSize: '1920px auto',
    backgroundRepeat: 'no-repeat',
    maxWidth: '1920px',
    width: '100%',
    margin: '0 auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: '2rem',
}))

export const HomeGalleryImageHolder = styled(Stack)(({ theme }) => ({
    width: '25%',
    img: {
        width: '100%'
    },
    [theme.breakpoints.down('md')]: {
        width: '50%'
    }
}))