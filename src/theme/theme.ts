import { createTheme } from '@mui/material/styles'
import { themeConfig } from '@/theme/theme.config'
import { themeBaseline } from '@/theme/theme.baseline'
import { themePalette } from '@/theme/theme.palette'

let theme = createTheme(themeConfig, themePalette)

theme = createTheme(theme, themeBaseline(theme))

export default theme