import { Container, Stack, Typography } from '@mui/material'
import { PrimaryButton } from '@/components/Button/PrimaryButton/PrimaryButton'
import Image from 'next/image'
import questionMarks from '@/assets/img/question-marks.png'

const Error404 = () => {
    return (
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', margin: 'auto',  paddingY: '2rem' }}>
            <Stack justifyContent="center">
                <Typography variant="h1">404 ERROR</Typography>
                <Typography variant="subtitle1" marginBottom={{ xs: '1.5rem', md: '2rem' }}>Ups... tady nic není</Typography>
                <Typography marginBottom={{ xs: '1.5rem', md: '2.5rem' }}>Stránka, kterou hledáte neexistuje. Vraťte se prosím na úvod webu.</Typography>
                <Stack direction="row">
                    <PrimaryButton href="/" size="large">zpátky na hlavní stránku</PrimaryButton>
                </Stack>
            </Stack>
            <Stack display={{ xs: 'none', md: 'flex' }} justifyContent="center">
                <Image src={questionMarks} alt="404" quality={90} priority />
            </Stack>
        </Container>
    )
}

export default Error404