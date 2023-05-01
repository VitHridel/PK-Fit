import { Stack, Typography } from '@mui/material'
import { WordsLineDivider } from '@/components/WordsLineDivider'
import { homeServicesArray } from '@/utils/home.services'
import { Service } from '@/components/Service/Service'

export const HomeServices = () => {
    return (
        <>
            <Typography variant="h2">Služby které nabízím</Typography>
            <WordsLineDivider words={['Diagnostika', 'Pohyb', 'Prevence']} />
            <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={{ xs: '2rem' }} margin="3.125rem 0 4.375rem">
                {homeServicesArray.map((service) => (
                    <Service key={service.headline} {...service} sx={{ width: { xs: '100%', sm: 'calc(50% - 2rem)', lg: `calc(${100/3}% - 2rem)` } }} />
                ))}
            </Stack>
        </>

    )
}