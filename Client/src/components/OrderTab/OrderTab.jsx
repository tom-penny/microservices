import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../reducers/order.reducer'
import OrderRow from './OrderRow/OrderRow'

import './OrderTab.scss'

const OrderTab = ({ userId }) => {
    const dispatch = useDispatch()
    const { orders, status, error } = useSelector(state => state.order)

    useEffect(() => {
        if (userId) {
            dispatch(fetchOrders({ userId }))
        }
    }, [dispatch, userId])
    
    if (status === 'failed') return <div>{error}</div>

    return <div className='order-tab'>
        {orders.map(order => <OrderRow key={order.id} order={order}/>)}
    </div>
}

export default OrderTab