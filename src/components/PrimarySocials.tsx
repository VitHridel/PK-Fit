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
                href="https://instagram.com/petra_konradova_fitness?igshid=MzRlODBiNWFlZA=="
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
                href="https://www.facebook.com/petra.konradova.fitness"
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