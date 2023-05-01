import { ReactNode } from 'react'
import { Stack, SxProps, Typography } from '@mui/material'

export interface ServiceProps {
    icon?: ReactNode
    headline: string
    text: string
    sx?: SxProps
}

export const Service = ({ icon, headline, sx, text }: ServiceProps) => {
    return (
        <Stack gap=".66rem" sx={sx}>
            <Stack direction="row" alignItems="center" gap="1rem" height={{ xs: '3.3rem', md: '3.125rem' }}>
                {icon && (
                    <Stack sx={{ alignItems: 'center', width: '2.5rem' }}>
                        {icon}
                    </Stack>
                )}
                <Typography variant="h3" fontSize={{ xs: '1.07rem', md: '1.125rem' }} fontWeight={600} marginBottom={0}>
                    {headline}
                </Typography>
            </Stack>
            <Typography>{text}</Typography>
        </Stack>
    )
}