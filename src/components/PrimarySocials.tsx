import { PrimaryButton } from '@/components/Button/PrimaryButton/PrimaryButton'
import { Facebook, Instagram } from '@mui/icons-material'

interface PrimarySocialsProps {
    buttonSize?: number
}

export const PrimarySocials = ({ buttonSize }: PrimarySocialsProps) => {
    const size = buttonSize !== undefined ? `${buttonSize}rem` : '2rem'
    const iconSize = buttonSize !== undefined ? `${buttonSize/8*5}rem` : '1.25rem'
    return (
        <>
            <PrimaryButton
                href={process.env.NEXT_PUBLIC_IG}
                target="_blank"
                aria-label="Instagram"
                withTopLine={false}
                sx={{
                    minWidth: 'unset',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    padding: 0
                }}
                textSx={{ lineHeight: '0!important' }}
            >
                <Instagram sx={{ width: iconSize, height: iconSize }} />
            </PrimaryButton>

            <PrimaryButton
                href={process.env.NEXT_PUBLIC_FB}
                target="_blank"
                aria-label="Facebook"
                withTopLine={false}
                sx={{
                    minWidth: 'unset',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    padding: 0
                }}
                textSx={{ lineHeight: '0!important' }}
            >
                <Facebook sx={{ width: iconSize, height: iconSize }} />
            </PrimaryButton>
        </>
    )
}