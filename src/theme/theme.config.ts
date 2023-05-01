import { createTheme } from '@mui/material/styles'
import { CSSProperties } from '@mui/material/styles/createMixins'

/*
 *       Customize typography object
 */
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xxl: true
    }
}

declare module "@mui/material/styles/createMixins" {
    // Allow for custom mixins to be added
    interface Mixins {
        primaryBackgroundHover?: CSSProperties
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
    mixins: {
        primaryBackgroundHover: {
            position: 'relative',
            background: 'linear-gradient(74.37deg, #4AC8C1 50.76%, #59D6B7 96.31%)',
            '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                background: 'linear-gradient(74.37deg, #27A9A2 50.76%, #0DDAA7 96.31%)',
                transition: '.3s ease-in-out',
                zIndex: 0,
                opacity: 0,
            },
            '&:hover': {
                '&:before': {
                    zIndex: 2,
                    opacity: 1,
                },
            }
        }
    },
})
