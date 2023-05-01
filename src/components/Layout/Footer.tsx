import { Container, Stack } from '@mui/material'
import { StyledFooter } from '@/components/Layout/layout.styles'

export const Footer = () => {
    return (
        <StyledFooter>
            <Container component={Stack} maxWidth="xxl" sx={{ display: 'flex', flexDirection: { md: 'row' } }}>
            </Container>
        </StyledFooter>
    )
}