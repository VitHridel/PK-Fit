'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'
import { startTransition, useActionState, useEffect, useRef, useState } from 'react'
import { type FieldPath, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { contactForm } from '@/content/home'
import { submitContact } from '@/lib/contact/action'
import type { ContactState } from '@/lib/contact/handle'
import { type ContactInput, contactSchema } from '@/lib/contact/schema'
import { Turnstile } from './Turnstile'

const initialState: ContactState = { status: 'idle' }
const emptyValues: ContactInput = { fullname: '', email: '', phone: '', note: '' }

export function ContactForm({ siteKey }: { siteKey: string }) {
    const successRef = useRef<HTMLHeadingElement>(null)
    const [state, formAction, isPending] = useActionState(submitContact, initialState)
    // The action state is the last server answer; "send another message" dismisses it.
    const [dismissed, setDismissed] = useState<ContactState | null>(null)
    const [clientError, setClientError] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: emptyValues,
        shouldFocusError: true,
    })

    const current = state === dismissed ? initialState : state
    const showSuccess = current.status === 'success'
    const formMessage = clientError ?? (current.status === 'error' ? current.message : undefined)

    useEffect(() => {
        // A Turnstile token is single-use: get a fresh one after every server answer.
        if (state.status !== 'idle') window.turnstile?.reset()
    }, [state])

    useEffect(() => {
        if (showSuccess) successRef.current?.focus()
    }, [showSuccess])

    const onValid = (_values: unknown, event?: React.BaseSyntheticEvent) => {
        if (!window.turnstile) {
            setClientError(contactForm.turnstileMissing)
            return
        }
        setClientError(null)
        // FormData from the form itself also carries Turnstile's hidden `cf-turnstile-response`.
        const data = new FormData(event?.target as HTMLFormElement)
        startTransition(() => formAction(data))
    }

    const errorFor = (name: FieldPath<ContactInput>) =>
        errors[name]?.message ?? current.fieldErrors?.[name]

    const fieldProps = (name: FieldPath<ContactInput>, required: boolean) => {
        const error = errorFor(name)
        return {
            id: `kontakt-${name}`,
            'aria-invalid': error ? true : undefined,
            'aria-required': required || undefined,
            'aria-describedby': error ? `kontakt-${name}-error` : undefined,
            ...register(name),
        }
    }

    const fieldError = (name: FieldPath<ContactInput>) => {
        const error = errorFor(name)
        return error ? <FieldError id={`kontakt-${name}-error`}>{error}</FieldError> : null
    }

    return (
        <div className="rounded-lg bg-surface p-5 sm:p-7">
            {showSuccess && (
                <div className="py-6">
                    <CircleCheck
                        aria-hidden
                        className="size-10 text-primary-ink"
                        strokeWidth={1.5}
                    />
                    <h3 ref={successRef} tabIndex={-1} className="mt-4 text-title font-semibold">
                        {contactForm.successTitle}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{contactForm.successText}</p>
                    <button
                        type="button"
                        onClick={() => {
                            setDismissed(state)
                            setClientError(null)
                            reset(emptyValues)
                        }}
                        className="mt-6 font-semibold text-primary-ink underline underline-offset-3"
                    >
                        {contactForm.another}
                    </button>
                </div>
            )}

            <form
                aria-label={contactForm.label}
                noValidate
                hidden={showSuccess}
                onSubmit={handleSubmit(onValid)}
                className="space-y-5"
            >
                <noscript>
                    <p className="rounded-md border border-destructive bg-field p-4 text-sm">
                        {contactForm.noscript}
                    </p>
                </noscript>
                <div className="grid gap-5 sm:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="kontakt-fullname">Jméno a příjmení *</FieldLabel>
                        <Input
                            autoComplete="name"
                            placeholder="Jana Nováková"
                            {...fieldProps('fullname', true)}
                        />
                        {fieldError('fullname')}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="kontakt-phone">Telefon</FieldLabel>
                        <Input
                            type="tel"
                            autoComplete="tel"
                            placeholder="+420 …"
                            {...fieldProps('phone', false)}
                        />
                        {fieldError('phone')}
                    </Field>
                </div>
                <Field>
                    <FieldLabel htmlFor="kontakt-email">E-mailová adresa *</FieldLabel>
                    <Input
                        type="email"
                        autoComplete="email"
                        placeholder="jana@email.cz"
                        {...fieldProps('email', true)}
                    />
                    {fieldError('email')}
                </Field>
                <Field>
                    <FieldLabel htmlFor="kontakt-note">S čím potřebujete pomoci? *</FieldLabel>
                    <Textarea
                        placeholder="Napište pár slov o sobě…"
                        {...fieldProps('note', true)}
                    />
                    {fieldError('note')}
                </Field>

                <Turnstile siteKey={siteKey} />

                {formMessage && (
                    <p
                        role="alert"
                        className="rounded-md border border-destructive bg-field p-4 text-sm"
                    >
                        {formMessage}
                    </p>
                )}

                <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[32ch] text-sm text-muted-foreground">
                        {contactForm.gdprBefore}
                        <Link
                            href="/zasady-zpracovani-osobnich-udaju-gdpr"
                            className="font-semibold text-primary-ink underline underline-offset-3"
                        >
                            {contactForm.gdprLink}
                        </Link>
                        .
                    </p>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="inline-flex min-h-11 items-center justify-center self-start rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-wait disabled:opacity-70 sm:self-auto"
                    >
                        {isPending ? contactForm.pending : contactForm.submit}
                    </button>
                </div>
            </form>
        </div>
    )
}
