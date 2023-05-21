import { FormControl } from '@mui/material'
import { InputMessage, Label, StyledInput, StyledInputProps } from '@/components/Form/components/Input/input.styles'
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, StyledInputProps {
    label?: string
    errorMessage?: string
}

export const Input = ({ label, errorMessage, ...inputProps }: InputProps) => {
    return (
        <FormControl sx={{ position: 'relative' }}>
            {label && <Label htmlFor={inputProps.id ?? inputProps.name}>{label}</Label>}
            <StyledInput
                id={inputProps.id ?? inputProps.name}
                {...inputProps}
            />
            {inputProps.error && errorMessage !== undefined && errorMessage !== '' && (
                <InputMessage variant="caption">{errorMessage}</InputMessage>
            )}
        </FormControl>
    )
}