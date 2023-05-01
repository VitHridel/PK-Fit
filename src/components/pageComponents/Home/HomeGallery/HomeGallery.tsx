import { HomeGalleryHolder } from '@/components/pageComponents/Home/HomeGallery/homeGallery.styles'
import { Stack } from '@mui/material'
import Image from 'next/image'
import image1 from '@/assets/img/hp-gallery/image-1.png'
import image2 from '@/assets/img/hp-gallery/image-2.png'
import image3 from '@/assets/img/hp-gallery/image-3.png'
import image4 from '@/assets/img/hp-gallery/image-4.png'

export const HomeGallery = () => {
    return (
        <HomeGalleryHolder>
            <Stack width={{ xs: '50%', md: '25%' }}>
                <Image
                    src={image1}
                    alt=""
                />
            </Stack>
            <Stack  width={{ xs: '50%', md: '25%' }}>
                <Image
                    src={image2}
                    alt=""
                />
            </Stack>
            <Stack  width={{ xs: '50%', md: '25%' }}>
                <Image
                    src={image3}
                    alt=""
                />
            </Stack>
            <Stack  width={{ xs: '50%', md: '25%' }}>
                <Image
                    src={image4}
                    alt=""
                />
            </Stack>
        </HomeGalleryHolder>
    )
}