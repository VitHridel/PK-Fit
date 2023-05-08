import { createTheme } from '@mui/material/styles'
import { CSSProperties } from '@mui/material/styles/createMixins'

/*
 *       Customize typography object
 */
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xxl: true
        900: true
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
        keys: ['xs', 'sm', '900', 'md', 'lg', 'xl', 'xxl'],
        values: {
            xs: 0,
            sm: 700,
            ['900']: 900,
            md: 1152,
            lg: 1472,
            xl: 1592,
            xxl: 1892,
        },
    },
    spacing: (factor: number) => `${factor * 2}rem`,
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
