import { ButtonProps, LinkProps, SxProps, Typography } from '@mui/material'
import { StyledPrimaryButton, StyledPrimaryButtonProps } from '@/components/Button/PrimaryButton/primaryButton.styles'

interface PrimaryButtonProps extends StyledPrimaryButtonProps, ButtonProps, Pick<LinkProps, 'target'> {
    textSx?: SxProps
}

export const PrimaryButton = ({ children, textSx, ...buttonProps }: PrimaryButtonProps) => {
    return (
        <StyledPrimaryButton variant="contained" {...buttonProps}>
            {children && (
                <Typography
                    position="relative"
                    zIndex={2}
                    textTransform="none"
                    marginBottom={0}
                    color="common.white"
                    sx={{ fontWeight: 600, ...textSx }}
                >
                    {children}
                </Typography>
            )}
        </StyledPrimaryButton>
    )
}