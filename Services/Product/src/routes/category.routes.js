import express from 'express'
import controller from '../controllers/category.controller.js'

const router = express.Router()

router.get('/', controller.getAllCategories)
router.post('/', controller.createCategory)
router.put('/:id', controller.updateCategory)
router.delete('/:id', controller.deleteCategory)

export default router