import { createTheme, Theme } from '@mui/material/styles'

export const themeComponents = (themeBase: Theme) => createTheme(themeBase, {
    components: {
        MuiContainer: {
            styleOverrides: {
                root: (({ theme }) => ({
                    [theme.breakpoints.down('md')]: {
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                    },
                    [theme.breakpoints.down('sm')]: {
                        paddingLeft: '1.2rem',
                        paddingRight: '1.2rem',
                    },
                }))
            }
        },
        MuiButton: {
            styleOverrides: {
                root: (({ theme, ownerState }) => ({
                    ...ownerState.size === 'large' && {
                        minWidth: theme.typography.pxToRem(223),
                        padding: `${theme.typography.pxToRem(11)} ${theme.typography.pxToRem(43)}`,
                    }
                }))
            }
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    subtitle1: 'p'
                }
            },
            styleOverrides: {
                root: (({ theme, ownerState }) => ({
                    ...ownerState.variant === 'h1' && {
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '2.5rem',
                            lineHeight: 1.3,
                        }
                    },
                    ...ownerState.variant === 'h2' && {
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '1.5rem',
                        }
                    },
                    ...ownerState.variant === 'h3' && {
                        [theme.breakpoints.down('sm')]: {
                            fontSize: theme.typography.pxToRem(18),
                        }
                    },
                    ...ownerState.variant === 'subtitle1' && {
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '1rem',
                        }
                    },
                    ...ownerState.variant === 'body1' && {
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '1rem',
                            lineHeight: 1.6,
                        }
                    },
                }))
            }
        },
        MuiLink: {
            styleOverrides: {
                root: (({ theme, ownerState }) => ({
                    transition: theme.transitions.create('all', {
                        duration: theme.transitions.duration.standard,
                        easing: theme.transitions.easing.easeOut,
                    }),
                    ...ownerState.variant !== 'none' && {
                        textDecorationColor: 'inherit',
                    }
                }))
            }
        }
    }
})