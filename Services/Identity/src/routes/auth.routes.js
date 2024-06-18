import express from 'express'
import * as controller from '../controllers/auth.controller.js'
import { register, login } from '../../contracts/auth.request.js'
import { validateRequest } from '../middleware/validation.middleware.js'

const router = express.Router()

router.post('/register', validateRequest(register), controller.register)
router.post('/login', validateRequest(login), controller.login)
router.post('/logout', controller.logout)

export default router