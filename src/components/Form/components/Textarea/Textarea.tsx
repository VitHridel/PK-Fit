import { FormControl } from '@mui/material'
import { TextareaHTMLAttributes } from 'react'
import { InputMessage, Label } from '../Input/input.styles'
import { StyledTextarea } from '@/components/Form/components/Textarea/textarea.styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: boolean
    errorMessage?: string
}

export const Textarea = ({ label, errorMessage, ...textareaProps}: TextareaProps) => {
    return (
        <FormControl sx={{ position: 'relative', width: '100%' }}>
            {label && <Label htmlFor={textareaProps.id ?? textareaProps.name}>{label}</Label>}
            <StyledTextarea {...textareaProps} />
            {textareaProps.error && errorMessage !== undefined && errorMessage !== '' && (
                <InputMessage variant="caption">{errorMessage}</InputMessage>
            )}
        </FormControl>
    )
}