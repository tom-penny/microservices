import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

export const CATEGORIES = Object.freeze([
    Object.freeze({
        _id: new ObjectId(),
        name: 'category1'
    }),
    Object.freeze({
        _id: new ObjectId(),
        name: 'category2'
    })
])

export const PRODUCTS = Object.freeze([
    Object.freeze({
        _id: new ObjectId(),
        name: 'product1',
        price: 50.00,
        stock: 20,
        categories: [CATEGORIES[0]],
        images: [],
        created: new Date()
    }),
    Object.freeze({
        _id: new ObjectId(),
        name: 'product2',
        price: 80.00,
        stock: 10,
        categories: [CATEGORIES[1]],
        images: [],
        created: new Date()
    })
])