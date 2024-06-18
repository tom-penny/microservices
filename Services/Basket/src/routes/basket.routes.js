import express from 'express'
import * as controller from '../controllers/basket.controller.js'
import { updateBasket, checkoutBasket } from '../../contracts/basket.request.js'
import { validateRequest } from '../middleware/validation.middleware.js'

const router = express.Router()

router.get('/:id', controller.getBasketById)
router.put('/:id', validateRequest(updateBasket), controller.updateBasket)
router.post('/:id', validateRequest(checkoutBasket), controller.checkoutBasket)

export default router