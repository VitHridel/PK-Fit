import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { styled, Link, LinkProps } from '@mui/material'
import { forwardRef } from 'react'

const NextLinkBehaviour = forwardRef<HTMLAnchorElement, NextLinkProps>(function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} scroll={false} {...props} />
})

const NextLinkBehaviourNoScroll = forwardRef<HTMLAnchorElement, NextLinkProps>(function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} {...props} />
})

export const StyledNextLink = styled((props: LinkProps & Pick<NextLinkProps, 'scroll'>) => <Link component={props.scroll ? NextLinkBehaviourNoScroll : NextLinkBehaviour} {...props} />)({})
