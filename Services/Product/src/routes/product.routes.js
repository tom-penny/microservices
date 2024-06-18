import express from 'express'
import controller from '../controllers/product.controller.js'
import { validateProductQuery } from '../middleware/validation.middleware.js'

const router = express.Router()

router.get('/', validateProductQuery, controller.getAllProducts)
router.get('/category/:name', validateProductQuery, controller.getProductsByCategory)
router.get('/:id', controller.getProduct)
router.post('/', controller.createProduct)
router.put('/:id', controller.updateProduct)
router.delete('/:id', controller.deleteProduct)

export default router