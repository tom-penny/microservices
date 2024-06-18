import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export const getBasket = (userId) => {
    return axios.get(`/api/basket/${userId}`, { withCredentials: true })
}

export const updateBasket = (userId, basket) => {
    return axios.put(`/api/basket/${userId}`, { basket }, { withCredentials: true })
}

export const checkoutBasket = (userId, addressId, basket) => {
    return axios.post(`/api/basket/${userId}`, { addressId, basket }, { withCredentials: true })
}