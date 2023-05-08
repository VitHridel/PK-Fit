import { createTheme, Theme } from '@mui/material/styles'
import { MuiFonts } from '@/theme/theme.fonts'

export const themeTypography = (theme: Theme) => createTheme(theme, {
    typography: {
        fontFamily: MuiFonts.Poppins,
        htmlFontSize: 16,
        allVariants: {
            fontFamily: MuiFonts.Poppins,
            color: theme.palette.text.primary,
            lineHeight: 1.5
        },
        h1: {
            fontFamily: MuiFonts.Poppins,
            fontSize: '3rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        h2: {
            fontFamily: MuiFonts.Poppins,
            fontSize: '2rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '.2rem',
            lineHeight: 1.5,
        },
        h3: {
            fontFamily: MuiFonts.Poppins,
            fontSize: theme.typography.pxToRem(25),
            fontWeight: 500,
            lineHeight: 1.5,
            marginBottom: '.8125rem'
        },
        subtitle1: {
            fontFamily: MuiFonts.Poppins,
            fontSize: theme.typography.pxToRem(20),
            color: theme.palette.primary.main,
            fontWeight: 500,
            lineHeight: 1.5,
            marginBottom: '1.25rem',
        },
        body1: {
            fontFamily: MuiFonts.Poppins,
            fontSize: theme.typography.pxToRem(18),
            marginBottom: '1.25rem',
            lineHeight: 1.5,
        },
        caption: {
            fontFamily: MuiFonts.Poppins,
            fontSize: theme.typography.pxToRem(13),
            lineHeight: 1.5,
        },
    },
})