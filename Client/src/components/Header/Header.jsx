import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IoCartOutline, IoPersonOutline, IoBagOutline } from 'react-icons/io5'
import { GiPlainCircle } from 'react-icons/gi'
import { fetchCategories } from '../../reducers/category.reducer'
import { logoutUser } from '../../reducers/user.reducer'
import { selectTotalQuantity } from '../../selectors/basket.selectors'
import classNames from 'classnames'

import './Header.scss'

const formatCategory = (categoryName) =>
    categoryName.replace(/-/g, ' ').replace(/\b[a-z]/g, (c) => c.toUpperCase()).replace(/\band\b/gi, '&')

const Header = ({ menuOpen, setMenuOpen }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { userId } = useSelector(state => state.user)
    const { categories, status } = useSelector(state => state.category)
    const quantity = useSelector(selectTotalQuantity)

    const [dropOpen, setDropOpen] = useState(false)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories())
        }
    }, [dispatch, status])

    // Reset menus upon navigation.

    useEffect(() => {
        setMenuOpen(false)
        setDropOpen(false)
    },[location])

    const Dropdown = () => (
        <div className='header-menu__dropdown'>
            <Link className='header-menu__dropdown-link' to={'/catalogue'}>All Products</Link>
            {categories.map((category) => (
                <Link className='header-menu__dropdown-link' key={category.id} to={`/catalogue/${category.name}`}
                    data-test='link-category' data-testid={category.name}>
                    {formatCategory(category.name)}
                </Link>
            ))}
        </div>
    )

    return <div className='header'>
        <div className={classNames('header-nav', { 'header-nav--open': menuOpen })}>
            <div className='header-nav__btn' onMouseEnter={() => setMenuOpen(true)}
                onClick={() => setMenuOpen(!menuOpen)} data-test='open-menu'>
                <div className={classNames('header-nav__btn-line', { 'header-nav__btn-line--active': menuOpen })}/>
                <div className={classNames('header-nav__btn-line', { 'header-nav__btn-line--active': menuOpen })}/>
                <div className={classNames('header-nav__btn-line', { 'header-nav__btn-line--active': menuOpen })}/>
                <div className={classNames('header-nav__btn-line', { 'header-nav__btn-line--active': menuOpen })}/>
            </div>
            <div className='header-nav__logo'>URBAN NEST</div>
            <div className='header-nav__icons'>
                <Link className='header-nav__icon' to='/account' aria-label='Link to account'><IoPersonOutline/></Link>
                <Link className='header-nav__icon' to='/basket' aria-label='Link to basket'>
                    <IoBagOutline/>
                    <div className='header-nav__quantity' data-test='basket-quantity'>{quantity}</div>
                </Link>
            </div>
        </div>
        <div className={classNames('header-menu', { 'header-menu--open': menuOpen })}>
            <div className='header-menu__content'>
                <Link className='header-menu__link' to='/'>Home</Link>
                <div className='header-menu__link' onClick={() => setDropOpen(!dropOpen)} data-test='open-dropdown'>Shop</div>
                {dropOpen && <Dropdown/>}
                <Link className='header-menu__link' to='/account'>{userId ? 'Account' : 'Login'}</Link>
                <div className='header-menu__link'>Help</div>
                {userId && <Link className='header-menu__link' to='/'
                    onClick={() => dispatch(logoutUser())} data-test='link-logout'>Logout</Link>}
            </div>
        </div>
    </div>
}

export default Header