import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { WordsLineDivider } from '@/components/WordsLineDivider'
import { homeServicesArray } from '@/utils/Home/home.services'
import { Service } from '@/components/Service/Service'
import { ServicesSwiper } from '@/components/Swiper/ServicesSwiper/ServicesSwiper'

export const HomeServices = () => {
    const theme = useTheme()
    const isSmallDisplay = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Typography variant="h2">Služby</Typography>
            <WordsLineDivider words={['Diagnostika', 'Pohyb', 'Prevence']} />
            {!isSmallDisplay ? (<Stack direction="row" justifyContent={{xs: 'center', sm: 'space-between'}} flexWrap="wrap"
                    gap={{xs: '2rem'}} margin="3.125rem 0 4.375rem">
                {homeServicesArray.map((service) => (
                    <Service
                        key={service.headline}
                        {...service}
                        sx={{
                            width: {xs: '100%', sm: 'calc(50% - 2rem)', lg: `calc(${100 / 3}% - 2rem)`}
                        }}
                    />
                ))}
            </Stack>) : (
                <ServicesSwiper />
            )}
        </>
    )
}