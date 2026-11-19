import { styled } from '@mui/material'
import { StyledInputProps } from '@/components/Form/components/Input/input.styles'

export const StyledTextarea = styled('textarea', {
    shouldForwardProp: (prop) => prop !== 'error',
})<StyledInputProps>(({ theme, error }) => ({
    fontSize: theme.typography.pxToRem(18),
    background: 'transparent',
    padding: `${theme.typography.pxToRem(19)} ${theme.typography.pxToRem(30)}`,
    border: `${theme.typography.pxToRem(2)} solid ${error ? theme.palette.error.main : theme.palette.primary.light}`,
    borderRadius: theme.typography.pxToRem(2),
    '&:focus-visible': {
        outline: 'none'
    }
}))
