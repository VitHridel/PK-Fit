import { styled, Typography } from '@mui/material'

export interface StyledInputProps {
    error?: boolean
}

export const StyledInput = styled('input', {
    shouldForwardProp: (prop) => prop !== 'error',
})<StyledInputProps>(({ theme, error }) => ({
    fontSize: theme.typography.pxToRem(18),
    background: 'transparent',
    padding: `${theme.typography.pxToRem(19)} ${theme.typography.pxToRem(30)}`,
    border: `${theme.typography.pxToRem(2)} solid ${error ? theme.palette.error.main : theme.palette.primary.light}`,
    borderRadius: theme.typography.pxToRem(2),
    '&:focus-visible': {
        outline: 'none'
    },
}))

export const Label = styled('label')(({ theme }) => ({
    color: theme.palette.primary.light,
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightBold,
    padding: `0 0 ${theme.typography.pxToRem(6)} ${theme.typography.pxToRem(8)}`,
}))

export const InputMessage = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    top: '100%',
    paddingLeft: theme.typography.pxToRem(8),
    color: theme.palette.error.main,
    fontSize: theme.typography.pxToRem(12),
}))