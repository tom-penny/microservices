import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../../reducers/user.reducer.js'
import { BarLoader } from 'react-spinners'

import './LoginPage.scss'

export const LoginPage = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { userId, status, error } = useSelector(state => state.user)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Return to previous location upon login.

    useEffect(() => {
        if (userId) {
            navigate(location.state?.from || '/account')
        }
    }, [userId, navigate, location])

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
    }

    const handleClick = (e) => {
        e.preventDefault()
        const from = location.state?.from || '/'
        navigate('/register', { state: { from }})
    }

    
    return <div className='login-page'>
        <form className='login-form' onSubmit={handleSubmit}>
            {status === 'failed' && <div className='login-form__error' data-test='error-message'>{`${error}. Please try again.`}</div>}
            <input className='login-form__input' type='email' value={email} placeholder='Email'
                onChange={(e) => setEmail(e.target.value)} data-test='input-email'/>
            <input className='login-form__input' type='password' value={password} placeholder='Password'
                onChange={(e) => setPassword(e.target.value)} data-test='input-password'/>
            <button className='login-form__btn' type='submit' data-test='submit-login'>
                {status === 'loading' ? <BarLoader loading={true} size={8}/> : 'Login'}
            </button>
            <div className='login-form__prompt'>
                Don't have an account? <a href='#' onClick={handleClick}>Sign up</a>
            </div>
        </form>
    </div>
}

export default LoginPage