import { ServicesSwiperWrapper } from '@/components/Swiper/ServicesSwiper/servicesSwiper.style'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SwiperClass from 'swiper/types/swiper-class'
import { SwiperPagination } from '@/components/Swiper/components/SwiperPagination/SwiperPagination'
import { homeServicesArray } from '@/utils/Home/home.services'
import { Service } from '@/components/Service/Service'

export const ServicesSwiper = () => {
    const [swiper, setSwiper] = useState<SwiperClass>()
    const [swiperActiveIndex, setSwiperActiveIndex] = useState<number>(0)

    return (
        <ServicesSwiperWrapper>
            <Swiper
                onSwiper={setSwiper}
                onActiveIndexChange={(s) => {
                    setSwiperActiveIndex(s.activeIndex)
                }}
                slidesPerView={1}
                spaceBetween={30}
            >
                <SwiperSlide>
                    {homeServicesArray.slice(0, 3).map((service) => (
                        <Service key={service.headline} {...service} />
                    ))}
                </SwiperSlide>
                <SwiperSlide>
                    {homeServicesArray.slice(3, 7).map((service) => (
                        <Service key={service.headline} {...service} />
                    ))}
                </SwiperSlide>
                <SwiperPagination swiper={swiper} pages={2} activePage={swiperActiveIndex} />
            </Swiper>
        </ServicesSwiperWrapper>
    )
}