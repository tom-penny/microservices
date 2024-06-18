import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import orderRoutes from './routes/order.routes'
import productRoutes from './routes/product.routes'
import basketRoutes from './routes/basket.routes'
import identityRoutes from './routes/identity.routes'
import { Request, Response, NextFunction } from 'express'
import { authenticateToken } from './middleware/auth.middleware'

dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}))

app.use(cookieParser())

app.use(morgan('dev'))

// Retrieve user ID from valid token.

app.use('/api/me', authenticateToken, (req: Request, res: Response) => {
    res.status(200).send({ userId: req.user })
})

app.use('/api', basketRoutes)
app.use('/api', orderRoutes)
app.use('/api', identityRoutes) 
app.use('/api', productRoutes)

// Handle invalid endpoints.

app.use('/*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ message: 'Invalid endpoint' })
})

// Handle generic errors.

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
})

export default app