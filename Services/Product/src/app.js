import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/product.routes.js'
import categoryRoutes from './routes/category.routes.js'
import { handleMongooseError } from './middleware/error.middleware.js'
import { authenticateKey } from './middleware/auth.middleware.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))

app.use(express.json())

// Authenticate API key from gateway.

app.use(authenticateKey)

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

// Handle invalid endpoints.

app.use('/*', (req, res, next) => {
    res.status(404).send({ message: 'Invalid endpoint' })
})

// Handle Mongoose errors.

app.use(handleMongooseError)

// Handle generic errors.

app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Internal server error' })
})

export default app