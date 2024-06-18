import useScroll from '../../hooks/useScroll'
import classNames from 'classnames'

import './Footer.scss'

const Footer = () => {

    const { isBottom } = useScroll()

    return <div className='footer'>
        <div className='footer__content'>
            <div className='footer__link'>Help</div>
            <div className='footer__link'>Careers</div>
            <div className='footer__link'>Terms & Conditions</div>
            <div className='footer__link'>Privacy Policy</div>
            <div className='footer__logo'>
                {'URBAN NEST'.split('').map((char, index) => (
                    <span className={classNames('footer__logo-letter', { 'footer__logo-letter--visible': isBottom })}
                        key={index} style={{ animationDelay: `${index * 0.1}s` }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
            </div>
        </div>
    </div>
}

export default Footer