import { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { authenticateToken } from '../middleware/auth.middleware'

const router = Router()

const proxyMiddleware = createProxyMiddleware({
    changeOrigin: true,
    target: process.env.PRODUCT_API_URL || 'http://localhost:8001',
    headers: { 'x-api-key': process.env.API_KEY || 'key' }
})

router.get('/categories', proxyMiddleware)
router.post('/categories', authenticateToken, proxyMiddleware)
router.put('/categories/:id', authenticateToken, proxyMiddleware)
router.delete('/categories/:id', authenticateToken, proxyMiddleware)
router.get('/products', proxyMiddleware)
router.get('/products/category/:name', proxyMiddleware)
router.get('/products/:id', proxyMiddleware)
router.post('/products', authenticateToken, proxyMiddleware)
router.put('/products/:id',authenticateToken, proxyMiddleware)
router.delete('/products/:id', authenticateToken, proxyMiddleware)

export default router