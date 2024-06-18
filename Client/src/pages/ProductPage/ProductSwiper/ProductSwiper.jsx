import { useEffect } from 'react'
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import './ProductSwiper.scss'

const ProductSwiper = ({ images }) => {
    useEffect(() => {
        new Swiper('.swiper-container', {
            modules: [Pagination],
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            loop: true,
            // breakpoints: {
            //     768: {
            //         direction: 'vertical',
            //         slidesPerView: 'auto'
            //     }
            // }
        })
    }, [])

    return <div className='product-swiper swiper-container'>
        <div className='product-swiper__wrapper swiper-wrapper'>
            {images.map(image => <img className='product-swiper__img swiper-slide' key={image} src={image}/>)}
        </div>
        <div className='swiper-pagination'/>
    </div>
}

export default ProductSwiper