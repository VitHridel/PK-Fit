import { Button, LinkProps, styled } from '@mui/material'

export const FooterSocialButton = styled(Button)<{ target?: LinkProps['target'] }>(({ theme }) => ({
    background: `${theme.palette.common.white}!important`,
    minWidth: 'unset',
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    padding: 0,
    boxShadow: 'none!important',
    svg: {
        width: 20,
        path: {
            fill: theme.palette.primary.light,
        }
    }
}))