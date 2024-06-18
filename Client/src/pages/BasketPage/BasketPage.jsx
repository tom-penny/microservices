import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTotalValue } from '../../selectors/basket.selectors'
import { QuantityControl } from '../../components'
import useBasket from '../../hooks/useBasket'

import './BasketPage.scss'

export const BasketPage = () => {
    const navigate = useNavigate()
    const { basket } = useSelector(state => state.basket)
    const { incrementQuantity, decrementQuantity } = useBasket()

    const total = useSelector(selectTotalValue)

    if (Object.keys(basket).length === 0) {
        return <div>Basket is empty.</div>
    }

    const handleNavigate = (productId) => {
        navigate(`/products/${productId}`)
    }

    const BasketRow = ({ item, increment, decrement, onNavigate }) => {

        const { displayName, displayImage, unitPrice, quantity } = item
    
        return <>
            <img className='basket-row__image' src={displayImage} onClick={onNavigate}/>
            <div className='basket-row__name' data-test='basket-item'>{displayName}</div>
            <div className='basket-row__price' data-test='item-price'>£{parseFloat(unitPrice).toFixed(2)}</div>
            <div className='basket-row__control'>
                <QuantityControl quantity={quantity} decrement={decrement} increment={increment}/>
            </div>
            <div className='basket-row__subtotal' data-test='item-total'>£{parseFloat(unitPrice * quantity).toFixed(2)}</div>
        </>
    }
    
    return <div className='basket-page'>
        <div className='basket-grid'>
            <div className='basket-row__price'>Price</div>
            <div className='basket-row__quantity'>Quantity</div>
            <div className='basket-row__subtotal'>Subtotal</div>
            <div className='basket-grid__divider'/>
            {Object.entries(basket).map(([id, item]) => (
                item && <BasketRow key={id} item={item} increment={() => incrementQuantity(id)}
                    decrement={() => decrementQuantity(id)} onNavigate={() => handleNavigate(id)}/>
            ))}
            <div className='basket-grid__divider'/>
            <div className='basket-row__total' data-test='basket-total'>£{parseFloat(total).toFixed(2)}</div>
        </div>
        <div className='basket-footer'>
            <button className='basket-footer__btn' onClick={() => navigate('/checkout')}>Checkout</button>
        </div>
    </div>
}

export default BasketPage