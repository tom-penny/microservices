import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutBasket, resetCheckout } from '../../reducers/basket.reducer'
import { fetchAddresses } from '../../reducers/address.reducer'
import { selectTotalValue } from '../../selectors/basket.selectors'
import { AddressCard, Spinner } from '../../components'
import { BarLoader } from 'react-spinners'
import useAuth from '../../hooks/useAuth'
import useBasket from '../../hooks/useBasket'

import './CheckoutPage.scss'

export const CheckoutPage = () => {

    const dispatch = useDispatch()
    const isAuthenticated = useAuth()
    const { clearBasket } = useBasket()
    const { userId } = useSelector(state => state.user)
    const { basket, checkoutId, checkoutTotal, status } = useSelector(state => state.basket)
    const { addresses } = useSelector(state => state.address)
    
    const total = useSelector(selectTotalValue)

    const [addressId, setAddressId] = useState(null)
    
    useEffect(() => () => dispatch(resetCheckout()), [dispatch])

    useEffect(() => {
        if (userId) {
            dispatch(fetchAddresses({ userId }))
        }
    }, [dispatch, userId])
    
    // Clear basket after payment processed.

    useEffect(() => {
        if (checkoutId) {
            clearBasket()
        }
    }, [dispatch, checkoutId, checkoutTotal])

    const handleClick = () => {
        dispatch(checkoutBasket({ userId, addressId, basket }))
    }

    const handleSelect = useCallback((id) => {
        setAddressId(id)
    }, [])

    if (!isAuthenticated) return null

    if (checkoutId) {
        return <div className='checkout-page'>
            <div className='checkout-details'>
                <div className='checkout-details__message' data-test='checkout-message'>Thanks for your order!</div>
                <div className='checkout-details__reference'>ID: {checkoutId}</div>
            </div>
        </div>
    }
    
    return <div className='checkout-page'>
        <div className='address-list'>
            {addresses.map((address) => (
                <AddressCard key={address.id} address={address} onSelect={handleSelect}/>
            ))}
        </div>
        <div className='checkout-page__total'>Amount due: £{parseFloat(total).toFixed(2)}</div>
        <button className='checkout-page__btn' onClick={handleClick}
            disabled={!addressId} data-test='submit-checkout'>
            {status === 'loading' ? <BarLoader loading={true} size={8}/> : 'Place order'}
            </button>
    </div>
}

export default CheckoutPage