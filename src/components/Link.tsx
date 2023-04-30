import NextLink from 'next/link'
import { styled, Link, LinkProps } from '@mui/material'

export const StyledNextLink = styled((props: LinkProps) => <Link component={NextLink} {...props} />)({})
