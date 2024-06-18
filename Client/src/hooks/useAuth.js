import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

// Custom hook for redirecting to login page.

const useAuth = () => {
    
    const navigate = useNavigate()
    const location = useLocation()
    
    const { userId } = useSelector(state => state.user)

    const isAuthenticated = !!userId

    useEffect(() => {
        if (!isAuthenticated) {

            // Preserve current location in state.

            navigate('/login', { state: { from: location }})
        }
    }, [userId, navigate, location])

    return isAuthenticated
}

export default useAuth