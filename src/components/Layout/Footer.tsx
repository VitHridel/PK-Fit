import { Container, Stack } from '@mui/material'
import { StyledFooter } from '@/components/Layout/layout.styles'

export const Footer = () => {
    return (
        <StyledFooter>
            <Container component={Stack} maxWidth="xl" sx={{ display: 'flex', flexDirection: { md: 'row' } }}>
            </Container>
        </StyledFooter>
    )
}