import { createTheme } from '@mui/material/styles'
import { MuiFonts } from '@/theme/theme.fonts'

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xxl: true
    }
}

export const themeConfig = createTheme({
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1400,
            xxl: 1700,
        },
    },
    typography: {
        fontFamily: MuiFonts.Inter,
        allVariants: {
            lineHeight: 1.2
        },
        body1: {
            letterSpacing: '.1rem',
            marginBottom: '1rem',
        },
        caption: {
            fontSize: '1rem',
            letterSpacing: '.1rem',
        }
    },
})
