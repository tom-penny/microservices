import classNames from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createReturn } from '../../../reducers/return.reducer'

import './OrderRow.scss'

const OrderRow = ({ order }) => {
    const dispatch = useDispatch()

    const [isOpen, setOpen] = useState(false)
    const [returns, setReturns] = useState({})

    const { id, checkoutId, customerId, amount, status } = order

    const handleClick = (item) => {
        dispatch(createReturn({
            customerId,
            orderItemId: item.id,
            quantity: item.quantity,
            reason: "Other"
        }))
        setReturns(returns => ({ ...returns, [id]: true }))
    }

    return <div className='order-row' data-test='order-row' data-testid={checkoutId}>
        <div className='order-row__content' onClick={() => setOpen(!isOpen)}>
            <div className='order-row__field'>Order: {id}</div>
            <div className='order-row__field'>Total: £{parseFloat(amount).toFixed(2)}</div>
            <div className='order-row__field'>Status: {status}</div>
            <div className='order-row__toggle'>
                <div className={classNames('order-row__toggle-line', { 'order-row__toggle-line--active': isOpen })}/>
                <div className={classNames('order-row__toggle-line', { 'order-row__toggle-line--active': isOpen })}/>
            </div>
        </div>
        {isOpen &&
            <div className='order-row__items'>
                {order.items.map(item => (
                    <div className='order-row__item' key={item.id}>
                        <div className='order-row__field'>Product: {item.productId}</div>
                        <div className='order-row__field'>Unit Price: {item.unitPrice}</div>
                        <div className='order-row__field'>Quantity: {item.quantity}</div>
                        {returns[item.id]
                            ? <div className='order-row__field'>Return created!</div>
                            : <button className='order-row__btn' onClick={() => handleClick(item)}
                                disabled={status !== 'Completed'} data-test='submit-return'>Return</button>
                        }
                    </div>
                ))}
            </div>
        }
    </div>
}

export default OrderRow