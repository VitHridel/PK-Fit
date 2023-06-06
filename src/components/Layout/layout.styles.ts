import {
    alpha,
    AppBar as MuiAppBar,
    styled
} from '@mui/material'

export const headerHeight = 120
export const mobileHeaderHeight = 107

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
    position: 'sticky',
    height: theme.typography.pxToRem(headerHeight),
    justifyContent: 'center',
    boxShadow: 'none',
    background: alpha(theme.palette.background.default, .85),
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)',
    [theme.breakpoints.down('sm-md')]: {
        height: theme.typography.pxToRem(mobileHeaderHeight),
    }
}))

export const Main = styled('main')({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
})

export const StyledFooter = styled('footer')(({ theme }) => ({
    overflow: 'hidden',
    padding: '4rem 0',
    background: theme.palette.primary.light,
    letterSpacing: '.185rem',
    fontSize: '1rem',
    '*': {
        color: `${theme.palette.text.primary}`,
        letterSpacing: 'inherit!important',
    },
}))

export const Section = styled('section', {
    shouldForwardProp: (prop) => !(['withBottomPadding', 'background'] as PropertyKey[]).includes(prop),
})<{ withBottomPadding?: boolean, background?: boolean }>(({ theme, withBottomPadding, background }) => ({
    paddingTop: '12.5rem',
    paddingBottom: '12.5rem',
    [theme.breakpoints.down('lg')]: {
        paddingTop: '9rem',
        paddingBottom: '9rem',
    },
    [theme.breakpoints.down('sm')]: {
        paddingTop: '4.2rem',
        paddingBottom: '4.2rem',
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