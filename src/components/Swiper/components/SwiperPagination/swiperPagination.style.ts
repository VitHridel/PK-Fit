import { styled } from '@mui/material'

export const SwiperPaginationItem = styled('button', {
    shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>(({ theme, active }) => ({
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: 1,
    width: '1.5rem',
    height: '1.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    ...active ? {
        color: theme.palette.text.primary,
        background: theme.palette.primary.light,
    } : {
        color: theme.palette.common.white,
        background: '#ACEEEA',
    }
}))