import { useEffect, useState, useCallback } from 'react'
import { throttle } from 'lodash'

const useScroll = () => {
    
    const [scroll, setScroll] = useState({
        fromTop: 0,
        fromBottom: 0,
        isTop: true,
        isBottom: true,
        distance: 0,
        direction: 'down'
    })

    const handleScroll = useCallback(() => {
        const getPosition = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0

        const viewHeight = window.innerHeight
        const bottom = document.body.offsetHeight
        const fromTop = getPosition()
        const fromBottom = bottom - fromTop
        const isTop = fromTop <= 0
        const isBottom = fromTop >= bottom - viewHeight

        setScroll(prev => {
            const distance = fromTop - prev.fromTop
            const direction = distance < 0 ? 'up' : 'down'
            return { fromTop, fromBottom, isTop, isBottom, distance, direction }
        })
    }, [])

    useEffect(() => {
        const throttledScroll = throttle(handleScroll, 250)
        window.addEventListener('scroll', throttledScroll)
        return () => window.removeEventListener('scroll', throttledScroll)
    }, [handleScroll])

    return scroll
}

export default useScroll