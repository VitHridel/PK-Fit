import {
    HomeGalleryHolder,
    HomeGalleryImageHolder
} from '@/components/pageComponents/Home/HomeGallery/homeGallery.styles'
import Image from 'next/image'
import image1 from '@/assets/img/hp-gallery/image-1.png'
import image2 from '@/assets/img/hp-gallery/image-2.png'
import image3 from '@/assets/img/hp-gallery/image-3.png'
import image4 from '@/assets/img/hp-gallery/image-4.png'

export const HomeGallery = () => {
    return (
        <HomeGalleryHolder>
            <HomeGalleryImageHolder>
                <Image
                    src={image1}
                    alt="pk-fit"
                    quality={100}
                />
            </HomeGalleryImageHolder>
            <HomeGalleryImageHolder>
                <Image
                    src={image2}
                    alt="pk-fit"
                    quality={100}
                />
            </HomeGalleryImageHolder>
            <HomeGalleryImageHolder>
                <Image
                    src={image3}
                    alt="pk-fit"
                    quality={100}
                />
            </HomeGalleryImageHolder>
            <HomeGalleryImageHolder>
                <Image
                    src={image4}
                    alt="pk-fit"
                    quality={100}
                />
            </HomeGalleryImageHolder>
        </HomeGalleryHolder>
    )
}