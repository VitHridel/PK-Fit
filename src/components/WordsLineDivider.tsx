import { Box, Stack, styled, Typography } from '@mui/material'

interface WordsLineDividerProps {
    words: string[]
}

const LineDivider = styled(Box)(({ theme }) => ({
    margin: '0 1rem',
    height: '2px',
    width: '2.2rem',
    [theme.breakpoints.up('md')]: {
        width: '3.5rem',
        margin: '0 1.5rem',
    },
    background: theme.palette.primary.main,
}))

export const WordsLineDivider = ({ words }: WordsLineDividerProps) => {
    return (
        <Stack direction="row" alignItems="center">
            {words.map((word, i) => {
                if (i !== words.length - 1) {
                    return (
                        <>
                            <Typography variant="caption" color="primary" fontSize="1.25rem" fontWeight={500}>
                                {word}
                            </Typography>
                            <LineDivider />
                        </>
                    )
                }
                return <Typography variant="caption" color="primary" fontSize="1.25rem" fontWeight={500}>{word}</Typography>
            })}
        </Stack>
    )
}