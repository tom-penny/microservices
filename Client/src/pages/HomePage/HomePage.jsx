import { useEffect } from 'react'
import { Spotlight, HeroSection } from '../../components'

import './HomePage.scss'

export const HomePage = () => {

    useEffect(() => {
        document.documentElement.style.setProperty('--nav', '#FFF')

        return () => document.documentElement.style.setProperty('--nav', '#000')

    })


    return <div className='home-page'>
        <HeroSection/>
        <Spotlight/>
    </div>
}

export default HomePage