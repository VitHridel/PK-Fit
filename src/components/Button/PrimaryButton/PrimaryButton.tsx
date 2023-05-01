import { ChildrenInterface } from '@/global.interface'
import { ButtonProps, SxProps, Typography } from '@mui/material'
import { StyledPrimaryButton, StyledPrimaryButtonProps } from '@/components/Button/PrimaryButton/primaryButton.styles'

interface PrimaryButtonProps extends ChildrenInterface, StyledPrimaryButtonProps, ButtonProps {
    textSx?: SxProps
}

export const PrimaryButton = ({ children, textSx, ...buttonProps }: PrimaryButtonProps) => {
    return (
        <StyledPrimaryButton variant="contained" {...buttonProps}>
            {children && (
                <Typography
                    position="relative"
                    zIndex={2}
                    fontSize="inherit"
                    fontWeight="inherit"
                    marginBottom={0}
                    color="common.white"
                    sx={{ fontWeight: 500, ...textSx }}
                >
                    {children}
                </Typography>
            )}
        </StyledPrimaryButton>
    )
}