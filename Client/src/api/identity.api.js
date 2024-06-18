import axios from 'axios'

export const getUser = () => {
    return axios.get('/api/me', { withCredentials: true })
}

export const registerUser = (email, password) => {
    return axios.post('/api/auth/register', { email, password }, { withCredentials: true })
}

export const loginUser = (email, password) => {
    return axios.post('/api/auth/login', { email, password }, { withCredentials: true })
}

export const logoutUser = () => {
    return axios.post('/api/auth/logout', { withCredentials: true })
}

export const getAllAddresses = (userId) => {
    return axios.get(`/api/users/${userId}/addresses`, { withCredentials: true })
}

export const createAddress = (userId, address) => {
    return axios.post(`/api/users/${userId}/addresses`, { address }, { withCredentials: true })
}

export const deleteAddress = (userId, addressId) => {
    return axios.delete(`/api/users/${userId}/addresses/${addressId}`, { withCredentials: true })
}