import { Box, Container, styled } from '@mui/material'

export const ReferencesSwiperWrapper = styled(Container)(({ theme }) => ({
    position: 'relative',
    marginTop: '2.75rem',
    '.swiper': {
        '.swiper-slide': {
            textAlign: 'center',
            height: 'auto',
            /*[theme.breakpoints.up('md')]: {
                '&:not(.swiper-slide-next)': {
                    scale: '.9'
                }
            }*/
        },
    }
}))

const ReferencesSwiperButton = styled(Box)({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '1rem',
    height: '1rem',
    cursor: 'pointer',
})

export const ReferencesSwiperButtonPrev = styled(ReferencesSwiperButton)({
    left: 0
})

export const ReferencesSwiperButtonNext = styled(ReferencesSwiperButton)({
    right: 0
})
