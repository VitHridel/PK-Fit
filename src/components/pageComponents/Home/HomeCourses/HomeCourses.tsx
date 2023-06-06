import { Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { homeCourses } from '@/utils/Home/home.courses'
import { HomeCourseCard } from '@/components/pageComponents/Home/HomeCourses/HomeCourseCard'
import { PrimaryButton } from '@/components/Button/PrimaryButton/PrimaryButton'
import { CoursesSwiper } from '@/components/Swiper/CourseSwiper/CoursesSwiper'

export const HomeCourses = () => {
    const theme = useTheme()
    const isSmallDisplay = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Container maxWidth="xl">
            <Typography variant="h2">Aktuální sportovní akce</Typography>
            <Typography variant="subtitle1" marginBottom={{ xs: '1.5rem', md: '2.5rem' }}>
                Nabízím sportovní víkendy nebo jiné akce, na kterých se zaměřuji na mobilitu a zdraví celého těla.
            </Typography>
            {!isSmallDisplay ? (
                <Stack direction="row" flexWrap="wrap" justifyContent="flex-start" marginBottom={{ xs: '3rem', md: '4rem' }} gap={{ xs: '2rem 5%', md: '2%' }}>
                    {homeCourses.map((course, i) => (
                        <HomeCourseCard key={i} {...course} />
                    ))}
                </Stack>
            ) : (
                <CoursesSwiper />
            )}
            <Stack alignItems="center">
                <PrimaryButton href="https://www.cklenka.cz/instruktor/detail/konradova-petra/" target="_blank" size="large">
                    zobrazit všechny kurzy
                </PrimaryButton>
            </Stack>
        </Container>
    )
}