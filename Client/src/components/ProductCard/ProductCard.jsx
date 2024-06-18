import { useNavigate } from 'react-router-dom'

import './ProductCard.scss'

export const ProductCard = ({ product }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/products/${product.id}`)
    }
    
    return <div className='product-card' onClick={handleClick} data-test='product-card' data-testid={product.id}>
        <img className='product-card__image' src={product.images[0]} alt={product.name}/>
        <img className='product-card__image' src={product.images[1]} alt={product.name}/>
        <div className='product-card__name' onClick={handleClick} data-test='field-name'>{product.name}</div>
        <div className='product-card__price' data-test='field-price'>£{product.price}</div>
    </div>
}

export default ProductCard