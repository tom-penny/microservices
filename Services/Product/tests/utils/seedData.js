import Category from '../../src/models/category.js'
import Product from '../../src/models/product.js'
import { CATEGORIES, PRODUCTS } from '../data/testData.js'

export default async () => {
    await Product.deleteMany()
    await Category.deleteMany()
    await Category.insertMany(CATEGORIES)
    await Product.insertMany(PRODUCTS)
}