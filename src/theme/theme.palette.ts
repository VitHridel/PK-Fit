import { createTheme, Theme } from '@mui/material/styles'

export const themePalette = (themeBase: Theme) => createTheme(themeBase, {
    palette: {
        primary: {
            main: '#107974',
            light: '#72D7D1',
        },
        text: {
            primary: '#0E1414',
        },
        background: {
            default: '#E7F1F1',
        },
        common: {
            white: '#F0F4F4'
        }
    },
})