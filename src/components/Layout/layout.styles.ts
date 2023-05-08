import {
    alpha,
    AppBar as MuiAppBar,
    styled
} from '@mui/material'

export const headerHeight = 120

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
    position: 'sticky',
    height: theme.typography.pxToRem(headerHeight),
    justifyContent: 'center',
    boxShadow: 'none',
    background: alpha(theme.palette.background.default, .85),
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)',
}))

export const Main = styled('main')({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
})

export const StyledFooter = styled('footer')(({ theme }) => ({
    padding: '4rem 0',
    background: theme.palette.primary.light,
    letterSpacing: '.185rem',
    fontSize: '1rem',
    '*': {
        color: `${theme.palette.common.white}!important`,
        letterSpacing: 'inherit!important',
    },
}))

export const Section = styled('section', {
    shouldForwardProp: (prop) => !(['withBottomPadding', 'background'] as PropertyKey[]).includes(prop),
})<{ withBottomPadding?: boolean, background?: boolean }>(({ theme, withBottomPadding, background }) => ({
    scrollMarginTop: theme.typography.pxToRem(headerHeight),
    paddingTop: '12.5rem',
    paddingBottom: '12.5rem',
    [theme.breakpoints.down('lg')]: {
        paddingTop: '9rem',
        paddingBottom: '9rem',
    },
    ...!withBottomPadding && {
        '&:not(:last-of-type)': {
            paddingBottom: 0
        },
    },
    ...background && {
        backgroundColor: theme.palette.background.default,
    }
}))