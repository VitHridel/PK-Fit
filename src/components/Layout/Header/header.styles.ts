import { Box, styled, Link, Stack, List } from '@mui/material'

export const NavLink = styled(Link)(({ theme }) => ({
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

export const StyledMobileNavigation = styled(Stack)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    height: 0,
    width: '100%',
    background: theme.palette.background.default,
    overflow: 'hidden',
    transition: theme.transitions.create('height', {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeIn,
    })
}))

export const MobileNavigationList = styled(List)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    width: '80%',
    flexDirection: 'column',
    gap: '2rem',
    paddingBottom: '2rem',
    '&:after': {
        content: '""',
        position: 'absolute',
        top: '100%',
        left: 0,
        height: theme.typography.pxToRem(2),
        width: '100%',
        background: 'linear-gradient(to left, #4AC8C1 50.76%, #59D6B7 100%)'
    }
}))

export const MobileNavigationLink = styled(Link)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 400,
}))