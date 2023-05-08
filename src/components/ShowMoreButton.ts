import { Button, styled } from '@mui/material'

export const ShowMoreButton = styled(Button)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 500,
    padding: 0,
    margin: '0 auto',
    width: 'fit-content',
    textTransform: 'none',
    borderRadius: 0,
    borderBottom: `${theme.typography.pxToRem(2)} solid ${theme.palette.primary.main}`,
    '&:hover': {
        background: 'transparent'
    }
}))