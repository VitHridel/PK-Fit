import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { styled, Link, LinkProps } from '@mui/material'
import { forwardRef } from 'react'

export const NextLinkBehaviour = forwardRef<HTMLAnchorElement, NextLinkProps>(function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} {...props} scroll={false} />
})

export const StyledNextLink = styled((props: LinkProps) => <Link component={NextLinkBehaviour} {...props} />)({})
