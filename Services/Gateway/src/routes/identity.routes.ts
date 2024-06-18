import { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { authenticateToken, verifyUser } from '../middleware/auth.middleware'

const router = Router()

const proxyMiddleware = createProxyMiddleware({
    changeOrigin: true,
    target: process.env.IDENTITY_API_URL || 'http://localhost:8004',
    headers: { 'x-api-key': process.env.API_KEY || 'key' },
})

router.post('/auth/register', proxyMiddleware)
router.post('/auth/login', proxyMiddleware)
router.post('/auth/logout', proxyMiddleware)
router.get('/users/:id', authenticateToken, verifyUser, proxyMiddleware)
router.put('/users/:id', authenticateToken, verifyUser, proxyMiddleware)
router.get('/users/:id/addresses', authenticateToken, verifyUser, proxyMiddleware)
router.post('/users/:id/addresses', authenticateToken, verifyUser, proxyMiddleware)
router.delete('/users/:id/addresses/:addressId', authenticateToken, verifyUser, proxyMiddleware)

export default router