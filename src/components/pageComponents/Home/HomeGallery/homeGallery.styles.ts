import { Stack, styled } from '@mui/material'
import background from '@/assets/img/hp-gallery/hp-gallery-bg.png'

export const HomeGalleryHolder = styled(Stack)(({ theme }) => ({
    backgroundImage: `url(${background.src})`,
    backgroundPosition: 'top',
    backgroundSize: '1920px auto',
    backgroundRepeat: 'no-repeat',
    maxWidth: '1920px',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: '2rem',
}))