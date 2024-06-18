import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../api/product.api'
import { useMediaQuery } from 'react-responsive'
import { QuantityControl } from '../../components'
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5'
import ProductSwiper from './ProductSwiper/ProductSwiper'
import useBasket from '../../hooks/useBasket'

import './ProductPage.scss'

export const ProductPage = () => {
    const { productId } = useParams()
    const { addToBasket } = useBasket()
    // const { isMobile } = useDevice()
    // const isMobile = window.innerWidth < 768

    const isMobile = useMediaQuery({ maxWidth: 768 })

    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productId)
                setProduct(response.data.product)
            }
            catch (err) { }
        }
        fetchProduct()
    }, [productId])

    if (!product) return null

    const ProductGallery = () => (
        <div className='product-gallery'>
            {product.images.map(image => <img className='product-gallery__img' key={image} src={image}/>)}
        </div>
    )

    const handleClick = (value) => {
        setQuantity(quantity => {
            quantity += value
            return quantity > 1 ? quantity : 1
        })
    }

    return <div className='product-page'>
        {/* <ProductSwiper images={product.images}/> */}
        {isMobile ? <ProductSwiper images={product.images}/> : <ProductGallery/>}
        <div className='product-details'>
            <div className='product-details__content'>
                <div className='product-details__name'>{product.name}</div>
                <div className='product-details__description'>Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Ullam et, sit, reiciendis accusamus ad quod doloribus nobis facere similique dolore alias
                    aperiam. Molestiae sequi ad totam autem reprehenderit itaque fuga.</div>
                <div className='product-details__controls'>
                    <button className='product-details__btn' onClick={() => addToBasket(product, quantity)}
                        data-test='add-product'>Add to basket</button>
                    <QuantityControl quantity={quantity} decrement={() => handleClick(-1)} increment={() => handleClick(1)}/>
                </div>
            </div>
        </div>
    </div>
}

export default ProductPage