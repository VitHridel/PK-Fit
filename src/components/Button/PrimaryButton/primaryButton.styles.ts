import { Button, styled } from '@mui/material'

export interface StyledPrimaryButtonProps {
    withTopLine?: boolean
}

export const StyledPrimaryButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'withTopLine',
})<StyledPrimaryButtonProps>(({ theme, withTopLine }) => ({
    ...theme.mixins.primaryBackgroundHover,
    position: 'relative',
    background: 'linear-gradient(74.37deg, #4AC8C1 50.76%, #59D6B7 96.31%)',
    borderRadius: theme.typography.pxToRem(2),
    boxShadow: 'none!important',
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        borderRadius: 'inherit',
        background: 'linear-gradient(74.37deg, #27A9A2 50.76%, #0DDAA7 96.31%)',
        transition: `${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
        zIndex: 0,
        opacity: 0,
    },
    ...(withTopLine || withTopLine === undefined) && {
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '-.25rem',
            width: '100%',
            height: '2px',
            transition: `${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
            background: 'linear-gradient(74.37deg, #4AC8C1 50.76%, #59D6B7 96.31%)',
        },
        '&:hover': {
            '&:before': {
                zIndex: 2,
                opacity: 1,
            },
            '&:after': {
                top: 0
            }
        },
    }
}))