import { Box, styled } from '@mui/material'

export const CoursesSwiperWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        marginBottom: '3rem',
        '.swiper': {
            '.swiper-slide': {
                height: 'auto',
            }
        }
    }
}))