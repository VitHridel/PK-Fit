import { themeConfig } from '@/theme/theme.config'
import { themeBaseline } from '@/theme/theme.baseline'
import { themePalette } from '@/theme/theme.palette'
import { themeComponents } from '@/theme/theme.components'
import { themeTypography } from '@/theme/theme.typography'

let theme = themeConfig
theme = themePalette(theme)
theme = themeTypography(theme)
theme = themeComponents(theme)
theme = themeBaseline(theme)

export default theme