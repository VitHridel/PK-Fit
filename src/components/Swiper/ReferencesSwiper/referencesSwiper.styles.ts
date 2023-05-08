import { Box, Container, styled } from '@mui/material'

export const ReferencesSwiperWrapper = styled(Container)(({ theme }) => ({
    position: 'relative',
    marginTop: '2.75rem',
    '.swiper': {
        '.swiper-slide': {
            textAlign: 'center',
        },
        [theme.breakpoints.up('md')]: {
            '.swiper-slide-next': {
                transform: 'scale(1.1)'
            }
        }
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
