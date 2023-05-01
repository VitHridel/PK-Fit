import { createTheme, Theme } from '@mui/material/styles'

export const themeComponents = (themeBase: Theme) => createTheme(themeBase, {
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    subtitle1: 'p'
                }
            },
            styleOverrides: {
                root: (({ theme, ownerState }) => ({
                    ...ownerState.variant === 'h1' && {
                        [theme.breakpoints.down('md')]: {
                            fontSize: '2.5rem',
                            lineHeight: 1.3,
                        }
                    },
                    ...ownerState.variant === 'h2' && {
                        [theme.breakpoints.down('md')]: {
                            fontSize: theme.typography.pxToRem(24),
                        }
                    },
                    ...ownerState.variant === 'h3' && {
                        [theme.breakpoints.down('md')]: {
                            fontSize: theme.typography.pxToRem(20),
                        }
                    },
                    ...ownerState.variant === 'subtitle1' && {
                        [theme.breakpoints.down('md')]: {
                            fontSize: `${16 / 14}rem`,
                        }
                    },
                    ...ownerState.variant === 'body1' && {
                        [theme.breakpoints.down('md')]: {
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