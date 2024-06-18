import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAddress, deleteAddress, fetchAddresses } from '../../reducers/address.reducer.js'
import { AddressCard } from '../../components'

import './AddressTab.scss'

const defaultAddress = { firstName: '', lastName: '', street: '', city: '', region: '', country: '', zip: '' }

const AddressTab = ({ userId }) => {
    const dispatch = useDispatch()
    const { addresses, status, error } = useSelector(state => state.address)
    
    const [address, setAddress] = useState(defaultAddress)

    useEffect(() => {
        if (userId) {
            dispatch(fetchAddresses({ userId }))
        }
    }, [dispatch, userId])

    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createAddress({ userId, address }))
        setAddress(defaultAddress)
    }

    const handleDelete = (addressId) => {
        dispatch(deleteAddress({ userId, addressId }))
    }

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }
    
    const AddressList = () => {

        if (status === 'failed') return <div>{error}</div>

        return <div className='address-list'>
            {addresses.map((address) => (
                <AddressCard key={address.id} address={address} onDelete={handleDelete}/>
            ))}
        </div>
    }

    return <div className='address-tab'>
        <form className='address-form' onSubmit={handleCreate}>
            <div className='address-form__row'>
                <input className='address-form__input' type='text' name='firstName' value={address.firstName}
                    placeholder='First Name' onChange={handleChange} data-test='input-first'/>
                <input className='address-form__input' type='text' name='lastName' value={address.lastName}
                    placeholder='Last Name' onChange={handleChange} data-test='input-last'/>
            </div>
            <input className='address-form__input' type='text' name='street' value={address.street}
                placeholder='Street' onChange={handleChange} data-test='input-street'/>
            <div className='address-form__row'>
                <input className='address-form__input' type='text' name='city' value={address.city}
                    placeholder='City' onChange={handleChange} data-test='input-city'/>
                <input className='address-form__input' type='text' name='region' value={address.region}
                    placeholder='Region' onChange={handleChange} data-test='input-region'/>
            </div>
            <div className='address-form__row'>
                <input className='address-form__input' type='text' name='country' value={address.country}
                    placeholder='Country' onChange={handleChange} data-test='input-country'/>
                <input className='address-form__input' type='text' name='zip' value={address.zip}
                    placeholder='Zip' onChange={handleChange} data-test='input-zip'/>
            </div>
            <button className='address-form__btn' type='submit' data-test='submit-address'>Save address</button>
        </form>
        <AddressList/>
    </div>
}

export default AddressTab