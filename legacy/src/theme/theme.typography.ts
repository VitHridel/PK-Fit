import { createTheme, Theme } from '@mui/material/styles'
import '@fontsource/poppins'

export const themeTypography = (theme: Theme) => createTheme(theme, {
    typography: {
        fontFamily: ['Poppins', "sans-serif"].join(','),
        htmlFontSize: 16,
        allVariants: {
            fontFamily: ['Poppins', "sans-serif"].join(','),
            color: theme.palette.text.primary,
            lineHeight: 1.5,
        },
        h1: {
            fontFamily: ['Poppins', "sans-serif"].join(','),
            fontSize: '3rem',
            fontWeight: 600,
            lineHeight: 1.5,
            letterSpacing: '.12rem',
        },
        h2: {
            fontFamily: ['Poppins', "sans-serif"].join(','),
            fontSize: '2rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '.2rem',
            lineHeight: 1.5,
            letterSpacing: '.05rem',
        },
        h3: {
            fontFamily: ['Poppins', "sans-serif"].join(','),
            fontSize: theme.typography.pxToRem(25),
            fontWeight: 600,
            lineHeight: 1.5,
            marginBottom: '.8125rem',
            letterSpacing: '.05rem',
        },
        subtitle1: {
            fontFamily: ['Poppins', "sans-serif"].join(','),
            fontSize: theme.typography.pxToRem(20),
            color: theme.palette.primary.main,
            fontWeight: 600,
            lineHeight: 1.5,
            marginBottom: '1.25rem',
            letterSpacing: '.05rem',
        },
        body1: {
            fontFamily: ['Poppins', "sans-serif"].join(','),
            fontSize: theme.typography.pxToRem(18),
            marginBottom: '1.25rem',
            lineHeight: 1.5,
        },
        caption: {
            fontFamily: ['Poppins', "sans-serif"].join(','),
            fontSize: theme.typography.pxToRem(13),
            lineHeight: 1.5,
        },
    },
})