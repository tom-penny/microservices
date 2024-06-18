import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export const getAllCategories = () => {
    return axios.get('/api/categories', { withCredentials: true })
}

export const getProductById = (id) => {
    return axios.get(`/api/products/${id}`, { withCredentials: true })
}

export const getAllProducts = (page = 1, sort = 'name', order = 'asc') => {
    return axios.get(`/api/products?page=${page}&limit=${12}&sort=${sort}&order=${order}`, { withCredentials: true })
}

export const getProductsByCategory = (name, page = 1, sort = 'name', order = 'asc') => {
    return axios.get(`/api/products/category/${name}?page=${page}&limit=${12}&sort=${sort}&order=${order}`, { withCredentials: true })
}