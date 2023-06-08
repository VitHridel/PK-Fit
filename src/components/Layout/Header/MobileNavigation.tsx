import {
    MobileNavigationLink,
    MobileNavigationList,
    StyledMobileNavigation
} from '@/components/Layout/Header/header.styles'
import { useEffect, useRef } from 'react'
import { Container, Link, ListItem, Stack } from '@mui/material'
import { PrimarySocials } from '@/components/PrimarySocials'
import { pages } from '@/components/Layout/Header/Header'
import ArrowNext from '@/assets/img/arrow-next.svg'

interface MobileNavigationProps {
    isActive: boolean
    onClose: () => void
}

export const MobileNavigation = ({ isActive, onClose }: MobileNavigationProps) => {
    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const html = document.querySelector('html')
        let timeout: NodeJS.Timeout
        if (html) {
            if (isActive) {
                html.style.overflow = 'hidden'
                timeout = setTimeout(() => {
                    if (navRef.current) {
                        navRef.current.style.overflow = 'auto'
                    }
                }, 250)
            } else {
                html.style.overflow = 'unset'
                if (navRef.current) {
                    navRef.current.style.overflow = 'hidden'
                }
            }
        }
        return () => clearTimeout(timeout)
    }, [isActive])

    return (
        <StyledMobileNavigation isActive={isActive} ref={navRef}>
            <Container component={Stack} sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: '1rem', paddingBottom: '1rem' }}>
                <MobileNavigationList>
                    {pages.map(page => {
                        return (
                            <ListItem key={page.name} disablePadding>
                                <MobileNavigationLink href={page.href} underline="none" onClick={onClose}>
                                    {page.name}
                                    <ArrowNext />
                                </MobileNavigationLink>
                            </ListItem>
                        )
                    })}
                </MobileNavigationList>

                <Stack alignItems="center" gap="1.5rem" paddingTop="2rem" height="fit-content" margin="auto">
                    <Link href="tel:+420720458858" underline="none" fontWeight={600} letterSpacing=".1rem">+420 720 458 858</Link>
                    <Link href="mailto:info@pk-fit.cz" underline="none" fontWeight={600} letterSpacing=".1rem">info@pk-fit.cz</Link>
                    <Stack direction="row" justifyContent="center" gap="1rem" marginTop=".5rem">
                        <PrimarySocials buttonSize={2.5} />
                    </Stack>
                </Stack>
            </Container>
        </StyledMobileNavigation>
    )
}