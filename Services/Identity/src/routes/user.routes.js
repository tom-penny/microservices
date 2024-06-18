import express from 'express'
import * as controller from '../controllers/user.controller.js'
import { updateProfile, createAddress } from '../../contracts/user.request.js'
import { validateRequest } from '../middleware/validation.middleware.js'

const router = express.Router()

router.get('/:id', controller.getProfileById)
router.put('/:id', validateRequest(updateProfile), controller.updateProfile)
router.get('/:id/addresses', controller.getAllAddresses)
router.post('/:id/addresses', validateRequest(createAddress), controller.createAddress)
router.delete('/:id/addresses/:addressId', controller.deleteAddress)

export default router