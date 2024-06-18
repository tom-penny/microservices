import Product from '../models/product.js'
import Category from '../models/category.js'

const getAllProducts = async (req, res, next) => {
    try {
        const { sort, order } = req.query

        const limit = parseInt(req.query.limit) || 20
        const page = parseInt(req.query.page) || 1
        const skip = (page - 1) * limit

        const products = await Product.find()
        .limit(limit).skip(skip).sort({ [sort]: order })

        const count = await Product.countDocuments()

        res.status(200).send({ products, count })
    }
    catch (err) { next(err) }
}

const getProductsByCategory = async (req, res, next) => {
    try {
        const { name } = req.params
        const { sort, order } = req.query
        
        const limit = parseInt(req.query.limit) || 20
        const page = parseInt(req.query.page) || 1
        const skip = (page - 1) * limit

        const category = await Category.findOne({ name })

        if (!category) return res.status(404).send({ message: 'Category not found'})

        const products = await Product.find({ categories: { $in: [category.id] } })
        .limit(limit).skip(skip).sort({ [sort]: order })

        const count = await Product.countDocuments({ categories: { $in: [category.id] } })

        res.status(200).send({ products, count })
    }
    catch (err) { next(err) }
}

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (product) return res.status(200).send({ product })
        res.status(404).send({ message: 'Product not found' })
    }
    catch (err) { next(err) }
}

const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).send({ product })
    }
    catch (err) { next(err) }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
        if (product) return res.status(200).send({ product })
        res.status(404).send({ message: 'Product not found' })
    }
    catch (err) { next(err) }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (product) return res.sendStatus(204)
        res.status(404).send({ message: 'Product not found' })
    }
    catch (err) { next(err) }
}

export default { getAllProducts, getProductsByCategory, getProduct,
    createProduct, updateProduct, deleteProduct }