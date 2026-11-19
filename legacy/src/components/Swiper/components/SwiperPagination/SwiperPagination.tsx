import { SwiperComponentInterface } from '@/components/Swiper/components/swiperComponents.interface'
import { Stack } from '@mui/material'
import { SwiperPaginationItem } from '@/components/Swiper/components/SwiperPagination/swiperPagination.style'

interface SwiperPaginationProps extends SwiperComponentInterface {
    pages: number
    activePage?: number
}

export const SwiperPagination = ({ swiper, pages, activePage }: SwiperPaginationProps) => {
    return (
        <Stack direction="row" justifyContent="center" gap=".4rem" marginTop="1.8rem">
            {Array.from(Array(pages).keys()).map((page) => (
                <SwiperPaginationItem key={page} active={page === activePage} onClick={() => swiper?.slideTo(page)}>
                    {page + 1}
                </SwiperPaginationItem>
            ))}
        </Stack>
    )
}