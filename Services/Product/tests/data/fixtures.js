import mongoose from 'mongoose'
import { PRODUCTS, CATEGORIES } from './testData.js'

const { ObjectId } = mongoose.Types

const mapCategories = (categories) => categories.map((category) => {
    const { _id, ...rest } = category
    return { id: _id.toString(), ...rest }
})

const mapProducts = (products) => products.map((product) => {
    const { _id, ...rest } = product
    rest.categories = mapCategories(rest.categories)
    rest.created = rest.created.toISOString()
    return { id: _id.toString(), ...rest }
})

export const CATEGORY_DATA = mapCategories(CATEGORIES)

export const PRODUCT_DATA = mapProducts(PRODUCTS)

export const MOCK_CATEGORY = {
    name: 'category3'
}

export const MOCK_PRODUCT = {
    name: 'product3',
    price: 100.00,
    categories: CATEGORY_DATA.map(c => c.id),
    images: ['img1', 'img2']
}

export const MOCK_ID = new ObjectId()
