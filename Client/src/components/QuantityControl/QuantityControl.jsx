import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5'

import './QuantityControl.scss'

const QuantityControl = ({ quantity, decrement, increment }) => {

    return <div className='quantity-control'>
        <div className='quantity-control__btn' onClick={() => decrement()} data-test='decrement'><IoRemoveOutline/></div>
        <div className='quantity-control__value' data-test='item-quantity'>{quantity}</div>
        <div className='quantity-control__btn' onClick={() => increment()} data-test='increment'><IoAddOutline/></div>
    </div>
}

export default QuantityControl