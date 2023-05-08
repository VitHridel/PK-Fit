import { Box, styled } from '@mui/material'

export const ServicesSwiperWrapper = styled(Box)(({ theme }) => ({
    marginTop: '1.25rem',
    [theme.breakpoints.down('sm')]: {
        '.swiper': {
            '.swiper-slide': {
                height: 'auto',
            }
        }
    }
}))