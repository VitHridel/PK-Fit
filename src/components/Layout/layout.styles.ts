import {
    AppBar as MuiAppBar,
    styled,
} from '@mui/material'

export const headerHeight = 120

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
    position: 'sticky',
    height: theme.typography.pxToRem(headerHeight),
    justifyContent: 'center',
    boxShadow: 'none',
}))

export const Main = styled('main')({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 0 auto',
})

export const StyledFooter = styled('footer')(({ theme }) => ({
    padding: '2rem 0',
    background: theme.palette.primary.main,
}))