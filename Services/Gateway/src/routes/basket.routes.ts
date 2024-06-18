import { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { authenticateToken, verifyUser } from '../middleware/auth.middleware'

const router = Router()

const proxyMiddleware = createProxyMiddleware({
    changeOrigin: true,
    target: process.env.BASKET_API_URL || 'http://localhost:8002',
    headers: { 'x-api-key': process.env.API_KEY || 'key' }
})

router.get('/basket/:id', authenticateToken, verifyUser, proxyMiddleware)
router.put('/basket/:id', authenticateToken, verifyUser, proxyMiddleware)
router.post('/basket/:id', authenticateToken, verifyUser, proxyMiddleware)

export default router