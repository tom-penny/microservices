import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBasket, updateBasket, fetchBasket } from '../reducers/basket.reducer.js'

export const getLocalBasket = () =>
    JSON.parse(localStorage.getItem('basket') || '{}')

export const setLocalBasket = (basket) =>
    localStorage.setItem('basket', JSON.stringify(basket))

// Custom hook for managing basket state mutations.

export const useBasket = () => {
    
    const dispatch = useDispatch()
    
    const { userId } = useSelector(state => state.user)
    const { basket } = useSelector(state => state.basket)

    useEffect(() => {

        // If logged in, fetch basket from API.
        // Else fetch basket from local storage.

        dispatch(userId
            ? fetchBasket({ userId })
            : setBasket(getLocalBasket())
        )
    }, [userId, dispatch])

    const saveChanges = (basket) => {

        // If logged in, save basket to API.
        // Else save basket to local storage.

        if (userId) {
            dispatch(updateBasket({ userId, basket }))
        }
        else {
            setLocalBasket(basket)
            dispatch(setBasket(basket))
        }
    }

    const addToBasket = (product, quantity = 1) => {
        const newBasket = { ...basket }
        const { id, name, price, images } = product

        // If product in basket, increment quantity.
        // Else initialise product in basket.

        if (newBasket[id]) {
            newBasket[id] = { ...newBasket[id] }
            newBasket[id].quantity += quantity
        }
        else {
            newBasket[id] = {
                displayName: name,
                displayImage: images[0] ?? '',
                unitPrice: price,
                quantity
            }
        }

        saveChanges(newBasket)
    }

    const removeFromBasket = (productId) => {
        const newBasket = { ...basket }

        newBasket[productId] = { ...newBasket[productId] }
        delete newBasket[productId]

        saveChanges(newBasket)
    }

    const incrementQuantity = (productId) => {
        const newBasket = { ...basket }

        if (!newBasket[productId]) return

        newBasket[productId] = { ...newBasket[productId] }
        newBasket[productId].quantity += 1

        saveChanges(newBasket)
    }

    const decrementQuantity = (productId) => {
        const newBasket = { ...basket }

        if (!newBasket[productId]) return

        newBasket[productId] = { ...newBasket[productId] }
        newBasket[productId].quantity -= 1

        if (newBasket[productId].quantity <= 0) {
            delete newBasket[productId]
        }

        saveChanges(newBasket)
    }

    const clearBasket = () => {
        const newBasket = {}
        
        saveChanges(newBasket)
    }

    return { addToBasket, removeFromBasket, incrementQuantity, decrementQuantity, clearBasket }
}

export default useBasket