import { useNavigate } from 'react-router-dom'
import './HeroSection.scss'

const HeroSection = () => {
    const navigate = useNavigate()

    return <div className='hero-section'>
        <div className='hero-section__content'>
            <div className='hero-section__title'>Craft space.<br/>Curate comfort.</div>
            <div className='hero-section__caption'>Lorem ipsum dolor, sit amet consectetur.</div>
            <button className='hero-section__btn' onClick={() => navigate('/catalogue')}>Shop now</button>
        </div>
    </div>
}

export default HeroSection