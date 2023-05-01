import { createTheme, Theme } from '@mui/material/styles'
import { MuiFonts } from '@/theme/theme.fonts'

export const themeTypography = (theme: Theme) => createTheme(theme, {
    typography: {
        fontFamily: MuiFonts.Poppins,
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
            marginBottom: '.6rem',
            lineHeight: 1.5,
        },
        h3: {
            fontFamily: MuiFonts.Poppins,
            fontSize: theme.typography.pxToRem(25),
            fontWeight: 500,
            lineHeight: 1.5,
            marginBottom: '.8125rem'
        },
        body1: {
            fontFamily: MuiFonts.Poppins,
            fontSize: theme.typography.pxToRem(18),
            marginBottom: '1rem',
            lineHeight: 1.5,
        },
        caption: {
            fontFamily: MuiFonts.Poppins,
            lineHeight: 1.5,
        }
    },
})