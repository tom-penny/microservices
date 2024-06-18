import { BsTrash } from 'react-icons/bs'

import './AddressCard.scss'

const AddressCard = ({ address, onSelect, onDelete }) => {

    const { id, firstName, lastName, street, city, region, country, zip } = address

    return <div className='address-card' data-test='address-card' data-testid={id}>
        {onSelect && <input className='address-card__btn' type='radio'
            name='address' value={id} onChange={() => onSelect(id)} data-test='select-address'/>}
        {onDelete && <BsTrash className='address-card__btn'
            onClick={() => onDelete(id)} data-test='delete-address'/>}
        <div className='address-card__field'>{firstName} {lastName}</div>
        <div className='address-card__field'>{street}</div>
        <div className='address-card__field'>{city}</div>
        <div className='address-card__field'>{region}</div>
        <div className='address-card__field'>{country}</div>
        <div className='address-card__field'>{zip}</div>
    </div>
}

export default AddressCard