import { createTheme, Theme } from '@mui/material/styles'

export const themeBaseline = (theme: Theme) => createTheme(theme, {
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0,
                },
                html: {
                    scrollBehavior: 'smooth',
                    fontSize: '16px',
                    [theme.breakpoints.down('md')]: {
                        fontSize: '14px',
                    },
                    lineHeight: 1.6,
                },
                body: {
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main,
                    marginBottom: 0,
                },
                '#__next': {
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                },
                img: {
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '100%',
                }
            }
        },
    }
})