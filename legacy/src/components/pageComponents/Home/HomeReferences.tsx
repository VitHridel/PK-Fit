import { Container, Typography } from '@mui/material'
import { ReferencesSwiper } from '@/components/Swiper/ReferencesSwiper/ReferencesSwiper'

export const HomeReferences = () => {
    return (
        <Container maxWidth="xl">
            <Typography variant="h2">Reference klientů</Typography>
            <ReferencesSwiper />
        </Container>
    )
}