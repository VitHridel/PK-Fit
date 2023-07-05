import { Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import { Input } from '@/components/Form/components/Input/Input'
import { PrimaryButton } from '@/components/Button/PrimaryButton/PrimaryButton'
import { StyledNextLink } from '@/components/Link'
import { Textarea } from '@/components/Form/components/Textarea/Textarea'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { useRef, useState } from 'react'
import { ContactFormSend } from '@/components/Form/ContactForm/ContactFormSend'
import { ContactFormDataInterface } from '@/global.interface'
import axios from 'axios'

export const ContactForm = () => {
    const [formSend, setFormSend] = useState<boolean>(false)
    const [formError, setFormError] = useState<string>()
    const turnstileRef = useRef<TurnstileInstance>(null)

    const initialValues: ContactFormDataInterface = {
        fullname: '',
        phone: '+420',
        email: '@',
        note: '',
    }

    const validationSchema = yup.object({
        fullname: yup.string().required('Jméno je povinný údaj'),
        email: yup.string().email('E-mailová adresa nemá správný tvar').required('E-mail je povinný údaj'),
        note: yup.string().required('Prosím napište něco o sobě a s čím potřebujete pomoci')
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            values.token = turnstileRef.current?.getResponse()
            try {
                await axios.post('/api/contact-form', values)
                setFormSend(true)
                turnstileRef.current?.reset()
            } catch (e: any) {
                setFormError('Něco se nepovedlo, zkuste to prosím znovu nebo mě kontaktujte na mém telefonním čísle.')
                turnstileRef.current?.reset()
            }
        }
    })

    const newForm = () => {
        setFormSend(false)
        setFormError(undefined)
        formik.resetForm()
    }

    return (
        <Container maxWidth="xl" sx={{ position: 'relative' }}>
            <ContactFormSend isActive={formSend} onButtonClick={newForm} />
            <Stack sx={formSend ? { visibility: 'hidden', opacity: 0 , zIndex: 0 } : undefined}>
                <Typography variant="h2">Kontaktujte mě</Typography>
                <Typography variant="subtitle1">
                    Domluvme si termín tréninku nebo si jen nezávazně popovídejme.
                </Typography>
                <Grid component="form" container spacing={{ xs: 0.375, sm: 1.5 }} onSubmit={formik.handleSubmit}>
                    <Grid component={Stack} rowGap=".75rem" xs={12} sm={5}>
                        <Input
                            name="fullname"
                            label="Jméno a příjmení *"
                            value={formik.values.fullname}
                            error={formik.touched.fullname && !!formik.errors.fullname}
                            errorMessage={formik.errors.fullname}
                            onChange={formik.handleChange}
                        />
                        <Input
                            name="phone"
                            label="Telefon"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                        <Input
                            name="email"
                            label="Emailová adresa *"
                            value={formik.values.email}
                            error={formik.touched.email && !!formik.errors.email}
                            errorMessage={formik.errors.email}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid xs={12} sm={7}>
                        <Textarea
                            name="note"
                            rows={6}
                            label="S čím potřebujete pomoci?"
                            value={formik.values.note}
                            error={formik.touched.note && !!formik.errors.note}
                            errorMessage={formik.errors.note}
                            onChange={formik.handleChange}
                        />
                        <Stack alignItems={{ xs: 'center', md: 'flex-start' }} sx={{ margin: '2.5rem 0 .375rem' }}>
                            <PrimaryButton type="submit" size="large">odeslat</PrimaryButton>
                            {formError !== undefined && <Typography fontSize="1rem" color="error" marginBottom={0}>{formError}</Typography>}
                        </Stack>
                        <Typography fontSize=".875rem">Odesláním tohoto formuláře souhlasíte s <StyledNextLink href="/zasady-zpracovani-osobnich-udaju-gdpr" scroll target="_blank">podmínkami GDPR.</StyledNextLink></Typography>
                    </Grid>
                    <Turnstile ref={turnstileRef} siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY!} scriptOptions={{ defer: true, appendTo: 'body' }} />
                </Grid>
            </Stack>
        </Container>
    )
}