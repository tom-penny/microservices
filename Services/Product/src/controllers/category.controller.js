import Category from '../models/category.js'

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ name: 'asc' })
        res.status(200).send({ categories })
    }
    catch (err) { next(err) }
}

const createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body)
        res.status(201).send({ category })
    }
    catch (err) { next(err) }
}

const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const category = await Category.findByIdAndUpdate(id, req.body, { new: true })
        if (category) return res.status(200).send({ category })
        res.status(404).send({ message: 'Category not found' })
    }
    catch (err) { next(err) }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const category = await Category.findByIdAndDelete(id)
        if (category) return res.sendStatus(204)
        res.status(404).send({ message: 'Category not found' })
    }
    catch (err) { next(err) }
}

export default { getAllCategories, createCategory, updateCategory, deleteCategory }