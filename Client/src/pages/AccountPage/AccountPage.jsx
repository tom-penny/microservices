import classNames from 'classnames'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { OrderTab, AddressTab } from '../../components'
import { IoHomeOutline, IoReceiptOutline } from 'react-icons/io5'
import useAuth from '../../hooks/useAuth'

import './AccountPage.scss'

export const AccountPage = () => {
    const isAuthenticated = useAuth()
    const { userId } = useSelector(state => state.user)

    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        { title: 'Addresses', icon: <IoHomeOutline/>, component: <AddressTab userId={userId}/> },
        { title: 'Orders', icon: <IoReceiptOutline/>, component: <OrderTab userId={userId}/> },
    ]

    if (!isAuthenticated) return null

    return <div className='account-page'>
        <div className='account-menu'>
            <div className='account-menu__bar'>
                {tabs.map((tab, index) => (
                    <div className={classNames('account-menu__tab', { 'account-menu__tab--active': activeTab === index })}
                        key={index} onClick={() => setActiveTab(index)} data-test={`tab-${tab.title.toLowerCase()}`}>{tab.icon} {tab.title}</div>
                ))}
            </div>
            <div className='account-menu__content'>
                {tabs[activeTab].component}
            </div>
        </div>
    </div>
}

export default AccountPage