import { Swiper, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-unresolved
import SwiperClass from 'swiper/types/swiper-class'
import ArrowPrev from '@/assets/img/arrow-prev.svg'
import ArrowNext from '@/assets/img/arrow-next.svg'
import 'swiper/css'
import { Typography, useTheme } from '@mui/material'
import {
    ReferencesSwiperButtonNext,
    ReferencesSwiperButtonPrev,
    ReferencesSwiperWrapper
} from '@/components/Swiper/ReferencesSwiper/referencesSwiper.styles'
import { useState } from 'react'
import Image from 'next/image'

export const ReferencesSwiper = () => {
    const [swiper, setSwiper] = useState<SwiperClass>()
    const theme = useTheme()

    const slideNext = () => {
        swiper?.slideNext()
    }

    const slidePrev = () => {
        swiper?.slidePrev()
    }

    return (
        <ReferencesSwiperWrapper>
            <Swiper
                onSwiper={setSwiper}
                slidesPerView={3}
                breakpoints={{
                    [theme.breakpoints.values.xs]: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    [theme.breakpoints.values.sm]: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    [theme.breakpoints.values.md]: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    [theme.breakpoints.values.lg]: {
                        spaceBetween: 80,
                    },
                }}
            >
                <SwiperSlide>
                    <Typography>
                        consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam
                    </Typography>
                    <Typography variant="caption" fontSize="1.25rem" color="primary">Jméno klienta, Praha</Typography>
                </SwiperSlide>
                <SwiperSlide>
                    <Typography>
                        consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam
                    </Typography>
                    <Typography variant="caption" fontSize="1.25rem" color="primary">Jméno klienta, Praha</Typography>
                </SwiperSlide>
                <SwiperSlide>
                    <Typography>
                        consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam
                    </Typography>
                    <Typography variant="caption" fontSize="1.25rem" color="primary">Jméno klienta, Praha</Typography>
                </SwiperSlide>
                <SwiperSlide>
                    <Typography>
                        consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam
                    </Typography>
                    <Typography variant="caption" fontSize="1.25rem" color="primary">Jméno klienta, Praha</Typography>
                </SwiperSlide>
                <SwiperSlide>
                    <Typography>
                        consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam
                    </Typography>
                    <Typography variant="caption" fontSize="1.25rem" color="primary">Jméno klienta, Praha</Typography>
                </SwiperSlide>
            </Swiper>
            <ReferencesSwiperButtonPrev onClick={slidePrev}>
                <ArrowPrev />
            </ReferencesSwiperButtonPrev>
            <ReferencesSwiperButtonNext onClick={slideNext}>
                <ArrowNext />
            </ReferencesSwiperButtonNext>
        </ReferencesSwiperWrapper>
    )
}