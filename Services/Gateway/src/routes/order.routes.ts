import { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { authenticateToken, verifyUser } from '../middleware/auth.middleware'

const router = Router()

const proxyMiddleware = createProxyMiddleware({
    changeOrigin: true,
    target: process.env.ORDER_API_URL || 'http://localhost:8003',
    headers: { 'x-api-key': process.env.API_KEY || 'key' }
})

router.get('/customers/:id/orders', authenticateToken, verifyUser, proxyMiddleware)
router.get('/orders/:id', authenticateToken, proxyMiddleware)
router.put('/orders/:id/cancel', authenticateToken, proxyMiddleware)
router.post('/orders/:id/ship', authenticateToken, proxyMiddleware)
router.get('/payments/:id', authenticateToken, proxyMiddleware)
router.post('/payments/confirm', proxyMiddleware)
router.post('/customers/:id/returns', authenticateToken, verifyUser, proxyMiddleware)
router.put('/returns/:id/confirm', authenticateToken, proxyMiddleware)
router.get('/shipments/:id', authenticateToken, proxyMiddleware)
router.put('/shipments/:id', authenticateToken, proxyMiddleware)

export default router