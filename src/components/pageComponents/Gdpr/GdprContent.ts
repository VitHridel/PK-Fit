import { Stack, styled, Typography } from '@mui/material'

export const GdprSubtitle = styled(Typography)({
    fontWeight: 600,
    marginBottom: 0,
})

export const GdprContent = styled(Stack)(({ theme }) => ({
    color: theme.palette.text.primary,
    'ol:not([type="I"]), ul': {
        marginLeft: '1rem'
    },
    'ol[type="I"]>li': {
        marginBottom: '1rem',
    }
}))