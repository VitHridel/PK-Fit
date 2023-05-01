import { Box, styled } from '@mui/material'
import { StyledNextLink } from '@/components/Link'

export const NavLink = styled(StyledNextLink)(({ theme }) => ({
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary,
    lineHeight: 1.5,
    '&:hover': {
        color: theme.palette.primary.main
    }
}))

export const NavLine = styled(Box)({
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    width: '100vw',
    height: '2px',
    background: 'linear-gradient(74.37deg, #4AC8C1 50.76%, #59D6B7 96.31%)',
})