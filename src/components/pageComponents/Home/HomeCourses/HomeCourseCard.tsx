import { Stack, styled, SxProps, Typography } from '@mui/material'
import Image from 'next/image'
import { StyledNextLink } from '@/components/Link'
import { CourseInterface } from '@/global.interface'

const Card = styled(StyledNextLink)(({ theme }) => ({
    display: 'inline-block',
    position: 'relative',
    width: '23.5%',
    textAlign: 'left',
    border: `2px solid ${theme.palette.primary.main}`,
    '&:after': {
        content: '""',
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        opacity: 0,
        width: 'calc(100% + 4px)',
        height: 'calc(100% + 4px)',
        border: `2px solid ${theme.palette.primary.main}`,
        transition: theme.transitions.create(['border', 'opacity'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeIn,
        }),
    },
    '&:hover:after': {
        opacity: 1,
        border: `${theme.typography.pxToRem(3)} solid ${theme.palette.primary.light}`
    },
    [theme.breakpoints.down('md')]: {
        width: '47.5%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '80%'
    },
    img: {
        width: '100%',
    }
}))

interface HomeCourseCardProps extends CourseInterface {
    sx?: SxProps
}

const CourseText = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
    marginBottom: 0,
    display: '-webkit-box',
    // WebkitLineClamp: 2,
    // WebkitBoxOrient: 'vertical',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
}))

export const HomeCourseCard = ({ image, headline, place, date, text, link, sx }: HomeCourseCardProps) => {
    return (
        <Card href={link} target="_blank" underline="none" sx={sx}>
            <Image
                src={image}
                alt={headline}
            />
            <Stack padding=".5rem 1.25rem 1.25rem" position="relative">
                <Stack minHeight={{ xs: 'unset', sm: '4.6rem' }}>
                    <Typography variant="h3" fontSize="1.125rem" fontWeight={600} marginBottom={0}>{headline}</Typography>
                    <Typography variant="caption">{place}</Typography>
                </Stack>
                <Typography variant="caption" fontSize="1rem" fontWeight={600} marginY=".5rem">{date}</Typography>
                <CourseText title={text}>{text}</CourseText>
            </Stack>
        </Card>
    )
}