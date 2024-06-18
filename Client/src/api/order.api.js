import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export const getAllOrders = (customerId) => {
    return axios.get(`/api/customers/${customerId}/orders`, { withCredentials: true })
}

export const createReturn = (customerId, orderItemId, quantity, reason) => {
    return axios.post(`/api/customers/${customerId}/returns`, { orderItemId, quantity, reason }, { withCredentials: true })
}