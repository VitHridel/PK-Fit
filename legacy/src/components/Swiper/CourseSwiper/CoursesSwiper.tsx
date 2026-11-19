import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SwiperClass from 'swiper/types/swiper-class'
import { homeCourses } from '@/utils/Home/home.courses'
import { HomeCourseCard } from '@/components/pageComponents/Home/HomeCourses/HomeCourseCard'
import { useState } from 'react'
import { SwiperPagination } from '@/components/Swiper/components/SwiperPagination/SwiperPagination'
import { CoursesSwiperWrapper } from '@/components/Swiper/CourseSwiper/coursesSwiper.style'

export const CoursesSwiper = () => {
    const [swiper, setSwiper] = useState<SwiperClass>()
    const [swiperActiveIndex, setSwiperActiveIndex] = useState<number>(0)

    return (
        <CoursesSwiperWrapper>
            <Swiper
                onSwiper={setSwiper}
                onActiveIndexChange={(s) => {
                    setSwiperActiveIndex(s.activeIndex)
                }}
                slidesPerView={1.2}
                spaceBetween={10}
            >
                {homeCourses.map((course, i) => (
                    <SwiperSlide key={i}>
                        <HomeCourseCard {...course} sx={{ width: '100%!important', height: '100%' }} />
                    </SwiperSlide>
                ))}
                <SwiperPagination swiper={swiper} pages={homeCourses.length} activePage={swiperActiveIndex} />
            </Swiper>
        </CoursesSwiperWrapper>
    )
}