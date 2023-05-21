import { Stack, styled, Typography } from '@mui/material'
import { PrimaryButton } from '@/components/Button/PrimaryButton/PrimaryButton'
import sendGif from '@/assets/img/send.gif'
import Image from 'next/image'

interface ContactFormSendProps {
    isActive: boolean
    onButtonClick: () => void
}

const FormSendHolder = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive: boolean }>(({ theme, isActive }) => ({
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '95%',
    transform: 'translate(-50%, -50%)',
    opacity: 0,
    zIndex: -1,
    transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
    }),
    ...isActive && {
        opacity: 1,
        zIndex: 1,
    }
}))

export const ContactFormSend = ({ isActive, onButtonClick }: ContactFormSendProps) => {
    return (
        <FormSendHolder isActive={isActive} alignItems="center">
            <Typography variant="h2">Zpráva úspěšně odeslána!</Typography>
            <Typography variant="subtitle1">Děkuji za důvěru. V průběhu následujících dní se s Vámi spojím.</Typography>
            <Stack maxWidth="15rem">
                <Image src={sendGif} alt="send" />
            </Stack>
            <PrimaryButton size="large" withTopLine={false} onClick={onButtonClick}>nový formulář</PrimaryButton>
        </FormSendHolder>
    )
}