import { Box, Container, styled, Typography } from '@mui/material'
import { homeSeminars } from '@/utils/Home/home.seminars'

const ListItem = styled('li')(({ theme }) => ({
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
        width: 'calc(50% - 1rem)'
    },
    'a': {
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'none'
        }
    }
}))

export const HomeSeminars = () => {
    return (
        <Container maxWidth="xl">
            <Typography variant="h2">Absolvované semináře</Typography>
            <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: '1rem', gap: '.75rem 2rem' }} flexDirection={{ xs: 'column', md: 'row' }}>
                {homeSeminars.map((item) => (
                    <ListItem key={item.text}>
                        {item.text} - {item.link}
                    </ListItem>
                ))}
            </Box>
        </Container>
    )
}
