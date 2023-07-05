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
                <img
                    src={image1.src}
                    alt="pk-fit"
                    loading="lazy"
                />
            </HomeGalleryImageHolder>
            <HomeGalleryImageHolder>
                <img
                    src={image2.src}
                    alt="pk-fit"
                    loading="lazy"
                />
            </HomeGalleryImageHolder>
            <HomeGalleryImageHolder>
                <img
                    src={image3.src}
                    alt="pk-fit"
                    loading="lazy"
                />
            </HomeGalleryImageHolder>
            <HomeGalleryImageHolder>
                <img
                    src={image4.src}
                    alt="pk-fit"
                    loading="lazy"
                />
            </HomeGalleryImageHolder>
        </HomeGalleryHolder>
    )
}